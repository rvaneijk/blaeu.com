<!-- tw-FixedBackgroundVideo.vue -->
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

export default {
  name: 'FixedBackgroundVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue')
  },
  data() {
    return {
      videoStatus: 'loading',
      isVisible: false,
      forceRender: false,
      observer: null
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
      // Setup a listener for the hero video loaded event
      window.addEventListener('heroVideoLoaded', this.preloadManifest);
    }
  },
  beforeUnmount() {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Clean up event listener
    if (window) {
      window.removeEventListener('heroVideoLoaded', this.preloadManifest);
    }
  },
  methods: {
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
    
    handleDashFailed(error) {
      // We're keeping error logs as they provide essential diagnostic information
      console.error('Background video DASH failed:', error);
      this.videoStatus = 'fallback';
    },
    
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