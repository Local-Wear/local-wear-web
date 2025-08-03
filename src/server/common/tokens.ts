/**
 * Dependency injection tokens
 * Using symbols for type-safe, refactor-friendly dependency injection
 */

// Database tokens
export const DATABASE_TOKENS = {
  Connection: Symbol('DatabaseConnection'),
  Repository: Symbol('DatabaseRepository'),
} as const;

// Repository tokens
export const REPOSITORY_TOKENS = {
  Health: Symbol('HealthRepository'),
  Database: DATABASE_TOKENS.Repository,
} as const;

// Service tokens
export const SERVICE_TOKENS = {
  Health: Symbol('HealthService'),
} as const;

// Controller tokens
export const CONTROLLER_TOKENS = {
  Health: Symbol('HealthController'),
} as const;

// Consolidated tokens for easy import
export const TOKENS = {
  ...DATABASE_TOKENS,
  ...REPOSITORY_TOKENS,
  ...SERVICE_TOKENS,
  ...CONTROLLER_TOKENS,
} as const;

// Type helpers for better IntelliSense
export type TokenType = typeof TOKENS[keyof typeof TOKENS];