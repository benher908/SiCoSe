import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { rateLimit } from '../middleware/rate-limit.js'
import { signAuthToken, verifyAuthToken } from '../lib/jwt.js'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const authRouter = Router()

authRouter.post('/login', rateLimit, async (request, response, next) => {
  try {
    const parsed = loginSchema.safeParse(request.body)

    if (!parsed.success) {
      return response.status(400).json({
        error: 'Invalid credentials payload',
        details: parsed.error.flatten(),
      })
    }

    const role = parsed.data.email.includes('admin') ? 'admin' : 'tesorero'
    const token = await signAuthToken({
      sub: randomUUID(),
      email: parsed.data.email,
      rol: role,
    })

    return response.json({
      message: 'Login successful',
      data: {
        token,
        user: {
          email: parsed.data.email,
          rol: role,
        },
      },
    })
  } catch (error) {
    next(error)
  }
})

authRouter.get('/me', async (request, response) => {
  const header = request.headers.authorization ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''

  if (!token) {
    return response.status(401).json({
      error: 'Missing bearer token',
      code: 401,
    })
  }

  try {
    const payload = await verifyAuthToken(token)
    return response.json({
      data: payload,
    })
  } catch {
    return response.status(401).json({
      error: 'Invalid or expired token',
      code: 401,
    })
  }
})

authRouter.post('/logout', (_request, response) => {
  response.json({
    message: 'Token revoked in demo mode',
  })
})
