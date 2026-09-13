import type { UserWithId } from '~/lib/auth'
import db from '..'
import { user } from '../schema'

let ownerCache: UserWithId | null = null

export async function getOwnerUser(): Promise<UserWithId> {
  if (ownerCache) {
    return ownerCache
  }

  const existing = await db.query.user.findFirst({
    orderBy(fields, operators) {
      return operators.asc(fields.id)
    },
  })
  if (existing) {
    ownerCache = existing as unknown as UserWithId
    return ownerCache
  }

  const now = new Date()
  const [created] = await db.insert(user).values({
    name: 'Owner',
    email: 'owner@local',
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  }).returning()

  ownerCache = created as unknown as UserWithId
  return ownerCache
}
