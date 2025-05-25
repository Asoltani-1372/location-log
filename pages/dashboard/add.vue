<script lang="ts" setup>
import type { FetchError } from 'ofetch'
import { AppFormField } from '#components'
import { CENTER_MAP } from '~/lib/constants'
import { InsertLocation } from '~/lib/db/schema/location'

const { $csrfFetch } = useNuxtApp()
const router = useRouter()
const submitError = ref('')
const loading = ref(false)
const submited = ref(false)
const mapStore = useMapStore()
const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    long: (CENTER_MAP as [number, number])[0],
    lat: (CENTER_MAP as [number, number])[1],
    name: '',
    description: '',
  },
})

function formatNumber(value?: number | undefined) {
  if (!value) {
    return 0
  }
  return value.toFixed(4)
}

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = ''
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
      setErrors(error.data?.data)
    }
    submitError.value = error.statusMessage || 'an unknow error occured'
  }
  loading.value = false
})

onMounted(() => {
  mapStore.addedPoint = {
    description: ',',
    name: 'added Point',
    id: 1,
    long: (CENTER_MAP as [number, number])[0],
    lat: (CENTER_MAP as [number, number])[1],
  }
})

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue('long', mapStore.addedPoint.long)
    setFieldValue('lat', mapStore.addedPoint.lat)
  }
})

onBeforeRouteLeave(() => {
  if (!submited.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('are u sure u want to leave , unsave Changes will be dissapear')
    if (!confirm) {
      return false
    }
    mapStore.addedPoint = null
    return true
  }
})
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
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <AppFormField name="name" :error="errors.name" label="name" :disabled="loading" />
      <AppFormField name="description" type="textarea" :error="errors.description" label="description" :disabled="loading" />
      <p>drag the <Icon name="tabler:map-pin-filled" class="text-warning" /> marker and select location</p>
      <p class="text-xs text-gray-400">
        {{ formatNumber(controlledValues?.lat) }} , {{ formatNumber(controlledValues?.long) }}
      </p>
      <div class="flex justify-end gap-2">
        <button :disabled="loading" class="btn btn-outline" type="button">
          <span v-if="loading" class="loading loading-spinner loading-md" />

          <Icon v-else name="tabler:arrow-left" size="24" @click="router.back()" />
          cancel
        </button>
        <button :disabled="loading" class="btn btn-primary" type="submit">
          <span v-if="loading" class="loading loading-spinner loading-md" />

          <Icon v-else name="tabler:circle-plus-filled" size="24" />
          submit
        </button>
      </div>
    </form>
  </div>
</template>
