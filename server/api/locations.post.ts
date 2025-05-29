import type { DrizzleError } from 'drizzle-orm'
import slugify from 'slug'
import { findLocationByName, findUniqueSlug, insertLocatioQuery } from '~/lib/db/queries/location-queries'
import { InsertLocation } from '~/lib/db/schema'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'
import sendZodError from '~/utils/send-zod-error'

export default definedAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertLocation.safeParse)
  if (!result.success) {
    return sendZodError(event, result.error)
  }

  const existingLocation = await findLocationByName(result.data, event.context.user.id)

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: 'duplicate location',
    }))
  }

  const slug = await findUniqueSlug(slugify(result.data.name)) || ''
  try {
    return insertLocatioQuery(result.data, slug, event.context.user.id)
  }
  catch (e) {
    const error = e as DrizzleError
    if (error.message === 'UNIQUE constraint failed: location.slug') {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'duplicated id or slug try new location',
      }))
    }
    throw e
  }
})
