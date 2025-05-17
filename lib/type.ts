import type { User } from 'better-auth'

declare module 'h3' {

  interface h3EventContext {
    user: Omit<User, 'id'> & {
      id: number
    }
  }
}
