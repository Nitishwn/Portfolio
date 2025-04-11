import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../shared/schema';

const { Client } = pg;

// Initialize PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
    throw error;
  }
}

// Initialize connection
connectToDatabase();

// Create drizzle instance with our schema
export const db = drizzle(client, { schema });

// Export client for potential direct use
export { client };