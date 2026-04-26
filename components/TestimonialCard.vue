<template>
  <div
    class="flex w-[254px] shrink-0 snap-start flex-col gap-[14px] border-2 border-gold bg-[rgba(32,35,48,0.75)] p-5 sm:w-[300px]"
  >
    <div class="flex items-center gap-3">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="org"
        class="h-12 w-12 shrink-0 rounded-full object-cover"
      />
      <div
        v-else
        data-testid="avatar-placeholder"
        class="h-12 w-12 shrink-0 rounded-full bg-[#3c424f]"
      ></div>
      <div>
        <div class="text-[15px] font-semibold leading-[1.3] text-white">{{ org }}</div>
        <div class="mt-[3px] text-[13px] text-[#919dab]">{{ person }}</div>
      </div>
    </div>
    <p class="m-0 text-[16px] leading-[1.5] tracking-[0.3px] text-slate-200">
      {{ quote }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  org: string
  person: string
  quote: string
  avatar?: string
}>()
</script>
