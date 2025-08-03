import 'reflect-metadata';
import { container } from 'tsyringe';
import { TOKENS, REPOSITORY_TOKENS, SERVICE_TOKENS, CONTROLLER_TOKENS } from './common/tokens';

// Import concrete implementations
import { DatabaseConnection } from './database/connection';
import { DatabaseRepository } from './repositories/database.repository';
import { HealthRepository } from './repositories/health.repository';
import { HealthService } from './services/health.service';
import { HealthController } from './controllers/health.controller';

/**
 * Configure dependency injection container
 * Uses symbol-based tokens for type safety and better refactoring support
 */
export function configureContainer(): void {
  // Database layer - using singleton lifecycle
  container.registerSingleton(TOKENS.Connection, DatabaseConnection);
  container.registerSingleton(TOKENS.Database, DatabaseRepository);

  // Repository layer - using singleton lifecycle for data access
  container.registerSingleton(REPOSITORY_TOKENS.Health, HealthRepository);

  // Service layer - using singleton lifecycle for business logic
  container.registerSingleton(SERVICE_TOKENS.Health, HealthService);

  // Controller layer - using singleton lifecycle for request handling
  container.registerSingleton(CONTROLLER_TOKENS.Health, HealthController);
}

/**
 * Initialize the dependency injection container
 * Call this once at application startup
 */
export function initializeContainer(): void {
  configureContainer();
}

/**
 * Get a typed instance from the container
 * Provides better type safety than direct container.resolve calls
 */
export function getInstance<T>(token: symbol): T {
  return container.resolve<T>(token);
}

/**
 * Clear all registrations (useful for testing)
 */
export function clearContainer(): void {
  container.clearInstances();
}

export { container };