/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @module composables/globalState
 * @description Centralized state management for the application, focused on accessibility settings.
 * Provides reactive state that persists user preferences across page navigation and sessions.
 * This is the source of truth for all accessibility-related settings.
 */
import { reactive, watchEffect } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import type {
  AccessibilityState,
  Language,
  FontFamily,
  FontSizeLevel,
  WidgetPosition,
} from '~/types/accessibility'

/**
 * Type validation functions for runtime safety and external API calls
 */

// Type guards for localStorage operations
function isStorageAvailable(): boolean {
  try {
    return (
      typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage !== null
    )
  } catch (_e) {
    return false
  }
}

function isValidStorageData(data: unknown): data is Record<string, unknown> {
  return typeof data === 'object' && data !== null && !Array.isArray(data)
}

function safeParseJSON(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString)
  } catch (e) {
    errorHandler.warning('Failed to parse JSON from localStorage', e, { component: 'globalState' })
    return null
  }
}

function safeStringifyJSON(data: unknown): string | null {
  try {
    return JSON.stringify(data)
  } catch (e) {
    errorHandler.warning('Failed to stringify data for localStorage', e, {
      component: 'globalState',
    })
    return null
  }
}

// Navigator API type guards
function isNavigatorAvailable(): boolean {
  return typeof navigator !== 'undefined' && navigator !== null
}

function hasNavigatorLanguage(): boolean {
  return isNavigatorAvailable() && typeof navigator.language === 'string'
}

// DOM API type guards
function isDocumentAvailable(): boolean {
  return typeof document !== 'undefined' && document !== null
}

function isDocumentElementAvailable(): boolean {
  return isDocumentAvailable() && document.documentElement instanceof HTMLElement
}

/**
 * Type validation functions for runtime safety
 */
function validateLanguagePreference(value: unknown): Language {
  if (typeof value === 'string' && ['nl', 'en'].includes(value)) {
    return value as Language
  }
  return 'en'
}

function validateFontFamily(value: unknown): FontFamily {
  if (typeof value === 'string' && ['default', 'dyslexic'].includes(value)) {
    return value as FontFamily
  }
  return 'default'
}

function validateFontSizeLevel(value: unknown): FontSizeLevel {
  if (typeof value === 'number' && Number.isInteger(value) && value >= -2 && value <= 3) {
    return value as FontSizeLevel
  }
  return 0
}

function validateWidgetPosition(value: unknown): WidgetPosition {
  if (typeof value === 'string' && ['bottom-left', 'bottom-right'].includes(value)) {
    return value as WidgetPosition
  }
  return 'bottom-right'
}

function getBrowserLanguage(): Language {
  if (process.client && hasNavigatorLanguage()) {
    const browserLang = navigator.language.toLowerCase()
    return browserLang.startsWith('nl') ? 'nl' : 'en'
  }
  return 'en'
}

export interface GlobalState extends AccessibilityState {
  currentTab: number
  reduceMotion: boolean
  highContrast: boolean
  focusMode: boolean
  videoCaptions: boolean
  fontFamily: FontFamily
  fontSizeLevel: FontSizeLevel
  widgetPosition: WidgetPosition
  languagePreference: Language
  activeWidget: string | null
  forceLanguageUpdate?: () => void
}

/**
 * Default state with accessibility and language preferences
 * This defines the baseline values that are used when no saved preferences exist
 */
let initialState: GlobalState = {
  currentTab: 5,
  // Accessibility settings
  reduceMotion: false,
  highContrast: false,
  focusMode: false,
  videoCaptions: false,
  // Additional accessibility settings with strict typing
  fontFamily: 'default' as FontFamily,
  fontSizeLevel: 0 as FontSizeLevel,
  widgetPosition: 'bottom-right' as WidgetPosition,
  // Language preference for all widgets and content
  languagePreference: 'en' as Language,
  // Active widget tracking (for auto-closing other widgets)
  activeWidget: null,
}

