<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="mb-12 text-5xl font-semibold tracking-tight text-gray-100">
        Concepts
      </h1>
      <nav class="flex flex-col gap-8">
        <NuxtLink
          to="/testimonials"
          class="border border-gray-600 bg-gray-800 px-6 py-3 text-sm text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
        >
          Testimonials
        </NuxtLink>
        <span
          class="cursor-default border border-gray-700 bg-gray-800/40 px-6 py-3 text-sm text-gray-500"
        >
          More coming soon
        </span>
      </nav>
    </div>
  </div>
</template>
