<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!-- 
  @component AccessibilityWidget
  @description Floating widget that provides accessibility controls for the site
  Controls include reduced motion, high contrast, focus mode, font size,
  font family options, and widget positioning. Settings are persisted
  to localStorage via the globalState composable.
-->
<template>
  <div
    ref="widgetRef"
    :class="['accessibility-widget', { 'accessibility-widget-open': isOpen }, positionClass]"
  >
    <!-- Toggle button with accessible label using Font Awesome icon -->
    <button
      class="accessibility-widget-toggle"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-label="isOpen ? 'Close accessibility menu' : 'Open accessibility menu'"
      aria-controls="accessibility-controls"
      :class="{ 'accessibility-widget-toggle-open': isOpen }"
      @click="toggleWidget"
    >
      <i class="fa-solid fa-universal-access text-xl" aria-hidden="true"></i>
      <span class="sr-only">Accessibility</span>
    </button>

    <!-- Widget panel with controls -->
    <div
      id="accessibility-controls"
      class="accessibility-widget-panel"
      :class="{ open: isOpen }"
      role="dialog"
      aria-labelledby="accessibility-widget-title"
      style="z-index: 10000"
    >
      <div class="accessibility-widget-header">
        <h2 id="accessibility-widget-title" class="accessibility-widget-title">
          {{
            currentLanguage === 'nl' ? 'Toegankelijkheidsinstellingen' : 'Accessibility Settings'
          }}
        </h2>
        <button
          class="accessibility-widget-close"
          aria-label="Close accessibility menu"
          @click="toggleWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="accessibility-widget-content">
        <!-- Language selector -->
        <div class="accessibility-language-selector">
          <div class="inline-flex rounded-md shadow-sm" role="group" aria-label="Select language">
            <button
              :class="['language-button', currentLanguage === 'nl' ? 'active' : '']"
              :aria-pressed="currentLanguage === 'nl'"
              aria-label="Nederlands"
              @click="currentLanguage = 'nl'"
            >
              <span>NL</span>
            </button>
            <button
              :class="['language-button', currentLanguage === 'en' ? 'active' : '']"
              :aria-pressed="currentLanguage === 'en'"
              aria-label="English"
              @click="currentLanguage = 'en'"
            >
              <span>EN</span>
            </button>
          </div>
        </div>
        <!-- Font family control (moved to top) -->
        <div class="accessibility-control">
          <label id="font-family-control-label">
            {{ currentLanguage === 'nl' ? 'Lettertype' : 'Font Family' }}
          </label>
          <div class="button-group" role="radiogroup" aria-labelledby="font-family-control-label">
            <button
              class="control-button"
              :class="{ active: currentFontFamily === 'default' }"
              role="radio"
              :aria-checked="currentFontFamily === 'default'"
              aria-label="Default font"
              @click="setFontFamily('default')"
            >
              {{ currentLanguage === 'nl' ? 'Standaard' : 'Default' }}
            </button>
            <button
              class="control-button"
              :class="{ active: currentFontFamily === 'dyslexic' }"
              role="radio"
              :aria-checked="currentFontFamily === 'dyslexic'"
              aria-label="Dyslexic friendly font"
              @click="setFontFamily('dyslexic')"
            >
              {{ currentLanguage === 'nl' ? 'Dyslexie-vriendelijk' : 'Dyslexic Friendly' }}
            </button>
          </div>
        </div>

        <!-- Font size controls -->
        <div class="accessibility-control">
          <label for="font-size-control">
            {{ currentLanguage === 'nl' ? 'Tekstgrootte' : 'Text Size' }}
          </label>
          <div class="button-group">
            <button
              class="control-button"
              aria-label="Decrease text size"
              @click="changeFontSize('decrease')"
            >
              <span style="font-size: 11px">A−</span>
              <span class="sr-only">Smaller</span>
            </button>
            <button class="control-button" aria-label="Reset text size" @click="resetFontSize()">
              <span style="font-size: 14px">A</span>
              <span class="sr-only">Default</span>
            </button>
            <button
              class="control-button"
              aria-label="Increase text size"
              @click="changeFontSize('increase')"
            >
              <span style="font-size: 17px">A+</span>
              <span class="sr-only">Larger</span>
            </button>
          </div>
        </div>

        <!-- Dark mode control -->
        <div class="accessibility-control">
          <div class="control-switch">
            <input
              id="dark-mode"
              v-model="darkModeEnabled"
              type="checkbox"
              @change="handleDarkModeToggle"
            />
            <label for="dark-mode">
              {{ currentLanguage === 'nl' ? 'Donkere modus' : 'Dark Mode' }}
            </label>
          </div>
        </div>

        <!-- Contrast controls -->
        <div class="accessibility-control">
          <label id="contrast-control-label">
            {{ currentLanguage === 'nl' ? 'Contrast' : 'Contrast' }}
          </label>
          <div class="button-group" role="radiogroup" aria-labelledby="contrast-control-label">
            <button
              class="control-button"
              :class="{ active: currentContrast === 'default' }"
              role="radio"
              :aria-checked="currentContrast === 'default'"
              aria-label="Default contrast"
              @click="setContrast('default')"
            >
              {{ currentLanguage === 'nl' ? 'Standaard' : 'Default' }}
            </button>
            <button
              class="control-button"
              :class="{ active: currentContrast === 'high' }"
              role="radio"
              :aria-checked="currentContrast === 'high'"
              aria-label="High contrast"
              @click="setContrast('high')"
            >
              {{ currentLanguage === 'nl' ? 'Hoog Contrast' : 'High Contrast' }}
            </button>
          </div>
        </div>

        <!-- Video captions control removed -->

        <!-- Focus mode control (separated from enhanced focus) -->
        <div class="accessibility-control">
          <div class="control-switch">
            <input
              id="focus-mode"
              v-model="focusModeEnabled"
              type="checkbox"
              @change="toggleFocusMode"
            />
            <label for="focus-mode">
              {{ currentLanguage === 'nl' ? 'Focusmodus' : 'Focus Mode' }}
            </label>
          </div>
        </div>

        <!-- High contrast is already in the contrast controls above -->

        <!-- Motion reduction control -->
        <div class="accessibility-control">
          <div class="control-switch">
            <input
              id="reduce-motion"
              v-model="reduceMotion"
              type="checkbox"
              @change="toggleReduceMotion"
            />
            <label for="reduce-motion">
              {{ currentLanguage === 'nl' ? 'Verminder Beweging' : 'Reduce Motion' }}
            </label>
            <span id="reduce-motion-desc" class="sr-only">
              Enable to pause all videos (including DASH players) and reduce animations.
            </span>
          </div>
        </div>

        <!-- Position control - only bottom positions for left/right handed users -->
        <div class="accessibility-control">
          <label id="position-control-label">
            {{ currentLanguage === 'nl' ? 'Widget Positie' : 'Widget Position' }}
          </label>
          <div
            class="button-group position-controls-simplified"
            role="radiogroup"
            aria-labelledby="position-control-label"
          >
            <button
              class="control-button position-button"
              :class="{ active: position === 'bottom-left' }"
              role="radio"
              :aria-checked="position === 'bottom-left'"
              aria-label="Position widget at bottom left for left-handed users"
              @click="setPosition('bottom-left')"
            >
              <span class="position-icon bottom-left"></span>
              <span class="position-label">
                {{ currentLanguage === 'nl' ? 'Linkshandig' : 'Left-handed' }}
              </span>
            </button>
            <button
              class="control-button position-button"
              :class="{ active: position === 'bottom-right' }"
              role="radio"
              :aria-checked="position === 'bottom-right'"
              aria-label="Position widget at bottom right for right-handed users"
              @click="setPosition('bottom-right')"
            >
              <span class="position-icon bottom-right"></span>
              <span class="position-label">
                {{ currentLanguage === 'nl' ? 'Rechtshandig' : 'Right-handed' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Reset all settings -->
        <div class="accessibility-control">
          <button
            class="reset-button"
            aria-label="Reset all accessibility settings"
            @click="resetAll"
          >
            {{ currentLanguage === 'nl' ? 'Alle Instellingen Resetten' : 'Reset All Settings' }}
          </button>
        </div>

        <!-- Keyboard shortcuts hint -->
        <div class="accessibility-control keyboard-shortcuts-hint" @click="showKeyboardShortcuts">
          <div class="flex items-center text-sm text-gray-500 cursor-pointer hover:text-gray-700">
            <i class="fa-solid fa-circle-info h-4 w-4 mr-2" aria-hidden="true"></i>
            <span>
              {{ currentLanguage === 'nl' ? 'Druk op' : 'Press' }}
              <kbd class="bg-gray-100 px-1 rounded border border-gray-300 text-xs">Alt</kbd>
              +
              <kbd class="bg-gray-100 px-1 rounded border border-gray-300 text-xs">/</kbd>
              {{
                currentLanguage === 'nl'
                  ? 'voor toetsenbordsnelkoppelingen'
                  : 'for keyboard shortcuts'
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Keyboard Shortcuts Widget Component (no need for modal anymore) -->
  <KeyboardShortcutsWidget />
</template>

<script setup lang="ts">
  /**
   * Import section with logical grouping:
   * 1. Vue core functionality
   * 2. Local components
   * 3. Composables/state management
   */
  import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick,
    defineAsyncComponent,
  } from 'vue'
  import { useNuxtApp } from '#app'
  // Convert widget to lazy loading for better bundle optimization
  const KeyboardShortcutsWidget = defineAsyncComponent(
    () => import('~/components/KeyboardShortcutsWidget.vue')
  )
  import { globalState } from '~/composables/globalState'
  import { useDarkMode } from '~/composables/useDarkMode'
  import type { KeyboardEventHandler, MouseEventHandler } from '~/types/events'
  import type { FontSizeLevel } from '~/types/accessibility'
  import { isHTMLElement } from '~/types/events'

  /**
   * Component's reactive state variables
   */
  const isOpen = ref(false) // Controls widget open/closed state
  const fontSizeLevel = ref(0) // Font size adjustment: 0 is default, -2 to +3 range
  const currentContrast = ref('default') // Current contrast mode: 'default' or 'high'
  const focusModeEnabled = ref(false) // Controls focus mode functionality
  const reduceMotion = ref(false) // Controls motion reduction for animations and videos
  const captionsEnabled = ref(false) // Controls video caption visibility
  const currentFontFamily = ref('default') // Font family selection: 'default' or 'dyslexic'
  const position = ref('bottom-right') // Widget position: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  const hasVideos = ref(false) // Tracks if videos are present on the page (for caption controls)
  const widgetRef = ref<HTMLElement | null>(null) // Reference to widget DOM element

  // Dark mode
  const { isDark, toggleDarkMode } = useDarkMode()
  const darkModeEnabled = ref(isDark.value)

  // Keep local ref in sync with composable
  watch(isDark, newVal => {
    darkModeEnabled.value = newVal
  })

  const handleDarkModeToggle = (): void => {
    toggleDarkMode()
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(darkModeEnabled.value ? 'Dark mode enabled' : 'Dark mode disabled', 'polite')
    }
  }
  // Use computed property with getter/setter to sync with globalState
  const currentLanguage = computed({
    get: () => globalState.languagePreference,
    set: value => {
      globalState.languagePreference = value
    },
  })

  // Ensure immediate synchronization on component mount
  const forceLanguageSync = async (): Promise<void> => {
    // For static sites: Force reactivity update and ensure DOM updates
    const current = globalState.languagePreference

    // Force a complete reactive cycle by temporarily changing the value
    globalState.languagePreference = 'en' as 'en' | 'nl'
    await nextTick()
    globalState.languagePreference = current as 'en' | 'nl'
    await nextTick()

    // Additional force update to ensure all computed properties re-evaluate
    if (currentLanguage.value !== current) {
      currentLanguage.value = current
      await nextTick()
    }
  }

  /**
   * Event handler references for cleanup
   */
  let keyboardHandler: KeyboardEventHandler | null = null // Keyboard event handler reference
  let documentClickHandler: MouseEventHandler | null = null // Click outside handler reference

  /**
   * Computed CSS class for widget positioning
   * @returns {string} CSS class name based on current position
   */
  const positionClass = computed(() => {
    return `accessibility-widget-${position.value}`
  })

  /**
   * Toggles the visibility of the accessibility widget
   * When opening, closes all other widgets via custom event
   * Manages global state for coordinating between widgets
   */
  const toggleWidget = (): void => {
    isOpen.value = !isOpen.value

    // If opening the widget, close all other widgets
    if (isOpen.value) {
      // First, trigger the close-all-widgets event
      const closeEvent = new CustomEvent('close-all-widgets', {
        detail: { except: 'accessibility' },
      })
      document.dispatchEvent(closeEvent)

      // Update global state to track active widget
      globalState.activeWidget = 'accessibility'
    } else if (globalState.activeWidget === 'accessibility') {
      // If closing the widget and this was the active one, clear global state
      globalState.activeWidget = null
    }

    // Add body class to help with global styling when accessibility panel is open
    if (process.client) {
      if (isOpen.value) {
        document.body.classList.add('accessibility-panel-open')

        // Hide the entire cookie widget and its button
        const cookieElements = document.querySelectorAll(
          '.cookie-policy-widget, .cookie-policy-widget-toggle, .cookie-policy-widget button'
        )
        cookieElements.forEach(el => {
          if (isHTMLElement(el)) {
            // Use setAttribute to add !important
            el.style.setProperty('opacity', '0', 'important')
            el.style.setProperty('visibility', 'hidden', 'important')
            el.style.setProperty('z-index', '1', 'important')
            el.style.setProperty('display', 'none', 'important')
            el.style.setProperty('pointer-events', 'none', 'important')
          }
        })
      } else {
        document.body.classList.remove('accessibility-panel-open')

        // Show the entire cookie widget again when panel closes
        const cookieElements = document.querySelectorAll(
          '.cookie-policy-widget, .cookie-policy-widget-toggle, .cookie-policy-widget button'
        )
        cookieElements.forEach(el => {
          if (isHTMLElement(el)) {
            el.style.removeProperty('opacity')
            el.style.removeProperty('visibility')
            el.style.removeProperty('z-index')
            el.style.removeProperty('display')
            el.style.removeProperty('pointer-events')
          }
        })
      }
    }

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isOpen.value ? 'Accessibility menu opened' : 'Accessibility menu closed',
        'assertive'
      )
    }
  }

  const closeWidget = (): void => {
    isOpen.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'accessibility') {
      globalState.activeWidget = null
    }

    // Remove body class
    if (process.client) {
      document.body.classList.remove('accessibility-panel-open')

      // Show the entire cookie widget again when panel closes
      const cookieElements = document.querySelectorAll(
        '.cookie-policy-widget, .cookie-policy-widget-toggle, .cookie-policy-widget button'
      )
      cookieElements.forEach(el => {
        if (isHTMLElement(el)) {
          el.style.removeProperty('opacity')
          el.style.removeProperty('visibility')
          el.style.removeProperty('z-index')
          el.style.removeProperty('display')
          el.style.removeProperty('pointer-events')
        }
      })
    }
  }

  const changeFontSize = (direction: string): void => {
    if (direction === 'increase') {
      fontSizeLevel.value = Math.min(fontSizeLevel.value + 1, 3) as FontSizeLevel // Max level is 3
    } else {
      fontSizeLevel.value = Math.max(fontSizeLevel.value - 1, -2) as FontSizeLevel // Min level is -2
    }

    // Update global state
    globalState.fontSizeLevel = fontSizeLevel.value as FontSizeLevel

    applyFontSize()
    savePreferences()

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(`Text size ${direction}d`, 'polite')
    }
  }

  const resetFontSize = (): void => {
    fontSizeLevel.value = 0

    // Update global state
    globalState.fontSizeLevel = 0

    applyFontSize()
    savePreferences()

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Text size reset to default', 'polite')
    }
  }

  const applyFontSize = (): void => {
    // Remove any existing font size classes
    document.documentElement.classList.remove(
      'font-size-decrease-2',
      'font-size-decrease-1',
      'font-size-increase-1',
      'font-size-increase-2',
      'font-size-increase-3'
    )

    // Apply appropriate class based on level
    if (fontSizeLevel.value !== 0) {
      const directionName = fontSizeLevel.value > 0 ? 'increase' : 'decrease'
      const level = Math.abs(fontSizeLevel.value)
      document.documentElement.classList.add(`font-size-${directionName}-${level}`)
    }
  }

  const setContrast = (mode: string): void => {
    currentContrast.value = mode

    // Update global state
    globalState.highContrast = mode === 'high'

    applyContrast()
    savePreferences()

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(`${mode} contrast mode enabled`, 'polite')
    }
  }

  const applyContrast = (): void => {
    if (currentContrast.value === 'high') {
      document.documentElement.classList.add('high-contrast-mode')
    } else {
      document.documentElement.classList.remove('high-contrast-mode')
    }
  }

  // Legacy method removed, using toggleFocusMode instead

  const toggleFocusMode = (): void => {
    // Update global state
    globalState.focusMode = focusModeEnabled.value

    applyFocusMode()
    savePreferences()

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      const message = focusModeEnabled.value ? 'Focus mode enabled' : 'Focus mode disabled'
      $announce(message, 'polite')
    }
  }

  const applyFocusMode = (): void => {
    if (focusModeEnabled.value) {
      document.documentElement.classList.add('focus-mode')
      document.documentElement.classList.add('enhanced-focus') // Keep for CSS compatibility
    } else {
      document.documentElement.classList.remove('focus-mode')
      document.documentElement.classList.remove('enhanced-focus') // Keep for CSS compatibility
    }
  }

  const toggleReduceMotion = (): void => {
    // Update global state first - this will keep it in sync across page navigations
    globalState.reduceMotion = reduceMotion.value

    // Remember captions state
    const captionsEnabled = document.documentElement.classList.contains('captions-enabled')

    applyReduceMotion()
    savePreferences()

    // Ensure captions state is preserved after applying reduce motion
    if (captionsEnabled) {
      // Dispatch a separate captions event after the reduce motion event
      // with a slight delay to ensure correct order of operations
      setTimeout(() => {
        try {
          const captionsEvent = new CustomEvent('captionsChange', {
            detail: { enabled: true },
          })
          document.dispatchEvent(captionsEvent)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('Error dispatching captionsChange event:', err)
        }
      }, 10)
    }

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      const message = reduceMotion.value
        ? 'Reduced motion enabled, videos paused'
        : 'Reduced motion disabled, videos playing'
      $announce(message, 'polite')
    }
  }

  const applyReduceMotion = (): void => {
    // Store current captions state from global state to ensure consistency
    const captionsEnabled = globalState.videoCaptions

    if (reduceMotion.value) {
      document.documentElement.classList.add('reduce-motion')

      // Dispatch an event to notify video components
      try {
        const reduceMotionEvent = new Event('reduceMotionChange')
        document.dispatchEvent(reduceMotionEvent)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error dispatching reduceMotionChange event:', err)
      }

      // Directly pause all videos for immediate feedback
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (video && typeof video.pause === 'function') {
          video.pause()
        }
      })
    } else {
      document.documentElement.classList.remove('reduce-motion')

      // Dispatch an event to notify video components
      try {
        const reduceMotionEvent = new Event('reduceMotionChange')
        document.dispatchEvent(reduceMotionEvent)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error dispatching reduceMotionChange event:', err)
      }

      // Directly play all videos for immediate feedback
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (video && typeof video.play === 'function') {
          video.play().catch(
            (
              err // eslint-disable-next-line no-console
            ) => console.warn('Could not play video:', err)
          )
        }
      })
    }

    // Re-dispatch the appropriate captions event to ensure consistency
    // This ensures captions state is preserved independently from reduce motion
    if (captionsEnabled) {
      // If captions should be enabled, make sure the class is set
      if (!document.documentElement.classList.contains('captions-enabled')) {
        document.documentElement.classList.add('captions-enabled')
      }

      // Dispatch a captions event to ensure all video players update
      try {
        const captionsEvent = new CustomEvent('captionsChange', {
          detail: { enabled: true },
        })
        document.dispatchEvent(captionsEvent)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error dispatching captionsChange event:', err)
      }
    }

    // Make sure global state is in sync with current captions state
    if (globalState.videoCaptions !== captionsEnabled) {
      globalState.videoCaptions = captionsEnabled
    }
  }

  /**
   * Checks for videos on the page and applies caption settings
   * Synchronizes UI state with global state and updates captions
   * on all video elements when videos are present
   */
  const toggleCaptions = (): void => {
    // Check if page has videos before applying captions
    const pageHasVideos = document.querySelectorAll('video').length > 0

    // Make sure our UI state matches the global state, even during initialization
    if (captionsEnabled.value !== globalState.videoCaptions) {
      captionsEnabled.value = globalState.videoCaptions
    }

    // Update global state regardless of whether videos are present
    // This ensures the setting persists between pages
    globalState.videoCaptions = captionsEnabled.value

    // Update hasVideos reactive property to ensure UI is in sync
    hasVideos.value = pageHasVideos

    // Only apply captions if there are videos on the page
    if (pageHasVideos) {
      // Use the keyboard shortcut handler from the plugin to toggle captions
      const nuxtApp = useNuxtApp()
      if (
        nuxtApp &&
        '$toggleCaptions' in nuxtApp &&
        typeof nuxtApp.$toggleCaptions === 'function'
      ) {
        nuxtApp.$toggleCaptions()
      } else {
        // Fallback if the plugin function isn't available
        if (captionsEnabled.value) {
          document.documentElement.classList.add('captions-enabled')

          // Enable native captions
          const videos = document.querySelectorAll('video')
          videos.forEach(video => {
            const tracks = video.textTracks
            if (tracks && tracks.length > 0) {
              for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].kind === 'captions') {
                  tracks[i].mode = 'showing'
                }
              }
            }
          })

          // Announce to screen readers
          const { $announce } = useNuxtApp()
          if ($announce) {
            $announce('Video captions enabled', 'polite')
          }
        } else {
          document.documentElement.classList.remove('captions-enabled')

          // Disable native captions
          const videos = document.querySelectorAll('video')
          videos.forEach(video => {
            const tracks = video.textTracks
            if (tracks && tracks.length > 0) {
              for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].kind === 'captions') {
                  tracks[i].mode = 'hidden'
                }
              }
            }
          })

          // Announce to screen readers
          const { $announce } = useNuxtApp()
          if ($announce) {
            $announce('Video captions disabled', 'polite')
          }
        }
      }
    } else {
      // If no videos are present, just update the UI state but don't add the DOM class
      if (captionsEnabled.value) {
        // Announce to screen readers that the setting is saved but no videos found
        const { $announce } = useNuxtApp()
        if ($announce) {
          $announce('Video captions enabled, but no videos found on this page', 'polite')
        }
      } else {
        document.documentElement.classList.remove('captions-enabled')
        const { $announce } = useNuxtApp()
        if ($announce) {
          $announce('Video captions disabled', 'polite')
        }
      }
    }

    // Ensure settings are saved to localStorage
    savePreferences()
  }

  const setPosition = (newPosition: string): void => {
    // Validate that only bottom positions are accepted
    if (newPosition !== 'bottom-left' && newPosition !== 'bottom-right') {
      // eslint-disable-next-line no-console
      console.warn('Only bottom-left and bottom-right positions are supported')
      return
    }

    position.value = newPosition

    // Update global state
    globalState.widgetPosition = newPosition

    // Update HTML data attribute immediately for CSS targeting
    if (process.client) {
      document.documentElement.setAttribute('data-widget-position', newPosition)
    }

    savePreferences()

    // Move all other widgets to match the same side (accessibility, cookie, back-to-top)
    moveAllWidgetsToSide(newPosition)

    // Announce to screen readers with clearer handedness messaging
    const { $announce } = useNuxtApp()
    if ($announce) {
      const handedness = newPosition === 'bottom-left' ? 'left-handed' : 'right-handed'
      $announce(
        `All widgets moved to ${newPosition.replace('-', ' ')} for ${handedness} users`,
        'polite'
      )
    }
  }

  // Helper function to ensure all widgets move to the same side
  const moveAllWidgetsToSide = (position: string): void => {
    if (!process.client) return

    // Get the side (left or right)
    const side = position.includes('left') ? 'left' : 'right'

    // Wait for DOM updates to complete
    nextTick(() => {
      try {
        // 1. Update cookie policy widget
        const cookieWidget = document.querySelector('.cookie-policy-widget')
        if (cookieWidget) {
          // Remove all position classes
          cookieWidget.classList.remove(
            'cookie-policy-widget-top-left',
            'cookie-policy-widget-top-right',
            'cookie-policy-widget-bottom-left',
            'cookie-policy-widget-bottom-right'
          )
          // Add the new position class
          cookieWidget.classList.add(`cookie-policy-widget-bottom-${side}`)

          // Dispatch event to update cookie policy widget's internal state
          const event = new CustomEvent('update-widget-position', {
            detail: { position: `bottom-${side}` },
          })
          document.dispatchEvent(event)
        }

        // 2. Update back-to-top button position with more forceful styling
        const backToTopBtn = document.querySelector('.back-to-top-container')
        if (backToTopBtn) {
          // Clear any existing positioning classes
          backToTopBtn.classList.remove(
            'right-6',
            'right-5',
            'left-6',
            'left-5',
            'right-aligned',
            'left-aligned'
          )

          // Apply the appropriate positioning class
          if (side === 'left') {
            backToTopBtn.classList.add('left-aligned')
            // Force the styles with !important flags
            if (isHTMLElement(backToTopBtn)) {
              backToTopBtn.style.setProperty('left', '20px', 'important')
              backToTopBtn.style.setProperty('right', 'auto', 'important')
            }
          } else {
            backToTopBtn.classList.add('right-aligned')
            // Force the styles with !important flags
            if (isHTMLElement(backToTopBtn)) {
              backToTopBtn.style.setProperty('right', '20px', 'important')
              backToTopBtn.style.setProperty('left', 'auto', 'important')
            }
          }

          // Add a data attribute for CSS selectors
          backToTopBtn.setAttribute('data-position', side)
        }

        // 3. Update any other widgets that might need repositioning
        // Privacy and terms widgets if they exist
        const privacyWidget = document.querySelector('.privacy-statement-widget')
        if (privacyWidget) {
          privacyWidget.classList.remove(
            'privacy-statement-widget-top-left',
            'privacy-statement-widget-top-right',
            'privacy-statement-widget-bottom-left',
            'privacy-statement-widget-bottom-right'
          )
          privacyWidget.classList.add(`privacy-statement-widget-bottom-${side}`)
        }

        const termsWidget = document.querySelector('.terms-widget')
        if (termsWidget) {
          termsWidget.classList.remove(
            'terms-widget-top-left',
            'terms-widget-top-right',
            'terms-widget-bottom-left',
            'terms-widget-bottom-right'
          )
          termsWidget.classList.add(`terms-widget-bottom-${side}`)
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error updating widget positions:', err)
      }
    })
  }

  const setFontFamily = (fontFamily: string): void => {
    currentFontFamily.value = fontFamily

    // Update global state
    globalState.fontFamily = fontFamily === 'dyslexic' ? 'dyslexic' : 'default'

    // Keep default font size for dyslexic font
    if (fontFamily === 'dyslexic') {
      fontSizeLevel.value = 0 // Set to default size
      globalState.fontSizeLevel = 0
      applyFontSize()
    } else if (currentFontFamily.value === 'dyslexic' && fontFamily === 'default') {
      // Reset font size when switching back to default
      fontSizeLevel.value = 0
      globalState.fontSizeLevel = 0
      applyFontSize()
    }

    applyFontFamily()
    savePreferences()

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        `${fontFamily === 'dyslexic' ? 'Dyslexic friendly' : 'Default'} font enabled`,
        'polite'
      )
    }
  }

  const applyFontFamily = (): void => {
    if (currentFontFamily.value === 'dyslexic') {
      document.documentElement.classList.add('dyslexic-font')

      // Dynamically load OpenDyslexic fonts only when needed
      if (!document.querySelector('link[href*="fonts-opendyslexic.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/assets/css/fonts-opendyslexic.css'
        link.media = 'all'
        document.head.appendChild(link)
      }
    } else {
      document.documentElement.classList.remove('dyslexic-font')
    }
  }

  const resetAll = (): void => {
    // Reset local state
    fontSizeLevel.value = 0
    currentContrast.value = 'default'
    focusModeEnabled.value = false
    reduceMotion.value = false
    captionsEnabled.value = false
    currentFontFamily.value = 'default'
    // Reset dark mode if enabled
    if (isDark.value) {
      toggleDarkMode()
    }
    // Don't reset position on reset all - keep user's handedness preference
    // position.value = 'bottom-right';

    // Reset global state
    globalState.fontSizeLevel = 0
    globalState.highContrast = false
    globalState.focusMode = false
    globalState.reduceMotion = false
    globalState.videoCaptions = false
    globalState.fontFamily = 'default'
    // Don't reset position in global state either
    // globalState.widgetPosition = 'bottom-right';

    // Apply all resets
    applyFontSize()
    applyContrast()
    applyFocusMode()
    applyReduceMotion()
    applyFontFamily()

    // Also explicitly update the DOM
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

    // Toggle captions off if they were on
    if (document.documentElement.classList.contains('captions-enabled')) {
      document.documentElement.classList.remove('captions-enabled')
      // Also update video elements directly
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        const tracks = video.textTracks
        if (tracks && tracks.length > 0) {
          for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].kind === 'captions') {
              tracks[i].mode = 'hidden'
            }
          }
        }
      })
    }

    // Ensure settings are saved to localStorage
    savePreferences()

    // Also explicitly clear localStorage and set fresh defaults
    if (process.client && localStorage) {
      try {
        const defaultState = {
          reduceMotion: false,
          highContrast: false,
          focusMode: false,
          videoCaptions: false,
          fontFamily: 'default',
          fontSizeLevel: 0,
          widgetPosition: position.value, // Always keep the current position (handedness preference)
        }
        localStorage.setItem('accessibility-state', JSON.stringify(defaultState))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error saving reset state to localStorage:', e)
      }
    }

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('All accessibility settings reset to default except widget position', 'assertive')
    }

    // Dispatch a global reset event for other components
    try {
      const resetEvent = new CustomEvent('accessibilityReset')
      document.dispatchEvent(resetEvent)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Error dispatching accessibilityReset event:', err)
    }
  }

  const showKeyboardShortcuts = (): void => {
    // Close the accessibility widget first
    isOpen.value = false

    // Dispatch event to toggle the keyboard shortcuts widget
    document.dispatchEvent(new CustomEvent('toggle-keyboard-shortcuts'))
  }

  const savePreferences = (): void => {
    if (process.client && window.localStorage) {
      // Only use the primary storage format
      const stateToSave = {
        reduceMotion: reduceMotion.value,
        highContrast: currentContrast.value === 'high',
        focusMode: focusModeEnabled.value,
        fontFamily: currentFontFamily.value,
        fontSizeLevel: fontSizeLevel.value,
        widgetPosition: position.value,
      }
      localStorage.setItem('accessibility-state', JSON.stringify(stateToSave))
    }
  }

  const loadAccessibilityState = (): unknown | null => {
    if (!process.client || !window.localStorage) {
      return null
    }

    try {
      const savedState = localStorage.getItem('accessibility-state')
      return savedState ? JSON.parse(savedState) : null
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error loading accessibility state:', e)
      return null
    }
  }

  const applyFontSettings = (state: Record<string, unknown>): void => {
    if (fontSizeLevel.value === 0 && state.fontSizeLevel !== undefined) {
      fontSizeLevel.value = state.fontSizeLevel as number
    }

    if (currentFontFamily.value === 'default' && state.fontFamily) {
      currentFontFamily.value = state.fontFamily as string
    }
  }

  const applyVisualSettings = (state: Record<string, unknown>): void => {
    if (currentContrast.value === 'default' && state.highContrast) {
      currentContrast.value = 'high'
    }

    if (!focusModeEnabled.value && state.focusMode) {
      focusModeEnabled.value = state.focusMode as boolean
    }

    if (!reduceMotion.value && state.reduceMotion) {
      reduceMotion.value = state.reduceMotion as boolean
    }
  }

  const applyMediaSettings = (state: Record<string, unknown>): void => {
    // For captions, always prioritize the global state's value
    // which was set earlier in onMounted
    if (captionsEnabled.value !== state.videoCaptions) {
      captionsEnabled.value = state.videoCaptions as boolean
    }
  }

  const applyPositionSettings = (state: Record<string, unknown>): void => {
    if (position.value === 'bottom-right' && state.widgetPosition) {
      position.value = state.widgetPosition as string
    }
  }

  const loadPreferences = (): void => {
    const state = loadAccessibilityState()
    if (!state) {
      return
    }

    applyFontSettings(state as Record<string, unknown>)
    applyVisualSettings(state as Record<string, unknown>)
    applyMediaSettings(state as Record<string, unknown>)
    applyPositionSettings(state as Record<string, unknown>)
  }

  // Check system preference for reduced motion - currently disabled to ensure reduced motion is always off by default
  const checkSystemReduceMotion = (): void => {
    // Disabled to ensure reduced motion is always off by default
    // if (process.client) {
    //   // Check if user has system-level preference for reduced motion
    //   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    //
    //   // Only apply if user hasn't explicitly set a preference already
    //   if (prefersReducedMotion && localStorage && !localStorage.getItem('accessibility-preferences')) {
    //     reduceMotion.value = true;
    //     applyReduceMotion();
    //   }
    // }
  }

  // Watch global state for changes and update component state
  watch(
    () => globalState.reduceMotion,
    newValue => {
      if (reduceMotion.value !== newValue) {
        reduceMotion.value = newValue
        applyReduceMotion()
      }
    }
  )

  watch(
    () => globalState.highContrast,
    newValue => {
      if ((currentContrast.value === 'high') !== newValue) {
        currentContrast.value = newValue ? 'high' : 'default'
        applyContrast()
      }
    }
  )

  watch(
    () => globalState.focusMode,
    newValue => {
      if (focusModeEnabled.value !== newValue) {
        focusModeEnabled.value = newValue
        applyFocusMode()
      }
    }
  )

  watch(
    () => globalState.videoCaptions,
    newValue => {
      if (captionsEnabled.value !== newValue) {
        captionsEnabled.value = newValue

        // If videos are present, toggle captions; otherwise just update the UI state
        if (hasVideos.value) {
          // Apply captions to any videos on the page
          toggleCaptions()
        } else {
          // Just update the UI state without trying to toggle actual video captions
          // eslint-disable-next-line no-console
          console.log('Caption setting updated to', newValue, 'but no videos present on this page')
        }

        // Also update localStorage directly to ensure persistence
        try {
          if (process.client && localStorage) {
            const savedState = localStorage.getItem('accessibility-state')
            if (savedState) {
              const state = JSON.parse(savedState)
              state.videoCaptions = newValue
              localStorage.setItem('accessibility-state', JSON.stringify(state))
            }

            // Also update the older preferences format for backward compatibility
            const savedPrefs = localStorage.getItem('accessibility-preferences')
            if (savedPrefs) {
              const prefs = JSON.parse(savedPrefs)
              prefs.captions = newValue
              localStorage.setItem('accessibility-preferences', JSON.stringify(prefs))
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error updating captions state in localStorage:', e)
        }
      }
    }
  )

  // Watch for additional accessibility settings
  watch(
    () => globalState.fontFamily,
    newValue => {
      if (currentFontFamily.value !== newValue) {
        currentFontFamily.value = newValue
        applyFontFamily()
      }
    }
  )

  watch(
    () => globalState.fontSizeLevel,
    newValue => {
      if (fontSizeLevel.value !== newValue) {
        fontSizeLevel.value = newValue
        applyFontSize()
      }
    }
  )

  watch(
    () => globalState.widgetPosition,
    newValue => {
      if (position.value !== newValue) {
        position.value = newValue
      }
    }
  )

  // Language sync is now handled automatically by the computed property

  // Helper function to setup navigation detection and language sync
  const setupNavigationDetection = async (): Promise<void> => {
    // Force immediate language synchronization to prevent selector/content desync
    await forceLanguageSync()

    // Add navigation detection to force language sync
    if (process.client) {
      // Listen for Nuxt page changes using URL monitoring
      let currentPath = window.location.pathname
      const checkForNavigation = (): void => {
        if (window.location.pathname !== currentPath) {
          currentPath = window.location.pathname
          // Force language sync after navigation
          setTimeout(async () => {
            await forceLanguageSync()
          }, 150)
        }
      }

      // Monitor for navigation changes
      const navigationObserver = new MutationObserver(checkForNavigation)
      navigationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      })

      // Also listen for popstate events (back/forward navigation)
      window.addEventListener('popstate', async () => {
        setTimeout(async () => {
          await forceLanguageSync()
        }, 150)
      })
    }
  }

  // Helper function to setup video detection and monitoring
  const setupVideoDetection = (): void => {
    // Check if videos are present on the page
    hasVideos.value = document.querySelectorAll('video').length > 0

    // Listen for video elements being added to the page
    if (process.client && window.MutationObserver) {
      const videoObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (
                node.nodeName === 'VIDEO' ||
                (node instanceof Element &&
                  isHTMLElement(node) &&
                  node.querySelectorAll('video').length > 0)
              ) {
                // Update hasVideos if videos are found
                hasVideos.value = true
              }
            })
          }
        })
      })

      // Start observing the document
      videoObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      })
    }
  }

  // Helper function to sync global state and load preferences
  const syncGlobalStateAndPreferences = (): void => {
    // Important: Check global state first before loading preferences from localStorage
    // This ensures we sync with the latest state if the user navigated from another page
    if (globalState.videoCaptions !== undefined) {
      captionsEnabled.value = globalState.videoCaptions
    }

    // Load saved preferences from localStorage if available
    loadPreferences()

    // Check system preference for reduced motion
    checkSystemReduceMotion()
  }

  // Helper function to apply all initial settings
  const applyInitialSettings = (): void => {
    // Apply initial settings
    applyFontSize()
    applyContrast()
    applyFocusMode() // Updated method instead of applyEnhancedFocus

    // Check global state for reduce motion setting
    if (globalState.reduceMotion) {
      reduceMotion.value = globalState.reduceMotion
    }
    applyReduceMotion()

    // Check all additional global state settings
    if (globalState.fontFamily) {
      currentFontFamily.value = globalState.fontFamily
    }
    applyFontFamily()

    if (globalState.fontSizeLevel !== undefined) {
      fontSizeLevel.value = globalState.fontSizeLevel
    }
    applyFontSize()

    if (globalState.widgetPosition) {
      // Validate position to ensure only bottom-left or bottom-right are used
      if (
        globalState.widgetPosition === 'bottom-left' ||
        globalState.widgetPosition === 'bottom-right'
      ) {
        position.value = globalState.widgetPosition

        // Also ensure all other widgets are on the same side
        moveAllWidgetsToSide(position.value)
      } else {
        // Default to bottom-right if an invalid position is stored
        position.value = 'bottom-right'
        globalState.widgetPosition = 'bottom-right'

        // Move all widgets to this default position
        moveAllWidgetsToSide(position.value)
      }
    }
  }

  // Helper function to sync final global state
  const syncFinalGlobalState = (): void => {
    // Sync local state to global state
    globalState.reduceMotion = reduceMotion.value
    globalState.highContrast = currentContrast.value === 'high'
    globalState.focusMode = focusModeEnabled.value
    globalState.videoCaptions = captionsEnabled.value
    globalState.fontFamily = currentFontFamily.value as 'default' | 'dyslexic'
    globalState.fontSizeLevel = fontSizeLevel.value as FontSizeLevel
    globalState.widgetPosition = position.value as 'bottom-left' | 'bottom-right'

    applyFontFamily()
  }

  // Watch for local language changes and sync to globalState
  watch(currentLanguage, newValue => {
    if (globalState.languagePreference !== newValue) {
      globalState.languagePreference = newValue
    }
  })

  onMounted(async () => {
    await setupNavigationDetection()
    setupVideoDetection()
    syncGlobalStateAndPreferences()

    // Language preference is now handled by the computed property and globalState initialization

    applyInitialSettings()
    syncFinalGlobalState()

    // Apply captions setting if enabled and videos are present
    if (captionsEnabled.value && hasVideos.value) {
      toggleCaptions()
    }

    // Listen for close-all-widgets event
    document.addEventListener('close-all-widgets', event => {
      // Check if we should ignore this widget
      if (event.detail && event.detail.except !== 'accessibility') {
        closeWidget()
      }
    })

    // Listen for toggle-dyslexic-mode event from Alt+D shortcut
    document.addEventListener('toggle-dyslexic-mode', () => {
      // Toggle between default and dyslexic font
      const newFontFamily = currentFontFamily.value === 'dyslexic' ? 'default' : 'dyslexic'
      setFontFamily(newFontFamily)
    })

    // Set up keyboard handler for Escape key to close widget
    keyboardHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen.value) {
        closeWidget()
      }
    }
    document.addEventListener('keydown', keyboardHandler)

    // Set up click outside handler
    documentClickHandler = (e: Event): void => {
      if (
        isOpen.value &&
        widgetRef.value &&
        e.target instanceof Element &&
        !widgetRef.value.contains(e.target)
      ) {
        closeWidget()
      }
    }
    document.addEventListener('mousedown', documentClickHandler)
  })

  onBeforeUnmount(() => {
    // Clean up event listeners
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler)
    }
    if (documentClickHandler) {
      document.removeEventListener('mousedown', documentClickHandler)
    }

    // Remove body class if component is unmounted while open
    if (process.client && isOpen.value) {
      document.body.classList.remove('accessibility-panel-open')
    }

    // Remove any applied CSS
    document.documentElement.classList.remove(
      'font-size-decrease-2',
      'font-size-decrease-1',
      'font-size-increase-1',
      'font-size-increase-2',
      'font-size-increase-3'
    )
    document.documentElement.classList.remove('high-contrast-mode')
    document.documentElement.classList.remove('enhanced-focus')
    document.documentElement.classList.remove('reduce-motion')
    document.documentElement.classList.remove('dyslexic-font')
  })
