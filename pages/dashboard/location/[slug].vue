<script lang="ts" setup>
const route = useRoute()
const mapStore = useMapStore()
const slug = route.params.slug
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`)

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value]
  }
})
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-if="location && status !== 'pending'">
      <h2>{{ location?.name }}</h2>
      <p class="text-sm">
        {{ location?.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="text-larg mt-4">
        <p class="text-sm">
          add a location Log to get Started
        </p>
        <button class="btn btn-primary mt-2">
          add Location Log
          <Icon name="tabler:map-pin-plus" size="24" />
        </button>
      </div>
    </div>

    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>
  </div>
</template>
