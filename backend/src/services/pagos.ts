import type { Prisma, Pago } from '@prisma/client'
import { randomInt } from 'node:crypto'
import { prisma } from '../lib/prisma.js'

const CASH_PAYMENT_METHOD = 'efectivo'
const PAID_STATUS = 'pagado'
const PENDING_STATUS = 'pendiente'
const MAX_FOLIO_ATTEMPTS = 10

type TransactionClient = Prisma.TransactionClient

export type RegisterCashPaymentInput = {
  metodo: string
  ciudadanoId: string
  adeudoId: string
  monto: number
  usuarioId: string
  ip: string
}

export class PaymentError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message)
  }
}

function normalizePaymentMethod(method: string) {
  return method.trim().toLowerCase()
}

function createFolioCandidate(date = new Date()) {
  const year = date.getFullYear()
  const suffix = String(randomInt(0, 1_000_000)).padStart(6, '0')

  return `SCS-${year}-${suffix}`
}

async function generateUniqueFolio(tx: TransactionClient) {
  for (let attempt = 0; attempt < MAX_FOLIO_ATTEMPTS; attempt += 1) {
    const folio = createFolioCandidate()
    const existing = await tx.pago.findUnique({
      where: { folio },
      select: { id: true },
    })

    if (!existing) {
      return folio
    }
  }

  throw new PaymentError(500, 'Unable to generate unique payment folio')
}

type PrismaClientLike = Pick<typeof prisma, '$transaction'>

export async function registerCashPayment(
  input: RegisterCashPaymentInput,
  client: PrismaClientLike = prisma,
) {
  if (normalizePaymentMethod(input.metodo) !== CASH_PAYMENT_METHOD) {
    throw new PaymentError(400, 'Payment method must be efectivo')
  }

  if (!Number.isFinite(input.monto) || input.monto <= 0) {
    throw new PaymentError(400, 'Payment amount must be greater than zero')
  }

  return client.$transaction(async (tx) => {
    const adeudo = await tx.adeudo.findFirst({
      where: {
        id: input.adeudoId,
        ciudadanoId: input.ciudadanoId,
      },
    })

    if (!adeudo) {
      throw new PaymentError(404, 'Debt not found for citizen')
    }

    if (adeudo.pagado || adeudo.estado === PAID_STATUS) {
      throw new PaymentError(409, 'Debt is already paid')
    }

    const paidAmount = await tx.pago.aggregate({
      where: { adeudoId: adeudo.id },
      _sum: { monto: true },
    })
    const pendingAmount = adeudo.monto - (paidAmount._sum.monto ?? 0)

    if (input.monto > pendingAmount) {
      throw new PaymentError(400, 'Payment amount cannot be greater than pending debt')
    }

    const folio = await generateUniqueFolio(tx)
    const payment = await tx.pago.create({
      data: {
        ciudadanoId: input.ciudadanoId,
        adeudoId: input.adeudoId,
        monto: input.monto,
        metodo: CASH_PAYMENT_METHOD,
        folio,
        recibo: folio,
        creado_por: input.usuarioId,
      },
      include: {
        ciudadano: true,
        adeudo: true,
      },
    })

    await tx.adeudo.update({
      where: { id: adeudo.id },
      data: {
        pagado: true,
        estado: PAID_STATUS,
      },
    })

    await tx.auditoria.create({
      data: {
        usuarioId: input.usuarioId,
        accion: 'REGISTRO_PAGO_EFECTIVO',
        entidad: 'Pago',
        entidad_id: payment.id,
        ip: input.ip,
        timestamp: new Date(),
        detalles: JSON.stringify({
          folio,
          ciudadanoId: input.ciudadanoId,
          adeudoId: input.adeudoId,
          monto: input.monto,
          estadoAnterior: adeudo.estado || PENDING_STATUS,
          estadoNuevo: PAID_STATUS,
        }),
      },
    })

    return payment as Pago & {
      ciudadano: unknown
      adeudo: unknown
    }
  })
}
