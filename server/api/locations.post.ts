import type { DrizzleError } from 'drizzle-orm'
import slugify from 'slug'
import { findLocationByName, findUniqueSlug, insertLocatioQuery } from '~/lib/db/queries/location-queries'
import { InsertLocation } from '~/lib/db/schema'

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'unauthorized',
    }))
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse)
  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join('')} : ${issue.message}`).join('; ')
    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join('')] = issue.message
      return errors
    }, {} as Record<string, string>)

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }))
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
