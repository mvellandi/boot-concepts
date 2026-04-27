<template>
  <div
    class="flex w-[254px] shrink-0 snap-start flex-col gap-[14px] border-2 border-gold bg-[rgba(32,35,48,0.75)] p-5 sm:w-[300px]"
  >
    <div class="flex items-center gap-3">
      <img
        v-if="image"
        :src="image"
        :alt="org"
        class="h-12 w-12 shrink-0 rounded-full object-cover"
      />
      <div
        v-else
        data-testid="image-placeholder"
        class="h-12 w-12 shrink-0 rounded-full bg-[#3c424f]"
      ></div>
      <div>
        <div class="text-[15px] font-semibold leading-[1.3] text-white">{{ org }}</div>
        <div v-if="subhead" class="mt-[3px] text-[13px] text-[#919dab]">{{ subhead }}</div>
      </div>
    </div>
    <p
      v-if="quote"
      class="m-0 text-[16px] font-serif italic leading-[1.5] tracking-[0.3px] text-slate-200"
    >
      &OpenCurlyDoubleQuote;{{ quote }}&CloseCurlyDoubleQuote;
    </p>
    <p
      v-if="description"
      class="m-0 text-[14px] leading-[1.5] text-slate-300/80"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  org: string
  subhead?: string
  quote?: string
  description?: string
  image?: string
}>()
</script>
