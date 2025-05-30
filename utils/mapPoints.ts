import type { SelectLocation } from '~/lib/db/schema/location'
import type { mapPoints } from '~/lib/type'

export default function createMapPointFromLocation(location: SelectLocation): mapPoints {
  return {
    ...location,
    to: { name: 'dashboard-location-slug', params: { slug: location.slug } },
    toLabel: 'View',
  }
}

export function isPointSelected(item: Pick<mapPoints, 'id' | 'lat' | 'long'> | null | undefined, selectedPoint: mapPoints | null | undefined) {
  if (!item || !selectedPoint) {
    return false
  }
  return item.id === selectedPoint.id
    && item.lat === selectedPoint.lat
    && item.long === selectedPoint.long
}
