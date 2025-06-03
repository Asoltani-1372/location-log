import { removeLocationBySlug } from '~/lib/db/queries/location-queries'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'

export default definedAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string
  const deleted = await removeLocationBySlug(slug, event.context.user.id)

  if (!deleted) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'this location not found to delete',
    }))
  }
  setResponseStatus(event, 204)
})
