import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './lib/db/schema/index.ts',
  out: './lib/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './lib/db/sqlite.db',
  },
} satisfies Config
