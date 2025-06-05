<script lang="ts" setup>
import type { FetchError } from 'ofetch'

const route = useRoute()
const locationStore = useLocationStore()
const { currentLocation, currentLocationStatus, currentLocationError } = storeToRefs(locationStore)
const isOpen = ref(false)
const deleteError = ref('')
const isDelteting = ref(false)

function openDiolog() {
  isOpen.value = true;
  (document.activeElement as HTMLAnchorElement).blur()
}

const loading = computed(() => {
  return currentLocationStatus.value === 'pending' || isDelteting.value === true
})
const errorMessage = computed(() => {
  return currentLocationError.value?.statusMessage || deleteError.value
})

async function confirmDelete() {
  try {
    deleteError.value = ''
    isDelteting.value = true
    isOpen.value = false
    await $fetch(`/api/locations/${route.params.slug}`, {
      method: 'DELETE',

    })
    navigateTo('/dashboard')
  }
  catch (e) {
    const error = e as FetchError
    deleteError.value = getFetchErrorMessage(error)
  }
  isDelteting.value = false
}

onMounted(() => {
  locationStore.refreshCurrentLocations()
})

onBeforeRouteUpdate((to) => {
  if (to.name === 'dashboard-location-slug') {
    locationStore.refreshCurrentLocations()
  }
})
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="loading">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-if="currentLocationError && !loading" class="alert alert-error">
      <h2 class="text-lg">
        {{ errorMessage }}
      </h2>
    </div>
    <div v-if="route.name === 'dashboard-location-slug' && currentLocation && !loading">
      <div class="flex ">
        <h2>{{ currentLocation?.name }}</h2>
        <div class="dropdown dropdown-bottom">
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
        </div>
      </div>

      <p class="text-sm">
        {{ currentLocation?.description }}
      </p>
      <div v-if="!currentLocation.locationLogs.length" class="text-larg mt-4">
        <p class="text-sm">
          add a location Log to get Started
        </p>
        <NuxtLink
          :to="{ name: 'dashboard-location-slug-add', params: { slug: route.params.slug } }"
          class="btn btn-primary mt-2"
        >
          add Location Log
          <Icon name="tabler:map-pin-plus" size="24" />
        </NuxtLink>
      </div>
    </div>
    <div v-if="route.name !== 'dashboard-location-slug'">
      <NuxtPage />
    </div>
  </div>
  <AppDiolog
    :is-open="isOpen"
    confirm-label="confirm"
    title="are u sure?"
    description="delete this this locatiuon will permenently remove logs"
    @on-close="isOpen = false"
    @on-confirm="confirmDelete"
  />
</template>
