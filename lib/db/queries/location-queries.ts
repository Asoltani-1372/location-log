import type { InsertLocationType } from '../schema'
import { and, eq } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'
import db from '..'
import { location } from '../schema'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstwxyz', 5)

export async function findLocationByName(existing: InsertLocationType, userId: number) {
  return await db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  })
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  })
}
export async function findLocationBySlugAndID(slug: string, userId: number) {
  return await db.query.location.findFirst({
    where: and(
      eq(location.slug, slug),
      eq(location.userId, userId),
    ),
    with: {
      locationLogs: true,
    },
  })
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug))

  while (existing) {
    const id = nanoid()
    const idSlug = `${slug}-${id}`
    existing = !!(await findLocationBySlug(idSlug))
    if (!existing) {
      return idSlug
    }
  }
  return slug
}
export async function insertLocatioQuery(insertable: InsertLocationType, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning()
  return created
}

export async function findLocation(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  },
  )
}
export async function updateLocationBySlug(updates: InsertLocationType, slug: string, userId: number) {
  const [updated] = await db.update(location).set(updates).where(
    and(
      eq(location.slug, slug),
      eq(location.userId, userId),
    ),
  ).returning()
  return updated
}
