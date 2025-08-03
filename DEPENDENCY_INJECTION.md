# Improved Dependency Injection with TSyringe

This document explains the enhanced dependency injection implementation using TSyringe with best practices for type safety, maintainability, and testability.

## Overview

The application now uses a robust dependency injection system with:
- **Symbol-based tokens** for type safety
- **Interface-based injection** for better abstraction
- **Centralized container configuration** for maintainability
- **Factory patterns** for complex dependencies
- **No singleton patterns** (TSyringe manages lifecycle)

## Architecture

```
HTTP Request → Controller → Service → Repository → Database
     ↓            ↓          ↓           ↓          ↓
 Interface    Interface  Interface   Interface  Interface
     ↓            ↓          ↓           ↓          ↓
Concrete     Concrete   Concrete    Concrete   Concrete
```

## Key Improvements

### 1. Symbol-based Tokens

**Before (String-based - ❌ Bad):**
```typescript
@inject('DatabaseConnection') private db: DatabaseConnection
```

**After (Symbol-based - ✅ Good):**
```typescript
@inject(TOKENS.Connection) private db: IDatabaseConnection
```

**Benefits:**
- Compile-time type safety
- Refactoring support
- No typos or runtime errors
- Better IDE navigation

### 2. Interface-based Injection

**Before (Concrete classes - ❌ Bad):**
```typescript
constructor(
  @inject('DatabaseRepository') private repo: DatabaseRepository
) {}
```

**After (Interfaces - ✅ Good):**
```typescript
constructor(
  @inject(REPOSITORY_TOKENS.Health) private repo: IHealthRepository
) {}
```

**Benefits:**
- Loose coupling
- Easy mocking for tests
- Dependency inversion principle
- Swappable implementations

### 3. Centralized Container Configuration

**File Structure:**
```
src/server/
├── common/
│   └── tokens.ts              # Symbol-based tokens
├── interfaces/
│   ├── database.interface.ts  # Database abstractions
│   └── health.interface.ts    # Health abstractions
├── container.config.ts        # Container configuration
└── container.ts              # Backward compatibility
```

## Token System

### Token Definition (`src/server/common/tokens.ts`)

```typescript
export const DATABASE_TOKENS = {
  Connection: Symbol('DatabaseConnection'),
  Repository: Symbol('DatabaseRepository'),
} as const;

export const REPOSITORY_TOKENS = {
  Health: Symbol('HealthRepository'),
  Database: DATABASE_TOKENS.Repository,
} as const;

export const SERVICE_TOKENS = {
  Health: Symbol('HealthService'),
} as const;

export const CONTROLLER_TOKENS = {
  Health: Symbol('HealthController'),
} as const;
```

### Token Usage

```typescript
// In services
@inject(REPOSITORY_TOKENS.Health) private healthRepo: IHealthRepository

// In controllers
@inject(SERVICE_TOKENS.Health) private healthService: IHealthService

// In repositories
@inject(DATABASE_TOKENS.Connection) private db: IDatabaseConnection
```

## Interface Definitions

### Database Interfaces (`src/server/interfaces/database.interface.ts`)

```typescript
export interface IDatabaseConnection {
  getDb(): ReturnType<typeof drizzle>;
  getClient(): postgres.Sql;
  testConnection(): Promise<boolean>;
  getConnectionInfo(): ConnectionInfo;
  close(): Promise<void>;
}

export interface IDatabaseRepository {
  checkHealth(): Promise<DatabaseHealthInfo>;
  logEvent(logData: Omit<NewSystemLog, 'id' | 'createdAt'>): Promise<void>;
  getRecentLogs(limit?: number): Promise<SystemLog[]>;
  // ... other methods
}
```

### Health Interfaces (`src/server/interfaces/health.interface.ts`)

```typescript
export interface IHealthRepository {
  getSystemHealth(): Promise<SystemHealth>;
  checkDatabaseConnection(): Promise<boolean>;
  getUptime(): Promise<number>;
  getDatabaseInfo(): Promise<DatabaseInfo | null>;
}

export interface IHealthService {
  ping(requestId: string): Promise<PingResponse>;
  getHealthCheck(requestId: string): Promise<SystemHealth & { requestId: string }>;
  checkReadiness(requestId: string): Promise<ReadinessResponse>;
  checkLiveness(requestId: string): Promise<LivenessResponse>;
}

export interface IHealthController {
  ping(c: Context): Promise<Response>;
  healthCheck(c: Context): Promise<Response>;
  ready(c: Context): Promise<Response>;
  live(c: Context): Promise<Response>;
}
```

## Container Configuration

### Setup (`src/server/container.config.ts`)

```typescript
export function configureContainer(): void {
  // Database layer
  container.registerSingleton(TOKENS.Connection, DatabaseConnection);
  container.registerSingleton(TOKENS.Database, DatabaseRepository);

  // Repository layer
  container.registerSingleton(REPOSITORY_TOKENS.Health, HealthRepository);

  // Service layer
  container.registerSingleton(SERVICE_TOKENS.Health, HealthService);

  // Controller layer
  container.registerSingleton(CONTROLLER_TOKENS.Health, HealthController);
}

export function initializeContainer(): void {
  configureContainer();
}

export function getInstance<T>(token: symbol): T {
  return container.resolve<T>(token);
}
```

