/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @module plugins/a11y
 * @description Comprehensive accessibility plugin that manages site-wide accessibility features
 * Implements WCAG 2.2 AA compliance features including:
 * - Cross-origin image attribute management for secure resource loading
 * - Reduced motion implementation for users with vestibular disorders
 * - High contrast mode for users with visual impairments
 * - Focus enhancement for keyboard navigation users
 * - Screen reader announcements for dynamic content changes
 * - Caption support for videos to ensure multimedia accessibility
 * - Font adjustments for dyslexic users (OpenDyslexic font)
 * - Font size adjustments for users with visual impairments
 *
 * Automatically synchronizes accessibility settings across page navigation and
 * provides a global screen reader announcement system compliant with ARIA best practices.
 *
 * @see {@link components/AccessibilityWidget.vue} UI component that controls these settings
 * @see {@link components/tw-VideoPlayer.vue} Video component with a11y integration
 * @see {@link composables/globalState.ts} State management for accessibility settings
 */

import { defineNuxtPlugin } from '#app'

interface AccessibilityState {
  reduceMotion?: boolean
  highContrast?: boolean
  focusMode?: boolean
  videoCaptions?: boolean
  fontFamily?: 'default' | 'dyslexic'
  fontSizeLevel?: number
  widgetPosition?: 'bottom-left' | 'bottom-right'
}

interface DashPlayer {
  setTextTrack?: (trackIndex: number) => void
}

interface VideoElementWithDashPlayer extends HTMLVideoElement {
  dashPlayer?: DashPlayer
}

interface Announcer {
  polite: (message: string) => void
  assertive: (message: string) => void
}

interface NuxtRouter {
  beforeEach?: (handler: () => boolean) => void
  afterEach?: (handler: () => void) => void
}

interface NuxtAppInstance {
  $router?: NuxtRouter
  hook?: (name: string, handler: (...args: unknown[]) => void) => void | (() => void)
}

// Helper function to apply reduce motion settings
const createReduceMotionHandler = (): { applyReduceMotion: () => void } => {
  const applyReduceMotion = (): void => {
    document.documentElement.classList.add('reduce-motion')

    // Also pause all videos immediately
    setTimeout(() => {
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (video && typeof video.pause === 'function') {
          video.pause()
        }
      })

      // Dispatch an event to notify components of reduce motion change
      try {
        const reduceMotionEvent = new Event('reduceMotionChange')
        document.dispatchEvent(reduceMotionEvent)
      } catch (_err) {
        // console.warn('Error dispatching reduceMotionChange event:', err);
      }
    }, 100)
  }

  return { applyReduceMotion }
}

// Helper function to apply high contrast mode
const createHighContrastHandler = (): { applyHighContrast: () => void } => {
  const applyHighContrast = (): void => {
    document.documentElement.classList.add('high-contrast-mode')
  }

  return { applyHighContrast }
}

// Helper function to apply focus mode
const createFocusModeHandler = (): { applyFocusMode: () => void } => {
  const applyFocusMode = (): void => {
    document.documentElement.classList.add('focus-mode')
    document.documentElement.classList.add('enhanced-focus')
  }

  return { applyFocusMode }
}

