import type { sidebarItem } from './sidebar-store'
import type { SelectLocationWithLogs } from '~/lib/db/schema'
import type { mapPoints } from '~/lib/type'
import { CURRENT_LOCATION_PAGES, LOCATION_LOG_PAGES, LOCATION_PAGES } from '~/lib/constants'
import createMapPointFromLocation from '~/utils/mapPoints'

export const useLocationStore = defineStore(('useLocationStore'), () => {
  const route = useRoute()
  const { data: locations, status: locationsStatus, refresh: refreshLocations } = useFetch('/api/locations', {
    lazy: true,
  })
  const locationUrlWithSlug = computed(() => `/api/locations/${route.params?.slug}`)
  const locationLogUrlWithId = computed(() => `/api/locations/${route.params?.slug}/${route.params.id}`)

  const { data: currentLocation, status: currentLocationStatus, error: currentLocationError, refresh: refreshCurrentLocations,
  }
    = useFetch<SelectLocationWithLogs>(locationUrlWithSlug, {
      lazy: true,
      immediate: false,
      watch: false,
    })
  const { data: currentLocationLog, status: currentLocationLogStatus, error: currentLocationLogError, refresh: refreshCurrentLocationsLog,
  }
    = useFetch<SelectLocationWithLogs>(locationLogUrlWithId, {
      lazy: true,
      immediate: false,
      watch: false,
    })

  const sidebarStore = useSidebarStore()
  const mapStore = useMapStore()

  effect(() => {
    if (locations.value && LOCATION_PAGES.has(route.name?.toString() || '')) {
      const mapPoints: mapPoints[] = []
      const sidebarItem: sidebarItem[] = []
      locations.value?.forEach((location) => {
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
      sidebarStore.sidebarItems = sidebarItem
      mapStore.mapPoints = mapPoints
    }
    else if (currentLocation.value && CURRENT_LOCATION_PAGES.has(route.name?.toString() || '')) {
      const mapPoints: mapPoints[] = []
      const sidebarItem: sidebarItem[] = []
      currentLocation.value?.locationLogs.forEach((log) => {
        const mapPoint = createMapPointFromLocationLog(log)
        sidebarItem.push({
          label: log.name,
          icon: 'tabler:map-pin-filled',
          to: { name: 'dashboard-location-slug-id', params: { id: log.id } },
          id: `location-log-${log.id}`,
          mapPoint,
        })
        mapPoints.push(mapPoint)
      })
      sidebarStore.sidebarItems = sidebarItem
      if (mapPoints.length) {
        mapStore.mapPoints = mapPoints
      }
      else {
        mapStore.mapPoints = [currentLocation.value]
      }
    }
    else if (currentLocationLog.value && LOCATION_LOG_PAGES.has(route.name?.toString() || '')) {
      sidebarStore.sidebarItems = []
      mapStore.mapPoints = [currentLocationLog.value]
    }
    sidebarStore.loading = locationsStatus.value === 'pending'
    if (sidebarStore.loading) {
      mapStore.mapPoints = []
    }
  })
  return {
    locations,
    locationsStatus,
    refreshLocations,
    currentLocation,
    currentLocationStatus,
    currentLocationError,
    refreshCurrentLocations,
    currentLocationLog,
    currentLocationLogStatus,
    currentLocationLogError,
    refreshCurrentLocationsLog,
  }
})
