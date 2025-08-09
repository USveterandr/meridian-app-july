import { PrismaClient } from '@prisma/client'
import { logger } from './logger'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn']
      : ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// Database connection health check
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    logger.error('Database health check failed', error as Error)
    return false
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect()
  logger.info('Database connection closed')
})