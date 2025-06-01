<script lang="ts" setup>
import type { InsertLocationType } from '~/lib/db/schema/location'

const { $csrfFetch } = useNuxtApp()

async function onSubmit(values: InsertLocationType) {
  await $csrfFetch('/api/locations', {
    method: 'post',
    body: values,
  })
  navigateTo('/dashboard')
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
    </div>

    <LocationForm :on-submit-complete="onSubmitComplete" :on-submit submit-icon="tabler:circle-plus-filled" submit-label="Add" />
  </div>
</template>
