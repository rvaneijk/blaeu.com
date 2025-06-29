<!-- 
  @component tw-VideoPlayer
  @description A responsive video player component that supports DASH streaming protocol with fallback
  to standard HTML5 video. Includes accessibility features like reduced motion support, captions,
  and ARIA attributes. Can be configured as purely decorative or interactive with user controls.
  @example
  <tw-VideoPlayer 
    dashSource="/path/to/dash/file.mpd"
    fallbackSource="/path/to/fallback.mp4"
    :decorative="false"
    :userControlled="true"
    videoTitle="Promotional video"
  />
-->
<template>
  <div class="video-container" :class="{'with-overlay-controls': !decorative}">
    <!-- Loading placeholder - only show for non-decorative videos -->
    <div 
      v-if="!decorative && !videoReady" 
      class="video-loading-placeholder"
      :aria-label="`Loading ${videoTitle}`"
      role="status"
    >
      <div class="loading-content">
        <div class="loading-spinner" aria-hidden="true">
          <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <p class="loading-text">Loading video...</p>
      </div>
    </div>
    
    <video 
      ref="videoPlayer"
      class="video-element"
      :class="[customClass, {'decorative-video': decorative, 'video-hidden': !decorative && !videoReady}]"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      :controls="!decorative && userControlled"
      :aria-label="videoTitle"
      :aria-hidden="decorative ? 'true' : 'false'"
      @loadstart="onVideoLoadStart"
      @canplay="onVideoCanPlay"
      @loadeddata="onVideoLoadedData"
      @error="onVideoError"
      @ended="onVideoEnded"
    >
      <!-- Fallback for browsers that don't support DASH - only render when needed -->
      <source v-if="dashFailed" :src="fallbackSource" type="video/mp4">
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
import { globalState } from '~/composables/globalState';

