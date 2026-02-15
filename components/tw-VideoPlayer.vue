<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
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
-->
<template>
  <VideoErrorBoundary>
    <div
      class="video-container"
      :class="{ 'with-overlay-controls': !decorative && userControlled && showCustomControls }"
      style="position: relative"
    >
      <!-- Loading component -->
      <VideoLoader :is-loading="!videoReady" :video-title="videoTitle" :decorative="decorative" />

      <!-- DASH Player Management -->
      <VideoDashPlayer
        ref="dashPlayerRef"
        :dash-source="dashSource"
        :use-cached-player="useCachedPlayer"
        :video-type="getVideoType()"
        :player-id="`${getVideoType()}-${Date.now()}`"
        :namespace="'hero'"
        :force-new-player="true"
        @player-ready="onDashPlayerReady"
        @dash-error="onDashError"
        @dash-failed="onDashFailed"
        @quality-change="onQualityChange"
        @stream-initialized="onStreamInitialized"
      >
        <!-- Single video element with dynamic source management -->
        <video
          ref="videoPlayerRef"
          class="video-element"
          :class="[customClass, { 'decorative-video': decorative }]"
          autoplay
          muted
          :loop="false"
          playsinline
          preload="auto"
          :controls="!decorative && userControlled && !showCustomControls"
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
          <!-- Video metadata management -->
          <VideoMetadata
            :caption-src="captionSrc || '/assets/dash/video/captions-en.vtt'"
            :captions-enabled="captionsEnabled"
            :video-element="videoPlayerRef"
            @captions-change="onCaptionsChange"
            @quality-change="onMetadataQualityChange"
          >
            <template #fallback>
              <p>
                Your browser does not support the video tag. This animation shows a network
                visualization with glowing blue location pins containing person silhouettes,
                connected by golden lines, representing our team approach to data protection.
              </p>
            </template>
          </VideoMetadata>
        </video>
      </VideoDashPlayer>

      <!-- Custom accessible overlay controls -->
      <div
        v-if="!decorative && userControlled && showCustomControls"
        class="video-controls-container"
      >
        <VideoControls
          :is-playing="isPlaying"
          :is-muted="isMuted"
          :captions-enabled="captionsEnabled"
          :show-captions="!!captionSrc"
          @play-pause="togglePlayPause"
          @toggle-mute="toggleMute"
          @toggle-captions="toggleCaptions"
        />
      </div>
    </div>
  </VideoErrorBoundary>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { globalState } from '~/composables/globalState'
  import { errorHandler } from '~/composables/errorHandler'
  import { sanitizeTitle } from '@/utils/validation'
  import { useVideoPlayer } from '~/composables/useVideoPlayer'
  import { useVideoRecovery } from '~/composables/useVideoRecovery'
  import { useVideoValidation } from '~/composables/useVideoValidation'
  import { useNuxtApp } from '#app'
  import {
    logDevelopment,
    logVideoPlayerInit,
    logVideoSourceSwitch,
    logVideoEvent,
    logVideoError,
  } from '~/utils/developmentLogging'
  import VideoErrorBoundary from './VideoErrorBoundary.vue'
  import VideoLoader from './VideoLoader.vue'
  import VideoDashPlayer from './VideoDashPlayer.vue'
  import VideoMetadata from './VideoMetadata.vue'
  import VideoControls from './VideoControls.vue'

  // Define fallback configuration for SSR
  const DEFAULT_CONFIG = {
    SOURCES: {
      DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
      DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4',
      DEFAULT_CAPTIONS: '/assets/dash/video/captions-en.vtt',
    },
    INTERSECTION: {
      ROOT_MARGIN_DEFAULT: '200px 0px',
    },
    TIMING: {
      STARTUP_DELAY: 10,
      CAPTION_RETRY_DELAYS: [100, 500, 1000],
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

  // Define props interface
  interface Props {
    dashSource?: string
    fallbackSource?: string
    lazyLoad?: boolean
    rootMargin?: string
    customClass?: string
    useCachedPlayer?: boolean
    deferInitialization?: boolean
    decorative?: boolean
    userControlled?: boolean
    videoTitle?: string
    captionSrc?: string
    showCustomControls?: boolean
  }

  // Define emits interface
  interface Emits {
    (event: 'player-ready', player: unknown): void
    (event: 'dash-error', payload: { error: Error; message: string }): void
    (event: 'dash-failed', payload: { error: Error; message: string }): void
    (event: 'quality-change', qualityInfo: unknown): void
    (event: 'stream-initialized', streamInfo: unknown): void
  }

  // Props with defaults
  const props = withDefaults(defineProps<Props>(), {
    dashSource: '/assets/dash/video/adaptive.mpd',
    fallbackSource: '/assets/dash/video/GettyImages-1368070487.mp4',
    lazyLoad: false,
    rootMargin: '200px 0px',
    customClass: '',
    useCachedPlayer: true,
    deferInitialization: false,
    decorative: true,
    userControlled: false,
    videoTitle: 'Video content',
    captionSrc: '',
    showCustomControls: false,
  })

  // Define emits
  const emit = defineEmits<Emits>()

  // Create emit wrapper for VideoPlayerOptions compatibility
  interface EmitFunction {
    (event: string, data?: unknown): void
  }

  const emitWrapper: EmitFunction = (event: string, data?: unknown): void => {
    // Type assertion needed for Vue emit compatibility

    emit(event as 'player-ready' | 'error', data as unknown)
  }

  // Get Nuxt app instance
  const nuxtApp = useNuxtApp()

  // Use composables
  const videoPlayer = useVideoPlayer()
  const videoRecovery = useVideoRecovery()
  const videoValidation = useVideoValidation()

  // Template refs
  const videoPlayerRef = ref<HTMLVideoElement>()
  const dashPlayerRef = ref()

  // Component state
  const observer = ref<IntersectionObserver>()
  const dashFailed = ref(false)
  const videoLoaded = ref(false)
  const trackAddHandler = ref<(() => void) | null>(null)
  const isPlaying = ref(true)
  const isMuted = ref(true)
  const captionsEnabled = ref(false)
  const videoReady = ref(false)
  const cleanupRecoveryListeners = ref<(() => void) | null>(null)

  // Simplified state management
  const currentSource = ref<'mp4' | 'dash' | null>('mp4')
  const playerState = ref<'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'>('loading')
  const transitionInProgress = ref(false)
  const dashPlayerReady = ref(false)
  const sourceTransitionTime = ref(0)
  const isDeferred = ref(props.deferInitialization)

  // Computed properties
  const sanitizedVideoTitle = computed((): string => {
    return sanitizeTitle(props.videoTitle)
  })

  // Methods
  const _validateResearchData = (): boolean => {
    // Validation logic here if needed
    return true
  }

  const handleRecoveryCallback = (): void => {
    const videoElement = videoPlayerRef.value
    if (!videoElement) return

    videoRecovery.recoverFromVisibilityChange(
      {
        videoLoaded: videoLoaded.value,
        dashLoaded: dashPlayerReady.value,
        dashFailed: dashFailed.value,
        isInitializing: videoPlayer.isInitializing.value,
        playerValidated: videoReady.value,
        videoReady: videoReady.value,
        decorative: props.decorative,
        isPlaying: !(videoPlayerRef.value?.paused ?? true),
      },
      videoElement,
      videoPlayer.player.value,
      () => initializeVideoPlayer()
    )
  }

  const onDashPlayerReady = (player: unknown): void => {
    videoLoaded.value = true
    dashPlayerReady.value = true
    videoReady.value = !props.decorative
    emit('player-ready', player)
  }

  const onDashError = (payload: { error: unknown; message: string }): void => {
    const errorPayload = {
      error: payload.error instanceof Error ? payload.error : new Error(String(payload.error)),
      message: payload.message,
    }
    emit('dash-error', errorPayload)
  }

  const onDashFailed = (payload: { error: unknown; message: string }): void => {
    dashFailed.value = true
    const errorPayload = {
      error: payload.error instanceof Error ? payload.error : new Error(String(payload.error)),
      message: payload.message,
    }
    emit('dash-failed', errorPayload)
  }

  const onQualityChange = (qualityInfo: unknown): void => {
    emit('quality-change', qualityInfo)
  }

  const onStreamInitialized = (streamInfo: unknown): void => {
    emit('stream-initialized', streamInfo)
  }

  const onCaptionsChange = (enabled: boolean): void => {
    captionsEnabled.value = enabled
  }

  const onMetadataQualityChange = (qualityIndex: number): void => {
    if (dashPlayerRef.value) {
      dashPlayerRef.value.setQuality(qualityIndex)
    }
  }

  const initializeVideoPlayer = async (): Promise<void> => {
    if (videoLoaded.value || videoPlayer.isInitializing.value) return

    // Validate video sources first
    const sourceValidation = videoValidation.validateVideoSources({
      dashSource: props.dashSource,
      fallbackSource: props.fallbackSource,
    })

    if (!sourceValidation.allValid) {
      errorHandler.error('Invalid video sources', sourceValidation.errors, {
        component: 'VideoPlayer',
      })
      dashFailed.value = true
      return
    }

    try {
      const initOptions = {
        useCachedPlayer: false,
        emit: emitWrapper,
        playerId: `${getVideoType()}-${Date.now()}`,
        videoType: getVideoType(),
        namespace: 'hero',
        forceNewPlayer: true,
      }

      if (!videoPlayerRef.value) {
        throw new Error('Video element not available')
      }

      const result = await videoPlayer.initializePlayer(
        videoPlayerRef.value,
        props.dashSource,
        initOptions
      )

      if (result.success) {
        videoLoaded.value = true
        dashPlayerReady.value = true

        logDevelopment('🎯 DASH player ready for source switching:', {
          dashPlayerReady: dashPlayerReady.value,
          currentSource: currentSource.value,
          playerState: playerState.value,
        })

        if (!props.decorative) {
          videoReady.value = true
        }
        videoRecovery.resetRecoveryAttempts()
        emit('player-ready', result.player)

        setupDashSegmentLogging()

        if (currentSource.value === 'mp4') {
          const videoElement = videoPlayerRef.value
          if (videoElement && videoElement.ended) {
            switchSourceToDash()
          }
        }
      }
    } catch (error) {
      errorHandler.error('Failed to initialize video player', error, { component: 'VideoPlayer' })
      dashFailed.value = true
      emit('dash-failed', {
        error: error instanceof Error ? error : new Error(String(error)),
        message: 'Failed to initialize video player',
      })
    }
  }

  const setInitialVideoSource = (): void => {
    const videoElement = videoPlayerRef.value
    if (!videoElement || !props.fallbackSource) return

    const sourceElement = document.createElement('source')
    sourceElement.src = props.fallbackSource
    sourceElement.type = 'video/mp4'

    videoElement.insertBefore(sourceElement, videoElement.firstChild)
    currentSource.value = 'mp4'
    playerState.value = 'loading'

    logVideoPlayerInit('MP4 source set immediately during mount', {
      currentSource: currentSource.value,
      playerState: playerState.value,
      fallbackSource: props.fallbackSource,
      videoElementReady: !!videoElement,
    })
  }

  const initializeVideoWithSourceSwitching = async (): Promise<void> => {
    await initializeWithRaceStrategy()
  }

  const initializeWithRaceStrategy = async (): Promise<void> => {
    const DASH_INIT_TIMEOUT = 120 // 120ms max wait for DASH initialization
    const initStartTime = performance.now()

    logDevelopment('🏁 Starting DASH-first race strategy with 120ms timeout')

    try {
      // Race DASH initialization against timeout
      const dashInitPromise = prepareDashPlayer()
      const timeoutPromise = new Promise<void>((resolve, reject) => {
        setTimeout(() => reject(new Error('DASH initialization timeout')), DASH_INIT_TIMEOUT)
      })

      await Promise.race([dashInitPromise, timeoutPromise])

      // If we get here, DASH initialized successfully within timeout
      const initTime = performance.now() - initStartTime

      if (dashPlayerReady.value && videoPlayer.player.value) {
        logDevelopment(`✅ DASH ready in ${Math.round(initTime)}ms - attaching to video element`, {
          initTime: Math.round(initTime),
          timeout: DASH_INIT_TIMEOUT,
          currentSource: currentSource.value,
        })

        // Attach DASH player to the actual video element and start playback
        const videoElement = videoPlayerRef.value
        if (videoElement) {
          currentSource.value = 'dash'
          videoPlayer.player.value.attachView(videoElement)
          setupDashSegmentLogging()
          playerState.value = 'playing'

          logDevelopment('🎬 DASH attached and playing - bandwidth optimized path', {
            currentSource: currentSource.value,
            playerState: playerState.value,
          })
        }
        return
      }
    } catch (error) {
      const initTime = performance.now() - initStartTime
      logDevelopment(
        `⚠️ DASH initialization failed or timeout after ${Math.round(initTime)}ms - using MP4 fallback`,
        {
          initTime: Math.round(initTime),
          timeout: DASH_INIT_TIMEOUT,
          error: error instanceof Error ? error.message : String(error),
        }
      )
    }

    // Fallback to MP4 if DASH failed or timed out
    if (!dashPlayerReady.value) {
      logDevelopment('📺 Loading MP4 fallback immediately')
      setInitialVideoSource()
    }
  }

  const prepareDashPlayer = async (): Promise<void> => {
    // Removed artificial 200ms delay for faster DASH initialization

    try {
      if (!props.dashSource || props.dashSource.length === 0) {
        logDevelopment('⚠️ No DASH source provided, skipping DASH preparation')
        return
      }

      if (window.dashCache) {
        await window.dashCache.loadDashJs()
      }

      await prepareDashPlayerOnly()
    } catch (error) {
      logVideoError('DASH preparation failed, will continue with MP4', { error })
      dashPlayerReady.value = false
    }
  }

  const prepareDashPlayerOnly = async (): Promise<void> => {
    const dummyVideo = document.createElement('video')
    dummyVideo.style.display = 'none'
    document.body.appendChild(dummyVideo)

    try {
      const initOptions = {
        useCachedPlayer: false,
        emit: emitWrapper,
        playerId: `${getVideoType()}-${Date.now()}`,
        videoType: getVideoType(),
        namespace: 'hero',
        forceNewPlayer: true,
      }

      const result = await videoPlayer.initializePlayer(dummyVideo, props.dashSource, initOptions)

      if (result.success) {
        videoLoaded.value = true
        dashPlayerReady.value = true

        logDevelopment(
          '🎯 DASH player ready for source switching (initialized on dummy element):',
          {
            dashPlayerReady: dashPlayerReady.value,
            currentSource: currentSource.value,
            playerState: playerState.value,
            dashSource: props.dashSource,
            videoLoaded: videoLoaded.value,
            playerInstance: !!videoPlayer.player.value,
          }
        )

        emit('player-ready', videoPlayer.player.value)
      } else {
        dashFailed.value = true
        emit('dash-failed', {
          error: new Error(String(result.error || 'Unknown error')),
          message: 'Failed to initialize DASH player',
        })
      }
    } finally {
      if (dummyVideo.parentNode) {
        document.body.removeChild(dummyVideo)
      }
    }
  }

  const switchSourceToDash = async (): Promise<void> => {
    if (transitionInProgress.value || !dashPlayerReady.value || currentSource.value === 'dash') {
      logDevelopment('⚠️ DASH switch blocked:', {
        transitionInProgress: transitionInProgress.value,
        dashPlayerReady: dashPlayerReady.value,
        currentSource: currentSource.value,
      })
      return
    }

    logVideoSourceSwitch('mp4', 'dash', {
      currentSource: currentSource.value,
      playerState: playerState.value,
      transitionTime: sourceTransitionTime.value,
    })

    transitionInProgress.value = true

    try {
      const videoElement = videoPlayerRef.value
      if (!videoElement) return

      sourceTransitionTime.value = videoElement.currentTime
      const wasPlaying = !videoElement.paused

      logDevelopment('📺 Preparing video element for DASH:', {
        currentTime: sourceTransitionTime.value,
        wasPlaying,
        videoElementReady: !!videoElement,
      })

      videoElement.pause()
      videoElement.removeAttribute('src')

      while (videoElement.firstChild) {
        videoElement.removeChild(videoElement.firstChild)
      }

      currentSource.value = 'dash'

      if (videoPlayer.player.value && videoPlayer.player.value.attachView) {
        videoPlayer.player.value.attachView(videoElement)

        // Set up DASH event listeners for looping
        setupDashSegmentLogging()

        if (sourceTransitionTime.value > 0) {
          videoElement.currentTime = sourceTransitionTime.value
        }

        if (wasPlaying) {
          try {
            await videoElement.play()
          } catch (_playError) {
            // Handle play error silently
          }
        }

        playerState.value = 'playing'

        logDevelopment('✅ Successfully switched to DASH:', {
          currentSource: currentSource.value,
          playerState: playerState.value,
          dashPlayerAttached: !!videoPlayer.player.value,
          loopingEnabled: true,
        })
      }
    } catch (error) {
      logVideoError('DASH transition failed, reverting to MP4', { error })
      currentSource.value = 'mp4'
      setVideoSource('mp4')
    } finally {
      transitionInProgress.value = false
    }
  }

  const setVideoSource = (sourceType: 'mp4' | 'dash'): void => {
    const videoElement = videoPlayerRef.value
    if (!videoElement) return

    currentSource.value = sourceType

    if (sourceType === 'mp4') {
      const existingSource = videoElement.querySelector('source[type="video/mp4"]')

      if (existingSource) {
        return
      }

      if (props.fallbackSource && props.fallbackSource.length > 0) {
        const sourceElement = document.createElement('source')
        sourceElement.src = props.fallbackSource
        sourceElement.type = 'video/mp4'

        videoElement.insertBefore(sourceElement, videoElement.firstChild)
        videoElement.load()
        playerState.value = 'loading'
      } else {
        playerState.value = 'error'
      }
    }
  }

  const setupDashSegmentLogging = (): void => {
    if (!videoPlayer.player.value || !window.dashjs) {
      return
    }

    // Set up DASH event listeners for debugging
    const player = videoPlayer.player.value

    player.on(window.dashjs.MediaPlayer.events.PLAYBACK_STARTED, () => {
      if (process.client && (process.dev || import.meta.dev)) {
        // eslint-disable-next-line no-console
        console.log('🎬 DASH playback started:', {
          currentSource: currentSource.value,
          playerState: playerState.value,
          dashPlayerReady: dashPlayerReady.value,
        })
      }
    })

    player.on(window.dashjs.MediaPlayer.events.PLAYBACK_ENDED, () => {
      const dashElement = videoPlayerRef.value
      if (dashElement && currentSource.value === 'dash') {
        logVideoEvent('DASH playback ended → restarting loop', {
          currentSource: currentSource.value,
          currentTime: dashElement.currentTime,
          duration: dashElement.duration,
          videoReady: !!dashElement,
        })
        dashElement.currentTime = 0
        dashElement.play().catch(error => {
          logVideoError('DASH loop restart failed', { error })
        })
      } else {
        if (process.client && (process.dev || import.meta.dev)) {
          // eslint-disable-next-line no-console
          console.log('⚠️ DASH ended but not active source:', {
            currentSource: currentSource.value,
            dashElementExists: !!dashElement,
          })
        }
      }
    })
  }

  // Video event handlers
  const onVideoLoadStart = (): void => {
    playerState.value = 'loading'
  }

  const onVideoCanPlay = (): void => {
    playerState.value = 'ready'
    if (!props.decorative) {
      videoReady.value = true
    }
  }

  const onVideoLoadedData = (): void => {
    // Video data loaded
  }

  const onVideoError = (): void => {
    playerState.value = 'error'
    if (currentSource.value === 'mp4') {
      if (dashPlayerReady.value) {
        switchSourceToDash()
      }
    } else {
      setVideoSource('mp4')
    }
  }

  // eslint-disable-next-line complexity
  const onVideoEnded = async (): Promise<void> => {
    playerState.value = 'ended'

    logVideoEvent('Video ended event', {
      currentSource: currentSource.value,
      playerState: playerState.value,
      dashPlayerReady: dashPlayerReady.value,
      transitionInProgress: transitionInProgress.value,
    })

    // With DASH-first strategy, MP4 should only be playing if DASH failed/timed out
    // In that case, still try to transition to DASH for looping if DASH becomes ready
    if (currentSource.value === 'mp4' && dashPlayerReady.value) {
      if (process.client && (process.dev || import.meta.dev)) {
        // eslint-disable-next-line no-console
        console.log(
          '🔄 MP4 fallback playback complete → attempting DASH transition for looping (DASH may have initialized late)'
        )
      }
      await switchSourceToDash()
    } else if (currentSource.value === 'dash') {
      // DASH should handle its own looping via setupDashSegmentLogging
      if (process.client && (process.dev || import.meta.dev)) {
        // eslint-disable-next-line no-console
        console.log('🔁 DASH stream ended → automatic restart should be handled by DASH events')
      }
    } else if (currentSource.value === 'mp4' && !dashPlayerReady.value) {
      // MP4 fallback with no DASH available - just loop MP4
      if (process.client && (process.dev || import.meta.dev)) {
        // eslint-disable-next-line no-console
        console.log('🔁 MP4 fallback looping (DASH unavailable)')
      }
      const videoElement = videoPlayerRef.value
      if (videoElement) {
        videoElement.currentTime = 0
        videoElement.play().catch(error => {
          logVideoError('MP4 loop restart failed', { error })
        })
      }
    } else {
      if (process.client && (process.dev || import.meta.dev)) {
        // eslint-disable-next-line no-console
        console.log('⚠️ Video ended but no action taken:', {
          currentSource: currentSource.value,
          dashPlayerReady: dashPlayerReady.value,
        })
      }
    }
  }

  const onVideoTimeUpdate = (event: Event): void => {
    const target = event.target as HTMLVideoElement
    sourceTransitionTime.value = target.currentTime
  }

  const onVideoPlay = (): void => {
    playerState.value = 'playing'
    isPlaying.value = true

    if (process.client && (process.dev || import.meta.dev)) {
      // eslint-disable-next-line no-console
      console.log('▶️ Video play:', {
        currentSource: currentSource.value,
        playerState: playerState.value,
      })
    }
  }

  const onVideoPause = (): void => {
    playerState.value = 'paused'
    isPlaying.value = false

    if (process.client && (process.dev || import.meta.dev)) {
      // eslint-disable-next-line no-console
      console.log('⏸️ Video pause:', {
        currentSource: currentSource.value,
        playerState: playerState.value,
      })
    }
  }

  const onVideoPlaying = (): void => {
    playerState.value = 'playing'
    isPlaying.value = true

    if (process.client && (process.dev || import.meta.dev)) {
      // eslint-disable-next-line no-console
      console.log('🎬 Video playing:', {
        currentSource: currentSource.value,
        playerState: playerState.value,
      })
    }
  }

  const getVideoType = (): string => {
    return 'HERO-DASH'
  }

  const checkReducedMotion = (): void => {
    const isReducedMotion =
      document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion

    if (globalState.reduceMotion && !document.documentElement.classList.contains('reduce-motion')) {
      document.documentElement.classList.add('reduce-motion')
    }

    const shouldHaveCaptions = globalState.videoCaptions

    if (isReducedMotion) {
      pausePlayer()
    } else if (isPlaying.value) {
      playPlayer()
    }

    if (shouldHaveCaptions !== captionsEnabled.value) {
      captionsEnabled.value = shouldHaveCaptions
      applyCaptionsState(shouldHaveCaptions)
    }
  }

  const checkCaptionsState = (): void => {
    const captionsEnabledState =
      globalState.videoCaptions || document.documentElement.classList.contains('captions-enabled')

    if (
      globalState.videoCaptions &&
      !document.documentElement.classList.contains('captions-enabled')
    ) {
      document.documentElement.classList.add('captions-enabled')
    }

    const video = videoPlayerRef.value
    if (!video) return

    captionsEnabled.value = captionsEnabledState
    applyCaptionsState(captionsEnabledState)

    if (video.textTracks) {
      const handleAddTrack = (): void => {
        applyCaptionsState(captionsEnabledState)
      }

      trackAddHandler.value = handleAddTrack
      video.textTracks.addEventListener('addtrack', trackAddHandler.value)

      VIDEO_CONFIG.TIMING.CAPTION_RETRY_DELAYS.forEach(delay => {
        setTimeout(() => applyCaptionsState(captionsEnabledState), delay)
      })
    }

    if (globalState.videoCaptions !== captionsEnabledState) {
      globalState.videoCaptions = captionsEnabledState
    }
  }

  const applyCaptionsState = (enabled: boolean): void => {
    const video = videoPlayerRef.value
    if (!video) return

    const tracks = video.textTracks
    if (tracks && tracks.length > 0) {
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'captions') {
          tracks[i].mode = enabled ? 'showing' : 'hidden'
        }
      }
    }

    captionsEnabled.value = enabled
  }

  const pausePlayer = (): void => {
    const captionsState = globalState.videoCaptions

    const video = videoPlayerRef.value
    if (video && !video.paused) {
      video.pause()
      isPlaying.value = false
    }

    videoPlayer.pause()

    captionsEnabled.value = captionsState
    applyCaptionsState(captionsState)

    if (captionsState && videoPlayer.player.value && videoPlayer.player.value.setTextTrack) {
      try {
        videoPlayer.player.value.setTextTrack(0)
      } catch (_e) {
        errorHandler.warning('Could not set DASH text track', _e, { component: 'VideoPlayer' })
      }
    }
  }

  const playPlayer = (): void => {
    if (document.documentElement.classList.contains('reduce-motion') || globalState.reduceMotion) {
      return
    }

    const captionsState = globalState.videoCaptions

    const video = videoPlayerRef.value
    if (video && video.paused) {
      video
        .play()
        .catch(err =>
          errorHandler.warning('Could not play video', err, { component: 'VideoPlayer' })
        )
      isPlaying.value = true
    }

    videoPlayer.play()

    captionsEnabled.value = captionsState
    applyCaptionsState(captionsState)

    if (captionsState && videoPlayer.player.value && videoPlayer.player.value.setTextTrack) {
      try {
        videoPlayer.player.value.setTextTrack(0)
      } catch (_e) {
        errorHandler.warning('Could not set DASH text track', _e, { component: 'VideoPlayer' })
      }
    }
  }

  const togglePlayPause = (): void => {
    const video = videoPlayerRef.value
    if (!video) return

    if (video.paused) {
      video.play()
      isPlaying.value = true

      if (dashPlayerRef.value) {
        dashPlayerRef.value.play()
      }

      if (nuxtApp.$announce) {
        nuxtApp.$announce('Video playing', 'polite')
      }
    } else {
      video.pause()
      isPlaying.value = false

      if (dashPlayerRef.value) {
        dashPlayerRef.value.pause()
      }

      if (nuxtApp.$announce) {
        nuxtApp.$announce('Video paused', 'polite')
      }
    }
  }

  const toggleMute = (): void => {
    const video = videoPlayerRef.value
    if (!video) return

    video.muted = !video.muted
    isMuted.value = video.muted

    if (nuxtApp.$announce) {
      nuxtApp.$announce(video.muted ? 'Video muted' : 'Video unmuted', 'polite')
    }
  }

  const toggleCaptions = (): void => {
    const videoMetadata = videoPlayerRef.value?.querySelector('video-metadata')
    if (videoMetadata && 'toggleCaptions' in videoMetadata) {
      ;(videoMetadata as unknown as { toggleCaptions: () => void }).toggleCaptions()
    } else {
      captionsEnabled.value = !captionsEnabled.value
      globalState.videoCaptions = captionsEnabled.value

      if (captionsEnabled.value) {
        document.documentElement.classList.add('captions-enabled')
      } else {
        document.documentElement.classList.remove('captions-enabled')
      }

      if (nuxtApp.$announce) {
        nuxtApp.$announce(
          captionsEnabled.value ? 'Captions enabled' : 'Captions disabled',
          'polite'
        )
      }
    }
  }

  const setupIntersectionObserver = (): void => {
    observer.value = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting && !videoLoaded.value) {
          errorHandler.debug(
            'Video player visible, initializing',
            { source: props.dashSource },
            { component: 'VideoPlayer' }
          )
          initializeVideoPlayer()
          observer.value?.disconnect()
        }
      },
      {
        rootMargin: props.rootMargin,
      }
    )

    if (videoPlayerRef.value) {
      observer.value.observe(videoPlayerRef.value)
    }
  }

  const triggerInitialization = (): void => {
    if (!isDeferred.value) return

    isDeferred.value = false
    initializeVideoWithSourceSwitching()
  }

  const handleReduceMotionChange = (): void => {
    checkReducedMotion()
  }

  const handleCaptionsChange = (event: Event): void => {
    const customEvent = event as CustomEvent<{ enabled: boolean }>
    if (customEvent && customEvent.detail) {
      captionsEnabled.value = customEvent.detail.enabled
      applyCaptionsState(customEvent.detail.enabled)
    }
  }

  const performMemoryCleanup = (): void => {
    errorHandler.debug('Starting comprehensive memory cleanup', null, { component: 'VideoPlayer' })

    if (observer.value) {
      observer.value.disconnect()
      observer.value = undefined
    }

    if (cleanupRecoveryListeners.value) {
      cleanupRecoveryListeners.value()
    }

    if (process.client) {
      document.removeEventListener('reduceMotionChange', handleReduceMotionChange)
      document.removeEventListener('captions-change', handleCaptionsChange)

      const video = videoPlayerRef.value
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
    }

    if (dashPlayerRef.value) {
      dashPlayerRef.value.cleanup()
    }

    videoLoaded.value = false
    dashFailed.value = false
    trackAddHandler.value = null

    if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
      window.dashCache.reportMetrics({
        loadTime: 0,
        bufferHealth: 0,
        droppedFrames: 0,
        averageBitrate: 0,
        stallCount: 0,
        errorCount: 0,
      })
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    if (process.client) {
      if (process.dev || import.meta.dev) {
        // eslint-disable-next-line no-console
        console.log('🔧 VideoPlayer: Development mode detected, console logs enabled')
        // eslint-disable-next-line no-console
        console.log('🚀 VideoPlayer initialization with DASH-first race strategy:', {
          dashSource: props.dashSource,
          fallbackSource: props.fallbackSource,
          decorative: props.decorative,
          lazyLoad: props.lazyLoad,
          deferInitialization: props.deferInitialization,
          strategy: 'DASH-first with 120ms timeout, MP4 fallback',
        })
      }

      // Don't set MP4 source immediately - let race strategy decide

      setTimeout(() => {
        checkReducedMotion()
        checkCaptionsState()

        cleanupRecoveryListeners.value = videoRecovery.setupVisibilityListeners(() => {
          handleRecoveryCallback()
        })

        if (isDeferred.value) {
          return
        } else if (props.lazyLoad && 'IntersectionObserver' in window) {
          setupIntersectionObserver()
        } else {
          initializeVideoWithSourceSwitching()
        }

        document.addEventListener('reduceMotionChange', handleReduceMotionChange)
        document.addEventListener('captions-change', handleCaptionsChange)
      }, VIDEO_CONFIG.TIMING.STARTUP_DELAY)
    }
  })

  onUnmounted(() => {
    performMemoryCleanup()
  })

  // Expose methods for template refs
  defineExpose({
    initializeVideoPlayer,
    togglePlayPause,
    toggleMute,
    toggleCaptions,
    triggerInitialization,
  })
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

  /* Container for video controls component */
  .video-controls-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .with-overlay-controls:hover .video-controls-container > *,
  .with-overlay-controls:focus-within .video-controls-container > * {
    opacity: 1;
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
