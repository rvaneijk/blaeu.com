/**
 * @composable useVideoPlayer
 * @description Core DASH player initialization and management logic
 * Handles player creation, configuration, and cleanup
 */
import { ref, readonly, onUnmounted } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import { globalState } from '~/composables/globalState'

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  RETRY: {
    MAX_ATTEMPTS: 20,
    INTERVAL: 100,
    MPD_ATTEMPTS: 3,
    MEDIA_SEGMENT_ATTEMPTS: 3,
    MPD_INTERVAL: 500,
    MEDIA_SEGMENT_INTERVAL: 500
  },
  BUFFER: {
    INITIAL_LEVEL: 2,
    TIME_AT_TOP_QUALITY: 8,
    TIME_AT_TOP_QUALITY_LONG_FORM: 12
  },
  BITRATE: {
    INITIAL_VIDEO: 3000,
    QUALITY_THRESHOLDS: {
      HD: 3000,
      MEDIUM: 1500,
      LOW: 800,
      MOBILE: 800
    }
  },
  GAP_HANDLING: {
    SMALL_GAP_LIMIT: 1.5
  },
  TIMING: {
    PAUSE_DELAY_REDUCED_MOTION: 100
  },
  ERRORS: {
    CRITICAL_CODES: [
      'MEDIA_ERR_SRC_NOT_SUPPORTED',
      'MANIFEST_LOADER_LOADING_FAILURE',
      'MANIFEST_LOADER_PARSING_FAILURE'
    ]
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

export const useVideoPlayer = () => {
  const player = ref(null)
  const dashLoaded = ref(false)
  const isInitializing = ref(false)
  const initializationAttempts = ref(0)
  const playerValidated = ref(false)
  const currentQuality = ref(0)
  const cacheAttempted = ref(false)

  /**
   * Initialize DASH player with proper configuration
   * @param {HTMLVideoElement} videoElement - Video element to attach player to
   * @param {string} dashSource - MPD source URL
   * @param {Object} options - Player options
   */
  const initializePlayer = async (videoElement, dashSource, options = {}) => {
    if (dashLoaded.value || isInitializing.value) return

    // Skip initialization if DASH.js is not available (mobile devices)
    if (!window.dashCache || !window.dashCache.initialized) {
      errorHandler.debug('DASH.js not available, skipping video player initialization', null, { component: 'useVideoPlayer' })
      return
    }

    isInitializing.value = true
    initializationAttempts.value++
    
    errorHandler.debug('Initializing player', { 
      source: dashSource, 
      attempt: initializationAttempts.value, 
      useCachedPlayer: options.useCachedPlayer 
    }, { component: 'useVideoPlayer' })

    // Try advanced cache from dashPlugins first - only if not forcing new player
    if (options.useCachedPlayer && !options.forceNewPlayer && window.dashCache && typeof window.dashCache.getPlayerBySource === 'function') {
      const cachedPlayer = window.dashCache.getPlayerBySource(dashSource, options.namespace)
      if (cachedPlayer) {
        errorHandler.debug('CACHE HIT: Using dashCache player', { source: dashSource, videoType: options.videoType, namespace: options.namespace }, { component: 'useVideoPlayer' })
        player.value = cachedPlayer
        cacheAttempted.value = true
        
        try {
          // Reattach to the new video element
          player.value.attachView(videoElement)
          
          // Re-apply cookie prevention - critical for cached players
          if (window.dashCache && typeof window.dashCache.disableCookieStorage === 'function') {
            window.dashCache.disableCookieStorage(player.value)
          }
          
          dashLoaded.value = true
          playerValidated.value = true
          isInitializing.value = false
          
          return { success: true, player: player.value }
        } catch (err) {
          errorHandler.warning('Failed to reuse dashCache player', err, { component: 'useVideoPlayer' })
          // Continue with fallback creation
        }
      }
    } else if (options.forceNewPlayer) {
      errorHandler.debug('CACHE BYPASS: Forcing new player creation', { source: dashSource, videoType: options.videoType, namespace: options.namespace }, { component: 'useVideoPlayer' })
    }

    // Check if dash.js is already loaded globally
    if (window.dashjs && !dashLoaded.value) {
      return await setupDashPlayer(window.dashjs, videoElement, dashSource, options)
    }

    // Wait for dashjs with retry logic
    return await waitForDashJs(videoElement, dashSource, options)
  }

  /**
   * Wait for DASH.js to be available with retry logic
   */
  const waitForDashJs = async (videoElement, dashSource, options) => {
    let retryCount = 0
    const maxRetries = VIDEO_CONFIG.RETRY.MAX_ATTEMPTS
    const retryInterval = VIDEO_CONFIG.RETRY.INTERVAL

    return new Promise((resolve, reject) => {
      const checkForDashJs = () => {
        if (window.dashjs && !dashLoaded.value) {
          setupDashPlayer(window.dashjs, videoElement, dashSource, options)
            .then(resolve)
            .catch(reject)
          return
        }
        
        if (retryCount < maxRetries) {
          retryCount++
          setTimeout(checkForDashJs, retryInterval)
          return
        }
        
        // Use dashCache loadDashJs method for on-demand loading
        if (window.dashCache && typeof window.dashCache.loadDashJs === 'function') {
          window.dashCache.loadDashJs()
            .then(() => {
              if (window.dashjs) {
                return setupDashPlayer(window.dashjs, videoElement, dashSource, options)
              } else {
                throw new Error('DASH.js failed to load')
              }
            })
            .then(resolve)
            .catch(reject)
        } else {
          // Fallback: direct dynamic import
          import(/* webpackChunkName: "dashjs" */ 'dashjs')
            .then(dashjs => {
              window.dashjs = dashjs
              return setupDashPlayer(dashjs, videoElement, dashSource, options)
            })
            .then(resolve)
            .catch(reject)
        }
      }
      
      checkForDashJs()
    })
  }

  /**
   * Setup DASH player with configuration
   */
  const setupDashPlayer = async (dashjs, videoElement, dashSource, options) => {
    if (dashLoaded.value) return { success: false, error: 'Already loaded' }
    
    try {
      // Create player instance
      player.value = dashjs.MediaPlayer().create()
      
      // Apply settings BEFORE initializing
      disableCookieStorage(player.value)
      
      // Configure player settings
      player.value.updateSettings({
        streaming: {
          buffer: {
            initialBufferLevel: VIDEO_CONFIG.BUFFER.INITIAL_LEVEL,
            fastSwitchEnabled: true,
            bufferTimeAtTopQuality: VIDEO_CONFIG.BUFFER.TIME_AT_TOP_QUALITY,
            bufferTimeAtTopQualityLongForm: VIDEO_CONFIG.BUFFER.TIME_AT_TOP_QUALITY_LONG_FORM
          },
          abr: {
            initialBitrate: { video: VIDEO_CONFIG.BITRATE.INITIAL_VIDEO },
            autoSwitchBitrate: { video: true }
          },
          retryAttempts: {
            MPD: VIDEO_CONFIG.RETRY.MPD_ATTEMPTS,
            MediaSegment: VIDEO_CONFIG.RETRY.MEDIA_SEGMENT_ATTEMPTS
          },
          retryIntervals: {
            MPD: VIDEO_CONFIG.RETRY.MPD_INTERVAL,
            MediaSegment: VIDEO_CONFIG.RETRY.MEDIA_SEGMENT_INTERVAL
          },
          gaps: {
            jumpGaps: true,
            jumpLargeGaps: true,
            smallGapLimit: VIDEO_CONFIG.GAP_HANDLING.SMALL_GAP_LIMIT
          }
        }
      })
      
      // Setup event listeners
      setupPlayerEventListeners(dashjs, options.emit)
      
      // Initialize player
      player.value.initialize(videoElement, dashSource, true)
      
      // Handle reduced motion
      if (document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion) {
        setTimeout(() => {
          if (player.value && typeof player.value.pause === 'function') {
            player.value.pause()
          }
        }, VIDEO_CONFIG.TIMING.PAUSE_DELAY_REDUCED_MOTION)
      }
      
      // Re-apply cookie settings after initialization
      disableCookieStorage(player.value)
      
      // Store in advanced cache if available and not forcing new player
      if (options.useCachedPlayer && !options.forceNewPlayer && window.dashCache && typeof window.dashCache.registerPlayer === 'function') {
        try {
          const playerId = `dash-player-${options.videoType || 'default'}-${Date.now()}`
          window.dashCache.registerPlayer(playerId, player.value, dashSource, options.namespace)
          errorHandler.debug('Player registered in advanced cache', { playerId, videoType: options.videoType, namespace: options.namespace }, { component: 'useVideoPlayer' })
        } catch (err) {
          errorHandler.warning('Failed to register player with dashCache', err, { component: 'useVideoPlayer' })
        }
      } else if (options.forceNewPlayer) {
        errorHandler.debug('CACHE BYPASS: Not registering player in cache due to forceNewPlayer', { videoType: options.videoType, namespace: options.namespace }, { component: 'useVideoPlayer' })
      }
      
      dashLoaded.value = true
      playerValidated.value = true
      isInitializing.value = false
      
      return { success: true, player: player.value }
      
    } catch (err) {
      errorHandler.error('Failed to setup DASH player', err, { component: 'useVideoPlayer' })
      isInitializing.value = false
      throw err
    }
  }

  /**
   * Setup event listeners for DASH player
   */
  const setupPlayerEventListeners = (dashjs, emit) => {
    if (!player.value || !emit) return

    // Error handling
    player.value.on(dashjs.MediaPlayer.events.ERROR, (error) => {
      errorHandler.warning('DASH player error', error, { component: 'useVideoPlayer' })
      emit('dash-error', { error, message: 'DASH player encountered an error' })
      
      // Check for critical errors that require fallback
      if (error.error && error.error.code && 
          VIDEO_CONFIG.ERRORS.CRITICAL_CODES.includes(error.error.code)) {
        
        errorHandler.info('Critical DASH error, triggering fallback', { errorCode: error.error.code }, { component: 'useVideoPlayer' })
        emit('dash-failed', { error, message: 'DASH player failed completely' })
        
        // Clean up player
        if (player.value) {
          player.value.reset()
          player.value = null
        }
      }
    })

    // Quality change monitoring
    player.value.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, (e) => {
      currentQuality.value = e.newQuality
      
      const qualityInfo = extractQualityInfo(e.newQuality)
      emit('quality-change', qualityInfo)
    })
    
    // Stream initialization optimization for faster startup
    player.value.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, (e) => {
      errorHandler.debug('DASH stream initialized - ready for optimized playback', { streamInfo: e }, { component: 'useVideoPlayer' })
      emit('stream-initialized', e)
    })
  }

  /**
   * Extract quality information from bitrate data
   */
  const extractQualityInfo = (newQuality) => {
    let qualityLabel = 'Unknown'
    let bitrateKbps = 0
    
    // Try to get bitrate info
    let bitrateInfo = null
    if (player.value && player.value.getBitrateInfoListFor) {
      bitrateInfo = player.value.getBitrateInfoListFor('video')
    }
    
    const qualityInfo = {
      quality: newQuality || 0,
      qualityLabel,
      bitrate: bitrateKbps
    }
    
    if (bitrateInfo && bitrateInfo[newQuality]) {
      bitrateKbps = Math.round(bitrateInfo[newQuality].bitrate / 1000)
      qualityInfo.bitrate = bitrateKbps
      
      // Set quality label based on bitrate ranges
      if (bitrateKbps > VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.HD) qualityLabel = 'HD'
      else if (bitrateKbps > VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.MEDIUM) qualityLabel = 'Medium'
      else if (bitrateKbps > VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.LOW) qualityLabel = 'Low'
      else qualityLabel = 'Mobile'
      
      qualityInfo.qualityLabel = qualityLabel
    } else {
      // Fallback to quality index labels
      const qualityLabels = ['Auto', 'Low', 'Medium', 'High', 'HD']
      const qualityIndex = typeof newQuality === 'number' ? newQuality : 0
      qualityInfo.qualityLabel = qualityLabels[qualityIndex] || `Quality ${qualityIndex}`
    }
    
    return qualityInfo
  }

  /**
   * Helper method to disable cookie storage
   */
  const disableCookieStorage = (playerInstance) => {
    if (window.dashCache && typeof window.dashCache.disableCookieStorage === 'function') {
      return window.dashCache.disableCookieStorage(playerInstance)
    }
    
    // Fallback implementation
    if (playerInstance) {
      try {
        if (typeof playerInstance.setStorageController === 'function') {
          const noOpController = {
            getSavedMediaSettings: () => null,
            saveMediaSettings: () => {},
            release: () => {}
          }
          playerInstance.setStorageController(noOpController)
        }
      } catch (e) {
        errorHandler.warning('Could not disable storage', e, { component: 'useVideoPlayer' })
      }
    }
  }

  /**
   * Set video quality manually
   */
  const setQuality = (qualityIndex) => {
    if (!player.value) return
    
    try {
      if (typeof player.value.setQualityFor === 'function') {
        player.value.setQualityFor('video', qualityIndex)
      } else if (typeof player.value.setQuality === 'function') {
        player.value.setQuality('video', qualityIndex)
      } else {
        errorHandler.warning('Unable to set quality: API method not found', null, { component: 'useVideoPlayer' })
      }
    } catch (err) {
      errorHandler.warning('Error setting quality', err, { component: 'useVideoPlayer' })
    }
  }

  /**
   * Play the player
   */
  const play = () => {
    if (player.value && typeof player.value.play === 'function') {
      player.value.play()
    }
  }

  /**
   * Pause the player
   */
  const pause = () => {
    if (player.value && typeof player.value.pause === 'function') {
      player.value.pause()
    }
  }

  /**
   * Clean up player resources
   */
  const cleanup = (useCachedPlayer = false, dashSource = '') => {
    if (!player.value) return

    try {
      // Remove event listeners
      if (typeof player.value.off === 'function') {
        player.value.off()
      }
      
      // Only destroy if not cached
      if (!useCachedPlayer || 
          (window.dashCache && window.dashCache.getPlayerBySource && 
           window.dashCache.getPlayerBySource(dashSource) !== player.value)) {
        
        errorHandler.debug('Destroying uncached player', null, { component: 'useVideoPlayer' })
        
        // Detach view first
        if (typeof player.value.attachView === 'function') {
          player.value.attachView(null)
        }
        
        // Reset and destroy
        player.value.reset()
        player.value = null
      } else {
        errorHandler.debug('Detaching cached player but keeping for reuse', null, { component: 'useVideoPlayer' })
        
        // Just detach the view but keep the player for reuse
        if (typeof player.value.attachView === 'function') {
          player.value.attachView(null)
        }
      }
    } catch (err) {
      errorHandler.warning('Error during player cleanup', err, { component: 'useVideoPlayer' })
    }
    
    // Reset state
    dashLoaded.value = false
    isInitializing.value = false
    playerValidated.value = false
    currentQuality.value = 0
    cacheAttempted.value = false
    initializationAttempts.value = 0
  }

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })

  return {
    // State
    player: readonly(player),
    dashLoaded: readonly(dashLoaded),
    isInitializing: readonly(isInitializing),
    initializationAttempts: readonly(initializationAttempts),
    playerValidated: readonly(playerValidated),
    currentQuality: readonly(currentQuality),
    cacheAttempted: readonly(cacheAttempted),
    
    // Methods
    initializePlayer,
    setQuality,
    play,
    pause,
    cleanup
  }
}