import { injectable } from 'tsyringe';
import { DatabaseHealthInfo, DatabaseRepository } from './database.repository';
import { IHealthRepository, SystemHealth } from './interfaces/base.interface';

interface DatabaseInfo extends DatabaseHealthInfo {
  stats: {
    totalConnections: number;
    activeConnections: number;
    databaseSize: string;
  };
}

@injectable()
export class HealthRepository implements IHealthRepository {
  constructor(private databaseRepository: DatabaseRepository) {}

  async getSystemHealth(): Promise<SystemHealth> {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    // Check database health
    let databaseStatus = 'healthy';
    try {
      const dbHealth = await this.databaseRepository.checkHealth();
      if (!dbHealth.connected) {
        databaseStatus = 'unhealthy';
      }
    } catch (error) {
      console.error('Database health check failed:', error);
      databaseStatus = 'unhealthy';
    }

    return {
      status: databaseStatus === 'healthy' ? 'healthy' : 'unhealthy',
      uptime: `${Math.floor(uptime)}s`,
      memory: {
        used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      },
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };
  }

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      const dbHealth = await this.databaseRepository.checkHealth();
      return dbHealth.connected;
    } catch (error) {
      console.error('Database connection check failed:', error);
      return false;
    }
  }

  async getUptime(): Promise<number> {
    return process.uptime();
  }

  async getDatabaseInfo(): Promise<DatabaseInfo | null> {
    try {
      const [dbHealth, dbStats] = await Promise.all([
        this.databaseRepository.checkHealth(),
        this.databaseRepository.getDatabaseStats(),
      ]);

      return {
        ...dbHealth,
        stats: dbStats,
      };
    } catch (error) {
      console.error('Failed to get database info:', error);
      return null;
    }
  }
}
