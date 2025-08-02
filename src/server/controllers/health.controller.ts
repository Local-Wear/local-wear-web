import { Context } from 'hono';
import { sendSuccess } from '../common/api-response';

export class HealthController {
  /**
   * Basic ping endpoint for health checks
   */
  static async ping(c: Context) {
    const data = {
      message: 'Pong!',
      timestamp: new Date().toISOString(),
      requestId: c.get('requestId'),
    };
    return sendSuccess(c, data, 'Service is healthy');
  }

  /**
   * Detailed health check with system information
   */
  static async healthCheck(c: Context) {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    const data = {
      status: 'healthy',
      uptime: `${Math.floor(uptime)}s`,
      timestamp: new Date().toISOString(),
      requestId: c.get('requestId'),
      memory: {
        used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      },
      environment: process.env.NODE_ENV || 'development',
    };
    
    return sendSuccess(c, data, 'Health check completed');
  }

  /**
   * Ready check for container orchestration
   */
  static async ready(c: Context) {
    // Add any readiness checks here (database connectivity, external services, etc.)
    const data = {
      ready: true,
      timestamp: new Date().toISOString(),
      requestId: c.get('requestId'),
    };
    
    return sendSuccess(c, data, 'Service is ready');
  }

  /**
   * Liveness check for container orchestration
   */
  static async live(c: Context) {
    const data = {
      alive: true,
      timestamp: new Date().toISOString(),
      requestId: c.get('requestId'),
    };
    
    return sendSuccess(c, data, 'Service is alive');
  }
}