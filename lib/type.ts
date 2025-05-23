import type { UserWithId } from './auth'

declare module 'h3' {
  interface h3EventContext {
    user?: UserWithId
  }
}

export interface LatLongItem {
  lat: number
  long: number
}

export type mapPoints = {
  name: string
  id: number
  description: string | null
} & LatLongItem
