<script setup>
import { CENTER_MAP } from './../../lib/constants'

const mapStore = useMapStore()
const colorMode = useColorMode()

const style = computed(() => {
  return colorMode.value === 'dark' ? '/styles/dark.json' : 'https://tiles.openfreemap.org/styles/liberty'
})
const center = CENTER_MAP
const zoom = 4
onMounted(() => {
  mapStore.init()
})
</script>

<template>
  <MglMap :map-style="style" :center="center" :zoom="zoom">
    <MglNavigationControl />
    <MglMarker draggable="true" :coordinates="center">
      <template #marker>
        <div class="tooltip  tooltip-top hover:cursor-pointer" data-tip="drag pin to select location">
          <Icon name="tabler:map-pin-filled" size="32" class="text-warning" />
        </div>
      </template>
    </MglMarker>
    <MglMarker v-for="point in mapStore.mapPoints" :key="point.id" :coordinates="[point.long, point.lat]">
      <template #marker>
        <div
          class="tooltip  tooltip-top hover:cursor-pointer" :data-tip="point.name"
          :class="{ 'tooltip-open': mapStore.selectedPoint === point }"
          @mouseenter="mapStore.selectPointWithoutFlyTo(point)" @mouseleave="mapStore.selectPointWithoutFlyTo(null)"
        >
          <Icon
            name="tabler:map-pin-filled" size="32"
            :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <h1 class="text-2xl">
          {{ point.name }}
        </h1>
        <p>
          {{ point.description }}
        </p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
