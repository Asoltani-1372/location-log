import type { LngLatBounds } from 'maplibre-gl'
import type { mapPoints } from '~/lib/type'
import { CENTER_MAP } from '~/lib/constants'

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<mapPoints[]>([])
  const selectedPoint = ref<mapPoints | null>(null)
  const addedPoint = ref<mapPoints & { center_map?: boolean, zoom?: number } | null>(null)
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
      if (!firstPoint) {
        myMap.map?.flyTo({
          center: CENTER_MAP,
          zoom: 2,
        })
      }

      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat])
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ))

      myMap.map?.fitBounds(bounds, {
        padding: 60,
        maxZoom: 10,
      })
    })
    effect(() => {
      if (addedPoint.value) {
        return
      }
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
          maxZoom: 10,
        })
      }
    })

    watch(addedPoint, (nv, ov) => {
      if ((nv && !ov) || nv?.center_map) {
        myMap.map?.flyTo({
          center: [nv.long, nv.lat],
          speed: 1,
          zoom: nv.zoom || 6,
        })
      }
    }, {
      immediate: true,
    })
  }
  return {
    init,
    mapPoints,
    selectedPoint,
    selectPointWithoutFlyTo,
    addedPoint,
  }
})
