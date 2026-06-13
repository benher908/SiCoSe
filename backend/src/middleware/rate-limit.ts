import type { NextFunction, Request, Response } from 'express'
import { env } from '../config/env.js'

const buckets = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(request: Request, response: Response, next: NextFunction) {
  const key = request.ip ?? 'unknown'
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + env.RATE_LIMIT_WINDOW_MS })
    return next()
  }

  if (current.count >= env.RATE_LIMIT_MAX) {
    return response.status(429).json({
      error: 'Too many attempts. Try again later.',
      code: 429,
    })
  }

  current.count += 1
  next()
}
