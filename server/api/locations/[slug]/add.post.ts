import { insertLocationLog } from '~/lib/db/queries/location-log-queries'
import { findLocationBySlugAndID } from '~/lib/db/queries/location-queries'
import { InsertLocationLog } from '~/lib/db/schema'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'
import sendZodError from '~/utils/send-zod-error'

export default definedAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string
  const location = await findLocationBySlugAndID(slug, event.context.user.id)
  if (!location) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Location not found.',
    })
  }

  const result = await readValidatedBody(event, InsertLocationLog.safeParse)

  if (!result.success) {
    return sendZodError(event, result.error)
  }

  return insertLocationLog(location.id, result.data, event.context.user.id)
})