### Initialization

```typescript
// In your main application file
import { initializeContainer } from './server/container.config';

// Initialize DI container at startup
initializeContainer();
```

## Implementation Examples

### Repository Implementation

```typescript
@injectable()
export class HealthRepository implements IHealthRepository {
  constructor(
    @inject(REPOSITORY_TOKENS.Database) private databaseRepository: IDatabaseRepository
  ) {}

  async getSystemHealth(): Promise<SystemHealth> {
    // Implementation using injected dependencies
  }
}
```

### Service Implementation

```typescript
@injectable()
export class HealthService implements IHealthService {
  constructor(
    @inject(REPOSITORY_TOKENS.Health) private healthRepository: IHealthRepository
  ) {}

  async ping(requestId: string): Promise<PingResponse> {
    // Business logic using injected repository
  }
}
```

### Controller Implementation

```typescript
@injectable()
export class HealthController implements IHealthController {
  constructor(
    @inject(SERVICE_TOKENS.Health) private healthService: IHealthService
  ) {}

  async ping(c: Context): Promise<Response> {
    const requestId = c.get('requestId') || 'unknown';
    const result = await this.healthService.ping(requestId);
    return sendSuccess(c, result);
  }
}
```

## Testing Benefits

### Easy Mocking

```typescript
describe('HealthService', () => {
  let healthService: HealthService;
  let mockHealthRepository: jest.Mocked<IHealthRepository>;

  beforeEach(() => {
    // Create mock implementation
    mockHealthRepository = {
      getSystemHealth: jest.fn(),
      checkDatabaseConnection: jest.fn(),
      getUptime: jest.fn(),
      getDatabaseInfo: jest.fn(),
    };

    // Register mock in test container
    container.registerInstance(REPOSITORY_TOKENS.Health, mockHealthRepository);
    
    // Resolve service with mocked dependencies
    healthService = container.resolve(HealthService);
  });

  it('should return ping response', async () => {
    const result = await healthService.ping('test-123');
    expect(result.requestId).toBe('test-123');
  });
});
```

### Test Container Setup

```typescript
// test-container.ts
export function setupTestContainer(): void {
  container.clearInstances();
  
  // Register test implementations
  container.registerInstance(TOKENS.Connection, mockDatabaseConnection);
  container.registerInstance(REPOSITORY_TOKENS.Health, mockHealthRepository);
  // ... other test registrations
}
```

## Migration Guide

### From Old System

1. **Replace string tokens with symbols:**
   ```typescript
   // Old
   @inject('HealthService') private service: HealthService
   
   // New
   @inject(SERVICE_TOKENS.Health) private service: IHealthService
   ```

2. **Use interfaces instead of concrete classes:**
   ```typescript
   // Old
   constructor(private repo: HealthRepository) {}
   
   // New
   constructor(
     @inject(REPOSITORY_TOKENS.Health) private repo: IHealthRepository
   ) {}
   ```

3. **Update container registration:**
   ```typescript
   // Old
   container.registerSingleton('HealthService', HealthService);
   
   // New
   container.registerSingleton(SERVICE_TOKENS.Health, HealthService);
   ```

## Best Practices

### 1. Token Organization
- Group tokens by layer (Database, Repository, Service, Controller)
- Use descriptive symbol descriptions
- Export consolidated TOKENS object for convenience

### 2. Interface Design
- Keep interfaces focused and cohesive
- Use generic types where appropriate
- Document interface contracts clearly

### 3. Lifecycle Management
- Use singleton for stateless services
- Use transient for stateful objects
- Let TSyringe manage object lifecycle

### 4. Testing Strategy
- Create mock implementations of interfaces
- Use test-specific container configuration
- Clear container between tests

### 5. Error Handling
- Validate dependencies at container setup
- Provide meaningful error messages
- Use factory functions for complex initialization

## Troubleshooting

### Common Issues

**Token not found:**
```
Error: Token "Symbol(HealthService)" has not been registered
```
**Solution:** Ensure `initializeContainer()` is called before resolving dependencies.

**Circular dependencies:**
```
Error: Circular dependency detected
```
**Solution:** Refactor to remove circular references or use factory patterns.

**Type errors with decorators:**
```
Error: A type referenced in a decorated signature must be imported with 'import type'
```
**Solution:** Use `import type` for interface imports in decorated parameters.

### Debug Mode

Enable container debugging:
```typescript
container.registerSingleton(TOKENS.Connection, DatabaseConnection, {
  lifecycle: Lifecycle.Singleton
});
```

## Performance Considerations

- **Singleton lifecycle** reduces object creation overhead
- **Interface abstractions** have minimal runtime cost
- **Symbol tokens** are more efficient than string comparisons
- **Lazy initialization** only creates objects when needed

## Security Considerations

- **No global state** reduces security risks
- **Interface boundaries** limit access to implementation details
- **Dependency validation** prevents injection of malicious objects
- **Type safety** prevents runtime type errors

This improved dependency injection system provides a solid foundation for scalable, maintainable, and testable code while following industry best practices.