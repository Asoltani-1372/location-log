import type { z } from 'zod'
import type { SelectLocationLog } from './location-log'
import { relations } from 'drizzle-orm'
import { int, real, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { user } from './auth'
import { locationLog } from './location-log'

export const location = sqliteTable('location', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  userId: int().notNull().references(() => user.id),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  updatedAt: int().notNull().$default(() => Date.now()),
  createdAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => ({
  uniqueNamePerUser: unique().on(t.name, t.userId),
}))

export const locationRelations = relations(location, ({ many }) => ({
  locationLogs: many(locationLog),
}))

export const InsertLocation = createInsertSchema(location, {
  name: field => field.min(1).max(100),
  description: field => field.max(1000),
  lat: field => field.min(-90).max(90),
  long: field => field.min(-180).max(180),
}).omit({
  id: true,
  slug: true,
  userId: true,
  updatedAt: true,
  createdAt: true,
})

export type InsertLocationType = z.infer<typeof InsertLocation>
export type SelectLocation = typeof location.$inferSelect
export type SelectLocationWithLog = SelectLocation & { locationLogs: SelectLocationLog[] }
