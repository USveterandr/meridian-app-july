import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/db';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

export async function GET() {
  try {
    const dbHealthy = await checkDatabaseHealth();
    
    const healthStatus = {
      status: dbHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      services: {
        database: dbHealthy ? 'healthy' : 'unhealthy',
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };

    if (!dbHealthy) {
      logger.warn('Health check detected database issues');
      return NextResponse.json(healthStatus, { status: 503 });
    }

    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error) {
    logger.error('Health check failed', error as Error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}