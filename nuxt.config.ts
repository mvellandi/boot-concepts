import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  sourcemap: { client: false, server: false },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/boot-concepts/' : '/',
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
    },
  },
  nitro: {
    sourceMap: false,
    prerender: {
      routes: ['/testimonials'],
    },
    hooks: {
      compiled: async (nitro) => {
        const { readdir, copyFile } = await import('node:fs/promises')
        const { join } = await import('node:path')
        const publicDir = nitro.options.output.publicDir
        const walk = async (dir: string) => {
          const entries = await readdir(dir, { withFileTypes: true })
          for (const entry of entries) {
            const full = join(dir, entry.name)
            if (entry.isDirectory()) await walk(full)
            else if (entry.name.endsWith('.html'))
              await copyFile(full, `${full.slice(0, -5)}.htm`)
          }
        }
        await walk(publicDir)
      },
    },
  },
  vite: {
    build: { sourcemap: false },
    plugins: [tailwindcss()],
  },
})
