/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @composable useVideoRecovery
 * @description Handles video recovery from visibility changes, tab switching, and errors
 * Provides retry mechanisms and health checks for video players with enhanced network retry logic
 */
import { ref, readonly, type Ref } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import { globalState } from '~/composables/globalState'
import { useNuxtApp } from '#app'

export interface VideoState {
  videoLoaded: boolean
  dashLoaded: boolean
  dashFailed: boolean
  isInitializing: boolean
  playerValidated: boolean
  videoReady: boolean
  decorative: boolean
  isPlaying: boolean
}

export interface RecoveryStats {
  attempts: number
  maxAttempts: number
  isRecovering: boolean
  canRecover: boolean
}

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  RETRY: {
    RECOVERY_ATTEMPTS: 3,
  },
  TIMING: {
    RECOVERY_DELAY: 100,
    RETRY_DELAY: 200,
    RESTART_AFTER_FAILURE: 1000,
  },
  ERRORS: {
    READY_STATES: {
      HAVE_NOTHING: 0,
    },
    NETWORK_STATES: {
      NETWORK_NO_SOURCE: 3,
    },
  },
}

// Import with fallback
let VIDEO_CONFIG = DEFAULT_CONFIG
try {
  const { VIDEO_CONFIG: config } = require('~/config/videoConfig')
  VIDEO_CONFIG = config || DEFAULT_CONFIG
} catch (_e) {
  VIDEO_CONFIG = DEFAULT_CONFIG
}

/**
 * Integrate with global network retry mechanism for video operations
 */
async function retryWithNetworkFallback<T>(
  operation: () => Promise<T>,
  context: string
): Promise<T | null> {
  try {
    let nuxtApp, networkRetry
    try {
      nuxtApp = useNuxtApp()
      networkRetry = nuxtApp.$networkRetry
    } catch {
      // useNuxtApp not available in test environment
      nuxtApp = null
      networkRetry = null
    }

    if (networkRetry) {
      return await networkRetry.withRetry(operation, `Video: ${context}`)
    } else {
      return await operation()
    }
  } catch (error) {
    errorHandler.error(`Failed video operation: ${context}`, error, {
      component: 'useVideoRecovery',
    })
    return null
  }
}

/**
 * Handle page becoming visible - main recovery logic
 */
