<!--
  @component tw-FixedBackgroundVideo
  @description Fixed position background video component that loads after hero content.
  Uses intersection observer for performance optimization and respects accessibility settings.
  Provides decorative background video with proper fallback handling and screen reader support.
  
  @example Basic usage (auto-loads when visible)
  <tw-FixedBackgroundVideo />
  
  @example With manual visibility control
  <tw-FixedBackgroundVideo 
    :forceRender="true"
    @player-ready="handleBackgroundVideoReady"
    @dash-error="handleVideoError"
  />
  
  @example Accessibility-focused implementation
  <tw-FixedBackgroundVideo 
    @dash-failed="handleVideoFailure"
    @player-ready="announceVideoLoaded"
  />
-->
<template>
  <div class="fixed-video-container" aria-hidden="true">
    <!-- Video container - videos are paused automatically when reduce motion is enabled -->
    <div class="video-container full-screen">
      <tw-VideoPlayer
        v-if="isVisible || forceRender"
        :dashSource="'/assets/dash/video/adaptive.mpd'"
        :fallbackSource="'/assets/dash/video/GettyImages-1368070487.mp4'"
        :lazyLoad="false"
        :useCachedPlayer="true"
        rootMargin="400px 0px"
        customClass="fixed-video"
        :decorative="true"
        :videoTitle="'Network visualization showing team connections with blue node points representing people, connected by golden lines'"
        :captionSrc="'/assets/dash/video/captions-en.vtt'"
        @dash-error="handleDashError"
        @dash-failed="handleDashFailed"
        @player-ready="handlePlayerReady"
      />
    </div>
    
    <!-- Adding an accessible description for screen readers about the team visualization -->
    <div class="sr-only">
      This background contains a visual representation of a team network. The image shows a network visualization with glowing blue location pins containing person silhouettes. These pins are connected by golden lines forming a network structure against a dark background, emphasizing our team-based approach to privacy and data protection.
    </div>
  </div>
</template>

<script>
import { globalState } from '~/composables/globalState';

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  SOURCES: {
    DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
    DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4',
    DEFAULT_CAPTIONS: '/assets/dash/video/captions-en.vtt'
  },
  INTERSECTION: {
    ROOT_MARGIN_BACKGROUND: '400px 0px'
  }
};

// Import with fallback
let VIDEO_CONFIG = DEFAULT_CONFIG;
try {
  const { VIDEO_CONFIG: config } = require('~/config/videoConfig');
  VIDEO_CONFIG = config || DEFAULT_CONFIG;
} catch (e) {
  VIDEO_CONFIG = DEFAULT_CONFIG;
}

