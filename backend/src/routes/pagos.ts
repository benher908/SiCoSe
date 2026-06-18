import { Router } from 'express'
import { z } from 'zod'
import { authenticate, requireRole } from '../middleware/require-role.js'
import type { AuthenticatedRequest } from '../types/auth.js'
import { PaymentError, registerCashPayment } from '../services/pagos.js'

const createCashPaymentSchema = z.object({
  metodo: z.literal('efectivo'),
  ciudadano_id: z.string().uuid(),
  adeudo_id: z.string().uuid(),
  monto: z.number().positive(),
})

function getRequestIp(request: AuthenticatedRequest) {
  return request.ip || request.socket.remoteAddress || 'unknown'
}

export const pagosRouter = Router()

pagosRouter.post(
  '/',
  authenticate,
  requireRole('admin', 'tesorero', 'secretaria'),
  async (request: AuthenticatedRequest, response, next) => {
    try {
      const parsed = createCashPaymentSchema.safeParse(request.body)

      if (!parsed.success) {
        return response.status(400).json({
          error: 'Invalid payment payload',
          details: parsed.error.flatten(),
        })
      }

      const payment = await registerCashPayment({
        metodo: parsed.data.metodo,
        ciudadanoId: parsed.data.ciudadano_id,
        adeudoId: parsed.data.adeudo_id,
        monto: parsed.data.monto,
        usuarioId: request.user?.id ?? '',
        ip: getRequestIp(request),
      })

      return response.status(201).json({
        data: payment,
      })
    } catch (error) {
      if (error instanceof PaymentError) {
        return response.status(error.statusCode).json({
          error: error.message,
          code: error.statusCode,
        })
      }

      return next(error)
    }
  },
)
