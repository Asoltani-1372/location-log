import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'
import { locationLog } from './location-log'

export const locationLogImage = sqliteTable('locationLogImage', {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  user_id: int().notNull().references(() => user.id),
  location_log_id: int().notNull().references(() => locationLog.id),
  updated_at: int().notNull().$default(() => Date.now()),
  created_at: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})
