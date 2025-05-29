import type { Nominatim } from '~/lib/type'
import { SearchSchema } from '~/lib/zod-schemas'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'
import sendZodError from '~/utils/send-zod-error'

export default definedAuthenticatedEventHandler(
  defineCachedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, SearchSchema.safeParse)
    if (!result.success) {
      return sendZodError(event, result.error)
    }
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${result.data?.q}&format=json`, {
        signal: AbortSignal.timeout(5000),
        headers: {
          'user-Agent': 'nuxt-location-log | soltanialli.1994@gamil.com',
        },

      })
      if (!response.ok) {
        return sendError(event, createError({
          statusCode: 504,
          statusMessage: 'unable recah search server',
        }))
      }
      const results = await response.json() as Nominatim[]
      return results
    }
    catch {
      return sendError(event, createError({
        statusCode: 504,
        statusMessage: 'unable recah search server',
      }))
    }
  }, {
    maxAge: 60 * 60 * 24,
    name: 'search-nominatim',
    getKey: async (event) => {
      const query = await getQuery(event)
      return query.q?.toString() || ''
    },
  }),
)
