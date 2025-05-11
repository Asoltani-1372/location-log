import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { location } from './location'

export const locationLog = sqliteTable('locationLog', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  ended_at: int().notNull(),
  started_at: int().notNull(),
  lat: real().notNull(),
  long: real().notNull(),
  location_id: int().notNull().references(() => location.id),
  updated_at: int().notNull().$default(() => Date.now()),
  created_at: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})
