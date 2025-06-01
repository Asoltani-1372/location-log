<script lang="ts" setup>
import type { InsertLocationType } from '~/lib/db/schema/location'

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
  <LocationForm
    v-if=" locationStore.currentLocationStatus !== 'pending'"
    :on-submit
    :initial-values="locationStore.currentLocation"
    submit-icon="tabler:map-pin-up"
    submit-label="Update"
    :on-submit-complete="onSubmitComplete"
  />
</template>
