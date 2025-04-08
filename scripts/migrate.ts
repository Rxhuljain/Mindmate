import { createClient } from "@libsql/client"

async function migrate() {
  console.log("Starting database migration...")

  try {
    // Check environment variables
    if (!process.env.TURSO_DATABASE_URL) {
      throw new Error("TURSO_DATABASE_URL environment variable is not set")
    }

    if (!process.env.TURSO_AUTH_TOKEN) {
      throw new Error("TURSO_AUTH_TOKEN environment variable is not set")
    }

    console.log("Connecting to database...")
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    // Test connection
    console.log("Testing connection...")
    const testResult = await client.execute("SELECT 1 as test")
    console.log("Connection successful:", testResult)

    console.log("Creating tables...")

    // Create emergency_contacts table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS emergency_contacts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        relationship TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)
    console.log("Created emergency_contacts table")

    // Create messages table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        content TEXT NOT NULL,
        role TEXT NOT NULL,
        sentiment_score REAL,
        crisis_detected INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)
    console.log("Created messages table")

    // Create journal_entries table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        mood TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)
    console.log("Created journal_entries table")

    console.log("Migration completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  }
}

// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" })

migrate()

