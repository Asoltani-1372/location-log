<script lang="ts" setup>
import { Field } from 'vee-validate'

const props = defineProps<{
  name: string
  error?: string
  type?: 'text' | 'textarea' | 'number'
  label: string
  dataType?: string
  disabled?: boolean
}>()
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :disabled="disabled"
      :as="type || 'input'"
      :name="props.name"
      :type="props.dataType || 'text'"
      class="w-full"
      :class="{
        'input-error': props.error,
        'input': !type || type === 'text',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
