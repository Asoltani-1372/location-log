import type { UserWithId } from './auth'

declare module 'h3' {
  interface h3EventContext {
    user?: UserWithId
  }
}
