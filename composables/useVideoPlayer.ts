/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @composable useVideoPlayer
 * @description Core DASH player initialization and management logic
 * Handles player creation, configuration, and cleanup
 */
import { ref, readonly, onUnmounted, type Ref } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import { globalState } from '~/composables/globalState'
import type { MediaPlayer } from 'dashjs'
import type { VideoPlayerCache } from '~/types/video-player'
import {
  logDashJsModuleStructure,
  logDashPlayerCreationAttempt,
  logDashPlayerCreationResult,
  logDashPlayerRetry,
} from '~/utils/developmentLogging'

// Extended DASH.js module interface
interface DashJSModule {
  MediaPlayer?: { (): { create: () => unknown }; create?: () => unknown }
  MediaPlayerFactory?: { create: () => unknown }
}

// Type guards for external API calls
function isDashJSModule(value: unknown): value is typeof import('dashjs') {
  return (
    typeof value === 'object' &&
    value !== null &&
    'MediaPlayer' in value &&
    typeof (value as Record<string, unknown>).MediaPlayer === 'function'
  )
}

function isDashPlayer(value: unknown): value is MediaPlayer {
  return (
    typeof value === 'object' &&
    value !== null &&
    'initialize' in value &&
    'attachView' in value &&
    'attachSource' in value &&
    typeof (value as Record<string, unknown>).initialize === 'function' &&
    typeof (value as Record<string, unknown>).attachView === 'function'
  )
}

function isValidVideoElement(element: unknown): element is HTMLVideoElement {
  return element instanceof HTMLVideoElement
}

function isValidDashSource(source: unknown): source is string {
  return typeof source === 'string' && source.length > 0 && source.endsWith('.mpd')
}

function isDashCache(cache: unknown): cache is VideoPlayerCache {
  return (
    typeof cache === 'object' &&
    cache !== null &&
    'initialized' in cache &&
    'getPlayerBySource' in cache &&
    'registerPlayer' in cache &&
    typeof (cache as Record<string, unknown>).getPlayerBySource === 'function' &&
    typeof (cache as Record<string, unknown>).registerPlayer === 'function'
  )
}

function isQualityChangeEvent(event: unknown): event is { newQuality: number } {
  return (
    typeof event === 'object' &&
    event !== null &&
    'newQuality' in event &&
    typeof (event as Record<string, unknown>).newQuality === 'number'
  )
}

function isBitrateInfo(info: unknown): info is BitrateInfo[] {
  return (
    Array.isArray(info) &&
    info.every(
      item =>
        typeof item === 'object' &&
        item !== null &&
        'bitrate' in item &&
        typeof item.bitrate === 'number'
    )
  )
}

export interface DashPlayer {
  initialize: (video: HTMLVideoElement, source: string, autoStart?: boolean) => void
  attachView: (element: HTMLVideoElement | null) => void
  attachSource: (source: string) => void
  getSource: () => string
  isPaused: () => boolean
  play: () => void
  pause: () => void
  reset: () => void
  on: (event: string, callback: (e?: unknown) => void) => void
  off: (event: string, callback: (e?: unknown) => void) => void
  getBitrateInfoListFor: (type: 'video' | 'audio') => BitrateInfo[]
  setQualityFor: (type: 'video' | 'audio', value: number) => void
  updateSettings: (settings: Record<string, unknown>) => void
  setTextTrack: (index: number) => void
}

interface BitrateInfo {
  bitrate: number
}

export interface VideoPlayerOptions {
  useCachedPlayer?: boolean
  forceNewPlayer?: boolean
  videoType?: string
  namespace?: string
  emit?: (event: string, data?: unknown) => void
}

export interface QualityInfo {
  quality: number
  qualityLabel: string
  bitrate: number
}

export interface PlayerResult {
  success: boolean
  player?: DashPlayer
  error?: string
}

