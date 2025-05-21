export const useLocationStore = defineStore(('useLocationStore'), () => {
  const { data, status, refresh } = useFetch('/api/locations', {
    lazy: true,
  })

  const sidebarStore = useSidebarStore()

  watchEffect(() => {
    if (data.value) {
      sidebarStore.loading = false
      sidebarStore.sidebarItems = data.value.map(location => ({
        label: location.name,
        icon: 'tabler:map-pin-filled',
        href: '#',
        id: `location-${location.id}`,
      }),
      )
    }
    sidebarStore.loading = status.value === 'pending'
  })
  return {
    locaitons: data,
    status,
    refresh,
  }
})