export default {
  name: 'VideoPlayer',
  /**
   * Component props with descriptions
   */
  props: {
    dashSource: {
      type: String,
      default: '/assets/dash/video/adaptive.mpd'
    },
    fallbackSource: {
      type: String,
      default: '/assets/dash/video/GettyImages-1368070487.mp4'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    rootMargin: {
      type: String,
      default: '200px 0px'
    },
    customClass: {
      type: String,
      default: ''
    },
    useCachedPlayer: {
      type: Boolean,
      default: true
    },
    // New accessibility props
    decorative: {
      type: Boolean,
      default: true,
      description: 'Whether this video is purely decorative (background) or has meaningful content'
    },
    userControlled: {
      type: Boolean,
      default: false,
      description: 'Whether user should be able to control playback'
    },
    videoTitle: {
      type: String,
      default: 'Video content',
      description: 'Accessible title for the video (used when not decorative)'
    },
    captionSrc: {
      type: String,
      default: '',
      description: 'Source URL for captions file (VTT format)'
    },
    showCustomControls: {
      type: Boolean,
      default: false,
      description: 'Whether to show the custom overlay controls'
    }
  },
  /**
   * Component's reactive state
   * @returns {Object} Reactive data properties used throughout the component
   */
  data() {
    return {
      player: null,                // DASH.js player instance
      videoLoaded: false,          // Flag to track if video has been loaded
      observer: null,              // IntersectionObserver for lazy loading
      dashLoaded: false,           // Flag to track if DASH.js has been loaded successfully
      dashFailed: false,           // Flag to trigger fallback source if DASH fails
      currentQuality: 0,           // Current video quality index
      cacheAttempted: false,       // Flag to track if cache retrieval was attempted
      trackAddHandler: null,       // Store reference to textTracks event handler for cleanup
      // Video control state
      isPlaying: true,             // Track if video is currently playing
      isMuted: true,               // Track if video is currently muted
      captionsEnabled: false,      // Track if captions are currently enabled
      // Loading state
      videoReady: false,           // Track if video is ready to show (hide loading placeholder)
      // Health check interval
      healthCheckInterval: null,   // Store interval ID for cleanup
      lastHealthCheck: Date.now()  // Track last health check time
    }
  },
  /**
   * Component lifecycle hook that initializes the video player
   * Sets up accessibility features, initializes the player or observer,
   * and attaches event listeners for accessibility changes
   */
  mounted() {
    if (process.client) {
      // Add a small delay to ensure accessibility settings are applied first
      setTimeout(() => {
        // Check for reduced motion and captions state before initializing player
        this.checkReducedMotion();
        this.checkCaptionsState();
        
        // Then initialize player or observer
        if (this.lazyLoad && 'IntersectionObserver' in window) {
          this.setupIntersectionObserver();
        } else {
          this.initializePlayer();
        }
        
        // Listen for changes to reduced motion setting
        document.addEventListener('reduceMotionChange', this.handleReduceMotionChange);
        
        // Listen for changes to captions setting
        document.addEventListener('captionsChange', this.handleCaptionsChange);
        
        // Add page visibility change listener to handle tab switching
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Set up periodic health check to prevent video stopping
        this.setupVideoHealthCheck();
      }, 50); // Small delay to ensure settings are loaded first
    }
  },
  /**
   * Component methods to handle player functionality, accessibility,
   * and DASH integration
   */
  methods: {
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
    
    /**
     * Handles page visibility changes to ensure videos work after tab switching
     * This fixes issues where videos don't load after browser idle time
     */
    handleVisibilityChange() {
      if (!document.hidden) {
        // Page became visible again
        // Update last health check time
        this.lastHealthCheck = Date.now();
        
        // Check if video should be playing but isn't loaded
        if (!this.videoLoaded && !this.dashFailed) {
          // Reset and retry initialization
          setTimeout(() => {
            this.retryVideoInitialization();
          }, 100);
        } else if (this.player && this.videoLoaded) {
          // Player exists but might be in a bad state, try to recover
          this.checkPlayerHealth();
          // Also ensure video is still looping and playing
          this.ensureVideoLooping();
        }
      }
    },
    
    /**
     * Retry video initialization with reset
     */
    retryVideoInitialization() {
      // Reset flags
      this.videoLoaded = false;
      this.dashLoaded = false;
      this.dashFailed = false;
      
      // Reset video ready state for non-decorative videos
      if (!this.decorative) {
        this.videoReady = false;
      }
      
      // Try initialization again
      if (this.lazyLoad && 'IntersectionObserver' in window) {
        // Re-setup intersection observer if needed
        if (this.observer) {
          this.observer.disconnect();
        }
        this.setupIntersectionObserver();
      } else {
        this.initializePlayer();
      }
    },
    
    /**
     * Sets up periodic health check to prevent video from stopping
     * Runs every 5 minutes to ensure video is still playing and looping
     */
    setupVideoHealthCheck() {
      // Clear any existing interval
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval);
      }
      
      // Set up health check every 5 minutes (300000ms)
      this.healthCheckInterval = setInterval(() => {
        // Only run health check if page is visible and video should be playing
        if (!document.hidden && this.videoLoaded && !this.dashFailed) {
          this.performHealthCheck();
        }
      }, 300000); // 5 minutes
    },
    
    /**
     * Performs comprehensive health check on video player
     */
    performHealthCheck() {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      // Update last health check time
      this.lastHealthCheck = Date.now();
      
      // Check if video should be playing but isn't
      const shouldBePlaying = !document.documentElement.classList.contains('reduce-motion') && 
                             !globalState.reduceMotion;
      
      if (shouldBePlaying) {
        // Ensure video is playing
        if (video.paused && this.isPlaying) {
          video.play().catch(err => console.warn('Health check: Could not resume video:', err));
        }
        
        // Ensure loop attribute is still set
        if (!video.loop) {
          video.loop = true;
        }
        
        // For DASH player, ensure it's also playing
        if (this.player && typeof this.player.isPaused === 'function' && this.player.isPaused()) {
          if (typeof this.player.play === 'function') {
            this.player.play();
          }
        }
      }
      
      // Check player health
      this.checkPlayerHealth();
    },
    
    /**
     * Ensures video looping is maintained - called when visibility changes
     */
    ensureVideoLooping() {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      // Ensure loop attribute is set
      if (!video.loop) {
        video.loop = true;
      }
      
      // If video should be playing but isn't, restart it
      const shouldBePlaying = !document.documentElement.classList.contains('reduce-motion') && 
                             !globalState.reduceMotion;
      
      if (shouldBePlaying && video.paused && this.isPlaying) {
        // Try to resume playback
        video.play().catch(err => {
          console.warn('Could not resume video after visibility change:', err);
          // If play fails, try reinitializing
          this.retryVideoInitialization();
        });
      }
    },
    
    /**
     * Check if the player is in a healthy state and try to recover if not
     */
    checkPlayerHealth() {
      const video = this.$refs.videoPlayer;
      if (!video || !this.player) return;
      
      // Check if video element has valid source
      if (video.readyState === 0 && video.networkState === 3) {
        // Network error - try to recover
        this.retryVideoInitialization();
      }
      
      // Check if video has ended unexpectedly (shouldn't happen with loop=true)
      if (video.ended && video.loop) {
        // Video ended despite loop being true - restart it
        video.currentTime = 0;
        if (!video.paused) {
          video.play().catch(err => console.warn('Could not restart looped video:', err));
        }
      }
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
        setTimeout(() => this.applyCaptionsState(captionsEnabled), 100);
        setTimeout(() => this.applyCaptionsState(captionsEnabled), 500);
        setTimeout(() => this.applyCaptionsState(captionsEnabled), 1000);
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
      
      // Pause DASH player if it exists and has pause method
      if (this.player && typeof this.player.pause === 'function') {
        this.player.pause();
      }
      
      // Always set captions based on global state
      this.captionsEnabled = captionsState;
      this.applyCaptionsState(captionsState);
      
      // For DASH players, ensure captions are preserved if enabled
      if (captionsState && this.player && this.player.setTextTrack) {
        try {
          this.player.setTextTrack(0); // Enable first track
        } catch (e) {
          console.warn('Could not set DASH text track:', e);
        }
      }
    },
    
    // Play both HTML5 video and DASH player
    playPlayer() {
      // Only play if not in reduced motion mode
      // Check both DOM class and global state
      if (document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion) {
        return;
      }
      
      // Get captions state from global state to ensure consistency
      const captionsState = globalState.videoCaptions;
      
      // Play HTML5 video element
      const video = this.$refs.videoPlayer;
      if (video && video.paused) {
        video.play().catch(err => console.warn('Could not play video:', err));
        this.isPlaying = true;
      }
      
      // Play DASH player if it exists and has play method
      if (this.player && typeof this.player.play === 'function') {
        this.player.play();
      }
      
      // Always set captions based on global state
      this.captionsEnabled = captionsState;
      this.applyCaptionsState(captionsState);
      
      // For DASH players, ensure captions are preserved if enabled
      if (captionsState && this.player && this.player.setTextTrack) {
        try {
          this.player.setTextTrack(0); // Enable first track
        } catch (e) {
          console.warn('Could not set DASH text track:', e);
        }
      }
    },
    
    // New control methods for accessibility
    togglePlayPause() {
      const video = this.$refs.videoPlayer;
      if (!video) return;
      
      if (video.paused) {
        video.play();
        this.isPlaying = true;
        
        // Also play DASH player if it exists
        if (this.player && typeof this.player.play === 'function') {
          this.player.play();
        }
        
        // Announce to screen readers
        const { $announce } = useNuxtApp();
        if ($announce) {
          $announce('Video playing', 'polite');
        }
      } else {
        video.pause();
        this.isPlaying = false;
        
        // Also pause DASH player if it exists
        if (this.player && typeof this.player.pause === 'function') {
          this.player.pause();
        }
        
        // Announce to screen readers
        const { $announce } = useNuxtApp();
        if ($announce) {
          $announce('Video paused', 'polite');
        }
      }
    },
    
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
      setTimeout(() => this.applyCaptionsState(this.captionsEnabled), 100);
      setTimeout(() => this.applyCaptionsState(this.captionsEnabled), 500);
      
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
        console.warn('Error dispatching captionsChange event:', err);
      }
      
      // For DASH players, also try to update mode directly if available
      if (this.player && this.player.setTextTrack) {
        try {
          this.player.setTextTrack(this.captionsEnabled ? 0 : -1);
        } catch (e) {
          console.warn('Could not set DASH text track:', e);
        }
      }
    },
    
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !this.videoLoaded) {
          // console.log('Video player visible, initializing:', this.dashSource);
          this.initializePlayer();
          this.observer.disconnect();
        }
      }, {
        rootMargin: this.rootMargin
      });
      
      this.observer.observe(this.$refs.videoPlayer);
    },
    
    initializePlayer() {
      if (this.videoLoaded) return;
      this.videoLoaded = true;
      
      // console.log(`Initializing player for ${this.dashSource}, cached player? ${this.useCachedPlayer}`);
      
      // Try advanced cache from dashPlugins first
      if (this.useCachedPlayer && window.dashCache && typeof window.dashCache.getPlayerBySource === 'function') {
        const cachedPlayer = window.dashCache.getPlayerBySource(this.dashSource);
        if (cachedPlayer) {
          // console.log('CACHE HIT: Using dashCache player for source:', this.dashSource);
          this.player = cachedPlayer;
          this.cacheAttempted = true;
          try {
            // Reattach to the new video element
            this.player.attachView(this.$refs.videoPlayer);
            
            // Re-apply cookie prevention - critical for cached players
            if (window.dashCache && typeof window.dashCache.disableCookieStorage === 'function') {
              window.dashCache.disableCookieStorage(this.player);
            }
            
            this.dashLoaded = true;
            // Set video as ready when DASH player is ready
            if (!this.decorative) {
              this.videoReady = true;
            }
            this.$emit('player-ready', this.player);
            return;
          } catch (err) {
            // console.warn('Failed to reuse dashCache player:', err);
            // Continue with fallback caching strategy
          }
        } else {
          // console.log('CACHE MISS: No cached player found for source:', this.dashSource);
        }
      }
      
      // Check if dash.js is already loaded globally
      if (window.dashjs && !this.dashLoaded) {
        this.setupDashPlayer(window.dashjs);
        return;
      }
      
      // If not already loaded, dynamically import it
      import(/* webpackChunkName: "dashjs" */ 'dashjs')
        .then(dashjs => {
          // Make dashjs available globally to prevent multiple imports
          window.dashjs = dashjs;
          
          this.setupDashPlayer(dashjs);
        })
        .catch(err => {
          console.error('Failed to load dash.js:', err);
          // Set dashFailed flag to trigger the fallback source rendering
          this.dashFailed = true;
          // The fallback source will be used automatically
          this.$emit('dash-failed', {
            error: err,
            message: 'Failed to load dash.js library'
          });
        });
    },
    
    // Helper method to ensure cookie storage is disabled in a player instance
    disableCookieStorage(player) {
      // Use directly the dashCache implementation if available
      if (window.dashCache && typeof window.dashCache.disableCookieStorage === 'function') {
        return window.dashCache.disableCookieStorage(player);
      }
      
      // Fallback implementation
      if (player) {
        try {
          // For DASH.js 5.0.0, avoid attempting to configure storage
          // Instead, override the storage controller if possible
          if (typeof player.setStorageController === 'function') {
            // Create empty controller functions
            const noOpController = {
              getSavedMediaSettings: () => null,
              saveMediaSettings: () => {},
              release: () => {}
            };
            
            // Set the controller to our no-op implementation
            player.setStorageController(noOpController);
          }
        } catch (e) {
          console.warn('Could not disable storage:', e);
        }
      }
    },
    
    setupDashPlayer(dashjs) {
      if (this.dashLoaded) return;
      
      try {
        // Create player instance
        this.player = dashjs.MediaPlayer().create();
        
        // IMPORTANT: Apply settings BEFORE initializing the player
        this.disableCookieStorage(this.player);
        
        // Check current reduced motion state
        const isReducedMotion = document.documentElement.classList.contains('reduce-motion');
        
        // Configure settings for video with improved caching
        // In DASH.js 5.0.0, avoid setting storage-related settings
        this.player.updateSettings({
          streaming: {
            // Buffer settings
            buffer: {
              // Faster startup
              initialBufferLevel: 2,
              fastSwitchEnabled: true,
              // Increase buffer size for smoother playback
              bufferTimeAtTopQuality: 8,
              bufferTimeAtTopQualityLongForm: 12
            },
            abr: {
              // Set initial quality to high since it's a landing page
              initialBitrate: {
                video: 3000 // 3mbps
              },
              autoSwitchBitrate: {
                video: true
              }
            },
            retryAttempts: {
              MPD: 3,
              MediaSegment: 3
            },
            retryIntervals: {
              MPD: 500,
              MediaSegment: 500
            },
            gaps: {
              jumpGaps: true,
              jumpLargeGaps: true,
              smallGapLimit: 1.5
            }
          }
        });
        
        // Error handling with fallback and detailed logging
        this.player.on(dashjs.MediaPlayer.events.ERROR, (error) => {
          // console.warn('DASH player error:', error);
          
          // Emit the error event
          this.$emit('dash-error', {
            error: error,
            message: 'DASH player encountered an error'
          });
          
          // Only fallback to MP4 if there's a critical error
          if (error.error && error.error.code && (
              error.error.code === 'MEDIA_ERR_SRC_NOT_SUPPORTED' || 
              error.error.code === 'MANIFEST_LOADER_LOADING_FAILURE' ||
              error.error.code === 'MANIFEST_LOADER_PARSING_FAILURE')) {
            
            if (this.$refs.videoPlayer) {
              // console.log('Falling back to MP4 source');
              // Set dashFailed flag to trigger the fallback source rendering
              this.dashFailed = true;
              // Destroy DASH.js player before switching to MP4
              this.player.reset();
              this.player = null;
              // Don't set src directly - use v-if with dashFailed flag instead
            }
          }
        });
        
        // Add quality switch monitoring
        this.player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, (e) => {
          this.currentQuality = e.newQuality;
          
          // Initialize with default values
          let qualityLabel = 'Unknown';
          let bitrateKbps = 0;
          
          // Try different methods to get bitrate info
          let bitrateInfo = null;
          
          // First method - getBitrateInfoListFor
          if (this.player.getBitrateInfoListFor) {
            bitrateInfo = this.player.getBitrateInfoListFor('video');
          }
          
          // Alternative method - getQualityFor
          const qualityFor = this.player.getQualityFor ? this.player.getQualityFor('video') : null;
          
          // Another alternative - getAverageThroughput
          const throughput = this.player.getAverageThroughput ? this.player.getAverageThroughput('video') : null;
          
          // Create quality info object
          const qualityInfo = {
            quality: e.newQuality || 0,
            qualityLabel: qualityLabel,
            bitrate: bitrateKbps
          };
          
          // Try to extract bitrate info
          if (bitrateInfo && bitrateInfo[e.newQuality]) {
            bitrateKbps = Math.round(bitrateInfo[e.newQuality].bitrate / 1000);
            qualityInfo.bitrate = bitrateKbps;
            
            // Set quality label based on bitrate ranges
            if (bitrateKbps > 3000) qualityLabel = 'HD';
            else if (bitrateKbps > 1500) qualityLabel = 'Medium';
            else if (bitrateKbps > 800) qualityLabel = 'Low';
            else qualityLabel = 'Mobile';
            
            qualityInfo.qualityLabel = qualityLabel;
          } else if (throughput) {
            // Fallback to throughput if available
            bitrateKbps = Math.round(throughput / 1000);
            qualityInfo.bitrate = bitrateKbps;
            
            // Estimate quality label based on throughput
            if (bitrateKbps > 3000) qualityLabel = 'Estimated HD';
            else if (bitrateKbps > 1500) qualityLabel = 'Estimated Medium';
            else if (bitrateKbps > 800) qualityLabel = 'Estimated Low';
            else qualityLabel = 'Estimated Mobile';
            
            qualityInfo.qualityLabel = qualityLabel;
          } else {
            // Last resort - use quality index with predefined labels
            const qualityLabels = ['Auto', 'Low', 'Medium', 'High', 'HD'];
            qualityLabel = qualityLabels[e.newQuality] || `Quality ${e.newQuality}`;
            qualityInfo.qualityLabel = qualityLabel;
          }
          
          // Emit event for parent components
          this.$emit('quality-change', qualityInfo);
        });
        
        // Initialize player with adaptive MPD
        this.player.initialize(
          this.$refs.videoPlayer, 
          this.dashSource, 
          true // autoplay
        );
        
        // Check if we need to pause immediately due to reduced motion setting
        // Check both the DOM class and the global state
        if (document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion) {
          // Defer to ensure player is fully initialized
          setTimeout(() => {
            if (this.player && typeof this.player.pause === 'function') {
              this.player.pause();
              this.isPlaying = false;
            }
          }, 100);
        }
        
        // Re-apply cookie settings after initialization for extra safety
        this.disableCookieStorage(this.player);
        
        // Store in advanced cache if available
        if (this.useCachedPlayer && window.dashCache && typeof window.dashCache.registerPlayer === 'function') {
          try {
            // Generate a unique ID for this player
            const playerId = 'dash-player-' + Date.now();
            window.dashCache.registerPlayer(playerId, this.player, this.dashSource);
            // console.log(`Player registered in advanced cache as: ${playerId}`);
          } catch (err) {
            // console.warn('Failed to register player with dashCache:', err);
          }
        }
        
        this.dashLoaded = true;
        
        // Set video as ready when DASH player is ready
        if (!this.decorative) {
          this.videoReady = true;
        }
        
        // Emit event when player is ready
        this.$emit('player-ready', this.player);
        
      } catch (err) {
        console.error('Failed to setup DASH player:', err);
        // Set dashFailed flag to trigger the fallback source rendering
        this.dashFailed = true;
        
        this.$emit('dash-failed', {
          error: err,
          message: 'Failed to setup DASH player'
        });
      }
    },
    
    // Method to manually switch quality
    setQuality(qualityIndex) {
      if (this.player) {
        try {
          // In dashjs 5.0.0, check which method is available
          if (typeof this.player.setQualityFor === 'function') {
            this.player.setQualityFor('video', qualityIndex);
          } else if (typeof this.player.setQuality === 'function') {
            this.player.setQuality('video', qualityIndex);
          } else {
            console.warn('Unable to set quality: API method not found');
          }
        } catch (err) {
          console.warn('Error setting quality:', err);
        }
      }
    },
    
    // Video loading event handlers
    onVideoLoadStart() {
      // Video has started loading
      if (!this.decorative) {
        this.videoReady = false;
      }
    },
    
    onVideoCanPlay() {
      // Video has buffered enough to start playing
      if (!this.decorative) {
        this.videoReady = true;
      }
    },
    
    onVideoLoadedData() {
      // Video has loaded first frame
      if (!this.decorative) {
        this.videoReady = true;
      }
    },
    
    onVideoError(event) {
      // Handle video loading errors
      console.warn('Video loading error:', event);
      if (!this.decorative) {
        this.videoReady = true; // Show video element even if errored so user can see error message
      }
    },
    
    onVideoEnded(event) {
      // Handle video ending - this shouldn't happen with loop=true, but as a failsafe
      const video = this.$refs.videoPlayer;
      if (video && video.loop) {
        // Video ended despite loop being true - restart it immediately
        console.warn('Video ended unexpectedly despite loop=true, restarting...');
        video.currentTime = 0;
        
        // Only restart if video should be playing
        const shouldBePlaying = !document.documentElement.classList.contains('reduce-motion') && 
                               !globalState.reduceMotion;
        
        if (shouldBePlaying && this.isPlaying) {
          video.play().catch(err => {
            console.warn('Could not restart video after unexpected end:', err);
            // If play fails, try reinitializing the entire player
            setTimeout(() => this.retryVideoInitialization(), 1000);
          });
        }
      }
    }
  },
  beforeUnmount() {
    // Clean up resources
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Clear health check interval
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    // Remove event listeners
    if (process.client) {
      document.removeEventListener('reduceMotionChange', this.handleReduceMotionChange);
      document.removeEventListener('captionsChange', this.handleCaptionsChange);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      
      // Clean up textTracks event listener
      const video = this.$refs.videoPlayer;
      if (video && video.textTracks && this.trackAddHandler) {
        video.textTracks.removeEventListener('addtrack', this.trackAddHandler);
      }
    }
    
    // Only destroy the player if it's not being cached
    if (this.player && (!this.useCachedPlayer || 
        (window.dashCache && window.dashCache.getPlayerBySource && 
         window.dashCache.getPlayerBySource(this.dashSource) !== this.player))) {
      // console.log('Cleaning up player on unmount');
      this.player.reset();
      this.player = null;
    } else if (this.player) {
      // console.log('Not destroying player as it is cached for reuse');
    }
  }
}
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
</style>