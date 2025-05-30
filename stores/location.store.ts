import type { sidebarItem } from './sidebar-store'
import type { mapPoints } from '~/lib/type'
import createMapPointFromLocation from '~/utils/mapPoints'

export const useLocationStore = defineStore(('useLocationStore'), () => {
  const { data, status, refresh } = useFetch('/api/locations', {
    lazy: true,
  })

  const sidebarStore = useSidebarStore()
  const mapStore = useMapStore()

  effect(() => {
    const mapPoints: mapPoints[] = []
    const sidebarItem: sidebarItem[] = []
    data.value?.forEach((location) => {
      const mapPoint = createMapPointFromLocation(location)
      sidebarItem.push({
        label: location.name,
        icon: 'tabler:map-pin-filled',
        to: { name: 'dashboard-location-slug', params: { slug: location.slug } },
        id: `location-${location.id}`,
        mapPoint,
      })
      mapPoints.push(mapPoint)
    })
    if (data.value) {
      sidebarStore.loading = false
      sidebarStore.sidebarItems = sidebarItem
      mapStore.mapPoints = mapPoints
    }
    sidebarStore.loading = status.value === 'pending'
  })
  return {
    locaitons: data,
    status,
    refresh,
  }
})
