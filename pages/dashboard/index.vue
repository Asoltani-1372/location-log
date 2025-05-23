<script lang="ts" setup>
const locationStore = useLocationStore()
const { locaitons, status } = storeToRefs(locationStore)

onMounted(() => {
  locationStore.refresh()
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl p-2">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-else-if="locaitons && locaitons.length > 0" class="flex flex-nowrap gap-4 mt-4">
      <div v-for="location in locaitons" :key="location.id" class="card card-compact bg-base-300 w-72 h-40 shrink-0 overflow-auto">
        <div class="card-body">
          <h1 class="text-xl">
            {{ location.name }}
          </h1>
          <h1>{{ location.description }}</h1>
        </div>
      </div>
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
