# Database Setup with Drizzle ORM and PostgreSQL

This document explains how to set up and use the database connection with Drizzle ORM and PostgreSQL in the Local Wear application.

## Overview

The application uses:
- **PostgreSQL** as the database
- **Drizzle ORM** for type-safe database operations
- **TSyringe** for dependency injection
- **Zod** for schema validation

## Architecture

```
Controller → Service → Repository → DatabaseConnection → PostgreSQL
```

### Key Components

1. **DatabaseConnection** (`src/server/database/connection.ts`)
   - Manages PostgreSQL connection using `postgres` client
   - Provides Drizzle ORM instance
   - Handles connection configuration and health checks

2. **Database Schema** (`src/server/database/schema.ts`)
   - Defines all database tables using Drizzle schema
   - Includes Zod validation schemas
   - Type-safe table definitions

3. **Database Repository** (`src/server/repositories/database.repository.ts`)
   - Provides database-specific operations
   - Health checks and monitoring
   - System logging functionality

## Environment Configuration

Copy `.env.example` to `.env` and configure your database settings:

```bash
cp .env.example .env
```

### Option 1: Using DATABASE_URL
```env
DATABASE_URL=postgresql://username:password@localhost:5432/local_wear
```

### Option 2: Individual Settings
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=local_wear
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_SSL=false
DB_MAX_CONNECTIONS=20
```

## Database Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE local_wear;
CREATE USER local_wear_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE local_wear TO local_wear_user;
\q
```

### 3. Generate and Run Migrations

```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run db:generate` | Generate migration files from schema |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |
| `npm run db:push` | Push schema changes directly (dev only) |
| `npm run db:drop` | Drop database tables |
| `npm run db:check` | Check migration consistency |

## Database Schema

The application includes the following tables:

### Core Tables
- **users** - User accounts and profiles
- **products** - Product catalog
- **orders** - Customer orders
- **sessions** - User authentication sessions
- **api_keys** - API key management
- **system_logs** - Application logging

### Example Usage

```typescript
import { container } from '../container';
import { DatabaseRepository } from '../repositories/database.repository';

// Get database repository
const dbRepo = container.resolve<DatabaseRepository>('DatabaseRepository');

// Check database health
const health = await dbRepo.checkHealth();
console.log('Database status:', health.connected);

// Log an event
await dbRepo.logEvent({
  level: 'info',
  message: 'User logged in',
  context: { userId: '123' },
  requestId: 'req-456',
});
```

## Health Monitoring

The database connection includes comprehensive health monitoring:

### Health Check Endpoints
- `GET /api/health` - Overall system health including database
- `GET /api/ready` - Readiness check (database connectivity)
- `GET /api/live` - Liveness check (application status)

### Health Information
```typescript
interface DatabaseHealthInfo {
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
```

## Development Workflow

### 1. Schema Changes
```bash
# 1. Modify schema in src/server/database/schema.ts
# 2. Generate migration
npm run db:generate
# 3. Review generated migration
# 4. Run migration
npm run db:migrate
```

### 2. Database Exploration
```bash
# Open Drizzle Studio
npm run db:studio
# Navigate to http://localhost:4983
```

### 3. Quick Development (Schema Push)
```bash
# For rapid prototyping (skips migrations)
npm run db:push
```

## Production Considerations

### Connection Pooling
The `DatabaseConnection` class manages connection pooling automatically:
- Default max connections: 20
- Connection timeout: 30 seconds
- Idle timeout: 10 seconds

### Security
- Use SSL in production (`DB_SSL=true`)
- Store credentials in secure environment variables
- Limit database user permissions
- Enable connection encryption

### Monitoring
- Database health checks are integrated into health endpoints
- System logs are stored in the database
- Connection statistics are available via health endpoints

## Troubleshooting

### Common Issues

**Connection Refused:**
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql
# or
sudo systemctl status postgresql
```

**Permission Denied:**
```bash
# Ensure user has proper permissions
psql -d local_wear -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO local_wear_user;"
```

**Migration Errors:**
```bash
# Check migration status
npm run db:check

# Reset migrations (development only)
npm run db:drop
npm run db:migrate
```

### Debug Mode
Enable verbose logging by setting:
```env
LOG_LEVEL=debug
```

## Testing

### Database Testing
```typescript
import { container } from '../src/server/container';
import { DatabaseConnection } from '../src/server/database/connection';

describe('Database Connection', () => {
  let dbConnection: DatabaseConnection;

  beforeAll(() => {
    dbConnection = container.resolve<DatabaseConnection>('DatabaseConnection');
  });

  it('should connect to database', async () => {
    const isConnected = await dbConnection.testConnection();
    expect(isConnected).toBe(true);
  });

  afterAll(async () => {
    await dbConnection.close();
  });
});
```

## Migration from Other ORMs

If migrating from other ORMs:
1. Export existing schema
2. Create equivalent Drizzle schema
3. Generate initial migration
4. Test data migration scripts
5. Update application code to use new repositories

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TSyringe Documentation](https://github.com/microsoft/tsyringe)
- [Zod Documentation](https://zod.dev/)