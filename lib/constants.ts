import type { LngLatLike } from 'maplibre-gl'

export const CENTER_MAP = [51.2400, 36.4300] as LngLatLike

export const LOCATION_PAGES = new Set([
  'dashboard',
  'dashboard-add',
])
export const CURRENT_LOCATION_PAGES = new Set([
  'dashboard-location-slug',
  'dashboard-location-slug-add',
  'dashboard-location-slug-edit',
])
export const EDIT_PAGE = new Set([
  'dashboard-add',
  'dashboard-location-slug-add',
  'dashboard-location-slug-edit',
])
export const LOCATION_LOG_PAGES = new Set([
  'dashboard-location-slug-id',
  'dashboard-location-slug-id-edit',
  'dashboard-location-slug-id-add',
])
