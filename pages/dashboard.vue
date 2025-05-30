<script lang="ts" setup>
const route = useRoute()
const isSidebarOpen = ref(true)
const sidebarStore = useSidebarStore()
const mapStore = useMapStore()
const locationStore = useLocationStore()

function toogleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString())
  if (route.path !== '/dashboard') {
    locationStore.refresh()
  }
}
onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true'
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
        <SiderbarBtn :show-label="isSidebarOpen" icon="tabler:map" label="location" href="/dashboard/" />
        <SiderbarBtn :show-label="isSidebarOpen" icon="tabler:circle-plus-filled" label="Add Locations" href="/dashboard/add/" />
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
      <div class="flex size-full bg-base-200" :class="{ 'flex-col': route.path !== '/dashboard/add/' }">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
