<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
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
  <div ref="widgetRef" class="accessibility-widget">
    <!-- Widget panel with controls (triggered from navbar icon) -->
    <div
      id="accessibility-controls"
      class="accessibility-widget-panel"
      :class="{ open: isOpen }"
      role="dialog"
      aria-labelledby="accessibility-widget-title"
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
              <span class="font-size-label-sm">A−</span>
              <span class="sr-only">Smaller</span>
            </button>
            <button class="control-button" aria-label="Reset text size" @click="resetFontSize()">
              <span class="font-size-label-md">A</span>
              <span class="sr-only">Default</span>
            </button>
            <button
              class="control-button"
              aria-label="Increase text size"
              @click="changeFontSize('increase')"
            >
              <span class="font-size-label-lg">A+</span>
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
  let toggleWidgetHandler: (() => void) | null = null
  let closeAllWidgetsHandler: ((event: Event) => void) | null = null
  let toggleDyslexicHandler: (() => void) | null = null
  let toggleDarkModeHandler: (() => void) | null = null

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
      } else {
        document.body.classList.remove('accessibility-panel-open')
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

  const loadPreferences = (): void => {
    const state = loadAccessibilityState()
    if (!state) {
      return
    }

    applyFontSettings(state as Record<string, unknown>)
    applyVisualSettings(state as Record<string, unknown>)
    applyMediaSettings(state as Record<string, unknown>)
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
        } else if (import.meta.dev) {
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

    // Listen for toggle from navbar icon
    toggleWidgetHandler = (): void => {
      toggleWidget()
    }
    document.addEventListener('toggle-accessibility-widget', toggleWidgetHandler)

    // Listen for close-all-widgets event
    closeAllWidgetsHandler = (event: Event): void => {
      const customEvent = event as CustomEvent
      if (customEvent.detail && customEvent.detail.except !== 'accessibility') {
        closeWidget()
      }
    }
    document.addEventListener('close-all-widgets', closeAllWidgetsHandler)

    // Listen for toggle-dyslexic-mode event from Alt+D shortcut
    toggleDyslexicHandler = (): void => {
      const newFontFamily = currentFontFamily.value === 'dyslexic' ? 'default' : 'dyslexic'
      setFontFamily(newFontFamily)
    }
    document.addEventListener('toggle-dyslexic-mode', toggleDyslexicHandler)

    // Listen for toggle-dark-mode event from Alt+M shortcut
    toggleDarkModeHandler = (): void => {
      handleDarkModeToggle()
    }
    document.addEventListener('toggle-dark-mode', toggleDarkModeHandler)

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
    if (toggleWidgetHandler) {
      document.removeEventListener('toggle-accessibility-widget', toggleWidgetHandler)
    }
    if (closeAllWidgetsHandler) {
      document.removeEventListener('close-all-widgets', closeAllWidgetsHandler)
    }
    if (toggleDyslexicHandler) {
      document.removeEventListener('toggle-dyslexic-mode', toggleDyslexicHandler)
    }
    if (toggleDarkModeHandler) {
      document.removeEventListener('toggle-dark-mode', toggleDarkModeHandler)
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
  .accessibility-widget-panel {
    z-index: 10000;
  }
  .font-size-label-sm {
    font-size: 11px;
  }
  .font-size-label-md {
    font-size: 14px;
  }
  .font-size-label-lg {
    font-size: 17px;
  }

  .accessibility-widget {
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

  /* Widget panel — opens below navbar, top-right */
  .accessibility-widget-panel {
    position: fixed !important;
    top: 68px;
    right: 16px;
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
    z-index: 5000 !important;
  }

  .accessibility-widget-panel.open {
    display: flex;
  }

  /* Mobile view - full screen when expanded */
  @media (max-width: 640px) {
    .accessibility-widget-panel.open {
      position: fixed !important;
      width: 100vw !important;
      max-height: 100vh !important;
      max-width: 100vw !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      border-radius: 0 !important;
      z-index: 9999 !important;
      overflow: auto !important;
      inset: 0 !important;
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
