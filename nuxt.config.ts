// nuxt.config.ts
import { VIDEO_CONFIG } from './config/videoConfig'

export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  target: "static",

  // Disabling preloading unused scripts
  generate: { manifest: false },

  css: [
    // Critical CSS only
    '~/assets/css/main.css',
    '@/assets/css/fonts.css'
  ],

  // Image optimization configuration
  image: {
    // Enable WebP generation
    format: ['webp', 'png', 'jpg'],
    // Configure quality and sizes
    quality: 85,
    screens: {
      xs: 320,
      sm: 640,
      md: VIDEO_CONFIG.DEVICE.MOBILE_BREAKPOINT,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    // Presets for common use cases
    presets: {
      hero: {
        modifiers: {
          format: 'webp',
          quality: 90,
          width: 1200,
          height: 800
        }
      }
    }
  },

  modules: [
    '@tailwindcss/vite', // Add the Tailwind module here
    '@nuxt/image'
  ],

  // Add plugins: DASH (lazy-loaded), accessibility, keyboard shortcuts, and navigation fixes
  plugins: [
    { src: '~/plugins/dashPlugins.ts', mode: 'client' },
    { src: '~/plugins/a11y.js', mode: 'client' },
    { src: '~/plugins/keyboardShortcuts.js', mode: 'client' },
    { src: '~/plugins/fixNavigation.js', mode: 'client' }
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
      // Keeping these console.logs as they are important for the developer experience
      console.log('\n🔒 Remember to run the SRI script after build:');
      console.log('node scripts/add-sri.js\n');
    }
  },
  
  // Page transitions
  app: {
    pageTransition: false, // Disable page transitions to fix navigation issues
    
    // Add default crossorigin to all head resources and font preloading
    head: {
      script: [
        {
          crossorigin: 'anonymous'
        }
      ],
      link: [
        {
          crossorigin: 'anonymous'
        },
        // Preload critical fonts
        {
          rel: 'preload',
          href: '/_nuxt/big_john-webfont.buBW1jk0.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload', 
          href: '/_nuxt/Amble-Light-webfont.uRWRjYZ_.woff',
          as: 'font',
          type: 'font/woff',
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  
  // Video configuration runtime config
  runtimeConfig: {
    public: {
      videoConfig: {
        enableCacheCleanup: VIDEO_CONFIG.PERFORMANCE.CACHE_CLEANUP_INTERVAL > 0,
        cacheCleanupInterval: VIDEO_CONFIG.PERFORMANCE.CACHE_CLEANUP_INTERVAL,
        logLevel: VIDEO_CONFIG.PERFORMANCE.LOG_LEVEL,
        memoryMonitoring: VIDEO_CONFIG.PERFORMANCE.MEMORY_MONITORING,
        mobileBreakpoint: VIDEO_CONFIG.DEVICE.MOBILE_BREAKPOINT,
        retryAttempts: VIDEO_CONFIG.RETRY.MAX_ATTEMPTS
      }
    }
  },

  // Configure Nitro server for better video streaming and asset caching
  nitro: {
    routeRules: {
      '/assets/dash/**': {
        headers: {
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range'
        }
      },
      // Extend cache for static assets (30 days)
      '/assets/png/**': {
        headers: {
          'Cache-Control': 'public, max-age=2592000, immutable'
        }
      },
      '/assets/img/**': {
        headers: {
          'Cache-Control': 'public, max-age=2592000, immutable'
        }
      },
      '/assets/fonts/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      '/assets/css/**': {
        headers: {
          'Cache-Control': 'public, max-age=2592000'
        }
      }
    },
    prerender: {
      crawlLinks: true,
      ignore: ['/assets/', '/assets/**']
    }
  },

  compatibilityDate: '2024-07-06'
})