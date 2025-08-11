import { delay, inject, injectable } from 'tsyringe';
import { HealthRepository } from '../repositories/health.repository';
import { SystemHealth } from '../repositories/interfaces/base.interface';

export interface PingResponse {
  message: string;
  timestamp: string;
  requestId: string;
}

export interface ReadinessResponse {
  ready: boolean;
  timestamp: string;
  requestId: string;
}

export interface LivenessResponse {
  alive: boolean;
  timestamp: string;
  requestId: string;
}

@injectable()
export class HealthService {
  constructor(
    @inject(delay(() => HealthRepository))
    private readonly healthRepository: HealthRepository
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
