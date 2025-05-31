<script lang="ts" setup>
import { CURRENT_LOCATION_PAGES, LOCATION_PAGES } from '~/lib/constants'

const route = useRoute()
const isSidebarOpen = ref(true)
const sidebarStore = useSidebarStore()
const mapStore = useMapStore()
const locationStore = useLocationStore()
const { currentLocation } = storeToRefs(locationStore)
function toogleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString())
  if (route.path !== '/dashboard') {
    locationStore.refreshLocations()
  }
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
      {
        id: 'link-location-edit',
        label: 'Edit Location',
        to: {
          name: 'dashboard-location-slug-edit',
          params: {
            slug: currentLocation.value?.slug,
          },
        },
        icon: 'tabler:map-pin-cog',
      },
      {
        id: 'link-dashboard',
        label: (currentLocation.value && String(currentLocation.value?.name)) || 'view Logs',
        to: {
          name: 'dashboard-location-slug',
          params: {
            slug: currentLocation.value?.slug,
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
            slug: currentLocation.value?.slug,
          },
        },
        icon: 'tabler:circle-plus-filled',
      },
    ]
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
    <div class="flex-1 ">
      <div class="flex size-full bg-base-200" :class="{ 'flex-col': route.path !== '/dashboard/add' }">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
