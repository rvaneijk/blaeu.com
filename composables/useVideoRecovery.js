/**
 * @composable useVideoRecovery
 * @description Handles video recovery from visibility changes, tab switching, and errors
 * Provides retry mechanisms and health checks for video players
 */
import { ref, readonly, onMounted, onUnmounted } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import { globalState } from '~/composables/globalState'

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  RETRY: {
    RECOVERY_ATTEMPTS: 3
  },
  TIMING: {
    RECOVERY_DELAY: 100,
    RETRY_DELAY: 200,
    RESTART_AFTER_FAILURE: 1000
  },
  ERRORS: {
    READY_STATES: {
      HAVE_NOTHING: 0
    },
    NETWORK_STATES: {
      NETWORK_NO_SOURCE: 3
    }
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

export const useVideoRecovery = () => {
  const isRecovering = ref(false)
  const recoveryAttempts = ref(0)
  const maxRecoveryAttempts = VIDEO_CONFIG.RETRY.RECOVERY_ATTEMPTS

  /**
   * Setup visibility change listeners for recovery
   */
  const setupVisibilityListeners = (recoveryCallback) => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handlePageVisible(recoveryCallback)
      }
    }

    const handleWindowFocus = () => {
      handlePageVisible(recoveryCallback)
    }

    if (process.client) {
      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('focus', handleWindowFocus)
    }

    // Return cleanup function
    return () => {
      if (process.client) {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('focus', handleWindowFocus)
      }
    }
  }

  /**
   * Handle page becoming visible - main recovery logic
   */
  const handlePageVisible = (recoveryCallback) => {
    if (isRecovering.value) return

    // Don't recover if we've exceeded max attempts
    if (recoveryAttempts.value >= maxRecoveryAttempts) {
      errorHandler.warning('Max recovery attempts reached, giving up', null, { component: 'useVideoRecovery' })
      return
    }

    isRecovering.value = true
    recoveryAttempts.value++

    errorHandler.debug('Page became visible, attempting recovery', { 
      attempt: recoveryAttempts.value 
    }, { component: 'useVideoRecovery' })

    // Execute recovery callback with delay
    setTimeout(() => {
      if (typeof recoveryCallback === 'function') {
        recoveryCallback()
      }
      isRecovering.value = false
    }, VIDEO_CONFIG.TIMING.RECOVERY_DELAY)
  }

  /**
   * Retry video initialization with full reset
   */
  const retryVideoInitialization = (videoState, initializeCallback) => {
    // Skip retry if DASH.js is not available
    if (!window.dashCache || !window.dashCache.initialized) {
      errorHandler.debug('DASH.js not available, skipping video retry', null, { component: 'useVideoRecovery' })
      return
    }

    errorHandler.debug('Retrying video initialization', { 
      attempt: recoveryAttempts.value 
    }, { component: 'useVideoRecovery' })

    // Reset video state
    if (videoState) {
      videoState.videoLoaded = false
      videoState.dashLoaded = false
      videoState.dashFailed = false
      videoState.isInitializing = false
      videoState.playerValidated = false
      
      // Reset video ready state for non-decorative videos
      if (videoState.decorative === false) {
        videoState.videoReady = false
      }
    }

    // Execute initialization callback
    if (typeof initializeCallback === 'function') {
      initializeCallback()
    }
  }

  /**
   * Check player health and attempt recovery if needed
   */
  const checkPlayerHealth = (videoElement, player, retryCallback) => {
    if (!videoElement || !player) return

    // Check if video element has valid source
    if (videoElement.readyState === VIDEO_CONFIG.ERRORS.READY_STATES.HAVE_NOTHING && 
        videoElement.networkState === VIDEO_CONFIG.ERRORS.NETWORK_STATES.NETWORK_NO_SOURCE) {
      errorHandler.warning('Network error detected, attempting recovery', null, { component: 'useVideoRecovery' })
      if (typeof retryCallback === 'function') {
        retryCallback()
      }
      return
    }

    // Check if video has ended unexpectedly (shouldn't happen with loop=true)
    if (videoElement.ended && videoElement.loop) {
      errorHandler.warning('Video ended unexpectedly, restarting', null, { component: 'useVideoRecovery' })
      videoElement.currentTime = 0
      if (!videoElement.paused) {
        videoElement.play().catch(err => {
          errorHandler.warning('Could not restart looped video', err, { component: 'useVideoRecovery' })
        })
      }
    }
  }

  /**
   * Ensure video looping is maintained
   */
  const ensureVideoLooping = (videoElement, isPlaying) => {
    if (!videoElement) return

    // Ensure loop attribute is set
    if (!videoElement.loop) {
      videoElement.loop = true
    }

    // If video should be playing but isn't, gently restart it
    const shouldBePlaying = !document.documentElement.classList.contains('reduce-motion') && 
                           !globalState.reduceMotion

    if (shouldBePlaying && videoElement.paused && isPlaying) {
      videoElement.play().catch(err => {
        errorHandler.warning('Could not resume video after visibility change', err, { component: 'useVideoRecovery' })
      })
    }
  }

  /**
   * Handle video ended event (failsafe for loop issues)
   */
  const handleVideoEnded = (videoElement, isPlaying, retryCallback) => {
    if (!videoElement || !videoElement.loop) return

    errorHandler.warning('Video ended unexpectedly despite loop=true, restarting...', null, { component: 'useVideoRecovery' })
    videoElement.currentTime = 0

    // Only restart if video should be playing
    const shouldBePlaying = !document.documentElement.classList.contains('reduce-motion') && 
                           !globalState.reduceMotion

    if (shouldBePlaying && isPlaying) {
      videoElement.play().catch(err => {
        errorHandler.warning('Could not restart video after unexpected end', err, { component: 'useVideoRecovery' })
        
        // If play fails, try reinitializing the entire player
        if (typeof retryCallback === 'function') {
          setTimeout(() => retryCallback(), VIDEO_CONFIG.TIMING.RESTART_AFTER_FAILURE)
        }
      })
    }
  }

  /**
   * Comprehensive recovery strategy for different scenarios
   */
  const recoverFromVisibilityChange = (videoState, videoElement, player, initializeCallback) => {
    if (!videoState || !videoElement) return

    // Case 1: Video not loaded at all and hasn't failed - retry initialization
    if (!videoState.videoLoaded && !videoState.dashFailed && !videoState.isInitializing) {
      errorHandler.debug('Video not loaded on visibility change, retrying initialization', null, { component: 'useVideoRecovery' })
      setTimeout(() => {
        retryVideoInitialization(videoState, initializeCallback)
      }, VIDEO_CONFIG.TIMING.RECOVERY_DELAY)
      return
    }

    // Case 2: Video loaded - just ensure it's playing correctly
    if (videoState.videoLoaded && player) {
      checkPlayerHealth(videoElement, player, () => {
        retryVideoInitialization(videoState, initializeCallback)
      })
      ensureVideoLooping(videoElement, videoState.isPlaying)
      return
    }

    // Case 3: Video failed but might be recoverable now
    if (videoState.dashFailed && recoveryAttempts.value < maxRecoveryAttempts) {
      errorHandler.debug('Retrying failed video on visibility change', null, { component: 'useVideoRecovery' })
      videoState.dashFailed = false
      setTimeout(() => {
        retryVideoInitialization(videoState, initializeCallback)
      }, VIDEO_CONFIG.TIMING.RETRY_DELAY)
    }
  }

  /**
   * Reset recovery attempts (useful when video successfully loads)
   */
  const resetRecoveryAttempts = () => {
    recoveryAttempts.value = 0
  }

  /**
   * Get recovery statistics
   */
  const getRecoveryStats = () => {
    return {
      attempts: recoveryAttempts.value,
      maxAttempts: maxRecoveryAttempts,
      isRecovering: isRecovering.value,
      canRecover: recoveryAttempts.value < maxRecoveryAttempts
    }
  }

  return {
    // State
    isRecovering: readonly(isRecovering),
    recoveryAttempts: readonly(recoveryAttempts),
    
    // Methods
    setupVisibilityListeners,
    retryVideoInitialization,
    checkPlayerHealth,
    ensureVideoLooping,
    handleVideoEnded,
    recoverFromVisibilityChange,
    resetRecoveryAttempts,
    getRecoveryStats
  }
}