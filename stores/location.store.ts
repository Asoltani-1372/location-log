export const useLocationStore = defineStore(('useLocationStore'), () => {
  const { data, status, refresh } = useFetch('/api/locations', {
    lazy: true,
  })

  const sidebarStore = useSidebarStore()
  const mapStore = useMapStore()

  effect(() => {
    if (data.value) {
      sidebarStore.loading = false
      sidebarStore.sidebarItems = data.value.map(location => ({
        label: location.name,
        icon: 'tabler:map-pin-filled',
        href: '#',
        id: `location-${location.id}`,
      }),
      )
      mapStore.mapPoints = data.value.map(item => ({
        label: item.name,
        id: item.id,
        lat: item.lat,
        long: item.long,
      }))
    }
    sidebarStore.loading = status.value === 'pending'
  })
  return {
    locaitons: data,
    status,
    refresh,
  }
})