export default {
  name: 'FixedBackgroundVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue')
  },
  
  /**
   * @description Component props (currently none - uses hardcoded values for background video)
   * @typedef {Object} FixedBackgroundVideoProps
   * @note This component currently uses hardcoded video sources for background optimization
   */
  props: {
    // No props currently defined - component uses hardcoded optimized sources
  },
  
  /**
   * @description Events emitted by the FixedBackgroundVideo component
   * @typedef {Object} FixedBackgroundVideoEvents
   * @event player-ready - Proxied from child VideoPlayer when background video is ready
   * @event dash-error - Proxied from child VideoPlayer for background video errors
   * @event dash-failed - Proxied from child VideoPlayer when background video fails
   */
  emits: {
    /**
     * @description Proxied event from child VideoPlayer when background video player is ready
     * @param {Object} player - The initialized DASH.js player instance for background video
     * @example
     * <tw-FixedBackgroundVideo @player-ready="handleBackgroundReady" />
     * 
     * handleBackgroundReady(player) {
     *   console.log('Background video player ready:', player);
     *   // Track performance metrics, setup quality monitoring, etc.
     * }
     */
    'player-ready': (player) => {
      return player && typeof player === 'object';
    },
    
    /**
     * @description Proxied event from child VideoPlayer for background video DASH errors
     * @param {Object} payload - Error information object
     * @param {Error} payload.error - The error object
     * @param {string} payload.message - Human-readable error message
     * @example
     * <tw-FixedBackgroundVideo @dash-error="handleBackgroundError" />
     * 
     * handleBackgroundError({ error, message }) {
     *   console.warn('Background video error:', message);
     *   // Log to error service, potentially switch to static background
     * }
     */
    'dash-error': (payload) => {
      return payload && typeof payload.error === 'object' && typeof payload.message === 'string';
    },
    
    /**
     * @description Proxied event from child VideoPlayer when background video fails completely
     * @param {Object} payload - Failure information object
     * @param {Error} payload.error - The error that caused the failure
     * @param {string} payload.message - Human-readable failure message
     * @example
     * <tw-FixedBackgroundVideo @dash-failed="handleBackgroundFailure" />
     * 
     * handleBackgroundFailure({ error, message }) {
     *   console.error('Background video failed:', message);
     *   // Show static background, log critical error
     * }
     */
    'dash-failed': (payload) => {
      return payload && typeof payload.error === 'object' && typeof payload.message === 'string';
    }
  },
  
  /**
   * Component state
   * @property {string} videoStatus - Current video loading state ('loading', 'ready', 'fallback')
   * @property {boolean} isVisible - Whether component is visible in viewport
   * @property {boolean} forceRender - Whether to force render video regardless of visibility
   * @property {IntersectionObserver|null} observer - Intersection observer instance for performance
   * @property {Function|null} boundPreloadManifest - Bound preload function for cleanup
   */
  data() {
    return {
      videoStatus: 'loading',
      isVisible: false,
      forceRender: false,
      observer: null,
      boundPreloadManifest: null
    }
  },
  mounted() {
    // Start observing for scroll position to determine when to load video
    this.setupIntersectionObserver();
    
    // Check global state for all accessibility settings
    if (globalState.reduceMotion && !document.documentElement.classList.contains('reduce-motion')) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    if (globalState.highContrast && !document.documentElement.classList.contains('high-contrast-mode')) {
      document.documentElement.classList.add('high-contrast-mode');
    }
    
    if (globalState.focusMode && !document.documentElement.classList.contains('focus-mode')) {
      document.documentElement.classList.add('focus-mode');
      document.documentElement.classList.add('enhanced-focus');
    }
    
    if (globalState.videoCaptions && !document.documentElement.classList.contains('captions-enabled')) {
      document.documentElement.classList.add('captions-enabled');
    }
    
    // If hero video is already loaded, we can prepare for background video loading
    if (window && window.heroVideoLoaded) {
      // Pre-warm the cache for quicker loading when it becomes visible
      this.preloadManifest();
    } else if (window) {
      // Create a bound function and store it for proper cleanup
      this.boundPreloadManifest = this.preloadManifest.bind(this);
      // Setup a listener for the hero video loaded event
      window.addEventListener('heroVideoLoaded', this.boundPreloadManifest);
    }
  },
  beforeUnmount() {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Clean up event listener using the same bound function reference
    if (window && this.boundPreloadManifest) {
      window.removeEventListener('heroVideoLoaded', this.boundPreloadManifest);
    }
  },
  methods: {
    /**
     * @description Sets up intersection observer for performance-optimized video loading
     * @public
     * @method setupIntersectionObserver
     * @performance Only loads video when component becomes visible (within 400px margin)
     * @fallback Uses immediate render for browsers without IntersectionObserver support
     */
    setupIntersectionObserver() {
      // Only run on client
      if (process.client && 'IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            // console.log('Background video container is now visible');
            this.isVisible = true;
            
            // If we're more than 400px close to the container, start loading
            // Even if we're not fully visible yet
            if (entry.intersectionRatio > 0) {
              this.loadVideoWithDelay();
            }
          } else {
            // Still track when it's not visible, but don't unload
            // the video to prevent reloading when scrolling back
            this.isVisible = false;
          }
        }, {
          // Start loading earlier with a generous margin
          rootMargin: '400px 0px',
          threshold: [0, 0.1]
        });
        
        // Start observing our container element
        this.observer.observe(this.$el);
      } else {
        // Fallback for browsers without IntersectionObserver
        this.forceRender = true;
      }
    },
    
    /**
     * @description Loads background video with strategic delay to prioritize hero video
     * @public
     * @method loadVideoWithDelay
     * @performance Waits for hero video completion before loading background video
     * @delay 200ms initial delay, 1000ms fallback if hero video not detected
     */
    loadVideoWithDelay() {
      // Add a small delay to ensure hero video gets priority
      // and caching system has time to initialize
      setTimeout(() => {
        // Double check if hero is loaded before proceeding
        if (window && window.heroVideoLoaded) {
          // console.log('Background video loading after hero video completed');
          this.forceRender = true;
        } else {
          // console.log('Waiting for hero video before loading background');
          setTimeout(() => this.forceRender = true, 1000);
        }
      }, 200);
    },
    
    /**
     * @description Preloads DASH manifest file for faster video initialization
     * @public
     * @method preloadManifest
     * @performance Preloads only the manifest, not the video content itself
     * @triggered Called when hero video loading completes
     */
    preloadManifest() {
      // console.log('Preloading background video manifest');
      // Just preload the manifest file, not the video itself
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = '/assets/dash/video/adaptive.mpd';
      preloadLink.as = 'fetch';
      preloadLink.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink);
    },
    
    handleDashError(error) {
      // console.warn('Background video DASH error:', error);
      this.videoStatus = 'fallback';
    },
    
    /**
     * @description Handles critical DASH failures for background video
     * @public
     * @method handleDashFailed
     * @param {Error} error - Error object from DASH.js failure
     * @fires dash-failed - Proxied to parent components
     * @fallback Sets video status to 'fallback' for static background
     */
    handleDashFailed(error) {
      // We're keeping error logs as they provide essential diagnostic information
      console.error('Background video DASH failed:', error);
      this.videoStatus = 'fallback';
    },
    
    /**
     * @description Handles successful background video player initialization with optimization
     * @public
     * @method handlePlayerReady
     * @param {Object} player - The initialized DASH.js player instance
     * @fires player-ready - Proxied to parent components
     * @optimization Applies performance optimizations when hero video is already loaded
     */
    handlePlayerReady(player) {
      // console.log('Background video player ready');
      this.videoStatus = 'ready';
      
      // If hero video already loaded and set up DASH, we can optimize some settings
      if (window && window.heroVideoLoaded) {
        // We know DASH is working, so we can optimize for second load
        try {
          player.updateSettings({
            streaming: {
              // Lower initial buffer for background video since we know DASH is working
              buffer: {
                initialBufferLevel: 1
              },
              // Can start with slightly lower quality for background since it's less critical
              abr: {
                initialBitrate: {
                  video: 1500 // Start with 1.5mbps
                }
              }
            }
          });
          
          // If we have advanced cache from dashPlugins, report metrics
          if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
            window.dashCache.reportMetrics('background-video', {
              loadTime: Date.now(),
              source: 'dash',
              heroVideoPreloaded: true
            });
          }
        } catch (err) {
          // console.warn('Could not update background video settings:', err);
        }
      }
    }
  }
}
</script>

<style scoped>
.fixed-video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10; /* Place it behind all content */
  overflow: hidden;
  pointer-events: none; /* Allow interaction with content above */
}

/* We no longer need to hide the fixed video container, just pause the video */
:global(.reduce-motion) .fixed-video-container {
  z-index: -10 !important; /* Keep it behind content */
}

.full-screen {
  width: 100vw !important;
  height: 100vh !important;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.fixed-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

/* Mobile responsiveness enhancements */
@media (max-width: 768px) {
  .fixed-video-container {
    height: 100vh !important;
    width: 100% !important;
  }
  
  .fixed-video {
    height: 100vh !important;
    width: 100vw !important;
    object-fit: cover !important;
  }
}

/* Screen reader only class for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Handle reduce motion preference - now just affects video playback */

/* We no longer need to hide videos - just pause them */
</style>