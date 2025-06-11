<script lang="ts" setup>
import { CURRENT_LOCATION_PAGES, EDIT_PAGE, LOCATION_LOG_PAGES, LOCATION_PAGES } from '~/lib/constants'

const route = useRoute()

const isSidebarOpen = ref(true)
const sidebarStore = useSidebarStore()
const mapStore = useMapStore()
const locationStore = useLocationStore()
const { currentLocation, currentLocationStatus } = storeToRefs(locationStore)
function toogleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString())
  if (route.path !== '/dashboard') {
    locationStore.refreshLocations()
  }
}
if (LOCATION_PAGES.has(route.name?.toString() || '')) {
  await locationStore.refreshLocations()
}
if (CURRENT_LOCATION_PAGES.has(route.name?.toString() || '')) {
  await locationStore.refreshCurrentLocations()
}
if (LOCATION_LOG_PAGES.has(route.name?.toString() || '')) {
  await locationStore.refreshCurrentLocationsLog()
}
onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true'
},
)

effect(() => {
  if (LOCATION_PAGES.has(route.name?.toString() || '')) {
    sidebarStore.sidebarTopItems = [
      {
        id: 'link-dashboard',
        label: 'location',
        href: '/dashboard',
        icon: 'tabler:map',
      },
      {
        id: 'link-dashboard-add',
        label: 'Add Location',
        href: '/dashboard/add',
        icon: 'tabler:circle-plus-filled',
      },
    ]
  }
  else if (CURRENT_LOCATION_PAGES.has(route.name?.toString() || '')) {
    sidebarStore.sidebarTopItems = [
      {
        id: 'link-dashboard',
        label: 'back To location',
        href: '/dashboard',
        icon: 'tabler:arrow-left',
      },

    ]
    if (currentLocation.value && currentLocationStatus.value !== 'pending') {
      sidebarStore.sidebarTopItems.push(
        {
          id: 'link-location-edit',
          label: 'Edit Location',
          to: {
            name: 'dashboard-location-slug-edit',
            params: {
              slug: route.params?.slug,
            },
          },
          icon: 'tabler:map-pin-cog',
        },
        {
          id: 'link-dashboard',
          label: (!currentLocationStatus.value ? 'Loading...' : currentLocation.value && String(currentLocation.value?.name)) || '',
          to: {
            name: 'dashboard-location-slug',
            params: {
              slug: route.params?.slug,
            },
          },
          icon: 'tabler:map',
        },
        {
          id: 'link-location-add',
          label: 'Add Location Log',
          to: {
            name: 'dashboard-location-slug-add',
            params: {
              slug: route.params?.slug,
            },
          },
          icon: 'tabler:circle-plus-filled',
        },
      )
    }
    else if (LOCATION_LOG_PAGES.has(route.name?.toString() || '')) {
      if (currentLocation.value && currentLocationStatus.value !== 'pending') {
        sidebarStore.sidebarTopItems = sidebarStore.sidebarTopItems = [{
          id: 'link-location',
          label: `Back to "${currentLocation.value.name}"`,
          to: {
            name: 'dashboard-location-slug',
            params: {
              slug: route.params.slug,
            },
          },
          icon: 'tabler:arrow-left',
        }, {
          id: 'link-view-location-log',
          label: 'View Log',
          to: {
            name: 'dashboard-location-slug-id',
            params: {
              slug: route.params.slug,
              id: route.params.id,
            },
          },
          icon: 'tabler:map-pin',
        }, {
          id: 'link-edit-location-log',
          label: 'Edit Log',
          to: {
            name: 'dashboard-location-slug-id-edit',
            params: {
              slug: route.params.slug,
              id: route.params.id,
            },
          },
          icon: 'tabler:map-pin-cog',
        }, {
          id: 'link-location-log-images',
          label: 'Manage Images',
          to: {
            name: 'dashboard-location-slug-id-images',
            params: {
              slug: route.params.slug,
              id: route.params.id,
            },
          },
          icon: 'tabler:photo-cog',
        }]
      }
    }
  }
})
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div class="flex hover:cursor-poiner hover:bg-base-200 p-2" :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }" @click="toogleSidebar">
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-else name="tabler:chevron-right" size="32" />
      </div>
      <div class="flex flex-col ">
        <div v-if="route.path.startsWith('/dashboard/location') && currentLocationStatus === 'pending'" class="flex items-center justify-center">
          <div class="loading" />
        </div>
        <SiderbarBtn
          v-for="item in sidebarStore.sidebarTopItems"
          :key="item.id"
          :show-label="isSidebarOpen"
          :label="item.label"
          :icon="item.icon"
          :href="item.href"
          :to="item.to"
        />

        <div v-if="sidebarStore.sidebarItems.length" class="divider" />

        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-8 w-full" />
        </div>
        <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
          <SiderbarBtn
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :label="item.label"
            :icon="item.icon"
            :to="item.to"
            :show-label="isSidebarOpen"
            :icon-coler="isPointSelected(mapStore.selectedPoint, item.mapPoint) ? 'text-accent' : undefined"
            @mouseenter="mapStore.selectedPoint = item.mapPoint ?? null"
            @mouseleave="mapStore.selectedPoint = null"
          />
        </div>

        <div class="divider" />
        <SiderbarBtn :show-label="isSidebarOpen" icon="tabler:logout-2" label="Sign Out" href="/sign-out/" />
      </div>
    </div>
    <div class="flex-1 overflow-auto bg-base-200">
      <div class="flex size-full" :class="{ 'flex-col': !EDIT_PAGE.has(route.name?.toString() || '') }">
        <NuxtPage
          :class="{
            'shrink-0': EDIT_PAGE.has(route.name?.toString() || ''),
            'w-96': EDIT_PAGE.has(route.name?.toString() || ''),
          }"
        />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
