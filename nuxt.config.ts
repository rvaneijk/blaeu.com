export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  target: "static",

  // Disabling preloading unused scripts
  generate: { manifest: false },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/fontawesome-v6.7.2.css',
    '~/assets/css/fontawesome-additions.css',
    '@/assets/css/fonts.css',
    'tw-elements/css/tw-elements.min.css'
  ],

  modules: [
    '@tailwindcss/vite' // Add the Tailwind module here
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}, // Replace tailwindcss with @tailwindcss/postcss
    },
  },

  compatibilityDate: '2024-07-06'
})