</script>

<style scoped>
  .accessibility-widget {
    position: fixed;
    z-index: 50; /* For the button itself - lowest position of the buttons */
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  /* Position classes - only bottom positions for left/right handed users */
  .accessibility-widget-bottom-left {
    bottom: 20px !important; /* At the bottom */
    left: 20px;
  }

  .accessibility-widget-bottom-right {
    bottom: 20px !important; /* At the bottom */
    right: 20px;
  }

  /* Toggle button */
  .accessibility-widget-toggle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #00a8e6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    font-size: 1.25rem;
    position: relative;
  }

  .accessibility-widget-toggle::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
  }

  .accessibility-widget-toggle:hover {
    background-color: #0095cc;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }

  .accessibility-widget-toggle:hover::after {
    border-color: rgba(255, 255, 255, 0.5);
  }

  .accessibility-widget-toggle:focus-visible {
    outline: 2px solid #ffd700;
    outline-offset: 2px;
  }

  /* Style for toggle button when panel is open - keep it visible but show active state */
  .accessibility-widget-toggle-open {
    background-color: #0095cc !important; /* Darker brand blue to indicate active state */
    /* Remove transform to prevent movement */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    position: fixed !important; /* Ensure fixed positioning is maintained */
    z-index: 5001 !important; /* Keep above the panel */
  }

  /* Widget panel */
  .accessibility-widget-panel {
    position: fixed !important; /* Use fixed instead of absolute for better positioning */
    width: 280px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    padding: 16px;
    display: none;
    flex-direction: column;
    gap: 16px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    z-index: 5000 !important; /* Ensure proper stacking */
  }

  .accessibility-widget-panel.open {
    display: flex;
  }

  /* Panel positioning */
  .accessibility-widget-top-left .accessibility-widget-panel {
    top: 60px;
    left: 0;
  }

  .accessibility-widget-top-right .accessibility-widget-panel {
    top: 60px;
    right: 0;
  }

  .accessibility-widget-bottom-left .accessibility-widget-panel {
    bottom: 80px !important; /* Position panel above the button (which is at 20px from bottom) */
    left: 20px; /* Add 20px margin from the left edge to match cookie widget */
  }

  .accessibility-widget-bottom-right .accessibility-widget-panel {
    bottom: 80px !important; /* Position panel above the button (which is at 20px from bottom) */
    right: 20px; /* Add 20px margin from the right edge to match cookie widget */
  }

  /* Mobile view - full screen when expanded */
  @media (max-width: 640px) {
    .accessibility-widget-panel.expanded {
      position: fixed !important;
      width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      max-width: 100vw !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      border-radius: 0 !important;
      z-index: 9999 !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: none !important;
      overflow: auto !important;
      inset: 0 !important;
    }

    .accessibility-widget-panel.expanded .accessibility-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .accessibility-widget-panel.expanded .accessibility-widget-content {
      height: calc(100vh - 60px) !important;
      max-height: none !important;
      overflow-y: auto !important;
      padding: 1rem !important;
      padding-bottom: 5rem !important;
      padding-top: 0.5rem !important;
      width: 100% !important;
    }
  }

  /* Panel header */
  .accessibility-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .accessibility-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .accessibility-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .accessibility-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .accessibility-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .accessibility-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .accessibility-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .accessibility-control label {
    font-size: 14px;
    font-weight: 500;
    color: #444;
  }

  /* Button groups */
  .button-group {
    display: flex;
    gap: 8px;
  }

  .control-button {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    flex: 1;
    transition: all 0.2s;
  }

  .control-button:hover {
    background-color: #eaeaea;
  }

  .control-button.active {
    background-color: #00a8e6;
    color: white;
    border-color: #00a8e6;
  }

  .control-button:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Position buttons */
  .position-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
  }

  .position-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;
    gap: 4px;
  }

  .position-label {
    font-size: 12px;
    color: #555;
  }

  .position-icon {
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #777;
    border-radius: 4px;
    position: relative;
  }

  .position-icon::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #777;
    border-radius: 50%;
  }

  /* Top positions removed */

  .position-icon.bottom-left::after {
    bottom: 2px;
    left: 2px;
  }

  .position-icon.bottom-right::after {
    bottom: 2px;
    right: 2px;
  }

  .position-button.active .position-icon {
    border-color: white;
  }

  .position-button.active .position-icon::after {
    background-color: white;
  }

  /* Switch controls */
  .control-switch {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .control-switch input[type='checkbox'] {
    appearance: none;
    width: 40px;
    height: 24px;
    background-color: #ccc;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .control-switch input[type='checkbox']:checked {
    background-color: #00a8e6;
  }

  .control-switch input[type='checkbox']::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.2s;
  }

  .control-switch input[type='checkbox']:checked::before {
    transform: translateX(16px);
  }

  .control-switch input[type='checkbox']:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Reset button */
  .reset-button {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
  }

  .reset-button:hover {
    background-color: #eaeaea;
  }

  .reset-button:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Keyboard shortcuts hint */
  .keyboard-shortcuts-hint {
    margin-top: 4px;
    padding: 8px;
    border-radius: 6px;
    background-color: #f8fafc;
    transition: background-color 0.2s;
  }

  .keyboard-shortcuts-hint:hover {
    background-color: #f1f5f9;
  }

  .keyboard-shortcuts-hint kbd {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
  }
