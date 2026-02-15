<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'keyboard-shortcuts-widget',
      { 'keyboard-shortcuts-widget-open': isOpen },
      positionClass,
    ]"
  >
    <!-- Widget panel with controls -->
    <div
      id="keyboard-shortcuts-controls"
      class="keyboard-shortcuts-widget-panel"
      :class="{ open: isOpen }"
      role="dialog"
      aria-labelledby="keyboard-shortcuts-widget-title"
      style="z-index: 5300"
    >
      <div class="keyboard-shortcuts-widget-header">
        <h2 id="keyboard-shortcuts-widget-title" class="keyboard-shortcuts-widget-title">
          {{ currentLanguage === 'nl' ? 'Toetsenbordsnelkoppelingen' : 'Keyboard Shortcuts' }}
        </h2>
        <button
          class="keyboard-shortcuts-widget-close"
          aria-label="Close keyboard shortcuts menu"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="keyboard-shortcuts-widget-content">
        <!-- Language selector -->
        <div class="keyboard-shortcuts-language-selector">
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

        <!-- Full Shortcuts Content -->
        <div id="full-shortcuts-content" class="full-shortcuts">
          <!-- English Full Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>
              This website uses keyboard shortcuts to help you navigate and access features more
              efficiently.
            </p>

            <p class="text-gray-500 mt-2">Press Alt + key for most shortcuts</p>

            <!-- Standard Navigation -->
            <section>
              <h3 class="text-xl font-semibold mt-6 mb-3">Standard Navigation</h3>
              <ul class="list-none pl-0 space-y-2">
                <li
                  v-for="(shortcut, index) in englishShortcuts.standard"
                  :key="'standard-' + index"
                  class="flex items-center"
                >
                  <div class="flex items-center min-w-[120px]">
                    <template v-for="(key, keyIndex) in shortcut.keys.split('+')" :key="keyIndex">
                      <kbd class="bg-gray-100 px-2 py-1 rounded border border-gray-300 text-sm">
                        {{ key.trim() }}
                      </kbd>
                      <span v-if="keyIndex < shortcut.keys.split('+').length - 1" class="mx-1">
                        +
                      </span>
                    </template>
                  </div>
                  <span class="ml-4">{{ shortcut.description }}</span>
                </li>
              </ul>
            </section>

            <!-- Accessibility Features -->
            <section>
              <h3 class="text-xl font-semibold mt-6 mb-3">Accessibility Features</h3>
              <ul class="list-none pl-0 space-y-2">
                <li
                  v-for="(shortcut, index) in englishShortcuts.accessibility"
                  :key="'access-' + index"
                  class="flex items-center"
                >
                  <div class="flex items-center min-w-[120px]">
                    <template v-for="(key, keyIndex) in shortcut.keys.split('+')" :key="keyIndex">
                      <kbd class="bg-gray-100 px-2 py-1 rounded border border-gray-300 text-sm">
                        {{ key.trim() }}
                      </kbd>
                      <span v-if="keyIndex < shortcut.keys.split('+').length - 1" class="mx-1">
                        +
                      </span>
                    </template>
                  </div>
                  <span class="ml-4">{{ shortcut.description }}</span>
                </li>
              </ul>
            </section>

            <!-- Browser Shortcuts -->
            <section>
              <h3 class="text-xl font-semibold mt-6 mb-3">Standard Browser Shortcuts</h3>
              <ul class="list-none pl-0 space-y-2">
                <li
                  v-for="(shortcut, index) in englishShortcuts.browser"
                  :key="'browser-' + index"
                  class="flex items-center"
                >
                  <div class="flex items-center min-w-[120px]">
                    <template v-for="(key, keyIndex) in shortcut.keys.split('+')" :key="keyIndex">
                      <kbd class="bg-gray-100 px-2 py-1 rounded border border-gray-300 text-sm">
                        {{ key.trim() }}
                      </kbd>
                      <span v-if="keyIndex < shortcut.keys.split('+').length - 1" class="mx-1">
                        +
                      </span>
                    </template>
                  </div>
                  <span class="ml-4">{{ shortcut.description }}</span>
                </li>
              </ul>
            </section>
          </div>

          <!-- Dutch Full Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Deze website gebruikt toetsenbordsnelkoppelingen om u te helpen efficiënter te
              navigeren en functies te gebruiken.
            </p>

            <p class="text-gray-500 mt-2">Druk op Alt + toets voor de meeste snelkoppelingen</p>

            <!-- Standard Navigation -->
            <section>
              <h3 class="text-xl font-semibold mt-6 mb-3">Standaard Navigatie</h3>
              <ul class="list-none pl-0 space-y-2">
                <li
                  v-for="(shortcut, index) in dutchShortcuts.standard"
                  :key="'standard-nl-' + index"
                  class="flex items-center"
                >
                  <div class="flex items-center min-w-[120px]">
                    <template v-for="(key, keyIndex) in shortcut.keys.split('+')" :key="keyIndex">
                      <kbd class="bg-gray-100 px-2 py-1 rounded border border-gray-300 text-sm">
                        {{ key.trim() }}
                      </kbd>
                      <span v-if="keyIndex < shortcut.keys.split('+').length - 1" class="mx-1">
                        +
                      </span>
                    </template>
                  </div>
                  <span class="ml-4">{{ shortcut.description }}</span>
                </li>
              </ul>
            </section>

            <!-- Accessibility Features -->
            <section>
              <h3 class="text-xl font-semibold mt-6 mb-3">Toegankelijkheidsfuncties</h3>
              <ul class="list-none pl-0 space-y-2">
                <li
                  v-for="(shortcut, index) in dutchShortcuts.accessibility"
                  :key="'access-nl-' + index"
                  class="flex items-center"
                >
                  <div class="flex items-center min-w-[120px]">
                    <template v-for="(key, keyIndex) in shortcut.keys.split('+')" :key="keyIndex">
                      <kbd class="bg-gray-100 px-2 py-1 rounded border border-gray-300 text-sm">
                        {{ key.trim() }}
                      </kbd>
                      <span v-if="keyIndex < shortcut.keys.split('+').length - 1" class="mx-1">
                        +
                      </span>
                    </template>
                  </div>
                  <span class="ml-4">{{ shortcut.description }}</span>
                </li>
              </ul>
            </section>

            <!-- Browser Shortcuts -->
            <section>
              <h3 class="text-xl font-semibold mt-6 mb-3">Standaard Browsersnelkoppelingen</h3>
              <ul class="list-none pl-0 space-y-2">
                <li
                  v-for="(shortcut, index) in dutchShortcuts.browser"
                  :key="'browser-nl-' + index"
                  class="flex items-center"
                >
                  <div class="flex items-center min-w-[120px]">
                    <template v-for="(key, keyIndex) in shortcut.keys.split('+')" :key="keyIndex">
                      <kbd class="bg-gray-100 px-2 py-1 rounded border border-gray-300 text-sm">
                        {{ key.trim() }}
                      </kbd>
                      <span v-if="keyIndex < shortcut.keys.split('+').length - 1" class="mx-1">
                        +
                      </span>
                    </template>
                  </div>
                  <span class="ml-4">{{ shortcut.description }}</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useNuxtApp } from '#app'
  import { globalState } from '~/composables/globalState'
  import type { KeyboardEventHandler, MouseEventHandler } from '~/types/events'
  import { isHTMLElement } from '~/types/events'

  const isOpen = ref(false)
  // Use a computed property with getter/setter to sync with globalState
  const currentLanguage = computed({
    get: () => globalState.languagePreference,
    set: value => {
      globalState.languagePreference = value
    },
  })

  // Ensure immediate synchronization on component mount
  const forceLanguageSync = (): void => {
    // Force reactivity update by triggering a minimal state change
    const current = globalState.languagePreference
    globalState.languagePreference = current
  }
  // Track position from global state
  const position = ref('bottom-right') // Default position
  let keyboardHandler: KeyboardEventHandler | null = null
  let documentClickHandler: MouseEventHandler | null = null
  const widgetRef = ref<HTMLElement | null>(null)

  // English shortcuts configuration
  const englishShortcuts = ref({
    standard: [
      { keys: 'Alt+0', description: 'Back to top' },
      { keys: 'Alt+1', description: 'Skip to main content' },
      { keys: 'Alt+2', description: 'Jump to navigation menu' },
      { keys: 'Alt+9', description: 'Jump to last section' },
    ],
    accessibility: [
      { keys: 'Alt+/', description: 'Open keyboard shortcuts' },
      { keys: 'Alt+A', description: 'Open accessibility options' },
      { keys: 'Alt+D', description: 'Toggle dyslectic friendly' },
      { keys: 'Alt+L', description: 'Switch to left-handed mode' },
      { keys: 'Alt+R', description: 'Switch to right-handed mode' },
      { keys: 'Alt+F', description: 'Toggle focus mode' },
      { keys: 'Alt+X', description: 'Toggle high contrast mode' },
      { keys: 'Alt+Z', description: 'Toggle reduce motion' },
    ],
    browser: [
      { keys: 'Tab', description: 'Move forward through focusable elements' },
      { keys: 'Shift+Tab', description: 'Move backward through focusable elements' },
      { keys: 'Enter', description: 'Activate the focused element' },
      { keys: 'Space', description: 'Activate buttons and toggle form controls' },
    ],
  })

  // Dutch shortcuts configuration
  const dutchShortcuts = ref({
    standard: [
      { keys: 'Alt+0', description: 'Terug naar boven' },
      { keys: 'Alt+1', description: 'Spring naar hoofdinhoud' },
      { keys: 'Alt+2', description: 'Spring naar navigatiemenu' },
      { keys: 'Alt+9', description: 'Spring naar laatste sectie' },
    ],
    accessibility: [
      { keys: 'Alt+/', description: 'Open toetsenbordsnelkoppelingen' },
      { keys: 'Alt+A', description: 'Open toegankelijkheidsopties' },
      { keys: 'Alt+D', description: 'Dyslectievriendelijke modus aan/uit' },
      { keys: 'Alt+L', description: 'Schakel naar linkshandige modus' },
      { keys: 'Alt+R', description: 'Schakel naar rechtshandige modus' },
      { keys: 'Alt+F', description: 'Focusmodus aan/uit' },
      { keys: 'Alt+X', description: 'Hoog contrast modus aan/uit' },
      { keys: 'Alt+Z', description: 'Verminderde beweging aan/uit' },
    ],
    browser: [
      { keys: 'Tab', description: 'Vooruit bewegen door focusbare elementen' },
      { keys: 'Shift+Tab', description: 'Achteruit bewegen door focusbare elementen' },
      { keys: 'Enter', description: 'Activeer het gefocuste element' },
      { keys: 'Space', description: 'Activeer knoppen en schakel formulierelementen' },
    ],
  })

  // Export methods for external use
  defineExpose({
    openWidget: (language?: string) => {
      // Set language if provided
      if (language) {
        currentLanguage.value = language as 'en' | 'nl'
      } else if (process.client) {
        currentLanguage.value = navigator.language.startsWith('nl') ? 'nl' : 'en'
      }

      // Update position from global state
      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      // Toggle widget state
      isOpen.value = !isOpen.value

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce(
          isOpen.value ? 'Keyboard shortcuts widget opened' : 'Keyboard shortcuts widget closed',
          'assertive'
        )
      }
    },
  })

  // Compute position class based on position value
  const positionClass = computed(() => {
    return `keyboard-shortcuts-widget-${position.value}`
  })

  const closeWidget = (): void => {
    isOpen.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'keyboard-shortcuts') {
      globalState.activeWidget = null
    }
  }

  // Download function removed

  // Watch for position changes in global state
  watch(
    () => globalState.widgetPosition,
    newValue => {
      if (position.value !== newValue) {
        position.value = newValue
      }
    }
  )

  const setupPositionWatcher = (): void => {
    watch(
      () => position.value,
      newPosition => {
        if (process.client && document) {
          document.documentElement.setAttribute('data-keyboard-shortcuts-position', newPosition)
        }
      },
      { immediate: true }
    )
  }

  const setupKeyboardHandler = (): void => {
    keyboardHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen.value) {
        closeWidget()
      }
    }
    if (keyboardHandler) {
      document.addEventListener('keydown', keyboardHandler)
    }
  }

  const setupToggleWidget = (): (() => void) => {
    return (): void => {
      isOpen.value = !isOpen.value

      if (isOpen.value) {
        const closeEvent = new CustomEvent('close-all-widgets', {
          detail: { except: 'keyboard-shortcuts' },
        })
        document.dispatchEvent(closeEvent)

        if (globalState.widgetPosition) {
          position.value = globalState.widgetPosition
        }

        globalState.activeWidget = 'keyboard-shortcuts'
      } else if (globalState.activeWidget === 'keyboard-shortcuts') {
        globalState.activeWidget = null
      }

      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce(
          isOpen.value ? 'Keyboard shortcuts opened' : 'Keyboard shortcuts closed',
          'assertive'
        )
      }
    }
  }

  const setupClickOutsideHandler = (): void => {
    documentClickHandler = (e: MouseEvent): void => {
      const target = e.target
      if (
        isOpen.value &&
        widgetRef.value &&
        target instanceof Element &&
        isHTMLElement(widgetRef.value) &&
        !widgetRef.value.contains(target)
      ) {
        closeWidget()
      }
    }
    if (documentClickHandler) {
      document.addEventListener('mousedown', documentClickHandler)
    }
  }

  const setupEventListeners = (toggleWidget: () => void): void => {
    document.addEventListener('close-all-widgets', event => {
      if (event.detail && event.detail.except !== 'keyboard-shortcuts') {
        closeWidget()
      }
    })

    document.addEventListener('open-keyboard-shortcuts', event => {
      const closeEvent = new CustomEvent('close-all-widgets', {
        detail: { except: 'keyboard-shortcuts' },
      })
      document.dispatchEvent(closeEvent)

      globalState.activeWidget = 'keyboard-shortcuts'

      if (event.detail && event.detail.language) {
        currentLanguage.value = event.detail.language
      }

      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      isOpen.value = true

      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Keyboard shortcuts widget opened', 'assertive')
      }
    })

    document.addEventListener('toggle-keyboard-shortcuts', () => {
      toggleWidget()
    })
  }

  const setupLanguageFallback = (): void => {
    if (process.client && !globalState.languagePreference) {
      if (navigator && navigator.language) {
        const browserLang = navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en'
        globalState.languagePreference = browserLang
      } else {
        globalState.languagePreference = 'en'
      }
    }
  }

  onMounted(() => {
    forceLanguageSync()

    if (globalState.widgetPosition) {
      position.value = globalState.widgetPosition
    }

    setupPositionWatcher()
    setupKeyboardHandler()
    const toggleWidget = setupToggleWidget()
    setupClickOutsideHandler()
    setupEventListeners(toggleWidget)
    setupLanguageFallback()
  })

  // No need to watch or save preference directly to localStorage
  // since we're using a computed property with setter that updates globalState
  // which automatically syncs with localStorage

  onBeforeUnmount(() => {
    // Clean up event listeners
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler)
    }
    if (documentClickHandler) {
      document.removeEventListener('mousedown', documentClickHandler)
    }
  })
