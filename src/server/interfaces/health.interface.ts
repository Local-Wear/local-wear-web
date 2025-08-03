import { Context } from 'hono';
import { SystemHealth } from '../repositories/interfaces/base.interface';
import { DatabaseHealthInfo } from '../repositories/database.repository';

/**
 * Health repository interface
 * Abstracts health-related data operations
 */
export interface IHealthRepository {
  /**
   * Get overall system health information
   */
  getSystemHealth(): Promise<SystemHealth>;

  /**
   * Check database connection status
   */
  checkDatabaseConnection(): Promise<boolean>;

  /**
   * Get system uptime in seconds
   */
  getUptime(): Promise<number>;

  /**
   * Get detailed database information including stats
   */
  getDatabaseInfo(): Promise<DatabaseInfo | null>;
}

/**
 * Health service interface
 * Abstracts health-related business logic
 */
export interface IHealthService {
  /**
   * Simple ping response
   */
  ping(requestId: string): Promise<PingResponse>;

  /**
   * Comprehensive health check
   */
  getHealthCheck(requestId: string): Promise<SystemHealth & { requestId: string }>;

  /**
   * Readiness check for load balancers
   */
  checkReadiness(requestId: string): Promise<ReadinessResponse>;

  /**
   * Liveness check for container orchestration
   */
  checkLiveness(requestId: string): Promise<LivenessResponse>;
}

/**
 * Health controller interface
 * Abstracts HTTP request handling for health endpoints
 */
export interface IHealthController {
  /**
   * Handle ping requests
   */
  ping(c: Context): Promise<Response>;

  /**
   * Handle health check requests
   */
  healthCheck(c: Context): Promise<Response>;

  /**
   * Handle readiness check requests
   */
  ready(c: Context): Promise<Response>;

  /**
   * Handle liveness check requests
   */
  live(c: Context): Promise<Response>;
}

// Response type interfaces
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

export interface DatabaseInfo extends DatabaseHealthInfo {
  stats: {
    totalConnections: number;
    activeConnections: number;
    databaseSize: string;
  };
}