// Helper function to apply captions to videos
const createVideoCaptionHandler = (): {
  applyVideoCaptions: () => void
  setupCaptionObserver: () => void
} => {
  const applyCaptions = (): void => {
    // Re-query videos as they may have been dynamically added
    const currentVideos = document.querySelectorAll('video')

    // Only proceed if we have videos
    if (currentVideos.length === 0) return

    currentVideos.forEach(video => {
      const tracks = video.textTracks
      if (tracks && tracks.length > 0) {
        for (let i = 0; i < tracks.length; i++) {
          if (tracks[i].kind === 'captions') {
            tracks[i].mode = 'showing'
          }
        }
      }

      // For DASH players that might be attached to videos
      const videoWithDash = video as VideoElementWithDashPlayer
      if (videoWithDash.dashPlayer?.setTextTrack) {
        try {
          videoWithDash.dashPlayer.setTextTrack(0) // Enable first track
        } catch (_e) {
          // console.warn('Could not set DASH text track:', e);
        }
      }
    })

    // Also dispatch a global captions event
    try {
      const captionsEvent = new CustomEvent('captionsChange', {
        detail: { enabled: true },
      })
      document.dispatchEvent(captionsEvent)
    } catch (_err) {
      // console.warn('Error dispatching captionsChange event:', err);
    }
  }

  const setupCaptionObserver = (): void => {
    try {
      const captionObserver = new MutationObserver(mutations => {
        let videoAdded = false

        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node instanceof Element) {
                if (
                  node.nodeName === 'VIDEO' ||
                  (node.querySelectorAll && node.querySelectorAll('video').length > 0)
                ) {
                  videoAdded = true
                }
              }
            })
          }
        })

        if (videoAdded) {
          // If a new video was added, apply captions again
          setTimeout(applyCaptions, 10)
        }
      })

      // Start observing the entire document
      captionObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      })

      // Set up a cleanup for the observer
      window.addEventListener('beforeunload', () => {
        captionObserver.disconnect()
      })
    } catch (_e) {
      // console.warn('Error setting up caption observer:', e);
    }
  }

  const applyVideoCaptions = (): void => {
    // Check if there are any videos on the page before applying captions
    const videos = document.querySelectorAll('video')

    if (videos.length > 0) {
      // Only add captions-enabled class if videos exist on the page
      document.documentElement.classList.add('captions-enabled')

      // Apply captions multiple times with staggered timeouts
      // This helps catch videos that load asynchronously
      applyCaptions() // Immediate
      setTimeout(applyCaptions, 100) // Short delay
      setTimeout(applyCaptions, 500) // Medium delay
      setTimeout(applyCaptions, 1000) // Longer delay
      setTimeout(applyCaptions, 2000) // Extra long delay for slow loading videos

      // Add a mutation observer to catch new videos being added to the DOM
      setupCaptionObserver()
    }
  }

  return { applyVideoCaptions, setupCaptionObserver }
}

