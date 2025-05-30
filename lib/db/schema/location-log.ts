import { relations } from 'drizzle-orm'
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'
import { location } from './location'

export const locationLog = sqliteTable('locationLog', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  endedAt: int().notNull(),
  startedAt: int().notNull(),
  userId: int().notNull().references(() => user.id),
  lat: real().notNull(),
  long: real().notNull(),
  locationId: int().notNull().references(() => location.id),
  updatedAt: int().notNull().$default(() => Date.now()),
  createdAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
})

export const locationLogRelations = relations(locationLog, ({ one }) => ({
  location: one(location, {
    fields: [locationLog.locationId],
    references: [location.id],
  }),
}))

export type SelectLocationLog = typeof locationLog.$inferSelect
