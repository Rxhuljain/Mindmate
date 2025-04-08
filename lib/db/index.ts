import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "./schema"

// Create a Turso client
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

// Create a Drizzle ORM instance
export const db = drizzle(client, { schema })

// Export a function to execute raw SQL (useful for testing)
export async function executeQuery(sql: string, params: any[] = []) {
  try {
    return await client.execute(sql, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