// Helper function to apply font settings
const createFontSettingsHandler = (): {
  applyFontFamily: (fontFamily: string) => void
  applyFontSize: (fontSizeLevel: number) => void
} => {
  const applyFontFamily = (fontFamily: string): void => {
    if (fontFamily === 'dyslexic') {
      document.documentElement.classList.add('dyslexic-font')

      // Dynamically load OpenDyslexic fonts only when needed
      if (!document.querySelector('link[href*="fonts-opendyslexic.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/assets/css/fonts-opendyslexic.css'
        link.media = 'all'
        document.head.appendChild(link)
      }
    }
  }

  const applyFontSize = (fontSizeLevel: number): void => {
    if (fontSizeLevel !== undefined && fontSizeLevel !== 0) {
      // Remove any existing font size classes
      document.documentElement.classList.remove(
        'font-size-decrease-2',
        'font-size-decrease-1',
        'font-size-increase-1',
        'font-size-increase-2',
        'font-size-increase-3'
      )

      // Apply appropriate class based on level
      if (fontSizeLevel !== 0) {
        const directionName = fontSizeLevel > 0 ? 'increase' : 'decrease'
        const level = Math.abs(fontSizeLevel)
        document.documentElement.classList.add(`font-size-${directionName}-${level}`)
      }
    }
  }

  return { applyFontFamily, applyFontSize }
}

// Helper function to handle legacy migration
const createLegacyMigrationHandler = (): {
  migrateLegacyPreferences: (legacyPrefs: string) => void
} => {
  const { applyReduceMotion } = createReduceMotionHandler()
  const { applyHighContrast } = createHighContrastHandler()
  const { applyFocusMode } = createFocusModeHandler()

  const migrateLegacyPreferences = (legacyPrefs: string): void => {
    try {
      // eslint-disable-next-line no-console
      console.info('Migrating from deprecated accessibility-preferences to accessibility-state')
      const _prefs = JSON.parse(legacyPrefs)

      // Convert the legacy format to the new state format
      const migratedState: AccessibilityState = {
        reduceMotion: false, // Using default, not reading from legacy
        highContrast: false, // Using default, not reading from legacy
        focusMode: false, // Default value, not reading from legacy
        videoCaptions: false, // Using default, not reading from legacy
        fontFamily: 'default', // Using default, not reading from legacy
        fontSizeLevel: 0, // Using default, not reading from legacy
        widgetPosition: 'bottom-right', // Default position, not reading from legacy
      }

      // Save the migrated state
      localStorage.setItem('accessibility-state', JSON.stringify(migratedState))

      // Apply settings from the migrated state
      if (migratedState.reduceMotion) {
        applyReduceMotion()
      }

      if (migratedState.highContrast) {
        applyHighContrast()
      }

      if (migratedState.focusMode) {
        applyFocusMode()
      }

      // Apply other migrated settings...
    } catch (_err) {
      // eslint-disable-next-line no-console
      console.error('Error migrating from legacy accessibility preferences:', _err)
    }
  }

  return { migrateLegacyPreferences }
}

// Helper function to apply current accessibility state
const createAccessibilityStateApplier = (): {
  applyAccessibilityState: (state: AccessibilityState) => void
} => {
  const { applyReduceMotion } = createReduceMotionHandler()
  const { applyHighContrast } = createHighContrastHandler()
  const { applyFocusMode } = createFocusModeHandler()
  const { applyVideoCaptions } = createVideoCaptionHandler()
  const { applyFontFamily, applyFontSize } = createFontSettingsHandler()

  const applyAccessibilityState = (state: AccessibilityState): void => {
    // Apply saved settings to DOM
    if (state.reduceMotion) {
      applyReduceMotion()
    }

    if (state.highContrast) {
      applyHighContrast()
    }

    if (state.focusMode) {
      applyFocusMode()
    }

    if (state.videoCaptions) {
      applyVideoCaptions()
    }

    // Apply font family setting
    if (state.fontFamily) {
      applyFontFamily(state.fontFamily)
    }

    // Apply font size level
    if (state.fontSizeLevel !== undefined) {
      applyFontSize(state.fontSizeLevel)
    }
  }

  return { applyAccessibilityState }
}

// Helper function to fix link and meta image cross-origin attributes
const createLinkMetaImageFixer = (): { fixLinkMetaImages: () => Set<string> } => {
  const imageDomains = ['blaeu.com']

  const fixLinkMetaImages = (): Set<string> => {
    const imageUrls = new Set<string>()

    try {
      // Locate preloaded images in meta/link tags and fix them
      const headLinks = document.querySelectorAll('link[rel="preload"][as="image"]')
      headLinks.forEach(link => {
        const href = link.getAttribute('href')
        if (href && imageDomains.some(domain => href.includes(domain))) {
          if (!link.hasAttribute('crossorigin')) {
            link.setAttribute('crossorigin', 'anonymous')
          }
        }
      })

      // Locate open graph and other meta images
      const metaTags = document.querySelectorAll(
        'meta[property^="og:image"], meta[name^="twitter:image"]'
      )
      metaTags.forEach(meta => {
        const content = meta.getAttribute('content')
        if (content && imageDomains.some(domain => content.includes(domain))) {
          imageUrls.add(content)
        }
      })
    } catch (_e) {
      // console.warn('Error fixing link/meta images:', e);
    }

    return imageUrls
  }

  return { fixLinkMetaImages }
}

// Helper function to fix img element cross-origin attributes
const createImgElementFixer = (): { fixImgElements: (imageUrls: Set<string>) => void } => {
  const imageDomains = ['blaeu.com']

  const fixImgElements = (imageUrls: Set<string>): void => {
    try {
      // Now locate image tags and fix them
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        const src = img.getAttribute('src')
        if (src && (imageDomains.some(domain => src.includes(domain)) || imageUrls.has(src))) {
          if (!img.hasAttribute('crossorigin')) {
            img.setAttribute('crossorigin', 'anonymous')
          }
        }
      })
    } catch (_e) {
      // console.warn('Error fixing img elements:', e);
    }
  }

  return { fixImgElements }
}

