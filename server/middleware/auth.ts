import type { UserWithId } from '~/lib/auth'
import { auth } from '~/lib/auth'
import { getOwnerUser } from '~/lib/db/queries/user-queries'

// This app is single-user: there's no login screen anymore. If a real
// better-auth session happens to exist we honor it, otherwise every
// request acts as the one owner account so the app just works.
export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })
  event.context.user = (session?.user as unknown as UserWithId) || await getOwnerUser()
})
