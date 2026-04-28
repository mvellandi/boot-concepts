<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center">
      <h1 class="mb-4 text-5xl font-thin tracking-tight text-gray-100 px-3">
        Audience Engagement Concepts
      </h1>
      <h2 class="mb-12 text-2xl font-light tracking-wide text-gray-100">
        for Boot.dev by <a href="http://vellandi.net" class="text-amber-400/90">Mario Vellandi</a>
      </h2>
      <nav class="flex flex-col justify-center items-center gap-8 w-full max-w-[300px]">
        <NuxtLink
          to="/testimonials"
          class="w-full text-center border border-gray-600 bg-gray-800 px-6 py-3 text-sm text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
        >
          Customer Success Stories
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
