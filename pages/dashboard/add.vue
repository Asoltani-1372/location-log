<script lang="ts" setup>
import type { InsertLocationType } from '~/lib/db/schema/location'

const { $csrfFetch } = useNuxtApp()

async function onSubmit(values: InsertLocationType) {
  await $csrfFetch('/api/locations', {
    method: 'post',
    body: values,
  })
}

function onSubmitComplete() {
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1 class="text-lg">
        Add Locations
      </h1>
      <p class="text-sm">
        a location is place that tou traveled or want to travel , it could be city , cuntry or anything
      </p>
      <p class="text-xs text-gray-400 mt-2">
        Photos aren't uploaded here — drop image files into <code>assets/images/</code> in the project,
        then use "Select Photos" on the location to pick which ones belong to it.
      </p>
    </div>

    <LocationForm :on-submit-complete="onSubmitComplete" :on-submit submit-icon="tabler:circle-plus-filled" submit-label="Add" />
  </div>
</template>
