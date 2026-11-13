import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image'],
  components: [{ path: '~/components', pathPrefix: false }],
  image: { domains: ['rickandmortyapi.com'], format: ['webp'] },
  eslint: {
    config: {
      stylistic: false,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
