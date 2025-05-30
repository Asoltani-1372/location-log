<script lang="ts" setup>
import createMapPointFromLocation from '@/utils/mapPoints'

const locationStore = useLocationStore()
const mapStore = useMapStore()
const { locations, locationsStatus } = storeToRefs(locationStore)

onMounted(() => {
  locationStore.refreshLocations()
})
</script>

<template>
  <div class="p-4 min-h-64">
    <h2 class="text-2xl p-2">
      Locations
    </h2>
    <div v-if="locationsStatus === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap gap-4 mt-4">
      <NuxtLink
        v-for="location in locations" :key="location.id"
        :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
        class="card card-compact bg-base-300 w-72 h-40 border-2 shrink-0 overflow-auto mb-4 hover:cursor-pointer"
        :class="{ 'border-accent': isPointSelected(location, mapStore.selectedPoint),
                  'border-transparent': !isPointSelected(location, mapStore.selectedPoint),
        }"
        @mouseenter="mapStore.selectedPoint = createMapPointFromLocation(location)"
        @mouseleave="mapStore.selectedPoint = null"
      >
        <div class="card-body">
          <h1 class="text-xl">
            {{ location.name }}
          </h1>
          <h1>{{ location.description }}</h1>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add Location to get Started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        Add Location
        <Icon name="tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
