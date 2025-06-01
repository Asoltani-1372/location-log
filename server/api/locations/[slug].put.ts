import { findLocationByName, updateLocationBySlug } from '~/lib/db/queries/location-queries'
import { InsertLocation } from '~/lib/db/schema'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'
import sendZodError from '~/utils/send-zod-error'

export default definedAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string
  const result = await readValidatedBody(event, InsertLocation.safeParse)
  if (!result.success) {
    return sendZodError(event, result.error)
  }

  const existingLocation = await findLocationByName(result.data, event.context.user.id)

  if (existingLocation && existingLocation.slug !== slug) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: 'duplicate location',
    }))
  }

  return updateLocationBySlug(result.data, slug, event.context.user.id)
})
