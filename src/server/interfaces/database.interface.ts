import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DatabaseHealthInfo } from '../repositories/database.repository';
import { NewSystemLog, systemLogs } from '../database/schema';

/**
 * Database connection interface
 * Abstracts the database connection implementation
 */
export interface IDatabaseConnection {
  /**
   * Get the Drizzle ORM database instance
   */
  getDb(): ReturnType<typeof drizzle>;

  /**
   * Get the raw postgres client
   */
  getClient(): postgres.Sql;

  /**
   * Test database connectivity
   */
  testConnection(): Promise<boolean>;

  /**
   * Get connection configuration info
   */
  getConnectionInfo(): {
    host: string;
    port: number;
    database: string;
    username: string;
    ssl?: boolean;
    maxConnections?: number;
  };

  /**
   * Close database connection
   */
  close(): Promise<void>;
}

/**
 * Database repository interface
 * Handles database-specific operations
 */
export interface IDatabaseRepository {
  /**
   * Check database health status
   */
  checkHealth(): Promise<DatabaseHealthInfo>;

  /**
   * Log system events to database
   */
  logEvent(logData: Omit<NewSystemLog, 'id' | 'createdAt'>): Promise<void>;

  /**
   * Get recent system logs
   */
  getRecentLogs(limit?: number): Promise<typeof systemLogs.$inferSelect[]>;

  /**
   * Get logs by request ID for tracing
   */
  getLogsByRequestId(requestId: string): Promise<typeof systemLogs.$inferSelect[]>;

  /**
   * Execute health query for database diagnostics
   */
  executeHealthQuery(): Promise<{ version: string; uptime: string }>;

  /**
   * Get database statistics
   */
  getDatabaseStats(): Promise<{
    totalConnections: number;
    activeConnections: number;
    databaseSize: string;
  }>;
}