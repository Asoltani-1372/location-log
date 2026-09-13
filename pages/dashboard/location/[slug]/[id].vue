<script lang="ts" setup>
const route = useRoute()
const locationStore = useLocationStore()
const { currentLocationLog: locationLog, currentLocationLogStatus: locationnLogStatus, currentLocationLogError: locationnLogError,
} = storeToRefs(locationStore)

const loading = computed(() => {
  return locationnLogStatus.value === 'pending'
})
const errorMessage = computed(() => {
  return locationnLogError.value?.statusMessage
})
const photos = useLogPhotos(() => locationLog.value?.id)

onMounted(() => {
  locationStore.refreshCurrentLocationsLog()
})
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="loading">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-if="locationnLogError && !loading" class="alert alert-error">
      <h2 class="text-lg">
        {{ errorMessage }}
      </h2>
    </div>
    <div v-if="route.name === 'dashboard-location-slug-id' && locationLog && !loading">
      <span v-if="locationLog?.startedAt !== locationLog.endedAt">
        <p class="text-sm italic text-gray-500">{{ formatDate(locationLog.startedAt) }} / {{ formatDate(locationLog.endedAt) }}</p>
      </span>
      <span v-else>
        <p class="text-sm italic text-gray-500">{{ formatDate(locationLog.startedAt) }}</p>
      </span>
      <div class="flex ">
        <h2>{{ locationLog?.name }}</h2>
      </div>
      <p class="text-sm">
        {{ locationLog?.description }}
      </p>
      <AppLocationGallery v-if="photos.length" :photos="photos" class="mt-4" />
    </div>
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>
