<script setup>
import { CENTER_MAP } from './../../lib/constants'

const colorMode = useColorMode()
const style = computed(() => {
  return colorMode.value === 'dark' ? '/styles/dark.json' : 'https://tiles.openfreemap.org/styles/liberty'
})
const center = CENTER_MAP
const zoom = 4
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
