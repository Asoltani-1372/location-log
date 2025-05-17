<script lang="ts" setup>
const isSidebarOpen = ref(true)
function toogleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString())
}
onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true'
})
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div class="flex hover:cursor-poiner hover:bg-base-200 p-2" :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }" @click="toogleSidebar">
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-else name="tabler:chevron-right" size="32" />
      </div>
      <div class="flex flex-col ">
        <SiderbarBtn :show-label="isSidebarOpen" icon="tabler:map" label="location" href="/dashboard/" />
        <SiderbarBtn :show-label="isSidebarOpen" icon="tabler:circle-plus-filled" label="Add Locations" href="/dashboard/add/" />
        <div class="divider" />
        <SiderbarBtn :show-label="isSidebarOpen" icon="tabler:logout-2" label="Sign Out" href="/sign-out/" />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
