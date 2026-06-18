import { Router } from 'express'
import { z } from 'zod'
import { generateMonthlyDebts } from '../services/adeudos.js'
import { authenticate, requireRole } from '../middleware/require-role.js'

const generateDebtsSchema = z.object({
  periodo: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(),
  vencimiento: z.coerce.date().optional(),
})

export const adeudosRouter = Router()

adeudosRouter.post(
  '/generar',
  authenticate,
  requireRole('admin', 'tesorero'),
  async (request, response, next) => {
    try {
      const parsed = generateDebtsSchema.safeParse(request.body ?? {})

      if (!parsed.success) {
        return response.status(400).json({
          error: 'Invalid debt generation payload',
          details: parsed.error.flatten(),
        })
      }

      const result = await generateMonthlyDebts(parsed.data)

      return response.status(201).json({
        message: 'Monthly debts generated',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)
