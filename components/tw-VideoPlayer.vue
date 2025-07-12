<!-- 
  @component tw-VideoPlayer
  @description A responsive video player component that supports DASH streaming protocol with fallback
  to standard HTML5 video. Includes accessibility features like reduced motion support, captions,
  and ARIA attributes. Can be configured as purely decorative or interactive with user controls.
  
  @example Basic decorative background video
  <tw-VideoPlayer 
    dashSource="/assets/dash/video/background.mpd"
    fallbackSource="/assets/dash/video/background.mp4"
    :decorative="true"
    :lazyLoad="false"
    customClass="hero-video"
  />
  
  @example Interactive video with user controls
  <tw-VideoPlayer 
    dashSource="/assets/dash/video/presentation.mpd"
    fallbackSource="/assets/dash/video/presentation.mp4"
    captionSrc="/assets/captions/presentation-en.vtt"
    :decorative="false"
    :userControlled="true"
    :showCustomControls="true"
    videoTitle="Company presentation video"
    @player-ready="handlePlayerReady"
    @dash-error="handleDashError"
    @quality-change="handleQualityChange"
  />
  
  @example Lazy-loaded video with custom intersection observer settings
  <tw-VideoPlayer 
    dashSource="/assets/dash/video/content.mpd"
    fallbackSource="/assets/dash/video/content.mp4"
    :decorative="false"
    :lazyLoad="true"
    rootMargin="100px 0px"
    videoTitle="Educational content video"
  />
  
  @example Accessibility-focused video with full features
  <tw-VideoPlayer 
    dashSource="/assets/dash/video/accessible.mpd"
    fallbackSource="/assets/dash/video/accessible.mp4"
    captionSrc="/assets/captions/accessible-en.vtt"
    :decorative="false"
    :userControlled="true"
    :showCustomControls="true"
    videoTitle="Accessible educational video about web development"
    @player-ready="setupAccessibilityFeatures"
    @dash-failed="handleAccessibilityFallback"
  />
-->
<template>
  <div class="video-container" :class="{'with-overlay-controls': !decorative}" style="position: relative;">
    <!-- Loading placeholder - only show for non-decorative videos -->
    <div 
      v-if="!decorative && !videoReady" 
      class="video-loading-placeholder"
      :aria-label="`Loading ${sanitizedVideoTitle}`"
      role="status"
    >
      <div class="loading-content">
        <div class="loading-spinner" aria-hidden="true">
          <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <p class="loading-text">Loading video...</p>
      </div>
    </div>
    
    <!-- Single video element with dynamic source management -->
    <video 
      ref="videoPlayer"
      class="video-element"
      :class="[customClass, {'decorative-video': decorative}]"
      autoplay
      muted
      :loop="currentSource === 'dash'"
      playsinline
      preload="auto"
      :controls="!decorative && userControlled"
      :aria-label="sanitizedVideoTitle"
      :aria-hidden="decorative ? 'true' : 'false'"
      @loadstart="onVideoLoadStart"
      @canplay="onVideoCanPlay"
      @loadeddata="onVideoLoadedData"
      @error="onVideoError"
      @ended="onVideoEnded"
      @timeupdate="onVideoTimeUpdate"
      @play="onVideoPlay"
      @pause="onVideoPause"
      @playing="onVideoPlaying"
    >
      <!-- NO SOURCE ELEMENTS IN TEMPLATE - Managed purely via JavaScript to avoid Vue conflicts -->
      <track kind="captions" :src="captionSrc || '/assets/dash/video/captions-en.vtt'" srclang="en" label="English">
      <p>Your browser does not support the video tag. This animation shows a network visualization with glowing blue location pins containing person silhouettes, connected by golden lines, representing our team approach to data protection.</p>
    </video>
    
    <!-- Custom accessible overlay controls (shown only when decorative=false and userControlled=true) -->
    <div v-if="!decorative && userControlled && showCustomControls" class="video-overlay-controls">
      <button 
        @click="togglePlayPause" 
        class="video-control-btn"
        aria-label="Play/Pause video"
      >
        <i :class="[isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play']" aria-hidden="true"></i>
      </button>
      <button 
        @click="toggleMute" 
        class="video-control-btn"
        aria-label="Toggle mute"
      >
        <i :class="[isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high']" aria-hidden="true"></i>
      </button>
      <button 
        v-if="!decorative && captionSrc"
        @click="toggleCaptions" 
        class="video-control-btn"
        aria-label="Toggle captions"
      >
        <i class="fa-solid fa-closed-captioning" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Import statements with logical grouping
 */
