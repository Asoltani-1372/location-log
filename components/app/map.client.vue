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
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker v-for="point in mapStore.mapPoints" :key="point.id" :coordinates="[point.long, point.lat]">
      <template #marker>
        <div class="tooltip  tooltip-top" :data-tip="point.label">
          <Icon name="tabler:map-pin-filled" size="32" class="text-secondary" />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>