// Try to load accessibility settings from localStorage with type guards
if (process.client && isStorageAvailable()) {
  try {
    // First try to get state from the primary storage key
    const savedState = localStorage.getItem('accessibility-state')

    // If primary storage not found, check the legacy key as fallback
    // @deprecated 'accessibility-preferences' is deprecated, use 'accessibility-state' instead
    const legacyPrefs = !savedState ? localStorage.getItem('accessibility-preferences') : null

    if (savedState) {
      const parsedState = safeParseJSON(savedState)

      if (!isValidStorageData(parsedState)) {
        errorHandler.warning('Invalid data format in accessibility-state', parsedState, {
          component: 'globalState',
        })
        throw new Error('Invalid storage data format')
      }

      // Check for the separate keyboard-shortcuts-language key and migrate it
      let languagePreference: Language = validateLanguagePreference(
        parsedState.languagePreference || parsedState.keyboardShortcutsLanguage || 'nl'
      )

      // If not in parsedState, check for the separate localStorage key
      if (!parsedState.languagePreference && !parsedState.keyboardShortcutsLanguage) {
        try {
          // First try to get from separate localStorage key
          const separateLanguagePref = localStorage.getItem('keyboard-shortcuts-language')
          if (separateLanguagePref) {
            languagePreference = validateLanguagePreference(separateLanguagePref)
            // console.info('Migrating keyboard-shortcuts-language to accessibility-state');
          }
          // Then try to use browser language if available
          else {
            languagePreference = getBrowserLanguage()
          }
        } catch (e) {
          errorHandler.warning('Error checking for language preferences', e, {
            component: 'globalState',
          })
        }
      }

      Object.assign(initialState, {
        reduceMotion: Boolean(parsedState.reduceMotion),
        highContrast: Boolean(parsedState.highContrast),
        focusMode: Boolean(parsedState.focusMode),
        videoCaptions: Boolean(parsedState.videoCaptions),
        // Add additional settings with proper type validation
        fontFamily: validateFontFamily(parsedState.fontFamily),
        fontSizeLevel: validateFontSizeLevel(parsedState.fontSizeLevel),
        widgetPosition: validateWidgetPosition(parsedState.widgetPosition),
        languagePreference: languagePreference,
      })

      // Initialize HTML data attribute for widget position immediately
      if (isDocumentElementAvailable()) {
        document.documentElement.setAttribute('data-widget-position', initialState.widgetPosition)
      }
    } else if (legacyPrefs) {
      // Migrate from legacy preferences format
      // @deprecated This migration path will be removed in a future version
      // console.info('Migrating from deprecated accessibility-preferences to accessibility-state');
      const _prefs = safeParseJSON(legacyPrefs)

      if (!isValidStorageData(_prefs)) {
        errorHandler.warning('Invalid legacy preferences data format', _prefs, {
          component: 'globalState',
        })
        throw new Error('Invalid legacy storage data format')
      }

      initialState = {
        ...initialState,
        reduceMotion: false, // Default reduceMotion, not using legacy value
        highContrast: false, // Default contrast, not using legacy value
        focusMode: false, // Default value, not using legacy value
        fontFamily: 'default', // Default font, not using legacy value
        fontSizeLevel: 0, // Default font size, not using legacy value
        widgetPosition: 'bottom-right', // Default position, not using legacy value
      }

      // Set default widget position
      const widgetPosition = 'bottom-right' // Using default, not from legacy
      if (isDocumentElementAvailable()) {
        document.documentElement.setAttribute('data-widget-position', widgetPosition)
      }

      // Check for the separate keyboard-shortcuts-language key
      let languagePreference: Language = 'en' // Default to English
      try {
        const separateLanguagePref = localStorage.getItem('keyboard-shortcuts-language')
        if (separateLanguagePref) {
          languagePreference = validateLanguagePreference(separateLanguagePref)
          // console.info('Including keyboard-shortcuts-language in migration');
        } else {
          languagePreference = getBrowserLanguage()
        }
      } catch (e) {
        errorHandler.warning('Error checking for language preferences during migration', e, {
          component: 'globalState',
        })
      }

      // Immediately update the new storage format to migrate the user
      const migrationData = safeStringifyJSON({
        reduceMotion: initialState.reduceMotion,
        highContrast: initialState.highContrast,
        focusMode: initialState.focusMode,
        fontFamily: initialState.fontFamily,
        fontSizeLevel: initialState.fontSizeLevel,
        widgetPosition: initialState.widgetPosition,
        languagePreference: languagePreference,
      })

      if (migrationData && isStorageAvailable()) {
        localStorage.setItem('accessibility-state', migrationData)
      }
    } else {
      // If no saved state, set default widget position as data attribute
      if (isDocumentElementAvailable()) {
        document.documentElement.setAttribute('data-widget-position', 'bottom-right')
      }

      // Set language preference based on browser language
      initialState.languagePreference = getBrowserLanguage()
    }
  } catch (e) {
    errorHandler.error('Error loading accessibility state', e, { component: 'globalState' })
    // Set default widget position as data attribute in case of error
    if (isDocumentElementAvailable()) {
      document.documentElement.setAttribute('data-widget-position', 'bottom-right')
    }
  }
}

/**
 * Create a reactive global state object that can be imported across components
 * @example
 * // In a component:
 * import { globalState } from '~/composables/globalState';
 *
 * // Read a value
 * const useHighContrast = computed(() => globalState.highContrast);
 *
 * // Update a value
 * function toggleContrast() {
 *   globalState.highContrast = !globalState.highContrast;
 * }
 */
export const globalState = reactive(initialState)

/**
 * Sets up automatic persistence to localStorage whenever state changes
 * Only persists accessibility-related settings, not temporary UI state
 * Updates DOM attributes for direct CSS targeting based on settings
 */
if (process.client) {
  watchEffect(() => {
    const stateToSave = {
      // Accessibility settings
      reduceMotion: globalState.reduceMotion,
      highContrast: globalState.highContrast,
      focusMode: globalState.focusMode,
      videoCaptions: globalState.videoCaptions,
      // Additional settings
      fontFamily: globalState.fontFamily,
      fontSizeLevel: globalState.fontSizeLevel,
      widgetPosition: globalState.widgetPosition,
      // Language setting
      languagePreference: globalState.languagePreference,
    }

    const serializedState = safeStringifyJSON(stateToSave)
    if (serializedState && isStorageAvailable()) {
      localStorage.setItem('accessibility-state', serializedState)
    }

    // Also set a data attribute on the HTML element for CSS targeting
    if (globalState.widgetPosition && isDocumentElementAvailable()) {
      document.documentElement.setAttribute('data-widget-position', globalState.widgetPosition)
    }
  })

  // Add a special force update mechanism for language synchronization
  globalState.forceLanguageUpdate = (): void => {
    // Trigger a micro-update to force all computed properties to re-evaluate
    const current = globalState.languagePreference
    globalState.languagePreference = 'en' // Temporarily set to default
    // Use nextTick to ensure the state change is processed
    import('vue').then(({ nextTick }) => {
      nextTick(() => {
        globalState.languagePreference = current
      })
    })
  }
}
