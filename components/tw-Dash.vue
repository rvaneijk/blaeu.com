<!-- 
  @component tw-Dash
  @description Progressive hero component that serves static images on mobile for performance
  and full DASH video on desktop for premium experience. Uses device detection for optimization.
  Handles video loading states, preloads background videos, and supports accessibility features.
  
  @example Basic usage with default settings
  <tw-Dash />
  
  @example Custom video sources with user controls
  <tw-Dash 
    dashSource="/assets/video/custom.mpd"
    fallbackSource="/assets/video/custom.mp4"
    videoTitle="Custom hero video"
    :decorative="false"
    :userControlled="true"
    :showCustomControls="true"
    @player-ready="handleVideoReady"
    @dash-error="handleVideoError"
  />
  
  @example Accessibility-focused configuration
  <tw-Dash 
    videoTitle="Corporate overview showcasing our modern office environment"
    :decorative="false"
    :userControlled="true"
    @image-loaded="handleContentReady"
    @dash-failed="handleVideoFallback"
  />
-->
<template>
  <div class="w-full">
    <!-- Full-width video container with height constraint and negative margin to remove gap -->
    <div class="w-full relative overflow-hidden h-screen mb-[-2px]">
      <!-- Mobile: Static image for performance -->
      <div v-if="shouldUseLightweight" class="static-hero w-full h-full">
        <tw-HeroImage
          :mobile-webp="'/assets/img/hero-mobile.webp'"
          :mobile-image="'/assets/img/hero-mobile.png'"
          :desktop-webp="'/assets/img/hero-desktop.webp'"
          :desktop-image="'/assets/img/hero-desktop.png'"
          :lazy-load="false"
          alt-text="Network visualization showing team connections with blue node points representing people, connected by golden lines"
          custom-class="w-full h-full"
          @image-loaded="handleImageReady"
          @image-error="handleImageError"
        />
      </div>
      
      <!-- Desktop: Video version for premium experience -->
      <div v-else class="video-container w-full h-full">
        <tw-VideoPlayer
          :dashSource="dashSourceUrl"
          :fallbackSource="fallbackSourceUrl"
          :lazyLoad="false"
          :useCachedPlayer="true"
          :decorative="isVideoDecorative"
          :userControlled="userControlled"
          :showCustomControls="showCustomControls"
          :videoTitle="videoTitle"
          customClass="w-full h-full object-cover"
          @dash-error="handleDashError"
          @dash-failed="handleDashFailed"
          @player-ready="handlePlayerReady"
          @quality-change="handleQualityChange"
        />
      </div>
      
      <!-- Hero Content Overlay -->
      <div class="absolute inset-0 flex items-center justify-center z-20 pb-20 sm:pb-24 md:pb-28 lg:pb-36">
        <div class="text-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-5xl">
          <!-- Main Headline -->
          <h1 class="text-white font-bold leading-tight mb-4 drop-shadow-lg hero-headline">
            Expertise at the Intersection of AI, Law & Security
          </h1>
          
          <!-- Sub-headline -->
          <p class="text-white font-light leading-relaxed opacity-90 drop-shadow-md hero-subheadline">
            We help organizations navigate complex regulations and build secure, compliant AI systems.
          </p>
        </div>
      </div>
      
      <!-- Elegant scroll indicator with FontAwesome -->
      <div class="absolute left-0 right-0 flex flex-col items-center z-20 bottom-32 sm:bottom-28 md:bottom-20 lg:bottom-12">
        <div class="text-white font-light tracking-widest mb-2 opacity-80 hero-explore">EXPLORE</div>
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
import { errorHandler } from '~/composables/errorHandler';
import { URLValidator } from '@/utils/validation';

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  SOURCES: {
    DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
    DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4'
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
  name: 'DashVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue'),
    'tw-HeroImage': () => import('~/components/tw-HeroImage.vue')
  },
  
  /**
   * @description Component props with comprehensive documentation
   * @typedef {Object} DashVideoProps
   * @property {string} dashSource - URL path to the DASH manifest file (.mpd)
   * @property {string} fallbackSource - URL path to the fallback MP4 video file
   * @property {string} videoTitle - Accessible title for the video content
   * @property {boolean} decorative - Whether video is decorative or meaningful content
   * @property {boolean} userControlled - Whether user should be able to control playback
   * @property {boolean} showCustomControls - Whether to show custom overlay controls
   */
  props: {
    /**
     * @description URL path to the DASH manifest file for adaptive streaming
     * @type {String}
     * @default '/assets/dash/video/adaptive.mpd'
     * @example '/assets/video/hero.mpd'
     * @validator Must end with '.mpd' and start with '/'
     */
    dashSource: {
      type: String,
      default: '/assets/dash/video/adaptive.mpd',
      validator(value) {
        if (!value || value.length === 0) return false;
        return value.endsWith('.mpd') && value.startsWith('/');
      }
    },
    /**
     * @description URL path to the fallback MP4 video file (used when DASH fails or on mobile)
     * @type {String}
     * @default '/assets/dash/video/GettyImages-1368070487.mp4'
     * @example '/assets/video/hero-fallback.mp4'
     * @validator Must end with '.mp4' and start with '/'
     */
    fallbackSource: {
      type: String,
      default: '/assets/dash/video/GettyImages-1368070487.mp4',
      validator(value) {
        if (!value || value.length === 0) return false;
        return value.endsWith('.mp4') && value.startsWith('/');
      }
    },
    /**
     * @description Accessible title describing the video content for screen readers
     * @type {String}
     * @default 'Corporate headquarters entrance with modern architecture'
     * @example 'Company introduction video showing our team and values'
     * @validator Must be 1-200 characters
     * @accessibility Critical for non-decorative videos
     */
    videoTitle: {
      type: String,
      default: 'Corporate headquarters entrance with modern architecture',
      validator(value) {
        return value && value.length > 0 && value.length <= 200;
      }
    },
    /**
     * @description Whether the video is purely decorative (background) or has meaningful content
     * @type {Boolean}
     * @default true
     * @example false // Video has meaningful content that users should be able to control
     * @accessibility When true, video is hidden from screen readers
     */
    decorative: {
      type: Boolean,
      default: true
    },
    /**
     * @description Whether users should be able to control video playback
     * @type {Boolean}
     * @default true
     * @example false // Disable user controls for purely decorative videos
     * @requires decorative should be false when userControlled is true
     */
    userControlled: {
      type: Boolean,
      default: true
    },
    /**
     * @description Whether to show custom overlay controls (play/pause/mute/captions)
     * @type {Boolean}
     * @default true
     * @example false // Use browser default controls instead
     * @requires userControlled must be true to show controls
     */
    showCustomControls: {
      type: Boolean,
      default: true
    }
  },
  
  /**
   * @description Events and custom event dispatching by the tw-Dash component
   * @typedef {Object} DashVideoEvents
   * @event heroVideoLoaded - Custom window event dispatched when content is ready
   * @event player-ready - Proxied from child VideoPlayer component
   * @event dash-error - Proxied from child VideoPlayer component
   * @event dash-failed - Proxied from child VideoPlayer component
   * @event quality-change - Proxied from child VideoPlayer component
   * @event image-loaded - Proxied from child HeroImage component
   * @event image-error - Proxied from child HeroImage component
   */
  emits: {
    /**
     * @description Proxied event from child VideoPlayer when DASH player is ready
     * @param {Object} player - The initialized DASH.js player instance
     * @example
     * <tw-Dash @player-ready="handleVideoReady" />
     * 
     * handleVideoReady(player) {
     *   console.log('Hero video player ready:', player);
     * }
     */
    'player-ready': (player) => {
      return player && typeof player === 'object';
    },
    
    /**
     * @description Proxied event from child VideoPlayer for DASH errors
     * @param {Object} payload - Error information object
     * @param {Error} payload.error - The error object
     * @param {string} payload.message - Human-readable error message
     * @example
     * <tw-Dash @dash-error="handleHeroError" />
     * 
     * handleHeroError({ error, message }) {
     *   console.warn('Hero video error:', message);
     * }
     */
    'dash-error': (payload) => {
      return payload && typeof payload.error === 'object' && typeof payload.message === 'string';
    },
    
    /**
     * @description Proxied event from child VideoPlayer for DASH failures
     * @param {Object} payload - Failure information object
     * @param {Error} payload.error - The error that caused the failure
     * @param {string} payload.message - Human-readable failure message
     * @example
     * <tw-Dash @dash-failed="handleHeroFailure" />
     * 
     * handleHeroFailure({ error, message }) {
     *   console.error('Hero video failed:', message);
     *   // Maybe show fallback content or notification
     * }
     */
    'dash-failed': (payload) => {
      return payload && typeof payload.error === 'object' && typeof payload.message === 'string';
    },
    
    /**
     * @description Proxied event from child VideoPlayer for quality changes
     * @param {Object} qualityInfo - Quality information object
     * @param {number} qualityInfo.bitrate - Current bitrate in kbps
     * @param {string} qualityInfo.qualityLabel - Quality label (HD, Medium, Low, Mobile)
     * @example
     * <tw-Dash @quality-change="handleQualityChange" />
     * 
     * handleQualityChange({ bitrate, qualityLabel }) {
     *   console.log(`Hero video quality: ${qualityLabel} (${bitrate}kbps)`);
     * }
     */
    'quality-change': (qualityInfo) => {
      return qualityInfo && typeof qualityInfo.bitrate === 'number' && typeof qualityInfo.qualityLabel === 'string';
    },
    
    /**
     * @description Proxied event from child HeroImage when image loads successfully
     * @param {Event} event - Image load event
     * @example
     * <tw-Dash @image-loaded="handleImageReady" />
     * 
     * handleImageReady(event) {
     *   console.log('Hero image loaded successfully');
     * }
     */
    'image-loaded': (event) => {
      return event && typeof event === 'object';
    },
    
    /**
     * @description Proxied event from child HeroImage when image fails to load
     * @param {Error} error - Image loading error
     * @example
     * <tw-Dash @image-error="handleImageError" />
     * 
     * handleImageError(error) {
     *   console.error('Hero image failed to load:', error);
     * }
     */
    'image-error': (error) => {
      return error && typeof error === 'object';
    }
  },
  
  /**
   * Component state
   * @property {string} contentStatus - Current content loading state ('loading', 'ready', 'fallback')
   * @property {Object|null} currentQuality - Current video quality information
   * @property {string} contentType - Type of content being shown ('image', 'video')
   */
  data() {
    return {
      contentStatus: 'loading',
      currentQuality: null,
      isVideoDecorative: true,   // Start as decorative to skip loading spinner
      contentType: 'unknown',    // Track what type of content is shown
      dashSourceUrl: this.dashSource,
      fallbackSourceUrl: this.fallbackSource
    }
  },
  
  setup() {
    // Use device detection composable
    const { shouldUseLightweight, shouldPreloadVideo, isMobile, isDesktop } = useDeviceDetection()
    
    return {
      shouldUseLightweight,
      shouldPreloadVideo,
      isMobile,
      isDesktop
    }
  },
  
  methods: {
    /**
     * Validates video source URL for security and format compliance
     * @param {string} src - Video source URL to validate
     * @returns {boolean} True if source is valid, false otherwise
     */
    validateVideoSource(src) {
      const validation = URLValidator.validateVideoSource(src);
      if (!validation.isValid) {
        console.warn(`Invalid video source: ${src} - ${validation.error}`);
        return false;
      }
      return true;
    },

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
     * Handles successful image loading (mobile/lightweight mode)
     */
    handleImageReady() {
      this.contentStatus = 'ready'
      this.contentType = 'image'
      this.dispatchContentLoadedEvent()
    },
    
    /**
     * Handles image loading errors
     * @param {Error} error - Error object from image loading
     */
    handleImageError(error) {
      errorHandler.warning('Hero image failed to load', error, { component: 'Dash' })
      this.contentStatus = 'fallback'
      this.contentType = 'image'
    },
    
    /**
     * Handles non-critical DASH errors by switching to fallback video
     * @param {Error} error - Error object from DASH.js
     */
    handleDashError(error) {
      errorHandler.warning('Top video DASH error', error, { component: 'Dash' });
      this.contentStatus = 'fallback';
    },
    
    /**
     * Handles critical DASH failures that prevent playback
     * @param {Error} error - Error object from DASH.js
     */
    handleDashFailed(error) {
      errorHandler.error('Top video DASH failed', error, { component: 'Dash' });
      this.contentStatus = 'fallback';
    },
    
    /**
     * Updates component state when video quality changes
     * @param {Object} qualityInfo - Quality information from DASH player
     */
    handleQualityChange(qualityInfo) {
      this.currentQuality = qualityInfo;
      errorHandler.debug('Top video quality changed', qualityInfo, { component: 'Dash' });
    },
    
    /**
     * Handles successful player initialization
     * Dispatches heroVideoLoaded event for other components
     * Triggers preloading of background video
     * Reports metrics to dashCache if available
     * @param {Object} player - Reference to the DASH player instance
     */
    handlePlayerReady(player) {
      errorHandler.debug('Top video player ready', null, { component: 'Dash' });
      this.contentStatus = 'ready';
      this.contentType = 'video';
      
      // Video was already decorative to skip loading spinner
      
      this.dispatchContentLoadedEvent();
      
      // If we have advanced cache from dashPlugins, report metrics
      if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
        window.dashCache.reportMetrics('hero-video', {
          loadTime: Date.now(),
          source: 'dash',
          contentType: this.contentType
        });
      }
    },
    
    /**
     * Dispatches content loaded event for background video component
     * Works for both image and video content types
     */
    dispatchContentLoadedEvent() {
      if (window) {
        window.heroVideoLoaded = true;
        
        // Dispatch an event that the fixed background video can listen for
        try {
          const heroLoadedEvent = new CustomEvent('heroVideoLoaded', {
            detail: {
              contentType: this.contentType,
              isMobile: this.isMobile,
              isLightweight: this.shouldUseLightweight
            }
          });
          window.dispatchEvent(heroLoadedEvent);
        } catch (err) {
          errorHandler.warning('Error dispatching heroVideoLoaded event', err, { component: 'Dash' });
        }
      }
    },
    
  },
  
  /**
   * Lifecycle hook - set content type based on device detection
   */
  mounted() {
    // Set content type immediately based on device detection
    this.contentType = this.shouldUseLightweight ? 'image' : 'video';
    
    // Validate video sources and fallback to empty if invalid
    if (!this.validateVideoSource(this.dashSourceUrl)) {
      errorHandler.error('Invalid DASH source URL in tw-Dash', { source: this.dashSourceUrl }, { component: 'Dash' });
      this.dashSourceUrl = '';
    }
    
    if (!this.validateVideoSource(this.fallbackSourceUrl)) {
      errorHandler.error('Invalid fallback source URL in tw-Dash', { source: this.fallbackSourceUrl }, { component: 'Dash' });
      this.fallbackSourceUrl = '';
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

/* Hero text sizing with !important */
.hero-explore {
  font-size: 16px !important; /* text-base - matches navbar exactly */
  font-weight: 300 !important; /* font-light */
}

.hero-subheadline {
  font-size: 16px !important; /* text-base - matches navbar exactly */
  font-weight: 300 !important; /* font-light */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important; /* Enhanced readability */
}

.hero-headline {
  font-size: 22px !important; /* Slightly larger for mobile impact */
  font-weight: 700 !important; /* font-bold */
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6) !important; /* Enhanced readability */
}

/* Responsive headline sizing */
@media (min-width: 640px) {
  .hero-headline {
    font-size: 26px !important; /* Slightly larger for small screens */
  }
}

@media (min-width: 768px) {
  .hero-headline {
    font-size: 32px !important; /* Medium screens - good balance */
  }
}

@media (min-width: 1024px) {
  .hero-headline {
    font-size: 38px !important; /* Large screens - impactful but not overwhelming */
  }
}

/* Handle reduce motion preference - now just affects animation */
:global(.reduce-motion) .animate-bounce-subtle {
  animation: none !important;
}
</style>