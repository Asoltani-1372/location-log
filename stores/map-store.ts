import type { mapPoints } from '~/lib/type'

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<mapPoints[]>([])
  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl')
    const { LngLatBounds } = await import('maplibre-gl')
    const myMap = useMap()
    effect(() => {
      const firstPoint = mapPoints.value[0]
      if (!firstPoint)
        return

      const bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat])
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ))

      myMap.map?.fitBounds(bounds, {
        padding: 60,
      })
    })
  }

  return {
    init,
    mapPoints,
  }
})