// Helper function to setup cross-origin image mutation observer
const createCrossOriginImageObserver = (
  addCrossOriginToImages: () => void
): { setupObserver: () => void } => {
  const setupObserver = (): void => {
    if (!process.client) return

    try {
      const observer = new MutationObserver(mutations => {
        let needsCheck = false

        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node instanceof Element) {
                if (
                  node.nodeName === 'IMG' ||
                  node.nodeName === 'LINK' ||
                  (node.querySelectorAll &&
                    (node.querySelectorAll('img').length > 0 ||
                      node.querySelectorAll('link[rel="preload"][as="image"]').length > 0))
                ) {
                  needsCheck = true
                }
              }
            })
          }
        })

        if (needsCheck) {
          addCrossOriginToImages()
        }
      })

      // Start observing with a slight delay to ensure DOM is ready
      setTimeout(() => {
        if (process.client && typeof document !== 'undefined' && document.documentElement) {
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
          })
        }
      }, 100)
    } catch (_e) {
      // console.warn('Error setting up mutation observer:', e);
    }
  }

  return { setupObserver }
}

// Helper function to fix cross-origin image issues
const createCrossOriginImageFixer = (): {
  fixCrossOriginImageIssues: () => void
  addCrossOriginToImages: () => void
} => {
  const { fixLinkMetaImages } = createLinkMetaImageFixer()
  const { fixImgElements } = createImgElementFixer()

  const addCrossOriginToImages = (): void => {
    if (!process.client) return

    const imageUrls = fixLinkMetaImages()
    fixImgElements(imageUrls)
  }

  const { setupObserver } = createCrossOriginImageObserver(addCrossOriginToImages)

  return {
    fixCrossOriginImageIssues: (): void => {
      if (!process.client) return

      // Run immediately
      setTimeout(addCrossOriginToImages, 0)

      // Run on load
      window.addEventListener('load', addCrossOriginToImages)

      // Setup mutation observer to watch for new images
      setupObserver()
    },
    addCrossOriginToImages,
  }
}

// Helper function to setup router event handlers
const createRouterEventSetup = (
  nuxtApp: NuxtAppInstance,
  handleNavigation: () => void,
  runInitialization: () => void
): { setupRouterEvents: () => void } => {
  const setupRouterEvents = (): void => {
    // Handle router events
    if (
      nuxtApp.$router &&
      typeof nuxtApp.$router === 'object' &&
      'beforeEach' in nuxtApp.$router &&
      typeof nuxtApp.$router.beforeEach === 'function'
    ) {
      nuxtApp.$router.beforeEach(() => {
        handleNavigation()
        return true
      })
    }

    if (
      nuxtApp.$router &&
      typeof nuxtApp.$router === 'object' &&
      'afterEach' in nuxtApp.$router &&
      typeof nuxtApp.$router.afterEach === 'function'
    ) {
      nuxtApp.$router.afterEach(() => {
        handleNavigation()
        runInitialization()
      })
    }

    // Handle page changes
    if (nuxtApp.hook && typeof nuxtApp.hook === 'function') {
      nuxtApp.hook('page:start', handleNavigation)
      nuxtApp.hook('page:finish', () => {
        handleNavigation()
        runInitialization()
      })
    }
  }

  return { setupRouterEvents }
}

