import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './db';

// This will run migrations on the database
// It will create all the necessary tables and columns
// Based on the schema definition
async function runMigrations() {
  console.log("Running migrations...");
  
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

// Run migrations
runMigrations();