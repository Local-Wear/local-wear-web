import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { injectable } from 'tsyringe';
import { IDatabaseConnection } from '../interfaces/database.interface';

// Database configuration interface
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  maxConnections?: number;
  idleTimeout?: number;
}

// Get database configuration from environment variables
const getDatabaseConfig = (): DatabaseConfig => {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    // Parse DATABASE_URL if provided
    const url = new URL(databaseUrl);
    return {
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      database: url.pathname.slice(1),
      username: url.username,
      password: url.password,
      ssl: url.searchParams.get('sslmode') === 'require',
      maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
      idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30')
    };
  }

  // Fallback to individual environment variables
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'local_wear',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL === 'true',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30')
  };
};

@injectable()
export class DatabaseConnection implements IDatabaseConnection {
  private client!: postgres.Sql;
  private db!: ReturnType<typeof drizzle>;
  private config: DatabaseConfig;

  constructor() {
    this.config = getDatabaseConfig();
    this.initializeConnection();
  }

  private initializeConnection(): void {
    try {
      // Create PostgreSQL client with configuration
      this.client = postgres({
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
        username: this.config.username,
        password: this.config.password,
        ssl: this.config.ssl,
        max: this.config.maxConnections,
        idle_timeout: this.config.idleTimeout,
        // Connection pool settings
        connect_timeout: 10, // 10 seconds
        prepare: false, // Disable prepared statements for better compatibility
        onnotice: (notice) => {
          console.log('PostgreSQL notice:', notice);
        },
        debug: process.env.NODE_ENV === 'development'
      });

      // Initialize Drizzle ORM
      this.db = drizzle(this.client, {
        logger: process.env.NODE_ENV === 'development'
      });

      console.log('✅ Database connection initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database connection:', error);
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the Drizzle database instance
   */
  public getDb() {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  /**
   * Get the raw PostgreSQL client
   */
  public getClient() {
    if (!this.client) {
      throw new Error('Database client not initialized');
    }
    return this.client;
  }

  /**
   * Test database connection
   */
  public async testConnection(): Promise<boolean> {
    try {
      await this.client`SELECT 1 as test`;
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  /**
   * Get database connection info
   */
  public getConnectionInfo() {
    return {
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      username: this.config.username,
      ssl: this.config.ssl,
      maxConnections: this.config.maxConnections
    };
  }

  /**
   * Close database connection
   */
  public async close(): Promise<void> {
    try {
      if (this.client) {
        await this.client.end();
        console.log('✅ Database connection closed successfully');
      }
    } catch (error) {
      console.error('❌ Error closing database connection:', error);
      throw error;
    }
  }

  /**
   * Get singleton instance
   */
  /**
   * Initialize a new database connection
   * Note: TSyringe will manage the singleton lifecycle
   */
  public static create(): DatabaseConnection {
    return new DatabaseConnection();
  }
}