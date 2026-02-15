<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component VideoMetadata
  @description Manages video captions, quality settings, and metadata
  @props {string} captionSrc - URL to captions file (.vtt)
  @props {boolean} captionsEnabled - Current captions state
  @props {Array} qualityLevels - Available quality levels
  @props {number} currentQuality - Current quality index
  @emits captions-change - Captions state changed
  @emits quality-change - Quality level changed
-->
<template>
  <div class="video-metadata">
    <!-- Caption track element -->
    <track
      v-if="captionSrc"
      kind="captions"
      :src="captionSrc"
      srclang="en"
      label="English"
      :default="captionsEnabled"
    />

    <!-- Fallback content for unsupported browsers -->
    <slot name="fallback">
      <p>
        Your browser does not support the video tag. This animation shows a network visualization
        with glowing blue location pins containing person silhouettes, connected by golden lines,
        representing our team approach to data protection.
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onUnmounted } from 'vue'
  import { globalState } from '~/composables/globalState'
  import { errorHandler } from '~/composables/errorHandler'

  // Define props interface
  interface Props {
    captionSrc?: string
    captionsEnabled?: boolean
    qualityLevels?: unknown[]
    currentQuality?: number
    videoElement?: HTMLVideoElement | null
  }

  // Define emits interface
  interface Emits {
    (event: 'captions-change', enabled: boolean): void
    (event: 'quality-change', qualityIndex: number): void
  }

  // Props with defaults and validation
  const props = withDefaults(defineProps<Props>(), {
    captionSrc: '/assets/dash/video/captions-en.vtt',
    captionsEnabled: false,
    qualityLevels: () => [],
    currentQuality: -1,
    videoElement: null,
  })

  // Validate caption source
  if (
    props.captionSrc &&
    props.captionSrc !== '' &&
    (!props.captionSrc.endsWith('.vtt') || !props.captionSrc.startsWith('/'))
  ) {
    throw new Error('Invalid caption source: must end with .vtt and start with /')
  }

  // Define emits
  const emit = defineEmits<Emits>()

  // Component state
  const trackAddHandler = ref<(() => void) | null>(null)
  const retryTimeouts = ref<ReturnType<typeof setTimeout>[]>([])

  // Caption retry delays from config
  const CAPTION_RETRY_DELAYS = [100, 500, 1000]

  // Methods
  const applyCaptionsState = (enabled: boolean): void => {
    if (!props.videoElement) return

    const tracks = props.videoElement.textTracks
    if (tracks && tracks.length > 0) {
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'captions') {
          tracks[i].mode = enabled ? 'showing' : 'hidden'
        }
      }
    }
  }

  const setupCaptionTracking = (): void => {
    if (!props.videoElement) return

    const video = props.videoElement

    // Apply current captions state
    applyCaptionsState(props.captionsEnabled)

    // Set up handler for dynamic track addition
    if (video.textTracks) {
      const handleAddTrack = (): void => {
        applyCaptionsState(props.captionsEnabled)
      }

      trackAddHandler.value = handleAddTrack
      video.textTracks.addEventListener('addtrack', handleAddTrack)

      // Retry applying captions with delays for async loading
      CAPTION_RETRY_DELAYS.forEach(delay => {
        const timeoutId = setTimeout(() => applyCaptionsState(props.captionsEnabled), delay)
        retryTimeouts.value.push(timeoutId)
      })
    }
  }

  const toggleCaptions = (): void => {
    const newState = !props.captionsEnabled

    // Update global state
    globalState.videoCaptions = newState

    // Update DOM class
    if (newState) {
      document.documentElement.classList.add('captions-enabled')
    } else {
      document.documentElement.classList.remove('captions-enabled')
    }

    // Apply to tracks
    applyCaptionsState(newState)

    // Retry with delays for async tracks
    CAPTION_RETRY_DELAYS.slice(0, 2).forEach(delay => {
      const timeoutId = setTimeout(() => applyCaptionsState(newState), delay)
      retryTimeouts.value.push(timeoutId)
    })

    // Emit change event
    emit('captions-change', newState)

    // Dispatch global event
    try {
      const captionsEvent = new CustomEvent('captionsChange', {
        detail: { enabled: newState },
      })
      document.dispatchEvent(captionsEvent)
    } catch (err) {
      errorHandler.warning('Error dispatching captionsChange event', err, {
        component: 'VideoMetadata',
      })
    }
  }

  const setQuality = (qualityIndex: number): void => {
    if (qualityIndex >= 0 && qualityIndex < props.qualityLevels.length) {
      emit('quality-change', qualityIndex)
    }
  }

  const cleanup = (): void => {
    // Clean up event listeners
    if (props.videoElement?.textTracks && trackAddHandler.value) {
      props.videoElement.textTracks.removeEventListener('addtrack', trackAddHandler.value)
      trackAddHandler.value = null
    }

    // Clear retry timeouts
    retryTimeouts.value.forEach(timeoutId => clearTimeout(timeoutId))
    retryTimeouts.value = []
  }

  // Watch for changes in captions state
  watch(
    () => props.captionsEnabled,
    newValue => {
      applyCaptionsState(newValue)
    }
  )

  // Watch for video element changes
  watch(
    () => props.videoElement,
    newVideoElement => {
      if (newVideoElement) {
        setupCaptionTracking()
      }
    },
    { immediate: true }
  )

  // Lifecycle
  onUnmounted(() => {
    cleanup()
  })

  // Expose methods for template refs
  defineExpose({
    applyCaptionsState,
    toggleCaptions,
    setQuality,
    cleanup,
  })
</script>

<style scoped>
  .video-metadata {
    display: contents;
  }
</style>
