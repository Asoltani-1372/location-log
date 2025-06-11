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
      <!-- <span v-if="locationLog?.startedAt !== locationLog.endedAt">
              <p class="text-sm italic text-gray-500">{{ formatDate(locationLog.startedAt) }} / {{ formatDate(locationLog.endedAt) }}</p>
            </span>
            <span v-else>
              <p class="text-sm italic text-gray-500">{{ formatDate(locationLog.startedAt) }}</p>
            </span> -->
      <div class="flex ">
        <h2>{{ locationLog?.name }}</h2>
        <!-- <div class="dropdown dropdown-bottom">
          <div tabindex="0" role="button" class="btn btn-sm mb-2 p-0">
            <Icon size="20" name="tabler:dots-vertical" />
          </div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <NuxtLink @click="openDiolog">
                <Icon name="tabler:trash-x-filled" size="20" />
                Delete
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ name: 'dashboard-location-slug-edit', params: { slug: route.params.slug } }">
                <Icon name="tabler:map-pin-cog" size="20" />Edit
              </NuxtLink>
            </li>
          </ul>
        </div> -->
      </div>
      <p class="text-sm">
        {{ locationLog?.description }}
      </p>
    </div>
  </div>
</template>
