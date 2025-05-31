<script lang="ts" setup>
import type { InsertLocationType } from '~/lib/db/schema'
import type { Nominatim } from '~/lib/type'
import { CENTER_MAP } from '~/lib/constants'
import { InsertLocation } from '~/lib/db/schema'

const props = defineProps<{
  onSubmit: (location: InsertLocationType) => Promise<any>
  loading: boolean
  submited: boolean
  submitErrors: Record<string, string>
}>()
const mapStore = useMapStore()
const router = useRouter()
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

const onSubmit = handleSubmit(props.onSubmit)

onMounted(() => {
  mapStore.addedPoint = {
    description: ',',
    name: 'added Point',
    id: 1,
    long: (CENTER_MAP as [number, number])[0],
    lat: (CENTER_MAP as [number, number])[1],
  }
})
function searchResultSelected(result: Nominatim) {
  setFieldValue('name', result.display_name)
  mapStore.addedPoint = {
    description: ',',
    name: 'added Point',
    id: 1,
    long: +result.lon,
    lat: +result.lat,
    center_map: true,
  }
}
onBeforeRouteLeave(() => {
  if (!props.submited && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('are u sure u want to leave , unsave Changes will be dissapear')
    if (!confirm) {
      return false
    }
    mapStore.addedPoint = null
    return true
  }
})

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue('long', mapStore.addedPoint.long)
    setFieldValue('lat', mapStore.addedPoint.lat)
  }
})

effect(() => {
  setErrors(props.submitErrors)
})
</script>

<template>
  <form class="flex flex-col gap-4 " @submit.prevent="onSubmit">
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
  <div class="divider" />
  <AppSearch class="mt-4" @result-selected="searchResultSelected" />
</template>
