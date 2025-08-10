import { eq } from 'drizzle-orm';
import { injectable } from 'tsyringe';
import { DatabaseConnection } from '../database/connection';
import { NewSystemLog, systemLogs } from '../database/schema';

export interface DatabaseHealthInfo {
  connected: boolean;
  connectionInfo: {
    host: string;
    port: number;
    database: string;
    username: string;
    ssl: boolean;
    maxConnections: number;
  };
  lastChecked: string;
}

@injectable()
export class DatabaseRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

  /**
   * Test database connection health
   */
  async checkHealth(): Promise<DatabaseHealthInfo> {
    const connected = await this.databaseConnection.testConnection();
    const rawConnectionInfo = this.databaseConnection.getConnectionInfo();

    const connectionInfo = {
      host: rawConnectionInfo.host,
      port: rawConnectionInfo.port,
      database: rawConnectionInfo.database,
      username: rawConnectionInfo.username,
      ssl: rawConnectionInfo.ssl ?? false,
      maxConnections: rawConnectionInfo.maxConnections ?? 20,
    };

    return {
      connected,
      connectionInfo,
      lastChecked: new Date().toISOString(),
    };
  }

  /**
   * Log system events to database
   */
  async logEvent(logData: Omit<NewSystemLog, 'id' | 'createdAt'>): Promise<void> {
    try {
      const db = this.databaseConnection.getDb();
      await db.insert(systemLogs).values(logData);
    } catch (error) {
      console.error('Failed to log event to database:', error);
      // Don't throw error to prevent logging failures from breaking the application
    }
  }

  /**
   * Get recent system logs
   */
  async getRecentLogs(limit: number = 100): Promise<(typeof systemLogs.$inferSelect)[]> {
    try {
      const db = this.databaseConnection.getDb();
      return await db.select().from(systemLogs).orderBy(systemLogs.createdAt).limit(limit);
    } catch (error) {
      console.error('Failed to fetch system logs:', error);
      return [];
    }
  }

  /**
   * Get logs by request ID for tracing
   */
  async getLogsByRequestId(requestId: string): Promise<(typeof systemLogs.$inferSelect)[]> {
    try {
      const db = this.databaseConnection.getDb();
      return await db
        .select()
        .from(systemLogs)
        .where(eq(systemLogs.requestId, requestId))
        .orderBy(systemLogs.createdAt);
    } catch (error) {
      console.error('Failed to fetch logs by request ID:', error);
      return [];
    }
  }

  /**
   * Execute raw SQL query for health checks
   */
  async executeHealthQuery(): Promise<{ version: string; uptime: string }> {
    try {
      const client = this.databaseConnection.getClient();
      const [versionResult] = await client`SELECT version() as version`;
      const [uptimeResult] = await client`
        SELECT
          EXTRACT(EPOCH FROM (now() - pg_postmaster_start_time())) as uptime_seconds
      `;

      return {
        version: versionResult.version,
        uptime: `${Math.floor(uptimeResult.uptime_seconds)}s`,
      };
    } catch (error) {
      console.error('Failed to execute health query:', error);
      throw error;
    }
  }

  /**
   * Get database statistics
   */
  async getDatabaseStats(): Promise<{
    totalConnections: number;
    activeConnections: number;
    databaseSize: string;
  }> {
    try {
      const client = this.databaseConnection.getClient();

      const [connectionStats] = await client`
        SELECT
          (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') as total_connections,
          (SELECT count(*) FROM pg_stat_activity WHERE state = 'active') as active_connections
      `;

      const [sizeStats] = await client`
        SELECT pg_size_pretty(pg_database_size(current_database())) as database_size
      `;

      return {
        totalConnections: connectionStats.total_connections,
        activeConnections: connectionStats.active_connections,
        databaseSize: sizeStats.database_size,
      };
    } catch (error) {
      console.error('Failed to get database stats:', error);
      return {
        totalConnections: 0,
        activeConnections: 0,
        databaseSize: 'Unknown',
      };
    }
  }
}
