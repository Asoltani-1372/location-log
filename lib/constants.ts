import type { LngLatLike } from 'maplibre-gl'

export const CENTER_MAP = [51.2400, 36.4300] as LngLatLike

export const LOCATION_PAGES = new Set([
  'dashboard',
  'dashboard/add',
])
export const CURRENT_LOCATION_PAGES = new Set([
  'dashboard-location-slug',
  'dashboard-location-slug-add',
  'dashboard-location-slug-edit',
])
