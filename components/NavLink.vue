<template>
  <NuxtLink
    :to="to"
    class="w-full border border-teal-400/50 bg-gray-800 px-4 py-3 text-gray-400 hover:text-amber-400/90 transition duration-300 ease-out hover:scale-105 md:text-xl"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
