<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
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
    <div class="w-full relative overflow-hidden h-screen mb-[-2px] bg-gray-900">
      <!-- Mobile: Static image for performance -->
      <div v-if="shouldUseLightweight" class="static-hero w-full h-full bg-gray-900">
        <twHeroImage
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
        <twVideoPlayer
          :dash-source="dashSourceUrl"
          :fallback-source="fallbackSourceUrl"
          :lazy-load="false"
          :use-cached-player="true"
          :decorative="isVideoDecorative"
          :user-controlled="props.userControlled"
          :show-custom-controls="props.showCustomControls"
          :video-title="props.videoTitle"
          custom-class="w-full h-full object-cover"
          @dash-error="handleDashError"
          @dash-failed="handleDashFailed"
          @player-ready="handlePlayerReady"
          @quality-change="handleQualityChange"
        />
      </div>

      <!-- Hero Content Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center z-20 pb-20 sm:pb-24 md:pb-28 lg:pb-36"
      >
        <div class="text-center px-6 sm:px-8 md:px-12 lg:px-16 max-w-5xl">
          <!-- Main Headline -->
          <h1 class="text-white font-bold leading-tight mb-4 drop-shadow-lg hero-headline">
            Expertise at the Intersection of AI, Law & Security
          </h1>

          <!-- Sub-headline -->
          <p
            class="text-white font-light leading-relaxed opacity-90 drop-shadow-md hero-subheadline"
          >
            We help organizations navigate complex regulations and build secure, compliant AI
            systems.
          </p>
        </div>
      </div>

      <!-- Elegant scroll indicator with FontAwesome -->
      <div
        class="absolute left-0 right-0 flex flex-col items-center z-20 bottom-32 sm:bottom-28 md:bottom-20 lg:bottom-12"
      >
        <span class="explore-tooltip-wrap">
          <div class="text-white font-light tracking-widest mb-2 opacity-80 hero-explore">
            EXPLORE
          </div>
          <!-- Click handler for smooth scrolling to About section -->
          <a
            href="#about-us"
            class="cursor-pointer"
            aria-label="Scroll down to explore more content"
            @click.prevent="scrollToAbout"
          >
            <i
              class="fas fa-chevron-down text-white text-2xl opacity-80 animate-bounce-subtle"
              aria-hidden="true"
            ></i>
          </a>
          <span class="explore-tooltip-text">Scroll down to explore</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, defineAsyncComponent } from 'vue'
  import { errorHandler } from '~/composables/errorHandler'
  import { URLValidator } from '@/utils/validation'
  import { useDeviceDetection } from '~/composables/useDeviceDetection'

  // Define fallback configuration for SSR
  const DEFAULT_CONFIG = {
    SOURCES: {
      DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
      DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4',
    },
  }

  // Import with fallback
  let _VIDEO_CONFIG = DEFAULT_CONFIG
  try {
    const { VIDEO_CONFIG: config } = require('~/config/videoConfig')
    _VIDEO_CONFIG = config || DEFAULT_CONFIG
  } catch (_e) {
    _VIDEO_CONFIG = DEFAULT_CONFIG
  }

  // Dynamic imports for components
  const twVideoPlayer = defineAsyncComponent(() => import('~/components/tw-VideoPlayer.vue'))
  const twHeroImage = defineAsyncComponent(() => import('~/components/tw-HeroImage.vue'))
  // Props interface
  interface Props {
    /**
     * URL path to the DASH manifest file for adaptive streaming
     * Must end with '.mpd' and start with '/'
     */
    dashSource?: string
    /**
     * URL path to the fallback MP4 video file (used when DASH fails or on mobile)
     * Must end with '.mp4' and start with '/'
     */
    fallbackSource?: string
    /**
     * Accessible title describing the video content for screen readers
     * Must be 1-200 characters
     */
    videoTitle?: string
    /**
     * Whether the video is purely decorative (background) or has meaningful content
     * When true, video is hidden from screen readers
     */
    decorative?: boolean
    /**
     * Whether users should be able to control video playback
     * decorative should be false when userControlled is true
     */
    userControlled?: boolean
    /**
     * Whether to show custom overlay controls (play/pause/mute/captions)
     * userControlled must be true to show controls
     */
    showCustomControls?: boolean
  }

  // Props with defaults and validation
  const props = withDefaults(defineProps<Props>(), {
    dashSource: '/assets/dash/video/adaptive.mpd',
    fallbackSource: '/assets/dash/video/GettyImages-1368070487.mp4',
    videoTitle: 'Corporate headquarters entrance with modern architecture',
    decorative: true,
    userControlled: true,
    showCustomControls: true,
  })
  // Emits interface
  interface Emits {
    /**
     * Proxied event from child VideoPlayer when DASH player is ready
     */
    'player-ready': [player: unknown]
    /**
     * Proxied event from child VideoPlayer for DASH errors
     */
    'dash-error': [payload: { error: unknown; message: string }]
    /**
     * Proxied event from child VideoPlayer for DASH failures
     */
    'dash-failed': [payload: { error: unknown; message: string }]
    /**
     * Proxied event from child VideoPlayer for quality changes
     */
    'quality-change': [qualityInfo: { bitrate: number; qualityLabel: string }]
    /**
     * Proxied event from child HeroImage when image loads successfully
     */
    'image-loaded': [event?: Event]
    /**
     * Proxied event from child HeroImage when image fails to load
     */
    'image-error': [error: Event]
  }

  const emit = defineEmits<Emits>()
  // Use device detection composable
  const { shouldUseLightweight, isMobile } = useDeviceDetection()

  // Reactive state
  const contentStatus = ref<'loading' | 'ready' | 'fallback'>('loading')
  const currentQuality = ref<{ bitrate: number; qualityLabel: string } | null>(null)
  const isVideoDecorative = ref(true) // Start as decorative to skip loading spinner
  const contentType = ref<'image' | 'video' | 'unknown'>('unknown') // Track what type of content is shown
  const dashSourceUrl = ref(props.dashSource)
  const fallbackSourceUrl = ref(props.fallbackSource)
  // Methods
  const validateVideoSource = (src: string): boolean => {
    const validation = URLValidator.validateVideoSource(src)
    if (!validation.isValid) {
      // eslint-disable-next-line no-console
      console.warn(`Invalid video source: ${src} - ${validation.error}`)
      return false
    }
    return true
  }

  const scrollToAbout = (event: Event): void => {
    event.preventDefault()
    const aboutSection = document.querySelector('#about-us')
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const handleImageReady = (): void => {
    contentStatus.value = 'ready'
    contentType.value = 'image'
    dispatchContentLoadedEvent()
  }

  const handleImageError = (error: Event): void => {
    errorHandler.warning('Hero image failed to load', error, { component: 'Dash' })
    contentStatus.value = 'fallback'
    contentType.value = 'image'
    emit('image-error', error)
  }

  const handleDashError = (error: { error: unknown; message: string }): void => {
    errorHandler.warning('Top video DASH error', error, { component: 'Dash' })
    contentStatus.value = 'fallback'
    emit('dash-error', error)
  }

  const handleDashFailed = (error: { error: unknown; message: string }): void => {
    errorHandler.error('Top video DASH failed', error, { component: 'Dash' })
    contentStatus.value = 'fallback'
    emit('dash-failed', error)
  }

  const handleQualityChange = (qualityInfo: unknown): void => {
    const typedQualityInfo = qualityInfo as { bitrate: number; qualityLabel: string }
    currentQuality.value = typedQualityInfo
    errorHandler.debug('Top video quality changed', typedQualityInfo, { component: 'Dash' })
    emit('quality-change', typedQualityInfo)
  }

  const handlePlayerReady = (_player: unknown): void => {
    errorHandler.debug('Top video player ready', null, { component: 'Dash' })
    contentStatus.value = 'ready'
    contentType.value = 'video'

    dispatchContentLoadedEvent()

    // If we have advanced cache from dashPlugins, report metrics
    if (
      window.dashCache &&
      'reportMetrics' in window.dashCache &&
      typeof window.dashCache.reportMetrics === 'function'
    ) {
      window.dashCache.reportMetrics({
        loadTime: Date.now(),
        bufferHealth: 0,
        droppedFrames: 0,
        averageBitrate: 0,
        stallCount: 0,
        errorCount: 0,
      })
    }

    emit('player-ready', _player)
  }

  const dispatchContentLoadedEvent = (): void => {
    if (window) {
      window.heroVideoLoaded = true

      try {
        const heroLoadedEvent = new CustomEvent('heroVideoLoaded', {
          detail: {
            contentType: contentType.value,
            isMobile: isMobile.value,
            isLightweight: shouldUseLightweight.value,
          },
        })
        window.dispatchEvent(heroLoadedEvent)
      } catch (err) {
        errorHandler.warning('Error dispatching heroVideoLoaded event', err, { component: 'Dash' })
      }
    }
  }

  // Lifecycle
  onMounted(() => {
    // Set content type immediately based on device detection
    contentType.value = shouldUseLightweight.value ? 'image' : 'video'

    // Validate video sources and fallback to empty if invalid
    if (!validateVideoSource(dashSourceUrl.value)) {
      errorHandler.error(
        'Invalid DASH source URL in tw-Dash',
        { source: dashSourceUrl.value },
        { component: 'Dash' }
      )
      dashSourceUrl.value = ''
    }

    if (!validateVideoSource(fallbackSourceUrl.value)) {
      errorHandler.error(
        'Invalid fallback source URL in tw-Dash',
        { source: fallbackSourceUrl.value },
        { component: 'Dash' }
      )
      fallbackSourceUrl.value = ''
    }
  })
</script>

<style scoped>
  @keyframes bounce-subtle {
    0%,
    100% {
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

  .explore-tooltip-wrap {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  .explore-tooltip-text {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: rgba(31, 41, 55, 0.9);
    color: #f9fafb;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .explore-tooltip-text::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(31, 41, 55, 0.9);
  }
  .explore-tooltip-wrap:hover .explore-tooltip-text {
    opacity: 1;
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
