<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component VideoDashPlayer
  @description Handles DASH-specific video streaming logic and player management
  @props {string} dashSource - URL to DASH manifest (.mpd)
  @props {boolean} useCachedPlayer - Whether to use cached DASH player
  @props {string} videoType - Type identifier for player management
  @emits player-ready - DASH player is initialized and ready
  @emits dash-error - Recoverable DASH error occurred
  @emits dash-failed - DASH initialization failed completely
  @emits quality-change - Video quality changed
  @emits stream-initialized - DASH stream initialized
-->
<template>
  <div class="dash-player-container">
    <!-- DASH player manages the video element internally -->
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { ref, onUnmounted } from 'vue'
  import { useVideoPlayer } from '~/composables/useVideoPlayer'
  import { errorHandler } from '~/composables/errorHandler'

  // Define props interface
  interface Props {
    dashSource: string
    useCachedPlayer?: boolean
    videoType?: string
    playerId?: string
    namespace?: string
    forceNewPlayer?: boolean
  }

  // Define emits interface
  interface Emits {
    (event: 'player-ready', player: unknown): void
    (event: 'dash-error', payload: { error: unknown; message: string }): void
    (event: 'dash-failed', payload: { error: unknown; message: string }): void
    (event: 'quality-change', qualityInfo: unknown): void
    (event: 'stream-initialized', streamInfo: unknown): void
  }

  // Create emit wrapper that matches VideoPlayerOptions interface
  interface EmitFunction {
    (event: string, data?: unknown): void
  }

  // Props with defaults and validation
  const props = withDefaults(defineProps<Props>(), {
    useCachedPlayer: true,
    videoType: 'HERO-DASH',
    playerId: () => `dash-${Date.now()}`,
    namespace: 'hero',
    forceNewPlayer: false,
  })

  // Define emits
  const emit = defineEmits<Emits>()

  // Create emit wrapper for VideoPlayerOptions compatibility
  const emitWrapper: EmitFunction = (event: string, data?: unknown): void => {
    // Type assertion needed for Vue emit compatibility

    emit(event as 'player-ready' | 'error', data as unknown)
  }

  // Validate dash source
  if (!props.dashSource.endsWith('.mpd') || !props.dashSource.startsWith('/')) {
    throw new Error('Invalid dash source: must end with .mpd and start with /')
  }

  // Composables
  const videoPlayer = useVideoPlayer()

  // Component state
  const dashReady = ref(false)
  const player = ref<unknown>(null)

  // Methods
  const initializeDashPlayer = async (videoElement: HTMLVideoElement): Promise<boolean> => {
    if (!videoElement) return false

    try {
      const initOptions = {
        useCachedPlayer: props.useCachedPlayer,
        emit: emitWrapper,
        playerId: props.playerId,
        videoType: props.videoType,
        namespace: props.namespace,
        forceNewPlayer: props.forceNewPlayer,
      }

      const result = await videoPlayer.initializePlayer(videoElement, props.dashSource, initOptions)

      if (result.success) {
        dashReady.value = true
        player.value = result.player

        setupDashEventListeners(result.player)
        emit('player-ready', result.player)

        return true
      } else {
        emit('dash-failed', {
          error: result.error,
          message: 'Failed to initialize DASH player',
        })
        return false
      }
    } catch (error) {
      errorHandler.error('DASH player initialization failed', error, {
        component: 'VideoDashPlayer',
      })
      emit('dash-failed', {
        error,
        message: 'DASH player initialization failed',
      })
      return false
    }
  }

  const setupDashEventListeners = (dashPlayer: unknown): void => {
    if (!dashPlayer || !window.dashjs) return

    const typedPlayer = dashPlayer as {
      on: (event: string, callback: (e: unknown) => void) => void
      getVideoElement: () => HTMLVideoElement | null
    }

    // Quality change events
    typedPlayer.on(window.dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, e => {
      emit('quality-change', e)
    })

    // Stream initialization
    typedPlayer.on(window.dashjs.MediaPlayer.events.STREAM_INITIALIZED, e => {
      emit('stream-initialized', e)
    })

    // Error handling
    typedPlayer.on(window.dashjs.MediaPlayer.events.ERROR, e => {
      emit('dash-error', {
        error: e,
        message: 'DASH playback error',
      })
    })

    // Playback ended - handle looping
    typedPlayer.on(window.dashjs.MediaPlayer.events.PLAYBACK_ENDED, (_e: unknown) => {
      // Manually restart for looping since DASH.js doesn't handle native loop
      const videoElement = typedPlayer.getVideoElement()
      if (videoElement) {
        videoElement.currentTime = 0
        videoElement.play().catch(error => {
          errorHandler.warning('DASH loop restart failed', error, {
            component: 'VideoDashPlayer',
          })
        })
      }
    })
  }

  const attachToVideoElement = (videoElement: HTMLVideoElement): boolean => {
    const typedPlayer = player.value as {
      attachView?: (element: HTMLVideoElement | null) => void
    } | null
    if (typedPlayer?.attachView && videoElement) {
      typedPlayer.attachView(videoElement)
      return true
    }
    return false
  }

  const detachFromVideoElement = (): void => {
    const typedPlayer = player.value as {
      attachView?: (element: HTMLVideoElement | null) => void
    } | null
    if (typedPlayer?.attachView) {
      typedPlayer.attachView(null)
    }
  }

  const setQuality = (qualityIndex: number): void => {
    return videoPlayer.setQuality(qualityIndex)
  }

  const play = (): void => {
    return videoPlayer.play()
  }

  const pause = (): void => {
    return videoPlayer.pause()
  }

  const cleanup = (): void => {
    videoPlayer.cleanup()
    dashReady.value = false
    player.value = null
  }

  // Lifecycle
  onUnmounted(() => {
    cleanup()
  })

  // Expose methods for template refs
  defineExpose({
    dashReady,
    player: videoPlayer.player,
    initializeDashPlayer,
    attachToVideoElement,
    detachFromVideoElement,
    setQuality,
    play,
    pause,
    cleanup,
  })
</script>

<style scoped>
  .dash-player-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
