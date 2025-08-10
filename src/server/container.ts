import 'reflect-metadata';
import { container } from 'tsyringe';
import { HealthController } from './controllers/health.controller';
import { DatabaseConnection } from './database/connection';
import { DatabaseRepository } from './repositories/database.repository';
import { HealthRepository } from './repositories/health.repository';
import { HealthService } from './services/health.service';

// Register database connection
container.registerSingleton(DatabaseConnection);

// Register repositories
container.registerSingleton(DatabaseRepository);
container.registerSingleton(HealthRepository);

// Register services
container.registerSingleton(HealthService);
container.registerSingleton(HealthController);

export { container };
