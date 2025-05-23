import type { LngLatBounds } from 'maplibre-gl'
import type { mapPoints } from '~/lib/type'

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<mapPoints[]>([])
  const selectedPoint = ref<mapPoints | null>(null)
  const shouldFlyto = ref(true)
  function selectPointWithoutFlyTo(point: mapPoints | null) {
    shouldFlyto.value = false
    selectedPoint.value = point
  }
  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl')
    const { LngLatBounds } = await import('maplibre-gl')
    let bounds: LngLatBounds | null = null
    const myMap = useMap()
    effect(() => {
      const firstPoint = mapPoints.value[0]
      if (!firstPoint)
        return

      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat])
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ))

      myMap.map?.fitBounds(bounds, {
        padding: 60,
      })
    })
    effect(() => {
      if (selectedPoint.value) {
        if (shouldFlyto.value) {
          myMap.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            speed: 1,
          })
        }
        shouldFlyto.value = true
      }
      else if (bounds) {
        myMap.map?.fitBounds(bounds, {
          padding: 60,
        })
      }
    })
  }
  return {
    init,
    mapPoints,
    selectedPoint,
    selectPointWithoutFlyTo,
  }
})
