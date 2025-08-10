import 'reflect-metadata';
import { container } from 'tsyringe';
import { DatabaseConnection } from './database/connection';
import { DatabaseRepository } from './repositories/database.repository';
import { HealthRepository } from './repositories/health.repository';
import { HealthService } from './services/health.service';

// Register database connection
container.registerSingleton('DatabaseConnection', DatabaseConnection);

// Register repositories
container.registerSingleton('DatabaseRepository', DatabaseRepository);
container.registerSingleton('HealthRepository', HealthRepository);

// Register services
container.registerSingleton('HealthService', HealthService);

export { container };
