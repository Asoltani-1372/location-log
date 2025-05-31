<script lang="ts" setup>
import type { FetchError } from 'ofetch'
import type { InsertLocationType } from '~/lib/db/schema/location'

const { $csrfFetch } = useNuxtApp()
const loading = ref(false)
const submited = ref(false)
const submitError = ref('')
const submitErrors = ref<Record<string, string>>({})

async function onSubmit(values: InsertLocationType) {
  try {
    submitError.value = ''
    submitErrors.value = {}
    loading.value = true
    await $csrfFetch('/api/locations', {
      method: 'post',
      body: values,
    })
    submited.value = true
    navigateTo('/dashboard')
  }
  catch (e) {
    const error = e as FetchError
    if (error.data?.data) {
      submitErrors.value = error.data?.data
    }
    submitError.value = getFetchErrorMessage(error)
  }
  loading.value = false
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
    <div v-if="submitError" role="alert" class="alert alert-error">
      <span>{{ submitError }}</span>
    </div>
    <LocationForm :on-submit :submited :loading :submit-errors />
  </div>
</template>
