<script lang="ts" setup>
import type { InsertLocationType } from '~/lib/db/schema'

const route = useRoute()
const { $csrfFetch } = useNuxtApp()
const locationStore = useLocationStore()
async function onSubmit(values: InsertLocationType) {
  await $csrfFetch(`/api/locations/${route.params.slug}`, {
    method: 'put',
    body: values,
  })
}

function onSubmitComplete() {
  navigateTo({
    name: 'dashboard-location-slug',
    params: {
      slug: route.params.slug,
    },
  })
}
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <LocationForm
      v-if=" locationStore.currentLocationStatus !== 'pending' && locationStore.currentLocation"
      :on-submit
      :initial-values="locationStore.currentLocation"
      submit-icon="tabler:map-pin-up"
      :zoom="11"
      submit-label="Update"
      :on-submit-complete="onSubmitComplete"
    />
  </div>
</template>
