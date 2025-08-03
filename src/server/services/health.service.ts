import { inject, injectable } from 'tsyringe';
import { SystemHealth } from '../repositories/interfaces/base.interface';
import type { IHealthRepository, IHealthService, PingResponse, ReadinessResponse, LivenessResponse } from '../interfaces/health.interface';
import { REPOSITORY_TOKENS } from '../common/tokens';

@injectable()
export class HealthService implements IHealthService {
  constructor(
    @inject(REPOSITORY_TOKENS.Health) private healthRepository: IHealthRepository
  ) {}

  async ping(requestId: string): Promise<PingResponse> {
    return {
      message: 'Pong!',
      timestamp: new Date().toISOString(),
      requestId,
    };
  }

  async getHealthCheck(requestId: string): Promise<SystemHealth & { requestId: string }> {
    const systemHealth = await this.healthRepository.getSystemHealth();
    return {
      ...systemHealth,
      requestId,
    };
  }

  async checkReadiness(requestId: string): Promise<ReadinessResponse> {
    // Add any readiness checks here (database connectivity, external services, etc.)
    const isDatabaseConnected = await this.healthRepository.checkDatabaseConnection();
    
    return {
      ready: isDatabaseConnected,
      timestamp: new Date().toISOString(),
      requestId,
    };
  }

  async checkLiveness(requestId: string): Promise<LivenessResponse> {
    // Basic liveness check - if this method runs, the service is alive
    return {
      alive: true,
      timestamp: new Date().toISOString(),
      requestId,
    };
  }
}