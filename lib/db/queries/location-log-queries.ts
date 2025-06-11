import type { InsertLocationLogType } from '../schema'
import { and, eq } from 'drizzle-orm'
import db from '..'
import { locationLog } from '../schema'

export async function insertLocationLog(
  locationId: number,
  insertable: InsertLocationLogType,
  userId: number,
) {
  const [inserted] = await db.insert(locationLog).values({
    ...insertable,
    locationId,
    userId,
  }).returning()

  return inserted
}

export async function findLocationLog(id: number, userId: number) {
  const foundlog = await db.query.locationLog.findFirst({
    where: and(
      eq(locationLog.id, id),
      eq(locationLog.userId, userId),
    ),
  })
  return foundlog
}
