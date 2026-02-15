<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-HeroImage
  @description Static hero image component optimized for mobile performance.
  Uses responsive images with WebP support and proper lazy loading.
  Serves as fast-loading alternative to video hero on mobile devices.
  
  @example Basic usage with default images
  <tw-HeroImage altText="Company headquarters building" />
  
  @example Custom images with responsive breakpoints
  <tw-HeroImage 
    mobileWebp="/assets/custom-mobile.webp"
    mobileImage="/assets/custom-mobile.jpg"
    desktopWebp="/assets/custom-desktop.webp"
    desktopImage="/assets/custom-desktop.jpg"
    altText="Custom hero image showing our services"
    :breakpoint="1024"
    :lazyLoad="true"
    @image-loaded="handleImageReady"
    @image-error="handleImageError"
  />
  
  @example With content overlay using slot
  <tw-HeroImage altText="Background image">
    <div class="hero-content">
      <h1>Welcome to Our Company</h1>
      <p>Leading innovation in technology</p>
    </div>
  </tw-HeroImage>
-->
<template>
  <div class="hero-image-container" :class="customClass">
    <!-- Responsive hero image with WebP support -->
    <picture>
      <!-- WebP for modern browsers -->
      <source :srcset="webpSrcSet" type="image/webp" :sizes="imageSizes" />

      <!-- PNG fallback for older browsers -->
      <img
        ref="heroImage"
        :src="fallbackSrc"
        :srcset="pngSrcSet"
        :alt="altText"
        :sizes="imageSizes"
        class="hero-image"
        :class="{ 'image-loaded': imageLoaded }"
        :loading="lazyLoad ? 'lazy' : 'eager'"
        fetchpriority="high"
        @load="onImageLoad"
        @error="onImageError"
      />
    </picture>

    <!-- Content overlay slot -->
    <div v-if="$slots.default" class="hero-content-overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { URLValidator } from '@/utils/validation'

  // Props with TypeScript interface
  interface Props {
    mobileWebp?: string
    mobileImage?: string
    desktopWebp?: string
    desktopImage?: string
    breakpoint?: number
    altText?: string
    lazyLoad?: boolean
    customClass?: string
  }

  // Props with defaults and validation
  const props = withDefaults(defineProps<Props>(), {
    mobileWebp: '/assets/img/hero-mobile.webp',
    mobileImage: '/assets/img/hero-mobile.png',
    desktopWebp: '/assets/img/hero-desktop.webp',
    desktopImage: '/assets/img/hero-desktop.png',
    breakpoint: 768,
    altText: 'Hero image showing network visualization with connected data points',
    lazyLoad: false,
    customClass: '',
  })

  // Emits
  const emit = defineEmits<{
    'image-loaded': [event?: Event]
    'image-error': [error: Event]
  }>()

  // Reactive state
  const imageLoaded = ref(false)
  const skipLoadingState = ref(false)
  const heroImage = ref<HTMLImageElement>()

  // Computed properties
  const webpSrcSet = computed(() => {
    return `${props.mobileWebp} 768w, ${props.desktopWebp} 1024w`
  })

  const pngSrcSet = computed(() => {
    return `${props.mobileImage} 768w, ${props.desktopImage} 1024w`
  })

  const fallbackSrc = computed(() => {
    return props.mobileImage
  })

  const imageSizes = computed(() => {
    return `(max-width: ${props.breakpoint}px) 100vw, 100vw`
  })

  // Methods
  const validateImageSources = (): boolean => {
    const sources = [props.mobileWebp, props.mobileImage, props.desktopWebp, props.desktopImage]

    for (const src of sources) {
      const validation = URLValidator.validateImageSource(src)
      if (!validation.isValid) {
        // eslint-disable-next-line no-console
        console.warn(`Invalid image source: ${src} - ${validation.error}`)
        return false
      }
    }
    return true
  }

  const onImageLoad = (): void => {
    imageLoaded.value = true
    emit('image-loaded')
  }

  const onImageError = (error: Event): void => {
    // eslint-disable-next-line no-console
    console.warn('Hero image failed to load:', error)
    imageLoaded.value = true // Show even if errored to remove spinner
    emit('image-error', error)
  }

  // Lifecycle
  onMounted(() => {
    validateImageSources()

    // Always skip loading state - no loader needed
    skipLoadingState.value = true
  })
</script>

<style scoped>
  .hero-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #1a1a1a; /* Prevent white flash */
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: #1a1a1a !important; /* Match container background to prevent white flash */
  }

  .hero-image.image-loaded {
    opacity: 1;
  }

  /* Loading placeholder styles */
  .image-loading-placeholder {
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

  /* Content overlay */
  .hero-content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    pointer-events: none; /* Allow clicks through to image */
  }

  .hero-content-overlay > * {
    pointer-events: auto; /* Re-enable clicks on actual content */
  }

  /* Mobile responsive enhancements */
  @media (max-width: 768px) {
    .hero-image-container {
      height: 100vh; /* Full height on mobile */
    }
  }

  /* Ensure proper aspect ratio maintenance */
  .hero-image {
    display: block;
    max-width: 100%;
    height: auto;
    min-height: 100%;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .image-loading-placeholder {
      background-color: #000;
      border: 1px solid #fff;
    }

    .loading-text {
      color: #fff;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .hero-image {
      transition: none;
    }
  }
</style>
