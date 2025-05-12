import process from 'node:process'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const sqlite = new Database('./lib/db/sqlite.db')
const db = drizzle(sqlite, { schema })

// Ensure the database is properly closed when the application shuts down
process.on('exit', () => {
  sqlite.close()
})

export default db
