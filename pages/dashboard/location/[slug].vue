<script lang="ts" setup>
const locationStore = useLocationStore()
const { currentLocation, currentLocationStatus, currentLocationError } = storeToRefs(locationStore)

onMounted(() => {
  locationStore.refreshCurrentLocations()
})
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="currentLocationStatus === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-if="currentLocation && currentLocationStatus !== 'pending'">
      <h2>{{ currentLocation?.name }}</h2>
      <p class="text-sm">
        {{ currentLocation?.description }}
      </p>
      <div v-if="!currentLocation.locationLogs.length" class="text-larg mt-4">
        <p class="text-sm">
          add a location Log to get Started
        </p>
        <button class="btn btn-primary mt-2">
          add Location Log
          <Icon name="tabler:map-pin-plus" size="24" />
        </button>
      </div>
    </div>

    <div v-if="currentLocationError && currentLocationStatus !== 'pending'" class="alert alert-error">
      <h2 class="text-lg">
        {{ currentLocationError.statusMessage }}
      </h2>
    </div>
  </div>
</template>
