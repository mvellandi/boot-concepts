<template>
  <div class="relative box-border pl-[50px]">
    <div class="pointer-events-none absolute right-0 top-0 h-full w-15 bg-linear-to-r from-transparent to-[#121620]"></div>
    <button
      aria-label="Previous"
      class="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-[60%] cursor-pointer items-center justify-center border border-gold bg-[rgba(32,35,48,0.85)] text-lg text-gold"
      @click="scrollTrack(-1)"
    >
      ‹
    </button>

    <div
      ref="track"
      class="track-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-4 pt-2"
      :class="isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <slot />
    </div>

    <button
      aria-label="Next"
      class="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-[60%] cursor-pointer items-center justify-center border border-gold bg-[rgba(32,35,48,0.85)] text-lg text-gold"
      @click="scrollTrack(1)"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const track = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const scrollDistance = ref(320)

function updateScrollDistance() {
  if (!track.value || !track.value.firstElementChild) return
  const card = track.value.firstElementChild as HTMLElement
  const gap = 16
  scrollDistance.value = card.offsetWidth + gap
}

function startDrag(e: MouseEvent) {
  if (!track.value) return
  isDragging.value = true
  startX.value = e.pageX - track.value.offsetLeft
  scrollLeft.value = track.value.scrollLeft
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value || !track.value) return
  e.preventDefault()
  const x = e.pageX - track.value.offsetLeft
  track.value.scrollLeft = scrollLeft.value - (x - startX.value) * 1.5
}

function stopDrag() {
  isDragging.value = false
}

function scrollTrack(dir: number) {
  track.value?.scrollBy({ left: dir * scrollDistance.value, behavior: 'smooth' })
}

onMounted(() => {
  updateScrollDistance()
  window.addEventListener('resize', updateScrollDistance)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollDistance)
})
</script>

<style scoped>
.track-scroll::-webkit-scrollbar {
  display: none;
}
.track-scroll {
  scrollbar-width: none;
}
</style>
