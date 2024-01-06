export default defineNuxtConfig({
  devtools: { enabled: true },

  telemetry: false,
  
  target: "static",
  
  generate: { manifest: false }, // Disabling preloading unused scripts

  css: [
    '~/assets/css/main.css',
 	'~/assets/css/fontawesome-v6.5.1.css',
 	'~/assets/css/fontawesome-additions.css',
    '@/assets/css/fonts.css',
	'tw-elements/dist/css/tw-elements.min.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})