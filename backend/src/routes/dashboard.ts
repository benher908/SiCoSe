import { Router } from 'express'

export const dashboardRouter = Router()

dashboardRouter.get('/metricas', (_request, response) => {
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