function handlePageVisible(
  recoveryCallback: () => void,
  isRecovering: Ref<boolean>,
  recoveryAttempts: Ref<number>,
  maxRecoveryAttempts: number
): void {
  if (isRecovering.value) return

  if (recoveryAttempts.value >= maxRecoveryAttempts) {
    errorHandler.warning('Max recovery attempts reached, giving up', null, {
      component: 'useVideoRecovery',
    })
    return
  }

  isRecovering.value = true
  recoveryAttempts.value++

  errorHandler.debug(
    'Page became visible, attempting recovery',
    {
      attempt: recoveryAttempts.value,
    },
    { component: 'useVideoRecovery' }
  )

  setTimeout(() => {
    if (typeof recoveryCallback === 'function') {
      try {
        recoveryCallback()
      } catch (error) {
        errorHandler.error(
          `Recovery callback error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          error,
          { component: 'useVideoRecovery' }
        )
      }
    }
    isRecovering.value = false
  }, VIDEO_CONFIG.TIMING.RECOVERY_DELAY)
}

/**
 * Setup visibility change listeners for recovery
 */
function setupVisibilityListeners(
  recoveryCallback: () => void,
  isRecovering: Ref<boolean>,
  recoveryAttempts: Ref<number>,
  maxRecoveryAttempts: number
): () => void {
  const handleVisibilityChange = (): void => {
    if (!document.hidden) {
      handlePageVisible(recoveryCallback, isRecovering, recoveryAttempts, maxRecoveryAttempts)
    }
  }

  const handleWindowFocus = (): void => {
    handlePageVisible(recoveryCallback, isRecovering, recoveryAttempts, maxRecoveryAttempts)
  }

  if (process.client) {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleWindowFocus)
  }

  return () => {
    if (process.client) {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleWindowFocus)
    }
  }
}

/**
 * Retry video initialization with full reset
 */
function retryVideoInitialization(
  videoState: VideoState,
  initializeCallback: () => void,
  recoveryAttempts: Ref<number>
): void {
  if (!window.dashCache || !window.dashCache.initialized) {
    errorHandler.debug('DASH.js not available, skipping video retry', null, {
      component: 'useVideoRecovery',
    })
    return
  }

  errorHandler.debug(
    'Retrying video initialization',
    {
      attempt: recoveryAttempts.value,
    },
    { component: 'useVideoRecovery' }
  )

  if (videoState) {
    videoState.videoLoaded = false
    videoState.dashLoaded = false
    videoState.dashFailed = false
    videoState.isInitializing = false
    videoState.playerValidated = false

    if (videoState.decorative === false) {
      videoState.videoReady = false
    }
  }

  if (typeof initializeCallback === 'function') {
    initializeCallback()
  }
}

/**
 * Check player health and attempt recovery if needed
 */
function checkPlayerHealth(
  videoElement: HTMLVideoElement,
  player: unknown,
  retryCallback: () => void
): void {
  if (!videoElement || !player) return

  if (
    videoElement.readyState === VIDEO_CONFIG.ERRORS.READY_STATES.HAVE_NOTHING &&
    videoElement.networkState === VIDEO_CONFIG.ERRORS.NETWORK_STATES.NETWORK_NO_SOURCE
  ) {
    errorHandler.warning('Network error detected, attempting recovery', null, {
      component: 'useVideoRecovery',
    })
    if (typeof retryCallback === 'function') {
      retryCallback()
    }
    return
  }

  if (videoElement.ended && videoElement.loop) {
    errorHandler.warning('Video ended unexpectedly, restarting', null, {
      component: 'useVideoRecovery',
    })
    videoElement.currentTime = 0
    if (!videoElement.paused) {
      videoElement.play().catch(err => {
        errorHandler.warning('Could not restart looped video', err, {
          component: 'useVideoRecovery',
        })
      })
    }
  }
}

/**
 * Ensure video looping is maintained
 */
function ensureVideoLooping(videoElement: HTMLVideoElement, isPlaying: boolean): void {
  if (!videoElement) return

  if (!videoElement.loop) {
    videoElement.loop = true
  }

  if (videoElement.ended && isPlaying) {
    videoElement.currentTime = 0
    videoElement.play().catch(err => {
      errorHandler.warning('Could not restart video', err, { component: 'useVideoRecovery' })
    })
  }
}

/**
 * Handle video ended event (failsafe for loop issues)
 */
function handleVideoEnded(
  videoElement: HTMLVideoElement,
  isPlaying: boolean,
  retryCallback: () => void
): void {
  if (!videoElement || !videoElement.loop) return

  errorHandler.warning('Video ended unexpectedly despite loop=true, restarting...', null, {
    component: 'useVideoRecovery',
  })
  videoElement.currentTime = 0

  const shouldBePlaying =
    !document.documentElement.classList.contains('reduce-motion') && !globalState.reduceMotion

  if (shouldBePlaying && isPlaying) {
    videoElement.play().catch(err => {
      errorHandler.warning('Could not restart video after unexpected end', err, {
        component: 'useVideoRecovery',
      })

      if (typeof retryCallback === 'function') {
        setTimeout(() => retryCallback(), VIDEO_CONFIG.TIMING.RESTART_AFTER_FAILURE)
      }
    })
  }
}

/**
 * Comprehensive recovery strategy for different scenarios
 */
function recoverFromVisibilityChange(
  videoState: VideoState,
  videoElement: HTMLVideoElement,
  player: unknown,
  initializeCallback: () => void,
  recoveryAttempts: Ref<number>,
  maxRecoveryAttempts: number
): void {
  if (!videoState || !videoElement) return

  if (!videoState.videoLoaded && !videoState.dashFailed && !videoState.isInitializing) {
    errorHandler.debug('Video not loaded on visibility change, retrying initialization', null, {
      component: 'useVideoRecovery',
    })
    setTimeout(() => {
      retryVideoInitialization(videoState, initializeCallback, recoveryAttempts)
    }, VIDEO_CONFIG.TIMING.RECOVERY_DELAY)
    return
  }

  if (videoState.videoLoaded && player) {
    checkPlayerHealth(videoElement, player, () => {
      retryVideoInitialization(videoState, initializeCallback, recoveryAttempts)
    })
    ensureVideoLooping(videoElement, videoState.isPlaying)
    return
  }

  if (videoState.dashFailed && recoveryAttempts.value < maxRecoveryAttempts) {
    errorHandler.debug('Retrying failed video on visibility change', null, {
      component: 'useVideoRecovery',
    })
    videoState.dashFailed = false
    setTimeout(() => {
      retryVideoInitialization(videoState, initializeCallback, recoveryAttempts)
    }, VIDEO_CONFIG.TIMING.RETRY_DELAY)
  }
}

export const useVideoRecovery = (): {
  isRecovering: Readonly<Ref<boolean>>
  recoveryAttempts: Readonly<Ref<number>>
  setupVisibilityListeners: (recoveryCallback: () => void) => () => void
  retryVideoInitialization: (videoState: VideoState, initializeCallback: () => void) => void
  retryWithNetworkFallback: <T>(operation: () => Promise<T>, context: string) => Promise<T | null>
  checkPlayerHealth: (
    videoElement: HTMLVideoElement,
    player: unknown,
    retryCallback: () => void
  ) => void
  ensureVideoLooping: (videoElement: HTMLVideoElement, isPlaying: boolean) => void
  handleVideoEnded: (
    videoElement: HTMLVideoElement,
    isPlaying: boolean,
    retryCallback: () => void
  ) => void
  recoverFromVisibilityChange: (
    videoState: VideoState,
    videoElement: HTMLVideoElement,
    player: unknown,
    initializeCallback: () => void
  ) => void
  resetRecoveryAttempts: () => void
  getRecoveryStats: () => RecoveryStats
} => {
  const isRecovering = ref(false)
  const recoveryAttempts = ref(0)
  const maxRecoveryAttempts = VIDEO_CONFIG.RETRY.RECOVERY_ATTEMPTS

  const resetRecoveryAttempts = (): void => {
    recoveryAttempts.value = 0
  }

  const getRecoveryStats = (): RecoveryStats => {
    return {
      attempts: recoveryAttempts.value,
      maxAttempts: maxRecoveryAttempts,
      isRecovering: isRecovering.value,
      canRecover: recoveryAttempts.value < maxRecoveryAttempts,
    }
  }

  return {
    isRecovering: readonly(isRecovering),
    recoveryAttempts: readonly(recoveryAttempts),

    setupVisibilityListeners: (recoveryCallback: () => void) =>
      setupVisibilityListeners(
        recoveryCallback,
        isRecovering,
        recoveryAttempts,
        maxRecoveryAttempts
      ),

    retryVideoInitialization: (videoState: VideoState, initializeCallback: () => void) =>
      retryVideoInitialization(videoState, initializeCallback, recoveryAttempts),

    retryWithNetworkFallback,
    checkPlayerHealth,
    ensureVideoLooping,
    handleVideoEnded,

    recoverFromVisibilityChange: (
      videoState: VideoState,
      videoElement: HTMLVideoElement,
      player: unknown,
      initializeCallback: () => void
    ) =>
      recoverFromVisibilityChange(
        videoState,
        videoElement,
        player,
        initializeCallback,
        recoveryAttempts,
        maxRecoveryAttempts
      ),

    resetRecoveryAttempts,
    getRecoveryStats,
  }
}