// Define fallback configuration for SSR
const DEFAULT_CONFIG = {
  RETRY: {
    MAX_ATTEMPTS: 20,
    INTERVAL: 100,
    MPD_ATTEMPTS: 3,
    MEDIA_SEGMENT_ATTEMPTS: 3,
    MPD_INTERVAL: 500,
    MEDIA_SEGMENT_INTERVAL: 500,
  },
  BUFFER: {
    INITIAL_LEVEL: 2,
    TIME_AT_TOP_QUALITY: 8,
    TIME_AT_TOP_QUALITY_LONG_FORM: 12,
  },
  BITRATE: {
    INITIAL_VIDEO: 3000,
    QUALITY_THRESHOLDS: {
      HD: 3000,
      MEDIUM: 1500,
      LOW: 800,
      MOBILE: 800,
    },
  },
  GAP_HANDLING: {
    SMALL_GAP_LIMIT: 1.5,
  },
  TIMING: {
    PAUSE_DELAY_REDUCED_MOTION: 100,
  },
  ERRORS: {
    CRITICAL_CODES: [
      'MEDIA_ERR_SRC_NOT_SUPPORTED',
      'MANIFEST_LOADER_LOADING_FAILURE',
      'MANIFEST_LOADER_PARSING_FAILURE',
    ],
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
 * State interface for video player
 */
interface VideoPlayerState {
  player: Ref<DashPlayer | null>
  dashLoaded: Ref<boolean>
  isInitializing: Ref<boolean>
  playerValidated: Ref<boolean>
  currentQuality: Ref<number>
  cacheAttempted: Ref<boolean>
}

/**
 * Validate inputs for player initialization
 */
function validatePlayerInputs(
  videoElement: HTMLVideoElement,
  dashSource: string,
  state: VideoPlayerState
): PlayerResult | null {
  if (!isValidVideoElement(videoElement)) {
    errorHandler.error(
      'Invalid video element provided',
      { element: videoElement },
      { component: 'useVideoPlayer' }
    )
    return { success: false, error: 'Invalid video element' }
  }

  if (!isValidDashSource(dashSource)) {
    errorHandler.error(
      'Invalid DASH source provided',
      { source: dashSource },
      { component: 'useVideoPlayer' }
    )
    return { success: false, error: 'Invalid DASH source' }
  }

  if (state.dashLoaded.value || state.isInitializing.value) {
    return { success: false, error: 'Already initializing' }
  }

  if (!isDashCache(window.dashCache)) {
    errorHandler.debug('DASH.js not available, skipping video player initialization', null, {
      component: 'useVideoPlayer',
    })
    return { success: false, error: 'DASH not available' }
  }

  return null
}

/**
 * Try to reuse a cached player
 */
async function tryReusePlayer(
  videoElement: HTMLVideoElement,
  dashSource: string,
  options: VideoPlayerOptions,
  state: VideoPlayerState
): Promise<PlayerResult | null> {
  if (!options.useCachedPlayer || options.forceNewPlayer || !isDashCache(window.dashCache)) {
    if (options.forceNewPlayer) {
      errorHandler.debug(
        'CACHE BYPASS: Forcing new player creation',
        {
          source: dashSource,
          videoType: options.videoType,
          namespace: options.namespace,
        },
        { component: 'useVideoPlayer' }
      )
    }
    return null
  }

  const cachedPlayer = window.dashCache.getPlayerBySource(dashSource, options.namespace)
  if (!isDashPlayer(cachedPlayer)) {
    return null
  }

  errorHandler.debug(
    'CACHE HIT: Using dashCache player',
    {
      source: dashSource,
      videoType: options.videoType,
      namespace: options.namespace,
    },
    { component: 'useVideoPlayer' }
  )

  state.player.value = cachedPlayer
  state.cacheAttempted.value = true

  try {
    if (state.player.value) {
      state.player.value.attachView(videoElement)
    }

    if (window.dashCache && typeof window.dashCache.disableCookieStorage === 'function') {
      window.dashCache.disableCookieStorage(state.player.value)
    }

    state.dashLoaded.value = true
    state.playerValidated.value = true
    state.isInitializing.value = false

    return { success: true, player: state.player.value || undefined }
  } catch (err) {
    errorHandler.warning('Failed to reuse dashCache player', err, { component: 'useVideoPlayer' })
    return null
  }
}

/**
 * Helper method to disable cookie storage
 */
function disableCookieStorage(playerInstance: unknown): void {
  if (window.dashCache && typeof window.dashCache.disableCookieStorage === 'function') {
    window.dashCache.disableCookieStorage(playerInstance)
    return
  }

  if (playerInstance && typeof playerInstance === 'object') {
    try {
      const playerObj = playerInstance as Record<string, unknown>
      if (typeof playerObj.setStorageController === 'function') {
        const noOpController = {
          getSavedMediaSettings: (): null => null,
          saveMediaSettings: (): void => {},
          release: (): void => {},
        }
        ;(playerObj.setStorageController as (controller: Record<string, unknown>) => void)(
          noOpController
        )
      }
    } catch (_e) {
      errorHandler.warning('Could not disable storage', _e, { component: 'useVideoPlayer' })
    }
  }
}

/**
 * Wait for DASH.js to be available with retry logic
 */
async function waitForDashJs(
  videoElement: HTMLVideoElement,
  dashSource: string,
  options: VideoPlayerOptions,
  state: VideoPlayerState
): Promise<PlayerResult> {
  let retryCount = 0
  const maxRetries = VIDEO_CONFIG.RETRY.MAX_ATTEMPTS
  const retryInterval = VIDEO_CONFIG.RETRY.INTERVAL

  return new Promise((resolve, reject) => {
    const checkForDashJs = (): void => {
      if (isDashJSModule(window.dashjs) && !state.dashLoaded.value) {
        setupDashPlayer(window.dashjs, videoElement, dashSource, options, state)
          .then(resolve)
          .catch(reject)
        return
      }

      if (retryCount < maxRetries) {
        retryCount++
        setTimeout(checkForDashJs, retryInterval)
        return
      }

      if (isDashCache(window.dashCache) && typeof window.dashCache.loadDashJs === 'function') {
        window.dashCache
          .loadDashJs()
          .then(() => {
            if (isDashJSModule(window.dashjs)) {
              return setupDashPlayer(window.dashjs, videoElement, dashSource, options, state)
            } else {
              throw new Error('DASH.js failed to load')
            }
          })
          .then(resolve)
          .catch(reject)
      } else {
        import(/* webpackChunkName: "dashjs" */ 'dashjs')
          .then(dashjs => {
            const dashjsModule = dashjs.default || dashjs
            if (isDashJSModule(dashjsModule)) {
              ;(window as Window & { dashjs: Record<string, unknown> }).dashjs = dashjsModule
              return setupDashPlayer(
                dashjsModule as typeof import('dashjs'),
                videoElement,
                dashSource,
                options,
                state
              )
            } else {
              throw new Error('Invalid DASH.js module loaded')
            }
          })
          .then(resolve)
          .catch(reject)
      }
    }

    checkForDashJs()
  })
}

/**
 * Setup event listeners for DASH player
 */
function setupPlayerEventListeners(
  player: DashPlayer,
  dashjs: typeof import('dashjs'),
  emit: ((event: string, data?: unknown) => void) | undefined,
  state: VideoPlayerState
): void {
  if (!player || !emit) return

  player.on('error', (error: unknown) => {
    errorHandler.warning('DASH player error', error, { component: 'useVideoPlayer' })
    emit('dash-error', { error, message: 'DASH player encountered an error' })

    const errorObj = error as { error?: { code?: string } }
    if (
      errorObj.error &&
      errorObj.error.code &&
      VIDEO_CONFIG.ERRORS.CRITICAL_CODES.includes(errorObj.error.code)
    ) {
      errorHandler.info(
        'Critical DASH error, triggering fallback',
        { errorCode: errorObj.error.code },
        { component: 'useVideoPlayer' }
      )
      emit('dash-failed', { error, message: 'DASH player failed completely' })
    }
  })

  player.on('qualityChangeRendered', (e: unknown) => {
    if (isQualityChangeEvent(e)) {
      state.currentQuality.value = e.newQuality
      const qualityInfo = extractQualityInfo(e.newQuality, player)
      emit('quality-change', qualityInfo)
    } else {
      errorHandler.warning('Invalid quality change event received', e, {
        component: 'useVideoPlayer',
      })
    }
  })

  player.on('streamInitialized', (e: unknown) => {
    errorHandler.debug(
      'DASH stream initialized - ready for optimized playback',
      { streamInfo: e },
      { component: 'useVideoPlayer' }
    )
    emit('stream-initialized', e)
  })
}

/**
 * Extract quality information from bitrate data
 */
function extractQualityInfo(newQuality: number, player: DashPlayer): QualityInfo {
  let qualityLabel = 'Unknown'
  let bitrateKbps = 0

  let bitrateInfo: BitrateInfo[] | null = null
  if (player && typeof player.getBitrateInfoListFor === 'function') {
    const rawBitrateInfo = player.getBitrateInfoListFor('video')
    if (isBitrateInfo(rawBitrateInfo)) {
      bitrateInfo = rawBitrateInfo
    } else {
      errorHandler.warning('Invalid bitrate info received from player', rawBitrateInfo, {
        component: 'useVideoPlayer',
      })
    }
  }

  const qualityInfo: QualityInfo = {
    quality: newQuality || 0,
    qualityLabel,
    bitrate: bitrateKbps,
  }

  if (bitrateInfo && bitrateInfo[newQuality]) {
    bitrateKbps = Math.round(bitrateInfo[newQuality].bitrate / 1000)
    qualityInfo.bitrate = bitrateKbps

    if (bitrateKbps > VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.HD) qualityLabel = 'HD'
    else if (bitrateKbps > VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.MEDIUM) qualityLabel = 'Medium'
    else if (bitrateKbps > VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.LOW) qualityLabel = 'Low'
    else qualityLabel = 'Mobile'

    qualityInfo.qualityLabel = qualityLabel
  } else {
    const qualityLabels = ['Auto', 'Low', 'Medium', 'High', 'HD']
    const qualityIndex = typeof newQuality === 'number' ? newQuality : 0
    qualityInfo.qualityLabel = qualityLabels[qualityIndex] || `Quality ${qualityIndex}`
  }

  return qualityInfo
}

/**
 * Create DASH player instance with retry logic
 */
async function createDashPlayerInstance(dashjs: typeof import('dashjs')): Promise<unknown> {
  logDashJsModuleStructure(dashjs)

  let dashPlayer: unknown = null

  // Try primary creation methods
  const dashModule = dashjs as unknown as DashJSModule
  if (typeof dashModule.MediaPlayer === 'function') {
    logDashPlayerCreationAttempt('dashjs.MediaPlayer().create()')
    dashPlayer = dashModule.MediaPlayer().create()
    logDashPlayerCreationResult('MediaPlayer().create()', dashPlayer)
  } else if (typeof dashModule.MediaPlayerFactory?.create === 'function') {
    logDashPlayerCreationAttempt('MediaPlayerFactory.create()')
    dashPlayer = dashModule.MediaPlayerFactory.create()
    logDashPlayerCreationResult('MediaPlayerFactory.create()', dashPlayer)
  } else {
    throw new Error('No valid DASH player creation method found')
  }

  // Retry logic if initial creation failed
  if (!dashPlayer) {
    errorHandler.debug('DASH player creation returned null, trying delay + retry', null, {
      component: 'useVideoPlayer',
    })

    await new Promise(resolve => setTimeout(resolve, 100))

    if (typeof dashModule.MediaPlayer === 'function') {
      dashPlayer = dashModule.MediaPlayer().create()
      logDashPlayerRetry('MediaPlayer().create()', dashPlayer)
    } else if (typeof dashModule.MediaPlayerFactory?.create === 'function') {
      dashPlayer = dashModule.MediaPlayerFactory.create()
      logDashPlayerRetry('MediaPlayerFactory.create()', dashPlayer)
    }

    if (!dashPlayer) {
      throw new Error('Failed to create DASH player instance')
    }
  }

  return dashPlayer
}

/**
 * Configure DASH player settings
 */
function configureDashPlayerSettings(player: DashPlayer): void {
  player.updateSettings({
    streaming: {
      buffer: {
        initialBufferLevel: VIDEO_CONFIG.BUFFER.INITIAL_LEVEL,
        fastSwitchEnabled: true,
        bufferTimeAtTopQuality: VIDEO_CONFIG.BUFFER.TIME_AT_TOP_QUALITY,
        bufferTimeAtTopQualityLongForm: VIDEO_CONFIG.BUFFER.TIME_AT_TOP_QUALITY_LONG_FORM,
      },
      abr: {
        initialBitrate: { video: VIDEO_CONFIG.BITRATE.INITIAL_VIDEO },
        autoSwitchBitrate: { video: true },
      },
      retryAttempts: {
        MPD: VIDEO_CONFIG.RETRY.MPD_ATTEMPTS,
        MediaSegment: VIDEO_CONFIG.RETRY.MEDIA_SEGMENT_ATTEMPTS,
      },
      retryIntervals: {
        MPD: VIDEO_CONFIG.RETRY.MPD_INTERVAL,
        MediaSegment: VIDEO_CONFIG.RETRY.MEDIA_SEGMENT_INTERVAL,
      },
      gaps: {
        jumpGaps: true,
        jumpLargeGaps: true,
        smallGapLimit: VIDEO_CONFIG.GAP_HANDLING.SMALL_GAP_LIMIT,
      },
    },
  })
}

/**
 * Handle player caching registration
 */
function handlePlayerCaching(
  player: DashPlayer,
  dashSource: string,
  options: VideoPlayerOptions
): void {
  if (
    options.useCachedPlayer &&
    !options.forceNewPlayer &&
    window.dashCache &&
    typeof window.dashCache.registerPlayer === 'function'
  ) {
    try {
      const playerId = `dash-player-${options.videoType || 'default'}-${Date.now()}`
      window.dashCache.registerPlayer(playerId, player, dashSource, options.namespace)
      errorHandler.debug(
        'Player registered in advanced cache',
        { playerId, videoType: options.videoType, namespace: options.namespace },
        { component: 'useVideoPlayer' }
      )
    } catch (err) {
      errorHandler.warning('Failed to register player with dashCache', err, {
        component: 'useVideoPlayer',
      })
    }
  } else if (options.forceNewPlayer) {
    errorHandler.debug(
      'CACHE BYPASS: Not registering player in cache due to forceNewPlayer',
      { videoType: options.videoType, namespace: options.namespace },
      { component: 'useVideoPlayer' }
    )
  }
}

/**
 * Setup DASH player with configuration
 */
async function setupDashPlayer(
  dashjs: typeof import('dashjs'),
  videoElement: HTMLVideoElement,
  dashSource: string,
  options: VideoPlayerOptions,
  state: VideoPlayerState
): Promise<PlayerResult> {
  if (state.dashLoaded.value) return { success: false, error: 'Already loaded' }

  try {
    // Create player instance
    const dashPlayer = await createDashPlayerInstance(dashjs)
    state.player.value = dashPlayer as unknown as DashPlayer

    // Configure player
    disableCookieStorage(state.player.value)
    configureDashPlayerSettings(state.player.value)
    setupPlayerEventListeners(state.player.value, dashjs, options.emit, state)

    // Initialize player
    state.player.value.initialize(videoElement, dashSource, true)

    // Handle reduced motion
    if (document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion) {
      setTimeout(() => {
        if (state.player.value && typeof state.player.value.pause === 'function') {
          state.player.value.pause()
        }
      }, VIDEO_CONFIG.TIMING.PAUSE_DELAY_REDUCED_MOTION)
    }

    // Final configuration
    disableCookieStorage(state.player.value)
    handlePlayerCaching(state.player.value, dashSource, options)

    // Update state
    state.dashLoaded.value = true
    state.playerValidated.value = true
    state.isInitializing.value = false

    return { success: true, player: state.player.value }
  } catch (err) {
    errorHandler.error('Failed to setup DASH player', err, { component: 'useVideoPlayer' })
    state.isInitializing.value = false
    throw err
  }
}

/**
 * Create player controls interface
 */
const createPlayerControls = (
  player: Ref<DashPlayer | null>
): { play: () => void; pause: () => void; setQuality: (qualityIndex: number) => void } => {
  const setQuality = (qualityIndex: number): void => {
    if (!player.value) return

    try {
      if (typeof player.value.setQualityFor === 'function') {
        player.value.setQualityFor('video', qualityIndex)
      } else {
        errorHandler.warning('Unable to set quality: API method not found', null, {
          component: 'useVideoPlayer',
        })
      }
    } catch (err) {
      errorHandler.warning('Error setting quality', err, { component: 'useVideoPlayer' })
    }
  }

  const play = (): void => {
    if (player.value && typeof player.value.play === 'function') {
      player.value.play()
    }
  }

  const pause = (): void => {
    if (player.value && typeof player.value.pause === 'function') {
      player.value.pause()
    }
  }

  return { play, pause, setQuality }
}

/**
 * Create state management functions
 */
const createStateManagement = (
  state: VideoPlayerState
): { validatePlayer: () => boolean; resetPlayer: () => void } => {
  const { player, dashLoaded, isInitializing, playerValidated, currentQuality, cacheAttempted } =
    state
  const validatePlayer = (): boolean => {
    return player.value !== null && dashLoaded.value && playerValidated.value
  }

  const resetPlayer = (): void => {
    if (player.value) {
      player.value.reset()
    }
    dashLoaded.value = false
    isInitializing.value = false
    playerValidated.value = false
    currentQuality.value = 0
    cacheAttempted.value = false
  }

  return { validatePlayer, resetPlayer }
}

/**
 * Create cleanup function
 */
const createPlayerCleanup = (
  state: VideoPlayerState
): ((useCachedPlayer?: boolean, dashSource?: string) => void) => {
  const { player, dashLoaded, isInitializing, playerValidated, currentQuality, cacheAttempted } =
    state
  return (useCachedPlayer: boolean = false, dashSource: string = ''): void => {
    if (!player.value) return

    try {
      // Note: Event listeners will be cleaned up when player is destroyed

      // Only destroy if not cached
      if (
        !useCachedPlayer ||
        (window.dashCache &&
          window.dashCache.getPlayerBySource &&
          window.dashCache.getPlayerBySource(dashSource) !== player.value)
      ) {
        errorHandler.debug('Destroying uncached player', null, { component: 'useVideoPlayer' })

        // Detach view first
        if (typeof player.value.attachView === 'function') {
          player.value.attachView(null)
        }

        // Reset and destroy
        player.value.reset()
        player.value = null
      } else {
        errorHandler.debug('Detaching cached player but keeping for reuse', null, {
          component: 'useVideoPlayer',
        })

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
  }
}

/**
 * Initialize video player state
 */
function initializeVideoPlayerState(): VideoPlayerState {
  return {
    player: ref(null),
    dashLoaded: ref(false),
    isInitializing: ref(false),
    playerValidated: ref(false),
    currentQuality: ref(0),
    cacheAttempted: ref(false),
  }
}

/**
 * Create the main initialization function
 */
function createInitializePlayer(state: VideoPlayerState) {
  const initializationAttempts = ref(0)

  return async (
    videoElement: HTMLVideoElement,
    dashSource: string,
    options: VideoPlayerOptions = {}
  ): Promise<PlayerResult> => {
    const validationError = validatePlayerInputs(videoElement, dashSource, state)
    if (validationError) {
      return validationError
    }

    state.isInitializing.value = true
    initializationAttempts.value++

    errorHandler.debug(
      'Initializing player',
      {
        source: dashSource,
        attempt: initializationAttempts.value,
        useCachedPlayer: options.useCachedPlayer,
      },
      { component: 'useVideoPlayer' }
    )

    const reusedPlayer = await tryReusePlayer(videoElement, dashSource, options, state)
    if (reusedPlayer) {
      return reusedPlayer
    }

    if (isDashJSModule(window.dashjs) && !state.dashLoaded.value) {
      return await setupDashPlayer(window.dashjs, videoElement, dashSource, options, state)
    }

    return await waitForDashJs(videoElement, dashSource, options, state)
  }
}

/**
 * Create the return object for useVideoPlayer
 */
function createVideoPlayerReturn(
  state: VideoPlayerState,
  initializePlayer: ReturnType<typeof createInitializePlayer>,
  controls: ReturnType<typeof createPlayerControls>,
  stateManager: ReturnType<typeof createStateManagement>,
  cleanup: ReturnType<typeof createPlayerCleanup>,
  initializationAttempts: Ref<number>
): {
  player: Readonly<Ref<DashPlayer | null>>
  dashLoaded: Readonly<Ref<boolean>>
  isInitializing: Readonly<Ref<boolean>>
  initializationAttempts: Readonly<Ref<number>>
  playerValidated: Readonly<Ref<boolean>>
  currentQuality: Readonly<Ref<number>>
  cacheAttempted: Readonly<Ref<boolean>>
  initializePlayer: (
    videoElement: HTMLVideoElement,
    dashSource: string,
    options?: VideoPlayerOptions
  ) => Promise<PlayerResult>
  validatePlayer: () => boolean
  resetPlayer: () => void
  setQuality: (quality: number, qualityLabel?: string) => void
  play: () => void
  pause: () => void
  cleanup: () => void
} {
  return {
    // State
    player: readonly(state.player),
    dashLoaded: readonly(state.dashLoaded),
    isInitializing: readonly(state.isInitializing),
    initializationAttempts: readonly(initializationAttempts),
    playerValidated: readonly(state.playerValidated),
    currentQuality: readonly(state.currentQuality),
    cacheAttempted: readonly(state.cacheAttempted),

    // Methods
    initializePlayer,
    validatePlayer: stateManager.validatePlayer,
    resetPlayer: stateManager.resetPlayer,
    setQuality: controls.setQuality,
    play: controls.play,
    pause: controls.pause,
    cleanup,
  }
}

export const useVideoPlayer = (): {
  player: Readonly<Ref<DashPlayer | null>>
  dashLoaded: Readonly<Ref<boolean>>
  isInitializing: Readonly<Ref<boolean>>
  initializationAttempts: Readonly<Ref<number>>
  playerValidated: Readonly<Ref<boolean>>
  currentQuality: Readonly<Ref<number>>
  cacheAttempted: Readonly<Ref<boolean>>
  initializePlayer: (
    videoElement: HTMLVideoElement,
    dashSource: string,
    options?: VideoPlayerOptions
  ) => Promise<PlayerResult>
  validatePlayer: () => boolean
  resetPlayer: () => void
  setQuality: (quality: number, qualityLabel?: string) => void
  play: () => void
  pause: () => void
  cleanup: () => void
} => {
  // Initialize state
  const state = initializeVideoPlayerState()

  // Create initialization function with attempts tracking
  const initializePlayerWithAttempts = createInitializePlayer(state)
  const initializationAttempts = ref(0)

  // Patch the attempts tracking into the function
  const initializePlayer = async (
    videoElement: HTMLVideoElement,
    dashSource: string,
    options: VideoPlayerOptions = {}
  ): Promise<PlayerResult> => {
    initializationAttempts.value++
    return await initializePlayerWithAttempts(videoElement, dashSource, options)
  }

  // Create helper functions
  const controls = createPlayerControls(state.player)
  const stateManager = createStateManagement(state)
  const cleanup = createPlayerCleanup(state)

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })

  return createVideoPlayerReturn(
    state,
    initializePlayer,
    controls,
    stateManager,
    cleanup,
    initializationAttempts
  )
}
