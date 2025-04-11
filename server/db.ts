import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../shared/schema';

const { Client } = pg;

// Initialize PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database with retry logic
async function connectToDatabase(retries = 5, delay = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await client.connect();
      console.log("Connected to PostgreSQL database");
      
      // Handle unexpected disconnections
      client.on('error', async (err) => {
        console.error('Database connection error:', err);
        if (!client.closed) {
          console.log('Attempting to reconnect...');
          await connectToDatabase();
        }
      });
      
      return;
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        console.error("Max retries reached, could not connect to database");
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Initialize connection
connectToDatabase().catch(err => {
  console.error("Fatal database error:", err);
  process.exit(1);
});

// Create drizzle instance with our schema
export const db = drizzle(client, { schema });

// Export client for potential direct use
export { client };