</style>

<style>
  /* Global styles to be applied based on widget settings */

  /* Font size adjustments */
  .font-size-decrease-2 {
    font-size: 85% !important;
  }

  .font-size-decrease-1 {
    font-size: 92.5% !important;
  }

  .font-size-increase-1 {
    font-size: 110% !important;
  }

  .font-size-increase-2 {
    font-size: 120% !important;
  }

  .font-size-increase-3 {
    font-size: 130% !important;
  }

  /* High contrast mode */
  .high-contrast-mode {
    filter: contrast(1.4) !important;
  }

  /* Enhanced focus - align with focus-mode */
  .enhanced-focus a:focus-visible,
  .enhanced-focus button:focus-visible,
  .enhanced-focus input:focus-visible,
  .enhanced-focus select:focus-visible,
  .enhanced-focus textarea:focus-visible,
  .enhanced-focus [role='button']:focus-visible,
  .enhanced-focus [tabindex]:focus-visible {
    outline: 3px solid #ffcc00 !important;
    outline-offset: 3px !important;
    box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.4) !important;
    border-radius: 0.25rem !important;
    transition:
      outline 0.2s ease,
      box-shadow 0.2s ease !important;
  }

  /* Reduced motion */
  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.001s !important;
    transition-duration: 0.001s !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }

  /* OpenDyslexic font */
  .dyslexic-font body,
  .dyslexic-font p,
  .dyslexic-font li,
  .dyslexic-font a,
  .dyslexic-font h1,
  .dyslexic-font h2,
  .dyslexic-font h3,
  .dyslexic-font h4,
  .dyslexic-font h5,
  .dyslexic-font h6,
  .dyslexic-font button,
  .dyslexic-font input,
  .dyslexic-font textarea,
  .dyslexic-font label,
  .dyslexic-font select,
  .dyslexic-font div,
  .dyslexic-font span,
  .dyslexic-font blockquote,
  .dyslexic-font cite,
  .dyslexic-font article,
  .dyslexic-font section,
  .dyslexic-font th,
  .dyslexic-font td {
    font-family: 'OpenDyslexic', sans-serif !important;
    letter-spacing: 0.5px !important;
    line-height: 1.5 !important;
    font-size: 99% !important; /* Set dyslexic font to 99% of its normal size */
  }

  /* Remove adjustments for widget positioning - now handled by main.css */
  /* These adjustments were causing inconsistent positioning when dyslexic font was enabled */

  /* Language selector styles */
  .accessibility-language-selector {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
  }

  .language-button {
    padding: 4px 8px;
    font-size: 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    color: #555;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .language-button:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .language-button:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .language-button.active {
    background-color: #00a8e6;
    color: white;
    border-color: #00a8e6;
  }

  .language-button:hover:not(.active) {
    background-color: #e5e5e5;
  }

  .language-button:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
    position: relative;
    z-index: 1;
  }
</style>
