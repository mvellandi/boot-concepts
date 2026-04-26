import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
