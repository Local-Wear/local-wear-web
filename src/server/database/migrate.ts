import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const getDatabaseUrl = (): string => {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    return databaseUrl;
  }

  // Construct URL from individual environment variables
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const database = process.env.DB_NAME || 'local_wear';
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const ssl = process.env.DB_SSL === 'true' ? '?sslmode=require' : '';

  return `postgresql://${username}:${password}@${host}:${port}/${database}${ssl}`;
};

async function runMigrations() {
  const databaseUrl = getDatabaseUrl();
  
  console.log('🔄 Running database migrations...');
  console.log(`📍 Database URL: ${databaseUrl.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@')}`);
  
  try {
    // Create postgres client for migrations
    const migrationClient = postgres(databaseUrl, { max: 1 });
    const db = drizzle(migrationClient);
    
    // Run migrations
    const migrationsFolder = path.join(__dirname, 'migrations');
    await migrate(db, { migrationsFolder });
    
    console.log('✅ Migrations completed successfully!');
    
    // Close the connection
    await migrationClient.end();
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('🎉 Database setup complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error);
      process.exit(1);
    });
}

export { runMigrations };