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
    <!-- Loading placeholder for smooth transition -->
    <div 
      v-if="!imageLoaded" 
      class="image-loading-placeholder"
      :aria-label="`Loading ${altText}`"
      role="status"
    >
      <div class="loading-content">
        <div class="loading-spinner" aria-hidden="true">
          <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <p class="loading-text">Loading...</p>
      </div>
    </div>

    <!-- Responsive hero image with WebP support -->
    <picture>
      <!-- WebP for modern browsers -->
      <source 
        :srcset="webpSrcSet" 
        type="image/webp"
        :sizes="imageSizes"
      >
      
      <!-- PNG fallback for older browsers -->
      <img 
        ref="heroImage"
        :src="fallbackSrc"
        :srcset="pngSrcSet"
        :alt="altText"
        :sizes="imageSizes"
        class="hero-image"
        :class="{'image-loaded': imageLoaded}"
        @load="onImageLoad"
        @error="onImageError"
        :loading="lazyLoad ? 'lazy' : 'eager'"
        fetchpriority="high"
      >
    </picture>

    <!-- Content overlay slot -->
    <div v-if="$slots.default" class="hero-content-overlay">
      <slot />
    </div>
  </div>
</template>

<script>
import { URLValidator } from '@/utils/validation'

export default {
  name: 'HeroImage',
  
  /**
   * @description Component props with comprehensive documentation
   * @typedef {Object} HeroImageProps
   * @property {string} mobileWebp - WebP image source for mobile devices
   * @property {string} mobileImage - Fallback image source for mobile devices
   * @property {string} desktopWebp - WebP image source for desktop devices
   * @property {string} desktopImage - Fallback image source for desktop devices
   * @property {number} breakpoint - Screen width breakpoint for responsive switching
   * @property {string} altText - Accessible description of the image content
   * @property {boolean} lazyLoad - Whether to enable lazy loading for performance
   * @property {string} customClass - Additional CSS classes to apply
   */
  props: {
    /**
     * @description WebP image source optimized for mobile devices
     * @type {String}
     * @default '/assets/img/hero-mobile.webp'
     * @example '/assets/images/hero-mobile-optimized.webp'
     * @validator Must end with '.webp' and start with '/'
     * @performance WebP provides ~30% better compression than PNG/JPEG
     */
    mobileWebp: {
      type: String,
      default: '/assets/img/hero-mobile.webp',
      validator(value) {
        if (!value || value.length === 0) return false;
        return value.endsWith('.webp') && value.startsWith('/');
      }
    },
    /**
     * @description Fallback image source for mobile devices (PNG/JPEG)
     * @type {String}
     * @default '/assets/img/hero-mobile.png'
     * @example '/assets/images/hero-mobile.jpg'
     * @validator Must end with '.png', '.jpg', or '.jpeg' and start with '/'
     * @fallback Used when WebP is not supported by the browser
     */
    mobileImage: {
      type: String, 
      default: '/assets/img/hero-mobile.png',
      validator(value) {
        if (!value || value.length === 0) return false;
        return (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg')) && value.startsWith('/');
      }
    },
    /**
     * @description WebP image source optimized for desktop devices
     * @type {String}
     * @default '/assets/img/hero-desktop.webp'
     * @example '/assets/images/hero-desktop-hd.webp'
     * @validator Must end with '.webp' and start with '/'
     * @performance Typically larger resolution for desktop viewing
     */
    desktopWebp: {
      type: String,
      default: '/assets/img/hero-desktop.webp',
      validator(value) {
        if (!value || value.length === 0) return false;
        return value.endsWith('.webp') && value.startsWith('/');
      }
    },
    /**
     * @description Fallback image source for desktop devices (PNG/JPEG)
     * @type {String}
     * @default '/assets/img/hero-desktop.png'
     * @example '/assets/images/hero-desktop.jpg'
     * @validator Must end with '.png', '.jpg', or '.jpeg' and start with '/'
     * @fallback Used when WebP is not supported by the browser
     */
    desktopImage: {
      type: String,
      default: '/assets/img/hero-desktop.png',
      validator(value) {
        if (!value || value.length === 0) return false;
        return (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg')) && value.startsWith('/');
      }
    },
    /**
     * @description Screen width breakpoint in pixels for switching between mobile/desktop images
     * @type {Number}
     * @default 768
     * @example 1024 // Switch to desktop images at 1024px and above
     * @validator Must be between 1 and 3840 pixels
     * @responsive Controls when to use desktop vs mobile image sources
     */
    breakpoint: {
      type: Number,
      default: 768,
      validator(value) {
        return value > 0 && value <= 3840; // Reasonable range for screen widths
      }
    },
    /**
     * @description Accessible description of the image content for screen readers
     * @type {String}
     * @default 'Hero image showing network visualization with connected data points'
     * @example 'Modern office building with glass facade representing our corporate headquarters'
     * @validator Must be 1-300 characters
     * @accessibility Critical for screen reader users and SEO
     */
    altText: {
      type: String,
      default: 'Hero image showing network visualization with connected data points',
      validator(value) {
        return value && value.length > 0 && value.length <= 300;
      }
    },
    /**
     * @description Whether to enable lazy loading for better performance
     * @type {Boolean}
     * @default false
     * @example true // Load image only when it enters the viewport
     * @performance Improves initial page load speed for below-fold images
     */
    lazyLoad: {
      type: Boolean,
      default: false
    },
    /**
     * @description Additional CSS classes to apply to the hero image container
     * @type {String}
     * @default ''
     * @example 'rounded-lg shadow-xl full-height'
     * @validator Must be valid CSS class names or empty string
     */
    customClass: {
      type: String,
      default: '',
      validator(value) {
        // Allow empty string or valid CSS class names
        return value === '' || /^[a-zA-Z][a-zA-Z0-9\-_\s]*$/.test(value);
      }
    }
  },
  
  /**
   * @description Events emitted by the HeroImage component
   * @typedef {Object} HeroImageEvents
   * @event image-loaded - Emitted when image loads successfully
   * @event image-error - Emitted when image fails to load
   */
  emits: {
    /**
     * @description Emitted when the hero image loads successfully
     * @param {Event} event - Image load event (optional)
     * @example
     * <tw-HeroImage @image-loaded="handleImageLoaded" />
     * 
     * // In methods:
     * handleImageLoaded() {
     *   console.log('Hero image loaded successfully');
     *   // Hide loading spinner, show content, track analytics, etc.
     * }
     */
    'image-loaded': (event) => {
      return event === undefined || (event && typeof event === 'object');
    },
    
    /**
     * @description Emitted when the hero image fails to load
     * @param {Error} error - Error object from image loading failure
     * @example
     * <tw-HeroImage @image-error="handleImageError" />
     * 
     * // In methods:
     * handleImageError(error) {
     *   console.error('Hero image failed to load:', error);
     *   // Show fallback content, log to error service, etc.
     * }
     */
    'image-error': (error) => {
      return error && typeof error === 'object';
    }
  },
  
  data() {
    return {
      imageLoaded: false
    }
  },
  
  computed: {
    // Generate responsive srcset for WebP
    webpSrcSet() {
      return `${this.mobileWebp} 768w, ${this.desktopWebp} 1024w`
    },
    
    // Generate responsive srcset for PNG fallback
    pngSrcSet() {
      return `${this.mobileImage} 768w, ${this.desktopImage} 1024w`
    },
    
    // Fallback source (mobile PNG)
    fallbackSrc() {
      return this.mobileImage
    },
    
    // Responsive sizes attribute
    imageSizes() {
      return `(max-width: ${this.breakpoint}px) 100vw, 100vw`
    }
  },
  
  methods: {
    validateImageSources() {
      const sources = [
        this.mobileWebp,
        this.mobileImage, 
        this.desktopWebp,
        this.desktopImage
      ];
      
      for (const src of sources) {
        const validation = URLValidator.validateImageSource(src);
        if (!validation.isValid) {
          console.warn(`Invalid image source: ${src} - ${validation.error}`);
          return false;
        }
      }
      return true;
    },
    
    onImageLoad() {
      this.imageLoaded = true
      this.$emit('image-loaded')
    },
    
    onImageError(error) {
      console.warn('Hero image failed to load:', error)
      this.imageLoaded = true // Show even if errored to remove spinner
      this.$emit('image-error', error)
    }
  },
  
  mounted() {
    this.validateImageSources();
  }
}
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