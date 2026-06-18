import { Redis } from 'ioredis'
import { env } from '../config/env.js'

const memoryBlacklist = new Map<string, number>()

let redisClient: Redis | null = null

function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    })

    redisClient.on('error', () => {
      // Development fallback: auth still works locally if Redis is unavailable.
    })
  }

  return redisClient
}

function cleanupMemoryBlacklist() {
  const now = Date.now()

  for (const [token, expiresAt] of memoryBlacklist.entries()) {
    if (expiresAt <= now) {
      memoryBlacklist.delete(token)
    }
  }
}

export async function blacklistToken(token: string, expiresAt: number) {
  const ttlSeconds = Math.max(1, Math.ceil((expiresAt * 1000 - Date.now()) / 1000))

  try {
    const redis = getRedisClient()
    if (redis.status === 'wait') {
      await redis.connect()
    }
    await redis.set(`jwt:blacklist:${token}`, '1', 'EX', ttlSeconds)
  } catch {
    memoryBlacklist.set(token, Date.now() + ttlSeconds * 1000)
  }
}

export async function isTokenBlacklisted(token: string) {
  try {
    const redis = getRedisClient()
    if (redis.status === 'wait') {
      await redis.connect()
    }
    return (await redis.exists(`jwt:blacklist:${token}`)) === 1
  } catch {
    cleanupMemoryBlacklist()
    return memoryBlacklist.has(token)
  }
}
