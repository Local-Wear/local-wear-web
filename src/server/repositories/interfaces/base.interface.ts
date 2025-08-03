export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(filters?: Record<string, unknown>): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export interface IHealthRepository {
  getSystemHealth(): Promise<SystemHealth>;
  checkDatabaseConnection(): Promise<boolean>;
  getUptime(): Promise<number>;
}

export interface SystemHealth {
  status: 'healthy' | 'unhealthy';
  uptime: string;
  memory: {
    used: string;
    total: string;
  };
  environment: string;
  timestamp: string;
}