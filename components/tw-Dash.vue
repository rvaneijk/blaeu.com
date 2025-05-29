<!-- 
  @component tw-Dash
  @description Hero video component that displays a full-screen DASH video with a scroll indicator.
  Handles video loading states, preloads background videos, and supports accessibility features.
  Uses tw-VideoPlayer for video rendering and provides event handlers for player states.
  @example
  <tw-Dash />
-->
<template>
  <div class="w-full">
    <!-- Full-width video container with height constraint and negative margin to remove gap -->
    <div class="w-full relative overflow-hidden h-screen mb-[-2px]">
      <!-- No need for a static image anymore -->
      
      <!-- Video version (hidden when reduced motion is enabled) -->
      <div class="video-container w-full h-full">
        <tw-VideoPlayer
          :dashSource="'/assets/dash/video/adaptive.mpd'"
          :fallbackSource="'/assets/dash/video/GettyImages-1368070487.mp4'"
          :lazyLoad="false"
          :useCachedPlayer="true"
          :decorative="true"
          :userControlled="true"
          :showCustomControls="true"
          videoTitle="Corporate headquarters entrance with modern architecture"
          customClass="w-full h-full object-cover"
          @dash-error="handleDashError"
          @dash-failed="handleDashFailed"
          @player-ready="handlePlayerReady"
          @quality-change="handleQualityChange"
        />
      </div>
      
      <!-- Elegant scroll indicator with FontAwesome -->
      <div class="absolute left-0 right-0 flex flex-col items-center z-20 bottom-32 sm:bottom-28 md:bottom-20 lg:bottom-12">
        <div class="text-white text-sm font-light tracking-widest mb-2 opacity-80">EXPLORE</div>
        <!-- Click handler for smooth scrolling to About section -->
        <a 
          href="#about-us" 
          @click.prevent="scrollToAbout" 
          class="cursor-pointer"
          aria-label="Scroll down to explore more content"
        >
          <i class="fas fa-chevron-down text-white text-2xl opacity-80 animate-bounce-subtle" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue')
  },
  
  /**
   * Component state
   * @property {string} videoStatus - Current video loading state ('loading', 'ready', 'fallback')
   * @property {Object|null} currentQuality - Current video quality information
   */
  data() {
    return {
      videoStatus: 'loading',
      currentQuality: null
    }
  },
  
  methods: {
    /**
     * Scrolls smoothly to the About section when the scroll indicator is clicked
     * @param {Event} event - Click event object
     */
    scrollToAbout(event) {
      event.preventDefault();
      const aboutSection = document.querySelector('#about-us');
      if (aboutSection) {
        // Using scrollIntoView for better browser compatibility
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    
    /**
     * Handles non-critical DASH errors by switching to fallback video
     * @param {Error} error - Error object from DASH.js
     */
    handleDashError(error) {
      // console.warn('Top video DASH error:', error);
      this.videoStatus = 'fallback';
    },
    
    /**
     * Handles critical DASH failures that prevent playback
     * @param {Error} error - Error object from DASH.js
     */
    handleDashFailed(error) {
      console.error('Top video DASH failed:', error); // Keeping error log for essential diagnostics
      this.videoStatus = 'fallback';
    },
    
    /**
     * Updates component state when video quality changes
     * @param {Object} qualityInfo - Quality information from DASH player
     */
    handleQualityChange(qualityInfo) {
      this.currentQuality = qualityInfo;
      // console.log('Top video quality changed:', qualityInfo);
    },
    
    /**
     * Handles successful player initialization
     * Dispatches heroVideoLoaded event for other components
     * Triggers preloading of background video
     * Reports metrics to dashCache if available
     * @param {Object} player - Reference to the DASH player instance
     */
    handlePlayerReady(player) {
      // console.log('Top video player ready');
      this.videoStatus = 'ready';
      
      // Store a flag to indicate Top video was loaded
      if (window) {
        window.heroVideoLoaded = true;
        
        // Dispatch an event that the fixed background video can listen for
        try {
          const heroLoadedEvent = new Event('heroVideoLoaded');
          window.dispatchEvent(heroLoadedEvent);
        } catch (err) {
          // console.warn('Error dispatching heroVideoLoaded event:', err);
        }
        
        // Preload background video dash manifest
        this.preloadBackgroundVideo();
        
        // If we have advanced cache from dashPlugins, report metrics
        if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
          window.dashCache.reportMetrics('hero-video', {
            loadTime: Date.now(),
            source: 'dash'
          });
        }
      }
    },
    
    /**
     * Preloads the background video manifest to improve loading performance
     * Creates a preload link in the document head
     */
    preloadBackgroundVideo() {
      // Preload the background video manifest
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = '/assets/dash/video/adaptive.mpd';
      preloadLink.as = 'fetch';
      preloadLink.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink);
      
      // Log preload for debugging
      // console.log('Preloaded background video manifest');
    }
  }
}
</script>

<style scoped>
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
}

/* Handle reduce motion preference - now just affects animation */

/* We no longer need to hide videos - just pause them */

:global(.reduce-motion) .animate-bounce-subtle {
  animation: none !important;
}
</style>