import { z } from 'zod'
import { findLocationLog } from '~/lib/db/queries/location-log-queries'
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
  const id = getRouterParam(event, 'id') as string
  if (!z.coerce.number().safeParse(id).success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage: 'invallidId',
    }))
  }
  const locationLog = await findLocationLog(Number(id), event.context.user.id)

  if (!locationLog) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'location Log not found',
    }))
  }

  return locationLog
})