</script>

<style scoped>
  .keyboard-shortcuts-widget {
    position: fixed;
    z-index: 54;
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

  /* Widget panel */
  .keyboard-shortcuts-widget-panel {
    position: absolute;
    width: min(90vw, 550px);
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    padding: 16px;
    display: none;
    flex-direction: column;
    gap: 16px;
    max-height: 85vh;
    overflow-y: auto;
    transition:
      width 0.3s ease,
      height 0.3s ease;
    z-index: 2000; /* Ensure it's higher than other widgets */
  }

  .keyboard-shortcuts-widget-panel.open {
    display: flex;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .keyboard-shortcuts-widget-panel.open {
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

    /* Adjust keyboard shortcuts header for mobile */
    .keyboard-shortcuts-widget-panel.open .keyboard-shortcuts-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    /* Adjust keyboard shortcuts content for mobile */
    .keyboard-shortcuts-widget-panel.open .keyboard-shortcuts-widget-content {
      height: calc(100vh - 60px) !important;
      max-height: none !important;
      overflow-y: auto !important;
      padding: 1rem !important;
      padding-bottom: 5rem !important;
      padding-top: 0.5rem !important;
      width: 100% !important;
    }
  }

  /* Panel positioning */
  .keyboard-shortcuts-widget-panel {
    position: fixed !important;
    bottom: 80px !important; /* Match the accessibility widget panel position */
    /* Position (left/right) is determined by position classes */
  }

  .keyboard-shortcuts-widget-bottom-left .keyboard-shortcuts-widget-panel {
    left: 20px;
  }

  .keyboard-shortcuts-widget-bottom-right .keyboard-shortcuts-widget-panel {
    right: 20px;
  }

  /* Panel header */
  .keyboard-shortcuts-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .keyboard-shortcuts-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .keyboard-shortcuts-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .keyboard-shortcuts-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .keyboard-shortcuts-widget-close:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  /* Widget content */
  .keyboard-shortcuts-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .keyboard-shortcuts-language-selector {
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
    outline: 2px solid #0066cc;
    outline-offset: 2px;
    position: relative;
    z-index: 1;
  }

  /* Full shortcuts view */
  .full-shortcuts {
    width: 100%;
    overflow-y: auto;
    padding-right: 8px;
  }

  @media (max-width: 640px) {
    .full-shortcuts {
      max-height: calc(100vh - 12rem); /* Account for header, nav, etc. */
      padding-right: 0;
      padding-bottom: 4rem; /* Extra padding at bottom for scrolling */
    }

    /* Improve readability on mobile */
    .full-shortcuts section {
      margin-bottom: 1.5rem;
    }

    .full-shortcuts kbd {
      font-size: 0.75rem;
      padding: 2px 4px;
    }
  }

  /* Download link removed */

  /* Custom styles for keyboard shortcut display */
  kbd {
    display: inline-block;
    padding: 3px 6px;
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    font-size: 0.85rem;
    color: #333;
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
    min-width: 24px;
    text-align: center;
  }

  /* Handle reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .keyboard-shortcuts-widget-toggle,
    .keyboard-shortcuts-widget-panel {
      transition: none;
    }
  }

  /* Handle high contrast mode */
  :global(.high-contrast-mode) .keyboard-shortcuts-widget-toggle {
    background-color: #000;
    color: #fff;
    border: 2px solid #fff;
  }

  :global(.high-contrast-mode) .language-button.active {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }

  :global(.high-contrast-mode) .language-button:not(.active) {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }

  :global(.high-contrast-mode) kbd {
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    box-shadow: none;
  }

  /* When widget is open, adjust position to ensure it doesn't go off-screen */
  .keyboard-shortcuts-widget-open .keyboard-shortcuts-widget-panel {
    max-width: calc(100vw - 40px);
  }
</style>
