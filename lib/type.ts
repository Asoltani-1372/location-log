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

export interface Nominatim {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  class: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  boundingbox: string[]
}
