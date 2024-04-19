export default defineNuxtConfig({
  devtools: { enabled: true },

  telemetry: false,
  
  target: "static",
  
  generate: { manifest: false }, // Disabling preloading unused scripts

  css: [
    '~/assets/css/main.css',
 	'~/assets/css/fontawesome-v6.5.2.css',
 	'~/assets/css/fontawesome-additions.css',
    '@/assets/css/fonts.css',
	'tw-elements/css/tw-elements.min.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})