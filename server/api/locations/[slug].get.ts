import { findLocationBySlugAndID } from '~/lib/db/queries/location-queries'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'

export default definedAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string
  const location = await findLocationBySlugAndID(slug, event.context.user.id)
  if (!location) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'location not found',
    }))
  }
  return location
})
