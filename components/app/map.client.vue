<script setup lang="ts">
import type { MglEvent } from '@indoorequal/vue-maplibre-gl'
import type { LngLat, StyleSpecification } from 'maplibre-gl'
import localizeMapStyle from '~/utils/localize-map-style'
import { CENTER_MAP } from './../../lib/constants'

const LIBERTY_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty'
let cachedLibertyStyle: StyleSpecification | null = null

const mapStore = useMapStore()
const colorMode = useColorMode()

const style = ref<string | StyleSpecification>('/styles/dark.json')

watchEffect(async () => {
  if (colorMode.value === 'dark') {
    style.value = '/styles/dark.json'
    return
  }
  if (!cachedLibertyStyle) {
    const fetched = await $fetch<StyleSpecification>(LIBERTY_STYLE_URL)
    cachedLibertyStyle = localizeMapStyle(fetched)
  }
  style.value = cachedLibertyStyle
})
const center = CENTER_MAP
const zoom = 4
function onDoubleClick(e: MglEvent<'dblclick'>) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = e.event.lngLat.lat
    mapStore.addedPoint.long = e.event.lngLat.lng
  }
}

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat
    mapStore.addedPoint.long = location.lng
  }
}

onMounted(() => {
  mapStore.init()
})
</script>

<template>
  <MglMap :map-style="style" :center="center" :zoom="zoom" @map:dblclick="onDoubleClick">
    <MglNavigationControl />
    <MglMarker
      v-if="mapStore.addedPoint"
      draggable
      class-name="z-50"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      @update:coordinates="updateAddedPoint"
    >
      <template #marker>
        <div class="tooltip tooltip-open tooltip-top hover:cursor-pointer" data-tip="drag pin to select location">
          <Icon name="tabler:map-pin-filled" size="32" class="text-warning" />
        </div>
      </template>
    </MglMarker>
    <MglMarker v-for="point in mapStore.mapPoints" :key="point.id" :coordinates="[point.long, point.lat]">
      <template #marker>
        <div
          class="tooltip  tooltip-top hover:cursor-pointer" :data-tip="point.name"
          :class="{ 'tooltip-open': isPointSelected(mapStore.selectedPoint, point) }"
        >
          <Icon
            name="tabler:map-pin-filled" size="32"
            :class="isPointSelected(mapStore.selectedPoint, point) ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p v-if="point.description">
          {{ point.description }}
        </p>
        <div class="flex justify-end mt-4">
          <NuxtLink
            v-if="point.to"
            :to="point.to"
            class="btn btn-sm btn-outline"
          >
            {{ point.toLabel }}
          </NuxtLink>
        </div>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