// Helper function to setup video observer
const createVideoObserverSetup = (
  initAccessibilitySettings: () => void
): { setupVideoObserver: () => void } => {
  const setupVideoObserver = (): void => {
    try {
      const videoObserver = new MutationObserver(mutations => {
        let videoAdded = false

        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node instanceof Element) {
                if (
                  node.nodeName === 'VIDEO' ||
                  (node.querySelectorAll && node.querySelectorAll('video').length > 0)
                ) {
                  videoAdded = true
                }
              }
            })
          }
        })

        if (videoAdded && process.client && typeof document !== 'undefined') {
          // If a video was added, apply accessibility settings again
          setTimeout(initAccessibilitySettings, 10)
        }
      })

      // Start observing with a slight delay to ensure DOM is ready
      setTimeout(() => {
        if (typeof document !== 'undefined' && document.documentElement) {
          videoObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
          })
        }
      }, 200)
    } catch (_e) {
      // console.warn('Error setting up video observer:', e);
    }
  }

  return { setupVideoObserver }
}

// Helper function to setup event listeners
const createEventListenerSetup = (
  fixCrossOriginImageIssues: () => void,
  runInitialization: () => void
): { setupEventListeners: () => void } => {
  const setupEventListeners = (): void => {
    // Initial setup
    setTimeout(fixCrossOriginImageIssues, 0)
    setTimeout(runInitialization, 0)

    // Run on load events
    window.addEventListener('load', fixCrossOriginImageIssues)
    window.addEventListener('load', runInitialization)
    document.addEventListener('DOMContentLoaded', fixCrossOriginImageIssues)
    document.addEventListener('DOMContentLoaded', runInitialization)
  }

  return { setupEventListeners }
}

// Helper function to create initialization runner
const createInitializationRunner = (
  initAccessibilitySettings: () => void
): { runInitialization: () => void } => {
  const runInitialization = (): void => {
    // Run immediately
    initAccessibilitySettings()

    // Run again after a small delay for elements that load dynamically
    if (process.client && typeof document !== 'undefined') {
      setTimeout(initAccessibilitySettings, 100)

      // Run again after the page has had time to fully render
      setTimeout(initAccessibilitySettings, 500)

      // Run one last time to catch any late-loading elements
      setTimeout(initAccessibilitySettings, 1000)
    }
  }

  return { runInitialization }
}

/**
 * Initializes accessibility settings from localStorage and applies them to the DOM
 * Reads saved user preferences and applies them consistently across page loads
 * Handles configuration for all accessibility features:
 * - Reduced motion (for vestibular disorders)
 * - High contrast mode (for visual impairments)
 * - Focus mode (for keyboard navigation users)
 * - Video captions (for hearing impaired users)
 * - Font family (OpenDyslexic font for dyslexic users)
 * - Font size adjustments (for visual impairments)
 *
 * Also manages backward compatibility with legacy storage formats
 */
const createAccessibilityInitializer = (): { initAccessibilitySettings: () => void } => {
  const initAccessibilitySettings = (): void => {
    if (process.client) {
      try {
        // First try to get state from the primary storage key
        const savedState = localStorage.getItem('accessibility-state')

        // Check for legacy preferences format as fallback
        // @deprecated 'accessibility-preferences' will be removed in a future version
        const legacyPrefs = !savedState ? localStorage.getItem('accessibility-preferences') : null

        if (savedState) {
          const state: AccessibilityState = JSON.parse(savedState)
          const { applyAccessibilityState } = createAccessibilityStateApplier()
          applyAccessibilityState(state)
        } else if (legacyPrefs) {
          // Migration path from legacy format
          // @deprecated This migration path will be removed in a future update
          const { migrateLegacyPreferences } = createLegacyMigrationHandler()
          migrateLegacyPreferences(legacyPrefs)
        }
      } catch (_e) {
        // eslint-disable-next-line no-console
        console.error('Error applying accessibility settings:', _e)
      }
    }
  }

  return { initAccessibilitySettings }
}

/**
 * Creates handler for accessibility reset events
 * Removes all accessibility-related classes and reinitializes settings
 */
