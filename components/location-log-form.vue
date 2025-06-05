<script lang="ts" setup>
import { CENTER_MAP } from '~/lib/constants'
import { InsertLocationLog } from '~/lib/db/schema'

const props = defineProps<{
  initialValues?: InsertLocationLog | null
  onSubmit: (location: InsertLocationLog) => Promise<any>
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
      startedAt: Date.now() - (24 * 60 * 60 * 1000),
      endedAt: Date.now(),
      name: '',
      description: '',
    }"
    :on-submit-complete
    :on-submit
    :submit-label
    :submit-icon
    :schema="InsertLocationLog"
    :zoom="11"
  >
    <AppFormField name="name" :error="errors.name" label="name" :disabled="loading" />
    <AppFormField
      name="description" type="textarea" :error="errors.description" label="description"
      :disabled="loading"
    />
    <AppDateFormField
      name="startedAt" :value=" Date.now() - (24 * 60 * 60 * 1000)" :error="errors.startedAt" label="startedAt"
      :disabled="loading"
    />
    <AppDateFormField
      name="endedAt" :value="Date.now()" :error="errors.endedAt" label="endedAt"
      :disabled="loading"
    />
  </LocationBaseForm>
</template>
