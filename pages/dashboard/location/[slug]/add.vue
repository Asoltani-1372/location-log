<script lang=ts setup>
import type { InsertLocationLogType } from '~/lib/db/schema'
import { CENTER_MAP } from '@/lib/constants'

const { $csrfFetch } = useNuxtApp()

const route = useRoute()
const locationStore = useLocationStore()
async function onSubmit(values: InsertLocationLogType) {
  await $csrfFetch(`/api/locations/${route.params.slug}/add`, {
    method: 'post',
    body: values,
  })
}
async function onSubmitComplete() {
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
    <LocationLogForm
      submit-icon="tabler:circle-plus-filled"
      submit-label="add Log"
      :on-submit="onSubmit"
      :on-submit-complete="onSubmitComplete"
      :initial-values="{
        long: locationStore.currentLocation?.long || (CENTER_MAP as [number, number])[0],
        lat: locationStore.currentLocation?.lat || (CENTER_MAP as [number, number])[1],
        startedAt: Date.now() - (24 * 60 * 60 * 1000),
        endedAt: Date.now(),
        name: '',
        description: '',
      }"
    />
  </div>
</template>
