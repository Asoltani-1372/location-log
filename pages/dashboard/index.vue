<script lang="ts" setup>
import type LocationCard from '~/components/location-card.vue'
import createMapPointFromLocation from '~/utils/mapPoints'

const locationStore = useLocationStore()
const { locations, locationsStatus } = storeToRefs(locationStore)

onMounted(() => {
  locationStore.refreshLocations()
})
</script>

<template>
  <div class="page-content-top">
    <h2 class="text-2xl p-2">
      Locations
    </h2>
    <div v-if="locationsStatus === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-else-if="locations && locations.length > 0" class="location-list">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        :map-point="createMapPointFromLocation(location)"
      />
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
