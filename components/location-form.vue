<script lang="ts" setup>
import { CENTER_MAP } from '~/lib/constants'
import { InsertLocation } from '~/lib/db/schema'

const props = defineProps<{
  initialValues?: InsertLocation
  onSubmit: (location: InsertLocation) => Promise<any>
  submitLabel?: string
  submitIcon?: string
  onSubmitComplete: () => void
  zoom?: number
}>()
</script>

<template>
  <div />
  <LocationBaseForm
    v-slot="{ errors, loading }"
    :initial-values="props.initialValues || {
      long: (CENTER_MAP as [number, number])[0],
      lat: (CENTER_MAP as [number, number])[1],
      name: '',
      description: '',
    }"
    :on-submit-complete
    :on-submit
    :submit-label
    :submit-icon
    :schema="InsertLocation"
    :zoom="props.zoom || 6"
  >
    <AppFormField name="name" :error="errors.name" label="name" :disabled="loading" />
    <AppFormField
      name="description" type="textarea" :error="errors.description" label="description"
      :disabled="loading"
    />
  </LocationBaseForm>
</template>
