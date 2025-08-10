import { inject, injectable } from 'tsyringe';
import { Context } from 'hono';
import { sendSuccess } from '../common/api-response';
import { HealthService } from '../services/health.service';

@injectable()
export class HealthController {
  constructor(
    @inject('HealthService') private healthService: HealthService
  ) {}

  /**
   * Basic ping endpoint for health checks
   */
  async ping(c: Context) {
    const requestId = c.get('requestId') || 'unknown';
    const data = await this.healthService.ping(requestId);
    return sendSuccess(c, data, 'Service is healthy');
  }

  /**
   * Detailed health check with system information
   */
  async healthCheck(c: Context) {
    const requestId = c.get('requestId') || 'unknown';
    const data = await this.healthService.getHealthCheck(requestId);
    return sendSuccess(c, data, 'Health check completed');
  }

  /**
   * Ready check for container orchestration
   */
  async ready(c: Context) {
    const requestId = c.get('requestId') || 'unknown';
    const data = await this.healthService.checkReadiness(requestId);
    return sendSuccess(c, data, 'Service is ready');
  }

  /**
   * Liveness check for container orchestration
   */
  async live(c: Context) {
    const requestId = c.get('requestId') || 'unknown';
    const data = await this.healthService.checkLiveness(requestId);
    return sendSuccess(c, data, 'Service is alive');
  }
}