import { findLocation } from '~/lib/db/queries/location-queries'
import definedAuthenticatedEventHandler from '~/utils/defined-authenticated-event-handler'

export default definedAuthenticatedEventHandler(async (event) => {
  return findLocation(event.context.user.id)
})
