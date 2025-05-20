import type { H3Event, h3EventContext } from 'h3'
import type { UserWithId } from '~/lib/auth'

type AuthenticatedEvent = H3Event & {
  context: h3EventContext & {
    user: UserWithId
  }
}

export default function definedAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'unauthorized',
      }))
    }
    return handler(event as AuthenticatedEvent)
  })
}
