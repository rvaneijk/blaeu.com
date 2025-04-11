// nuxt.config.ts

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

  // Add plugins: DASH, accessibility, and keyboard shortcuts
  plugins: [
    { src: '~/plugins/dashPlugins.js', mode: 'client' },
    { src: '~/plugins/a11y.js', mode: 'client' },
    { src: '~/plugins/keyboardShortcuts.js', mode: 'client' }
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}, // Using @tailwindcss/postcss
    },
  },

  // Configure build optimization for video
  build: {
    // Optimize chunk splitting for DASH
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '-',
        cacheGroups: {
          dashjs: {
            test: /[\\/]node_modules[\\/]dashjs[\\/]/,
            name: 'dashjs',
            chunks: 'all',
            priority: 20
          }
        }
      }
    },

    // Add source map configuration
    sourcemap: true,
    
    // Add dashjs to the transpile list
    transpile: ['dashjs']
  },
  
  hooks: {
    // Register a 'build:done' hook for static site generation
    'build:done': async () => {
      // This acts as a reminder to run the post-build script
      console.log('\n🔒 Remember to run the SRI script after build:');
      console.log('node scripts/add-sri.js\n');
    }
  },
  
  // Page transitions
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      onBeforeEnter: (el) => {
        if (typeof window !== 'undefined' && window.dashCache) {
          // Mark that a transition is happening
          window.dashCache.inTransition = true;
        }
      },
      onAfterEnter: (el) => {
        if (typeof window !== 'undefined' && window.dashCache) {
          window.dashCache.inTransition = false;
        }
      }
    },
    
    // Add default crossorigin to all head resources
    head: {
      script: [
        {
          crossorigin: 'anonymous'
        }
      ],
      link: [
        {
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  
  // Configure Nitro server for better video streaming
  nitro: {
    routeRules: {
      '/assets/dash/**': {
        headers: {
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range'
        }
      }
    }
  },

  compatibilityDate: '2024-07-06'
})