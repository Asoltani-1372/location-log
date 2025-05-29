<script lang="ts" setup>
import type { FetchError } from 'ofetch'

import type { Nominatim } from '../../lib/type'
import { SearchSchema } from '~/lib/zod-schemas'

const emit = defineEmits<{
  resultSelected: [result: Nominatim]
}>()
const searchResult = ref<Nominatim[]>([])
const form = useTemplateRef('form')
const loading = ref(false)
const errorMessage = ref('')
const hasSearched = ref(false)

function setLocation(result: Nominatim) {
  emit('resultSelected', result)
  searchResult.value = []
  hasSearched.value = false
  if (form.value) {
    form.value.resetForm()
  }
}

async function onSubmit(query: Record<string, string>) {
  loading.value = true
  hasSearched.value = true
  errorMessage.value = ''
  searchResult.value = []
  try {
    const result = await $fetch('/api/search', {
      query,
    })
    searchResult.value = result
    loading.value = false
  }
  catch (e) {
    const error = e as FetchError
    errorMessage.value = getFetchErrorMessage(error)
  }
  loading.value = false
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Form
      ref="form" v-slot="{ errors }" :validation-schema="toTypedSchema(SearchSchema)"
      class="flex flex-col gap-2 items-center" :initial-values="{ q: '' }" @submit="onSubmit"
    >
      <div class="join">
        <div>
          <label class="input  join-item">
            <Icon name="tabler:search" />
            <Field
              :disabled="loading" type="text" name="q" placeholder="search" :class="{
                'input-error': errors.q,
              }"
            />
          </label>
          <div class=" text-error">
            {{ errors.q }}
          </div>
        </div>
        <button class="btn btn-neutral join-item" :disabled="loading">
          Search
        </button>
      </div>
    </Form>

    <div v-if="!loading && errorMessage" role="alert" class="alert alert-error">
      <Icon />
      {{ errorMessage }}
    </div>
    <div v-if="!loading && hasSearched && !searchResult.length" role="alert" class="alert alert-warning">
      no results found
    </div>

    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-spinner loading-lg" />
    </div>
    <div v-else class="flex flex-col gap-2 overflow-auto max-h-60">
      <div v-for="result in searchResult" :key="result.place_id" class="card card-xs bg-base-100 ">
        <div class="card-body">
          <h2 class="card-title">
            {{ result.display_name }}
          </h2>
          <div class="justify-end card-actions">
            <button class="btn btn-warning" @click="setLocation(result)">
              setLocation
              <Icon name="tabler:map-pin-share" size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
