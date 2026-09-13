<script lang="ts" setup>
const props = defineProps<{
  photos: string[]
}>()

const openIndex = ref<number | null>(null)
const direction = ref<'next' | 'prev'>('next')

const transitionName = computed(() => direction.value === 'next' ? 'slide-next' : 'slide-prev')

function open(index: number) {
  openIndex.value = index
}

function close() {
  openIndex.value = null
}

function next() {
  if (openIndex.value === null)
    return
  direction.value = 'next'
  openIndex.value = (openIndex.value + 1) % props.photos.length
}

function prev() {
  if (openIndex.value === null)
    return
  direction.value = 'prev'
  openIndex.value = (openIndex.value - 1 + props.photos.length) % props.photos.length
}

function onKeydown(e: KeyboardEvent) {
  if (openIndex.value === null)
    return
  if (e.key === 'Escape')
    close()
  else if (e.key === 'ArrowRight')
    next()
  else if (e.key === 'ArrowLeft')
    prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <button v-if="photos.length" class="btn btn-outline" @click="open(0)">
    <Icon name="tabler:photo" size="20" />
    View Photos ({{ photos.length }})
  </button>

  <Teleport to="body">
    <div
      v-if="openIndex !== null"
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      @click.self="close"
    >
      <button class="btn btn-circle btn-sm absolute top-4 right-4" @click="close">
        <Icon name="tabler:x" size="20" />
      </button>
      <button v-if="photos.length > 1" class="btn btn-circle absolute left-4" @click="prev">
        <Icon name="tabler:chevron-left" size="24" />
      </button>
      <div class="w-[90vw] max-w-3xl h-[80vh] overflow-hidden">
        <Transition :name="transitionName" mode="out-in">
          <img
            :key="openIndex"
            :src="photos[openIndex]"
            class="w-full h-full object-contain rounded-box"
            alt="location photo"
          >
        </Transition>
      </div>
      <button v-if="photos.length > 1" class="btn btn-circle absolute right-4" @click="next">
        <Icon name="tabler:chevron-right" size="24" />
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-next-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