import { ref, onMounted, onUnmounted } from 'vue';
import { globalState } from '~/composables/globalState';
import { errorHandler } from '~/composables/errorHandler';
import { URLValidator, sanitizeTitle } from '@/utils/validation';
import { useVideoPlayer } from '~/composables/useVideoPlayer';
import { useVideoRecovery } from '~/composables/useVideoRecovery';
import { useVideoValidation } from '~/composables/useVideoValidation';

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  SOURCES: {
    DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
    DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4',
    DEFAULT_CAPTIONS: '/assets/dash/video/captions-en.vtt'
  },
  INTERSECTION: {
    ROOT_MARGIN_DEFAULT: '200px 0px'
  },
  TIMING: {
    STARTUP_DELAY: 10,
    CAPTION_RETRY_DELAYS: [100, 500, 1000]
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
  name: 'VideoPlayer',
  /**
   * @description Component props with comprehensive documentation
   * @typedef {Object} VideoPlayerProps
   * @property {string} dashSource - URL path to the DASH manifest file (.mpd)
   * @property {string} fallbackSource - URL path to the fallback MP4 video file
   * @property {boolean} lazyLoad - Whether to defer video loading until it enters viewport
   * @property {string} rootMargin - Intersection observer root margin (CSS margin format)
   * @property {string} customClass - Additional CSS classes to apply to video element
   * @property {boolean} useCachedPlayer - Whether to use cached DASH player instance
   * @property {boolean} decorative - Whether video is decorative (background) or meaningful content
   * @property {boolean} userControlled - Whether user should be able to control playback
   * @property {string} videoTitle - Accessible title for the video (used for screen readers)
   * @property {string} captionSrc - Source URL for captions file (VTT format)
   * @property {boolean} showCustomControls - Whether to show custom overlay controls
   */
  props: {
    /**
     * @description URL path to the DASH manifest file (.mpd format)
     * @type {String}
     * @default '/assets/dash/video/adaptive.mpd'
     * @example '/assets/dash/video/my-video.mpd'
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
     * @description URL path to the fallback MP4 video file (used when DASH fails)
     * @type {String}
     * @default '/assets/dash/video/GettyImages-1368070487.mp4'
     * @example '/assets/video/fallback.mp4'
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
     * @description Whether to defer video loading until it enters the viewport
     * @type {Boolean}
     * @default false
     * @example true // Video loads only when scrolled into view
     */
    lazyLoad: {
      type: Boolean,
      default: false
    },
    /**
     * @description Intersection observer root margin (CSS margin format)
     * @type {String}
     * @default '200px 0px'
     * @example '100px 50px' // Load video when 100px from top/bottom, 50px from sides
     * @validator Must match CSS margin format pattern
     */
    rootMargin: {
      type: String,
      default: '200px 0px',
      validator(value) {
        // Basic validation for CSS margin format
        return /^\d+px(\s+\d+px){0,3}$/.test(value);
      }
    },
    /**
     * @description Additional CSS classes to apply to the video element
     * @type {String}
     * @default ''
     * @example 'rounded-lg shadow-xl' // Add styling classes
     * @validator Must be valid CSS class names or empty string
     */
    customClass: {
      type: String,
      default: '',
      validator(value) {
        // Allow empty string or valid CSS class names
        return value === '' || /^[a-zA-Z][a-zA-Z0-9\-_\s]*$/.test(value);
      }
    },
    /**
     * @description Whether to use cached DASH player instance for better performance
     * @type {Boolean}
     * @default true
     * @example false // Create new player instance each time
     */
    useCachedPlayer: {
      type: Boolean,
      default: true
    },
    
    
    /**
     * @description Defer initialization until explicitly triggered (for PageSpeed optimization)
     * @default false
     */
    deferInitialization: {
      type: Boolean,
      default: false
    },
    /**
     * @description Whether this video is purely decorative (background) or has meaningful content
     * @type {Boolean}
     * @default true
     * @example false // Video has meaningful content, not just decoration
     * @accessibility When true, video is hidden from screen readers
     */
    decorative: {
      type: Boolean,
      default: true,
      description: 'Whether this video is purely decorative (background) or has meaningful content'
    },
    /**
     * @description Whether user should be able to control playback
     * @type {Boolean}
     * @default false
     * @example true // Show play/pause/mute controls
     * @requires decorative must be false to show controls
     */
    userControlled: {
      type: Boolean,
      default: false,
      description: 'Whether user should be able to control playback'
    },
    /**
     * @description Accessible title for the video (used for screen readers and ARIA labels)
     * @type {String}
     * @default 'Video content'
     * @example 'Company introduction video'
     * @validator Must be 1-200 characters
     * @accessibility Critical for non-decorative videos
     */
    videoTitle: {
      type: String,
      default: 'Video content',
      description: 'Accessible title for the video (used when not decorative)',
      validator(value) {
        return value && value.length > 0 && value.length <= 200;
      }
    },
    /**
     * @description Source URL for captions file (WebVTT format)
     * @type {String}
     * @default ''
     * @example '/assets/captions/video-en.vtt'
     * @validator Must end with '.vtt' and start with '/' when provided
     * @accessibility Improves accessibility for hearing-impaired users
     */
    captionSrc: {
      type: String,
      default: '',
      description: 'Source URL for captions file (VTT format)',
      validator(value) {
        if (value === '') return true; // Allow empty
        return value.endsWith('.vtt') && value.startsWith('/');
      }
    },
    /**
     * @description Whether to show custom overlay controls (play/pause/mute/captions)
     * @type {Boolean}
     * @default false
     * @example true // Show custom styled controls over video
     * @requires decorative must be false and userControlled must be true
     */
    showCustomControls: {
      type: Boolean,
      default: false,
      description: 'Whether to show the custom overlay controls'
    }
  },
  
  /**
   * @description Events emitted by the VideoPlayer component
   * @typedef {Object} VideoPlayerEvents
   * @event player-ready - Emitted when DASH player is successfully initialized
   * @event dash-error - Emitted when DASH player encounters a recoverable error
   * @event dash-failed - Emitted when DASH player fails completely and fallback is used
   * @event quality-change - Emitted when video quality changes (bitrate adaptation)
   */
  emits: {
    /**
     * @description Emitted when DASH player is successfully initialized and ready for playback
     * @param {Object} player - The initialized DASH.js player instance
     * @example
     * <tw-VideoPlayer @player-ready="handlePlayerReady" />
     * 
     * // In methods:
     * handlePlayerReady(player) {
     *   // Access player methods: player.play(), player.pause(), etc.
     * }
     */
    'player-ready': (player) => {
      return player && typeof player.play === 'function';
    },
    
    /**
     * @description Emitted when DASH player encounters a recoverable error
     * @param {Object} payload - Error information object
     * @param {Error} payload.error - The error object
     * @param {string} payload.message - Human-readable error message
     * @example
     * <tw-VideoPlayer @dash-error="handleDashError" />
     * 
     * // In methods:
     * handleDashError({ error, message }) {
     *   console.warn('DASH error:', message, error);
     *   // Handle error recovery, show user notification, etc.
     * }
     */
    'dash-error': (payload) => {
      return payload && typeof payload.error === 'object' && typeof payload.message === 'string';
    },
    
    /**
     * @description Emitted when DASH player fails completely and fallback video is used
     * @param {Object} payload - Failure information object
     * @param {Error} payload.error - The error that caused the failure
     * @param {string} payload.message - Human-readable failure message
     * @example
     * <tw-VideoPlayer @dash-failed="handleDashFailed" />
     * 
     * // In methods:
     * handleDashFailed({ error, message }) {
     *   console.error('DASH failed:', message, error);
     *   // Log to error tracking service, show fallback notice, etc.
     * }
     */
    'dash-failed': (payload) => {
      return payload && typeof payload.error === 'object' && typeof payload.message === 'string';
    },
    
    /**
     * @description Emitted when video quality changes due to adaptive bitrate streaming
     * @param {Object} qualityInfo - Quality information object
     * @param {number} qualityInfo.bitrate - Current bitrate in kbps
     * @param {string} qualityInfo.qualityLabel - Quality label (HD, Medium, Low, Mobile)
     * @param {number} qualityInfo.width - Video width in pixels
     * @param {number} qualityInfo.height - Video height in pixels
     * @example
     * <tw-VideoPlayer @quality-change="handleQualityChange" />
     * 
     * // In methods:
     * handleQualityChange({ bitrate, qualityLabel, width, height }) {
     *   // Update quality indicator UI, track analytics, etc.
     * }
     */
    'quality-change': (qualityInfo) => {
      return qualityInfo && typeof qualityInfo === 'object';
    },
    
    /**
     * @description Emitted when DASH stream is initialized
     * @param {Object} streamInfo - Stream initialization information
     */
    'stream-initialized': (streamInfo) => {
      return streamInfo && typeof streamInfo === 'object';
    }
  },
  
  /**
   * Component's reactive state
   * @returns {Object} Reactive data properties used throughout the component
   */
  setup(props, { emit }) {
    // Use composables
    const videoPlayer = useVideoPlayer();
    const videoRecovery = useVideoRecovery();
    const videoValidation = useVideoValidation();
    
    // Component state
    const observer = ref(null);
    const dashFailed = ref(false);
    const videoLoaded = ref(false);
    const trackAddHandler = ref(null);
    const isPlaying = ref(true);
    const isMuted = ref(true);
    const captionsEnabled = ref(false);
    const videoReady = ref(false);
    const cleanupRecoveryListeners = ref(null);
    
    // Component refs
    const videoElement = ref(null);
    
    return {
      // Composable methods (not state to avoid readonly conflicts)
      initializePlayer: videoPlayer.initializePlayer,
      setQuality: videoPlayer.setQuality,
      play: videoPlayer.play,
      pause: videoPlayer.pause,
      cleanup: videoPlayer.cleanup,
      
      // Composable state (readonly)
      player: videoPlayer.player,
      dashLoaded: videoPlayer.dashLoaded,
      isInitializing: videoPlayer.isInitializing,
      
      // Other composables
      videoRecovery,
      videoValidation,
      
      // Component state
      observer,
      dashFailed,
      videoLoaded,
      trackAddHandler,
      isPlaying,
      isMuted,
      captionsEnabled,
      videoReady,
      cleanupRecoveryListeners,
      
      // Component refs
      videoElement
    };
  },
  
  data() {
    return {
      // Simplified state management
      currentSource: 'mp4', // 'mp4' | 'dash' | null
      playerState: 'loading', // 'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'
      transitionInProgress: false,
      dashPlayerReady: false,
      sourceTransitionTime: 0,
      // Local defer state (copy of prop for modification)
      isDeferred: this.deferInitialization
    }
  },
  
  computed: {
    sanitizedVideoTitle() {
      return sanitizeTitle(this.videoTitle);
    }
  },
  
  /**
   * Component lifecycle hook that initializes the video player
   * Sets up accessibility features, initializes the player or observer,
   * and attaches event listeners for accessibility changes
   */
  mounted() {
    if (process.client) {
      // Debug: Test development mode detection
      if (process.dev || import.meta.dev) {
        console.log('🔧 VideoPlayer: Development mode detected, console logs enabled');
      }
      
      // CRITICAL: Set MP4 source IMMEDIATELY to prevent video restart/flash
      this.setInitialVideoSource();
      
      // Reduced delay for faster video startup - settings should be ready immediately
      setTimeout(() => {
        // Check for reduced motion and captions state before initializing player
        this.checkReducedMotion();
        this.checkCaptionsState();
        
        // Setup recovery listeners
        this.cleanupRecoveryListeners = this.videoRecovery.setupVisibilityListeners(() => {
          this.handleRecoveryCallback();
        });
        
        // Then initialize player or observer
        if (this.isDeferred) {
          // Defer initialization for PageSpeed optimization (background videos)
          // Will be triggered by parent component when actually needed
          return;
        } else if (this.lazyLoad && 'IntersectionObserver' in window) {
          this.setupIntersectionObserver();
        } else {
          // Initialize single video element with source switching
          this.initializeVideoWithSourceSwitching();
        }
        
        // Listen for changes to reduced motion setting
        document.addEventListener('reduceMotionChange', this.handleReduceMotionChange);
        
        // Listen for changes to captions setting
        document.addEventListener('captionsChange', this.handleCaptionsChange);
        
      }, VIDEO_CONFIG.TIMING.STARTUP_DELAY);
    }
  },
  /**
   * Component methods to handle player functionality, accessibility,
   * and DASH integration
   */
  methods: {
    /**
     * Handle recovery callback from visibility changes
     */
    handleRecoveryCallback() {
      const videoElement = this.$refs.videoPlayer;
      this.videoRecovery.recoverFromVisibilityChange(
        {
          videoLoaded: this.videoLoaded,
          dashFailed: this.dashFailed,
          isInitializing: this.isInitializing,
          decorative: this.decorative,
          videoReady: this.videoReady,
          isPlaying: this.isPlaying,
          playerState: this.playerState,
          currentSource: this.currentSource
        },
        videoElement,
        this.player,
        () => this.initializeVideoPlayer()
      );
    },

    /**
     * @description Initialize video player using the composable with comprehensive validation
     * @public
     * @async
     * @method initializeVideoPlayer
     * @returns {Promise<void>} Promise that resolves when initialization is complete
     * @throws {Error} When video source validation fails or player initialization fails
     * @fires player-ready - When DASH player is successfully initialized
     * @fires dash-failed - When initialization fails and fallback is used
     * @example
     * // Manual initialization (usually not needed as component auto-initializes)
     * await this.$refs.videoPlayer.initializeVideoPlayer();
     */
    async initializeVideoPlayer() {
      if (this.videoLoaded || this.isInitializing) return;

      // Validate video sources first
      const sourceValidation = this.videoValidation.validateVideoSources({
        dashSource: this.dashSource,
        fallbackSource: this.fallbackSource
      });

      if (!sourceValidation.allValid) {
        errorHandler.error('Invalid video sources', sourceValidation.errors, { component: 'VideoPlayer' });
        this.dashFailed = true;
        return;
      }

      try {
        // Different initialization strategies for hero vs background videos
        const initOptions = {
          useCachedPlayer: false, // Hero videos use fresh players for optimal performance
          emit: this.$emit,
          playerId: `${this.getVideoType()}-${Date.now()}`, // Unique player ID
          videoType: this.getVideoType(), // Pass video type for better cache isolation
          namespace: 'hero', // Namespace isolation
          forceNewPlayer: true // Force new player for hero for optimal performance
        };
        
        
        const result = await this.initializePlayer(
          this.$refs.videoPlayer,
          this.dashSource,
          initOptions
        );

        if (result.success) {
          this.videoLoaded = true;
          this.dashPlayerReady = true;
          
          if (process.client && (process.dev || import.meta.dev)) {
            console.log('🎯 DASH player ready for source switching:', {
              dashPlayerReady: this.dashPlayerReady,
              currentSource: this.currentSource,
              playerState: this.playerState
            });
          }
          
          // Player is already managed by the composable
          if (!this.decorative) {
            this.videoReady = true;
          }
          this.videoRecovery.resetRecoveryAttempts();
          // Player reference is already managed by the composable
          this.$emit('player-ready', result.player);
          
          // Add DASH segment tracking
          this.setupDashSegmentLogging();
          
          // Check if MP4 has already ended and we need to switch to DASH
          if (this.currentSource === 'mp4') {
            const videoElement = this.$refs.videoPlayer;
            if (videoElement && videoElement.ended) {
              this.switchSourceToDash();
            }
          }
        }
      } catch (error) {
        errorHandler.error('Failed to initialize video player', error, { component: 'VideoPlayer' });
        this.dashFailed = true;
        this.$emit('dash-failed', {
          error,
          message: 'Failed to initialize video player'
        });
      }
    },

    /**
     * Set initial MP4 source immediately during mount to prevent restart
     */
    setInitialVideoSource() {
      const videoElement = this.$refs.videoPlayer;
      if (!videoElement || !this.fallbackSource) return;
      
      // Set source immediately before any autoplay can happen
      const sourceElement = document.createElement('source');
      sourceElement.src = this.fallbackSource;
      sourceElement.type = 'video/mp4';
      
      // Insert source as first element
      videoElement.insertBefore(sourceElement, videoElement.firstChild);
      this.currentSource = 'mp4';
      this.playerState = 'loading';
      
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('📺 MP4 source set immediately during mount - no restart');
      }
    },

    /**
     * Initialize video with source switching strategy
     */
    async initializeVideoWithSourceSwitching() {
      // MP4 source already set in setInitialVideoSource - just initialize DASH
      this.prepareDashPlayer();
    },
    
    /**
     * Fallback to MP4 when DASH fails
     */
    fallbackToMp4() {
      
      // Create MP4 element fallback
      const dashElement = this.$refs.videoPlayer;
      if (dashElement) {
        dashElement.innerHTML = `
          <source src="${this.fallbackSource}" type="video/mp4">
          <track kind="captions" src="${this.captionSrc || '/assets/dash/video/captions-en.vtt'}" srclang="en" label="English">
          <p>Your browser does not support the video tag. This animation shows a network visualization with glowing blue location pins containing person silhouettes, connected by golden lines, representing our team approach to data protection.</p>
        `;
        
        // Configure for video playback
        dashElement.autoplay = true;
        dashElement.muted = true;
        dashElement.loop = true;
        dashElement.playsInline = true;
        
        // Start MP4 fallback playback
        dashElement.load();
        dashElement.play().catch(error => {
          errorHandler.warning('Video MP4 fallback failed', error, { component: 'VideoPlayer' });
        });
      }
    },
    
    /**
     * Manually trigger initialization for deferred videos (PageSpeed optimization)
     */
    triggerInitialization() {
      if (!this.isDeferred) return;
      
      // Clear the defer flag and initialize
      this.isDeferred = false;
      
      // Initialize with source switching strategy
      this.initializeVideoWithSourceSwitching();
    },



    /**
     * Set video source and update state
     */
    setVideoSource(sourceType) {
      const videoElement = this.$refs.videoPlayer;
      if (!videoElement) return;
      
      this.currentSource = sourceType;
      
      if (sourceType === 'mp4') {
        // Check if MP4 source already exists (set during mount)
        const existingSource = videoElement.querySelector('source[type="video/mp4"]');
        
        if (existingSource) {
          if (process.client && (process.dev || import.meta.dev)) {
            console.log('📺 MP4 source already set - skipping to avoid restart');
          }
          return; // Source already set, don't reload
        }
        
        // Set MP4 source - browser will handle loading
        if (this.fallbackSource && this.fallbackSource.length > 0) {
          // Create and add MP4 source element manually
          const sourceElement = document.createElement('source');
          sourceElement.src = this.fallbackSource;
          sourceElement.type = 'video/mp4';
          
          // Insert source as first element
          videoElement.insertBefore(sourceElement, videoElement.firstChild);
          
          videoElement.load();
          this.playerState = 'loading';
          
          if (process.client && (process.dev || import.meta.dev)) {
            console.log('📺 MP4 source set for instant playback via DOM manipulation');
          }
        } else {
          if (process.client && (process.dev || import.meta.dev)) {
            console.log('⚠️ No valid MP4 source provided, skipping MP4 phase');
          }
          this.playerState = 'error';
        }
      }
    },

    /**
     * Prepare DASH player in background without disrupting MP4 playback
     */
    async prepareDashPlayer() {
      // Small delay to let MP4 start first
      await new Promise(resolve => setTimeout(resolve, 200));
      
      try {
        // Check if DASH source is valid
        if (!this.dashSource || this.dashSource.length === 0) {
          if (process.client && (process.dev || import.meta.dev)) {
            console.log('⚠️ No DASH source provided, skipping DASH preparation');
          }
          return;
        }
        
        // Ensure DASH.js is loaded
        if (window.dashCache) {
          await window.dashCache.loadDashJs();
        }
        
        // CRITICAL: Initialize DASH player WITHOUT attaching to video element
        // This prevents interference with MP4 playback
        await this.prepareDashPlayerOnly();
        
      } catch (error) {
        if (process.client && (process.dev || import.meta.dev)) {
          console.log('⚠️ DASH preparation failed, will continue with MP4:', error);
        }
        // Set state to indicate DASH is not available
        this.dashPlayerReady = false;
      }
    },

    /**
     * Initialize DASH player without attaching to video element
     */
    async prepareDashPlayerOnly() {
      // Create a temporary dummy video element for DASH player initialization
      // This prevents interference with the actual playing video
      const dummyVideo = document.createElement('video');
      dummyVideo.style.display = 'none'; // Hidden element
      document.body.appendChild(dummyVideo);
      
      try {
        const initOptions = {
          useCachedPlayer: false,
          emit: this.$emit,
          playerId: `${this.getVideoType()}-${Date.now()}`,
          videoType: this.getVideoType(),
          namespace: 'hero',
          forceNewPlayer: true
        };
        
        // Initialize DASH player on dummy element
        const result = await this.initializePlayer(
          dummyVideo,
          this.dashSource,
          initOptions
        );

        if (result.success) {
          this.videoLoaded = true;
          this.dashPlayerReady = true;
          
          if (process.client && (process.dev || import.meta.dev)) {
            console.log('🎯 DASH player ready for source switching (initialized on dummy element):', {
              dashPlayerReady: this.dashPlayerReady,
              currentSource: this.currentSource,
              playerState: this.playerState
            });
          }
          
          // Store player reference for later attachment to real video element
          this.player = result.player;
          
          this.$emit('player-ready', this.player);
        } else {
          this.dashFailed = true;
          this.$emit('dash-failed', {
            error: result.error,
            message: 'Failed to initialize DASH player'
          });
        }
      } finally {
        // Clean up dummy element
        if (dummyVideo.parentNode) {
          document.body.removeChild(dummyVideo);
        }
      }
    },

    /**
     * Switch video source from MP4 to DASH for adaptive streaming
     * Using non-reactive DOM approach to avoid Vue conflicts
     */
    async switchSourceToDash() {
      if (this.transitionInProgress || !this.dashPlayerReady || this.currentSource === 'dash') {
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`⏭️ [${new Date().toISOString()}] switchSourceToDash blocked:`, {
            transitionInProgress: this.transitionInProgress,
            dashPlayerReady: this.dashPlayerReady,
            currentSource: this.currentSource
          });
        }
        return;
      }

      if (process.client && (process.dev || import.meta.dev)) {
        console.log(`🔄 [${new Date().toISOString()}] Starting MP4 to DASH source switch with non-reactive approach:`, {
          currentSource: this.currentSource,
          dashPlayerReady: this.dashPlayerReady,
          playerState: this.playerState
        });
      }

      this.transitionInProgress = true;
      
      try {
        const videoElement = this.$refs.videoPlayer;
        if (!videoElement) {
          if (process.client && (process.dev || import.meta.dev)) {
            console.error(`❌ [${new Date().toISOString()}] No video element found for source switch`);
          }
          return;
        }
        
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`📍 [${new Date().toISOString()}] Video element state before switch:`, {
            paused: videoElement.paused,
            currentTime: videoElement.currentTime,
            readyState: videoElement.readyState,
            childElementCount: videoElement.childElementCount
          });
        }
        
        // Store current playback position and state
        this.sourceTransitionTime = videoElement.currentTime;
        const wasPlaying = !videoElement.paused;
        
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`💾 [${new Date().toISOString()}] Stored transition state:`, {
            time: this.sourceTransitionTime,
            wasPlaying
          });
        }
        
        // CRITICAL FIX: Manually clean DOM without triggering Vue reactivity
        videoElement.pause();
        videoElement.removeAttribute('src');
        
        // Remove ALL child elements directly (bypassing Vue)
        while (videoElement.firstChild) {
          videoElement.removeChild(videoElement.firstChild);
        }
        
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`🧹 [${new Date().toISOString()}] DOM manually cleaned, element state:`, {
            childElementCount: videoElement.childElementCount,
            innerHTML: videoElement.innerHTML
          });
        }
        
        // Set current source to DASH after DOM cleanup
        this.currentSource = 'dash';
        
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`🏁 [${new Date().toISOString()}] Set state after DOM cleanup - no Vue conflicts possible`);
        }
        
        // Attach DASH player to the clean video element
        if (this.player && this.player.attachView) {
          if (process.client && (process.dev || import.meta.dev)) {
            console.log(`🎯 [${new Date().toISOString()}] Attaching DASH player to clean element...`);
          }
          
          this.player.attachView(videoElement);
          
          if (process.client && (process.dev || import.meta.dev)) {
            console.log(`🔗 [${new Date().toISOString()}] DASH player attached successfully`);
          }
          
          // Continue playback from where MP4 left off
          if (this.sourceTransitionTime > 0) {
            videoElement.currentTime = this.sourceTransitionTime;
            if (process.client && (process.dev || import.meta.dev)) {
              console.log(`⏰ [${new Date().toISOString()}] Set video time to:`, this.sourceTransitionTime);
            }
          }
          
          // Resume playback if it was playing
          if (wasPlaying) {
            try {
              await videoElement.play();
              if (process.client && (process.dev || import.meta.dev)) {
                console.log(`▶️ [${new Date().toISOString()}] DASH playback resumed successfully`);
              }
            } catch (playError) {
              if (process.client && (process.dev || import.meta.dev)) {
                console.log(`⚠️ [${new Date().toISOString()}] DASH playback failed:`, playError);
              }
            }
          }
          
          // Update final state
          this.playerState = 'playing';
          
          if (process.client && (process.dev || import.meta.dev)) {
            console.log(`✅ [${new Date().toISOString()}] Source switch to DASH completed - DASH.js now controls element:`, {
              currentSource: this.currentSource,
              playerState: this.playerState
            });
          }
        }
        
      } catch (error) {
        if (process.client && (process.dev || import.meta.dev)) {
          console.error(`❌ [${new Date().toISOString()}] Source switch failed:`, error);
        }
        
        // Reset state on error
        this.currentSource = 'mp4';
        this.setVideoSource('mp4');
      } finally {
        this.transitionInProgress = false;
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`🏁 [${new Date().toISOString()}] Source switch completed, final state:`, {
            currentSource: this.currentSource,
            playerState: this.playerState,
            transitionInProgress: this.transitionInProgress
          });
        }
      }
    },

    /**
     * Setup detailed DASH segment logging for debugging
     */
    setupDashSegmentLogging() {
      if (!this.player || !window.dashjs) {
        return;
      }
      
      const videoType = this.getVideoType();
      
      // Log fragment loading events
      this.player.on(window.dashjs.MediaPlayer.events.FRAGMENT_LOADING_STARTED, (e) => {
        // Fragment loading started
      });
      
      this.player.on(window.dashjs.MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, (e) => {
        // Fragment loading completed
      });
      
      this.player.on(window.dashjs.MediaPlayer.events.FRAGMENT_LOADING_ABANDONED, (e) => {
        // Fragment loading abandoned
      });
      
      // Log buffer events
      this.player.on(window.dashjs.MediaPlayer.events.BUFFER_LOADED, (e) => {
        // Buffer loaded
      });
      
      // Log quality changes with segment info
      this.player.on(window.dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, (e) => {
        // Quality changed
      });
      
      // Log stream events
      this.player.on(window.dashjs.MediaPlayer.events.STREAM_INITIALIZED, (e) => {
        // Stream initialized
      });
      
      // Log playback events
      this.player.on(window.dashjs.MediaPlayer.events.PLAYBACK_STARTED, (e) => {
        if (process.client && (process.dev || import.meta.dev)) {
          console.log('🎬 DASH playback started:', {
            currentSource: this.currentSource,
            source: this.dashSource,
            timestamp: new Date().toISOString(),
            playerState: this.playerState,
            event: e
          });
        }
      });
      
      this.player.on(window.dashjs.MediaPlayer.events.PLAYBACK_PAUSED, (e) => {
        if (process.client && (process.dev || import.meta.dev)) {
          console.log('⏸️ DASH playback paused:', {
            currentSource: this.currentSource,
            source: this.dashSource,
            timestamp: new Date().toISOString()
          });
        }
      });
      
      this.player.on(window.dashjs.MediaPlayer.events.PLAYBACK_ENDED, (e) => {
        
        // Manually restart the video for looping since DASH.js doesn't handle native loop
        const dashElement = this.$refs.videoPlayer;
        if (dashElement) {
          dashElement.currentTime = 0;
          dashElement.play().then(() => {
          }).catch(error => {
          });
        }
      });
      
      // Log manifest events
      this.player.on(window.dashjs.MediaPlayer.events.MANIFEST_LOADED, (e) => {
        // Manifest loaded
      });
      
      // Log adaptation set info
      this.player.on(window.dashjs.MediaPlayer.events.STREAM_INITIALIZED, (e) => {
        if (this.player.getBitrateInfoListFor) {
          const videoBitrates = this.player.getBitrateInfoListFor('video');
        }
      });
      
      // Simplified status logging - removed interval for better performance
    },

    // Unified Video Event Handlers
    onVideoLoadStart() {
      this.playerState = 'loading';
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('📥 Video loading started:', {
          currentSource: this.currentSource,
          playerState: this.playerState
        });
      }
    },

    onVideoCanPlay() {
      this.playerState = 'ready';
      if (!this.decorative) {
        this.videoReady = true;
      }
      
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('📺 Video ready for playback:', {
          currentSource: this.currentSource,
          playerState: this.playerState,
          dashPlayerReady: this.dashPlayerReady
        });
      }
    },

    onVideoLoadedData() {
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('📥 Video data loaded:', {
          currentSource: this.currentSource,
          source: this.currentSource === 'mp4' ? this.fallbackSource : this.dashSource,
          timestamp: new Date().toISOString()
        });
      }
    },

    onVideoError(error) {
      this.playerState = 'error';
      if (this.currentSource === 'mp4') {
        // MP4 failed, try DASH if available
        if (this.dashPlayerReady) {
          this.switchSourceToDash();
        }
      } else {
        // DASH failed, fallback to MP4
        this.setVideoSource('mp4');
      }
    },

    async onVideoEnded() {
      this.playerState = 'ended';
      
      if (process.client && (process.dev || import.meta.dev)) {
        console.log(`🏁 [${new Date().toISOString()}] Video playback ended:`, {
          currentSource: this.currentSource,
          dashPlayerReady: this.dashPlayerReady,
          playerState: this.playerState,
          transitionInProgress: this.transitionInProgress
        });
      }
      
      // Switch to DASH for looping if available and currently on MP4
      if (this.currentSource === 'mp4' && this.dashPlayerReady) {
        if (process.client && (process.dev || import.meta.dev)) {
          console.log(`🔄 [${new Date().toISOString()}] MP4 ended, switching to DASH for seamless looping...`);
        }
        await this.switchSourceToDash();
      }
    },

    onVideoTimeUpdate(event) {
      // Store time for potential source switching
      this.sourceTransitionTime = event.target.currentTime;
    },

    onVideoPlay() {
      this.playerState = 'playing';
      this.isPlaying = true;
      
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('▶️ Video playback started:', {
          currentSource: this.currentSource,
          playerState: this.playerState,
          timestamp: new Date().toISOString()
        });
      }
    },

    onVideoPause() {
      this.playerState = 'paused';
      this.isPlaying = false;
      
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('⏸️ Video playback paused:', {
          currentSource: this.currentSource,
          playerState: this.playerState,
          timestamp: new Date().toISOString()
        });
      }
    },

    onVideoPlaying() {
      this.playerState = 'playing';
      this.isPlaying = true;
      
      if (process.client && (process.dev || import.meta.dev)) {
        console.log('🎬 Video actually playing:', {
          currentSource: this.currentSource,
          playerState: this.playerState,
          timestamp: new Date().toISOString()
        });
      }
    },


    /**
     * Get video type for logging purposes
     */
    getVideoType() {
      return 'HERO-DASH';
    },

    /**
     * Get specific player type for logging (MP4 vs DASH)
     */
    getPlayerType(playerType = 'GENERAL') {
      // All videos are now hero videos with dual-loading strategy
      if (playerType === 'MP4') {
        return 'HERO-MP4';
      } else if (playerType === 'DASH') {
        return 'HERO-DASH';
      }
      return 'HERO-DUAL'; // For general dual-loading messages
    },

    /**
     * Event handler for document-level reduced motion changes
     * @param {Event} event - The reduceMotionChange event
     */
    handleReduceMotionChange(event) {
      this.checkReducedMotion();
    },
    
    /**
     * Event handler for document-level captions changes
     * Updates the player's caption state based on the event
     * @param {CustomEvent} event - The captionsChange event with detail.enabled property
     */
    handleCaptionsChange(event) {
      if (event && event.detail) {
        // Update captions using the event detail
        this.captionsEnabled = event.detail.enabled;
        this.applyCaptionsState(event.detail.enabled);
      }
    },
    
    // These methods are now handled by the recovery composable automatically
    
    
    /**
     * Ensures video looping is maintained - called when visibility changes
     */
    ensureVideoLooping() {
      this.videoRecovery.ensureVideoLooping(this.$refs.videoPlayer, this.isPlaying);
    },
    
    /**
     * Check if the player is in a healthy state and try to recover if not
     */
    checkPlayerHealth() {
      this.videoRecovery.checkPlayerHealth(
        this.$refs.videoPlayer,
        this.player,
        () => this.initializeVideoPlayer()
      );
    },
    
    /**
     * Checks for reduced motion setting and controls video/DASH player accordingly
     * Also ensures captions state is maintained separately from motion state
     * 
     * This is a critical accessibility method that:
     * 1. Checks if reduced motion is enabled via DOM class or global state
     * 2. Pauses videos when reduced motion is enabled
     * 3. Maintains independent captions state regardless of motion settings
     */
    checkReducedMotion() {
      // Check both the DOM class and the global state
      const isReducedMotion = document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion;
      
      // Apply the class if only set in global state but not yet in DOM
      if (globalState.reduceMotion && !document.documentElement.classList.contains('reduce-motion')) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      // Get current captions state from global state (source of truth)
      const shouldHaveCaptions = globalState.videoCaptions;
      
      if (isReducedMotion) {
        // Pause both HTML5 video and DASH player
        this.pausePlayer();
      } else if (this.isPlaying) {
        // Only play if it was previously playing
        this.playPlayer();
      }
      
      // Always apply captions based on global state - CRUCIAL to keep captions state independent of motion
      if (shouldHaveCaptions !== this.captionsEnabled) {
        this.captionsEnabled = shouldHaveCaptions;
        this.applyCaptionsState(shouldHaveCaptions);
      }
    },
    
    // Checks for captions state and applies it to video tracks
    checkCaptionsState() {
      // Check both the DOM class and the global state
      // Global state takes precedence over the DOM class
      const captionsEnabled = globalState.videoCaptions || document.documentElement.classList.contains('captions-enabled');
      
      // Apply the class if set in global state but not yet in DOM
      if (globalState.videoCaptions && !document.documentElement.classList.contains('captions-enabled')) {
        document.documentElement.classList.add('captions-enabled');
      }
      
      // Update video track state based on captions setting
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      // Update component state first
      this.captionsEnabled = captionsEnabled;
      
      // Try applying captions immediately
      this.applyCaptionsState(captionsEnabled);
      
      // Also set up a watcher for when tracks might load asynchronously
      if (video.textTracks) {
        // Set up a handler for the 'addtrack' event
        const handleAddTrack = () => {
          this.applyCaptionsState(captionsEnabled);
        };
        
        // Store event handler in the component instance for cleanup
        this.trackAddHandler = handleAddTrack;
        
        // Apply current setting and listen for future changes
        video.textTracks.addEventListener('addtrack', this.trackAddHandler);
        
        // Also try again with delay in case tracks are loading asynchronously
        VIDEO_CONFIG.TIMING.CAPTION_RETRY_DELAYS.forEach(delay => {
          setTimeout(() => this.applyCaptionsState(captionsEnabled), delay);
        });
      }
      
      // Update global state to ensure consistency
      // Only update if different to avoid circular updates
      if (globalState.videoCaptions !== captionsEnabled) {
        globalState.videoCaptions = captionsEnabled;
      }
    },
    
    // Helper method to apply captions state to video tracks
    applyCaptionsState(enabled) {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      // Get all text tracks
      const tracks = video.textTracks;
      if (tracks && tracks.length > 0) {
        for (let i = 0; i < tracks.length; i++) {
          if (tracks[i].kind === 'captions') {
            // Set the mode based on caption state
            tracks[i].mode = enabled ? 'showing' : 'hidden';
          }
        }
      }
      
      // Also update the local component state to match
      this.captionsEnabled = enabled;
    },
    
    // Pause both HTML5 video and DASH player
    pausePlayer() {
      // Get captions state from global state to ensure consistency
      const captionsState = globalState.videoCaptions;
      
      // Pause HTML5 video element
      const video = this.$refs.videoPlayer;
      if (video && !video.paused) {
        video.pause();
        this.isPlaying = false;
      }
      
      // Pause DASH player using composable
      this.pause();
      
      // Always set captions based on global state
      this.captionsEnabled = captionsState;
      this.applyCaptionsState(captionsState);
      
      // For DASH players, ensure captions are preserved if enabled
      if (captionsState && this.player && this.player.setTextTrack) {
        try {
          this.player.setTextTrack(0); // Enable first track
        } catch (e) {
          errorHandler.warning('Could not set DASH text track', e, { component: 'VideoPlayer' });
        }
      }
    },
    
    // Play both HTML5 video and DASH player
    playPlayer() {
      // Only play if not in reduced motion mode
      if (document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion) {
        return;
      }
      
      // Get captions state from global state to ensure consistency
      const captionsState = globalState.videoCaptions;
      
      // Play HTML5 video element
      const video = this.$refs.videoPlayer;
      if (video && video.paused) {
        video.play().catch(err => errorHandler.warning('Could not play video', err, { component: 'VideoPlayer' }));
        this.isPlaying = true;
      }
      
      // Play DASH player using composable
      this.play();
      
      // Always set captions based on global state
      this.captionsEnabled = captionsState;
      this.applyCaptionsState(captionsState);
      
      // For DASH players, ensure captions are preserved if enabled
      if (captionsState && this.player && this.player.setTextTrack) {
        try {
          this.player.setTextTrack(0); // Enable first track
        } catch (e) {
          errorHandler.warning('Could not set DASH text track', e, { component: 'VideoPlayer' });
        }
      }
    },
    
    /**
     * @description Toggle video playback between playing and paused states
     * @public
     * @method togglePlayPause
     * @fires player-ready - May be emitted if DASH player needs re-initialization
     * @accessibility Announces state changes to screen readers
     * @example
     * // In template:
     * <button @click="$refs.videoPlayer.togglePlayPause()">Play/Pause</button>
     * 
     * // In component methods:
     * this.$refs.videoPlayer.togglePlayPause();
     */
    togglePlayPause() {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      if (video.paused) {
        video.play();
        this.isPlaying = true;
        
        // Also play DASH player using composable
        this.play();
        
        // Announce to screen readers
        const { $announce } = useNuxtApp();
        if ($announce) {
          $announce('Video playing', 'polite');
        }
      } else {
        video.pause();
        this.isPlaying = false;
        
        // Also pause DASH player using composable
        this.pause();
        
        // Announce to screen readers
        const { $announce } = useNuxtApp();
        if ($announce) {
          $announce('Video paused', 'polite');
        }
      }
    },
    
    /**
     * @description Toggle video audio between muted and unmuted states
     * @public
     * @method toggleMute
     * @accessibility Announces mute state changes to screen readers
     * @example
     * // In template:
     * <button @click="$refs.videoPlayer.toggleMute()">Mute/Unmute</button>
     * 
     * // In component methods:
     * this.$refs.videoPlayer.toggleMute();
     */
    toggleMute() {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      video.muted = !video.muted;
      this.isMuted = video.muted;
      
      // Announce to screen readers
      const { $announce } = useNuxtApp();
      if ($announce) {
        $announce(video.muted ? 'Video muted' : 'Video unmuted', 'polite');
      }
    },
    
    /**
     * @description Toggle video captions/subtitles on and off
     * @public
     * @method toggleCaptions
     * @accessibility Updates global captions state and announces changes
     * @example
     * // In template:
     * <button @click="$refs.videoPlayer.toggleCaptions()">Toggle Captions</button>
     * 
     * // In component methods:
     * this.$refs.videoPlayer.toggleCaptions();
     */
    toggleCaptions() {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      // Toggle captions state
      this.captionsEnabled = !this.captionsEnabled;
      
      // Update global state
      globalState.videoCaptions = this.captionsEnabled;
      
      // Update DOM class for global usage
      if (this.captionsEnabled) {
        document.documentElement.classList.add('captions-enabled');
      } else {
        document.documentElement.classList.remove('captions-enabled');
      }
      
      // Apply to text tracks
      this.applyCaptionsState(this.captionsEnabled);
      
      // Also try again with delays for any asynchronously loading tracks
      VIDEO_CONFIG.TIMING.CAPTION_RETRY_DELAYS.slice(0, 2).forEach(delay => {
        setTimeout(() => this.applyCaptionsState(this.captionsEnabled), delay);
      });
      
      // Announce to screen readers
      const { $announce } = useNuxtApp();
      if ($announce) {
        $announce(
          this.captionsEnabled ? 'Captions enabled' : 'Captions disabled', 
          'polite'
        );
      }
      
      // Dispatch an event to notify other components
      try {
        const captionsEvent = new CustomEvent('captionsChange', { 
          detail: { enabled: this.captionsEnabled } 
        });
        document.dispatchEvent(captionsEvent);
      } catch (err) {
        errorHandler.warning('Error dispatching captionsChange event', err, { component: 'VideoPlayer' });
      }
      
      // For DASH players, also try to update mode directly if available
      if (this.player && this.player.setTextTrack) {
        try {
          this.player.setTextTrack(this.captionsEnabled ? 0 : -1);
        } catch (e) {
          errorHandler.warning('Could not set DASH text track', e, { component: 'VideoPlayer' });
        }
      }
    },
    
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !this.videoLoaded) {
          errorHandler.debug('Video player visible, initializing', { source: this.dashSource }, { component: 'VideoPlayer' });
          this.initializeVideoPlayer();
          this.observer.disconnect();
        }
      }, {
        rootMargin: this.rootMargin
      });
      
      this.observer.observe(this.$refs.videoPlayer);
    },
    
    // Delegate to composable - method kept for backward compatibility
    initializePlayer() {
      return this.initializeVideoPlayer();
    },
    
    /**
     * Validates video source URL for security and format compliance
     * @param {string} src - Video source URL to validate
     * @returns {boolean} True if source is valid, false otherwise
     */
    validateVideoSource(src) {
      const validation = this.videoValidation.validateVideoSource(src);
      return validation.isValid;
    },

    /**
     * @description Validates that the player is properly set up and working
     * @public
     * @method validatePlayerSetup
     * @returns {boolean} True if player is validated as working, false otherwise
     * @example
     * // Check if player is healthy before performing operations
     * if (this.$refs.videoPlayer.validatePlayerSetup()) {
     *   // Player is ready for operations
     *   this.$refs.videoPlayer.togglePlayPause();
     * } else {
     *   // Handle player not ready state
     *   console.warn('Player not ready for operations');
     * }
     */
    validatePlayerSetup() {
      const validation = this.videoValidation.validatePlayerSetup(
        this.player,
        this.$refs.videoPlayer,
        this.dashSource
      );
      return validation.isValid;
    },
    
    // These large methods are now handled by composables
    
    // Method to manually switch quality - delegate to composable
    setVideoQuality(qualityIndex) {
      this.setQuality(qualityIndex);
    },
    
    /**
     * Comprehensive memory cleanup to prevent leaks
     */
    performMemoryCleanup() {
      errorHandler.debug('Starting comprehensive memory cleanup', null, { component: 'VideoPlayer' });
      
      // Clean up intersection observer
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      
      // Clean up recovery listeners
      if (this.cleanupRecoveryListeners) {
        this.cleanupRecoveryListeners();
      }
      
      // Remove event listeners
      if (process.client) {
        document.removeEventListener('reduceMotionChange', this.handleReduceMotionChange);
        document.removeEventListener('captionsChange', this.handleCaptionsChange);
        
        // Clean up textTracks event listener
        const video = this.$refs.videoPlayer;
        if (video && video.textTracks && this.trackAddHandler) {
          video.textTracks.removeEventListener('addtrack', this.trackAddHandler);
          this.trackAddHandler = null;
        }
        
        // Clean up video element resources
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
          
          // Remove all source elements
          while (video.firstChild) {
            video.removeChild(video.firstChild);
          }
        }
      }
      
      // Use composable cleanup
      this.cleanup(this.useCachedPlayer, this.dashSource);
      
      // Clear component state
      this.videoLoaded = false;
      this.dashFailed = false;
      this.trackAddHandler = null;
      
      // Report cleanup to memory monitoring if available
      if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
        window.dashCache.reportMetrics('video-cleanup', {
          timestamp: Date.now(),
          component: 'VideoPlayer',
          action: 'cleanup'
        });
      }
    }
  },
  beforeUnmount() {
    // Enhanced memory cleanup
    this.performMemoryCleanup();
  }
};
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* When used as fixed background video */
.video-element.fixed-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* Mobile responsive enhancements */
@media (max-width: 768px) {
  .video-container {
    position: relative;
    height: 100% !important;
    width: 100% !important;
    overflow: hidden;
  }
  
  .video-element {
    width: 100% !important;
    height: 100% !important; 
    object-fit: cover !important;
    min-height: 100vh;
  }
}

/* Custom Video Controls */
.video-overlay-controls {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.75rem;
  border-radius: 2rem;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.with-overlay-controls:hover .video-overlay-controls,
.with-overlay-controls:focus-within .video-overlay-controls {
  opacity: 1;
}

.video-control-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.video-control-btn:hover,
.video-control-btn:focus {
  background-color: rgba(255, 255, 255, 0.4);
}

.video-control-btn:focus-visible {
  outline: 3px solid #ffcc00;
  outline-offset: 2px;
}

/* Ensure WCAG 2.2 Level AA contrast for controls */
.video-control-btn i {
  font-size: 1.25rem;
  color: white;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
}

/* Ensure controls are big enough for touch targets (44×44px) */
@media (max-width: 640px) {
  .video-control-btn {
    width: 3.5rem;
    height: 3.5rem;
  }
}

/* Video Loading Placeholder Styles */
.video-loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-spinner {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffcc00;
}

.loading-text {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

.video-hidden {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-element:not(.video-hidden) {
  opacity: 1;
}

/* Prevent white flash during video loading */
.video-element {
  background-color: #1a1a1a;
}

/* Single video element styles */
.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>