const createAccessibilityResetHandler = (
  initAccessibilitySettings: () => void
): { handleAccessibilityReset: () => void } => {
  const handleAccessibilityReset = (): void => {
    if (process.client) {
      // Remove all accessibility-related classes
      document.documentElement.classList.remove(
        'high-contrast-mode',
        'focus-mode',
        'enhanced-focus',
        'reduce-motion',
        'captions-enabled',
        'dyslexic-font',
        'font-size-decrease-2',
        'font-size-decrease-1',
        'font-size-increase-1',
        'font-size-increase-2',
        'font-size-increase-3'
      )

      // Try to load from localStorage again to ensure we have the latest settings
      initAccessibilitySettings()
    }
  }

  return { handleAccessibilityReset }
}

export default defineNuxtPlugin((nuxtApp): object => {
  /**
   * Adds crossorigin="anonymous" attribute to images loaded from specific domains
   * This ensures proper CORS handling for images used in various contexts including
   * preloaded images, Open Graph images, and standard img elements
   */
  const fixCrossOriginImageIssues = (): void => {
    // Use the extracted helper function
    const crossOriginFixer = createCrossOriginImageFixer()
    crossOriginFixer.fixCrossOriginImageIssues()
  }

  /**
   * Handles navigation events by reapplying accessibility fixes
   * Called during router navigation events to ensure cross-origin image
   * attributes are properly maintained as the DOM changes
   */
  const handleNavigation = (): void => {
    // Fix cross-origin image issues
    setTimeout(fixCrossOriginImageIssues, 10)
  }

  // Create accessibility helpers
  const { initAccessibilitySettings } = createAccessibilityInitializer()
  const { handleAccessibilityReset } = createAccessibilityResetHandler(initAccessibilitySettings)

  // Run the setup at appropriate times
  if (process.client) {
    // Listen for accessibility reset events
    document.addEventListener('accessibilityReset', handleAccessibilityReset)

    // Create initialization runner and setup helpers
    const { runInitialization } = createInitializationRunner(initAccessibilitySettings)
    const { setupEventListeners } = createEventListenerSetup(
      fixCrossOriginImageIssues,
      runInitialization
    )
    const { setupRouterEvents } = createRouterEventSetup(
      nuxtApp as NuxtAppInstance,
      handleNavigation,
      runInitialization
    )
    const { setupVideoObserver } = createVideoObserverSetup(initAccessibilitySettings)

    // Setup all event listeners and observers
    setupEventListeners()
    setupRouterEvents()
    setupVideoObserver()
  }

  /**
   * Implementation of the announcer system for screen readers
   * Creates and manages ARIA live regions dynamically as needed
   */
  const announcer: Announcer = {
    /**
     * Announces a message in polite mode (non-interrupting)
     * Used for status updates that don't require immediate attention
     */
    polite: (message: string): void => {
      if (process.client) {
        const div =
          document.getElementById('announcer-polite') ||
          ((): HTMLElement => {
            const el = document.createElement('div')
            el.id = 'announcer-polite'
            el.setAttribute('aria-live', 'polite')
            el.setAttribute('aria-atomic', 'true')
            el.className = 'sr-announcer'
            document.body.appendChild(el)
            return el
          })()
        div.textContent = message
      }
    },

    /**
     * Announces a message in assertive mode (interrupting)
     * Used for important changes that require immediate attention
     */
    assertive: (message: string): void => {
      if (process.client) {
        const div =
          document.getElementById('announcer-assertive') ||
          ((): HTMLElement => {
            const el = document.createElement('div')
            el.id = 'announcer-assertive'
            el.setAttribute('aria-live', 'assertive')
            el.setAttribute('aria-atomic', 'true')
            el.className = 'sr-announcer'
            document.body.appendChild(el)
            return el
          })()
        div.textContent = message
      }
    },
  }

  return {
    provide: {
      /**
       * Global method to announce messages to screen readers
       * Uses ARIA live regions to make dynamic content changes accessible
       */
      $announce: (message: string, type: 'polite' | 'assertive' = 'polite'): void => {
        if (type === 'assertive') {
          announcer.assertive(message)
        } else {
          announcer.polite(message)
        }
      },
    },
  }
})
