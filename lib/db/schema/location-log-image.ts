import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { locationLog } from './location-log'

export const locationLogImage = sqliteTable('locationLogImage', {
  id: int().notNull().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  locationLogId: int().notNull().references(() => locationLog.id),
  updatedAt: int().notNull().$default(() => Date.now()),
  createdAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})
