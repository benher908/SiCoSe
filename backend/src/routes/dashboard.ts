import { Router } from 'express'
import { authenticate, requireRole } from '../middleware/require-role.js'

export const dashboardRouter = Router()

dashboardRouter.get('/metricas', authenticate, requireRole('admin', 'tesorero'), (_request, response) => {
  response.json({
    data: {
      totalRecaudadoMes: 0,
      porcentajeCobertura: 0,
      numeroMorosos: 0,
      comparativoMesAnterior: 0,
      ultimaActualizacion: new Date().toISOString(),
    },
  })
})
