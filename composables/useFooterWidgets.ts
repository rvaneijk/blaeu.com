/**
 * @file useFooterWidgets.ts
 * @description Composable for managing common footer policy widgets
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

import { defineAsyncComponent } from 'vue'
import { globalState } from '~/composables/globalState'

/**
 * Helper functions for language management
 */
const createLanguageHelpers = (): {
  validateLanguage: (lang?: string) => 'en' | 'nl'
  getBrowserLanguage: () => 'en' | 'nl'
} => {
  const validateLanguage = (lang?: string): 'en' | 'nl' => {
    return lang === 'nl' ? 'nl' : 'en'
  }

  const getBrowserLanguage = (): 'en' | 'nl' => {
    if (import.meta.client) {
      const browserLang =
        navigator.language ||
        (navigator as Navigator & { userLanguage?: string }).userLanguage ||
        'en'
      return browserLang.startsWith('nl') ? 'nl' : 'en'
    }
    return 'en'
  }

  return { validateLanguage, getBrowserLanguage }
}

/**
 * Creates a widget event dispatcher
 */
const createWidgetEventDispatcher = (eventName: string) => {
  return (language?: string): void => {
    const { validateLanguage } = createLanguageHelpers()
    if (language) {
      globalState.languagePreference = validateLanguage(language)
    }
    const event = new CustomEvent(eventName, {
      detail: { expandPolicy: false },
    })
    document.dispatchEvent(event)
  }
}

/**
 * Helper functions for widget management
 */
const createFooterWidgetHandlers = (): {
  validateLanguage: (lang?: string) => 'en' | 'nl'
  getBrowserLanguage: () => 'en' | 'nl'
  showKeyboardShortcuts: () => void
  openAccessibilityWidget: (language?: string) => void
} => {
  const { validateLanguage, getBrowserLanguage } = createLanguageHelpers()

  const showKeyboardShortcuts = (): void => {
    const event = new CustomEvent('open-keyboard-shortcuts', { detail: {} })
    document.dispatchEvent(event)
  }

  return {
    validateLanguage,
    getBrowserLanguage,
    showKeyboardShortcuts,
    openAccessibilityWidget: createWidgetEventDispatcher('open-accessibility'),
  }
}

/**
 * Return type for the useFooterWidgets composable
 */
interface FooterWidgetsComposable {
  // Widget components
  AccessibilityWidget: ReturnType<typeof defineAsyncComponent>
  KeyboardShortcutsWidget: ReturnType<typeof defineAsyncComponent>

  // Management functions
  showKeyboardShortcuts: () => void
  openAccessibilityWidget: (language?: string) => void

  // Helper functions
  validateLanguage: (lang?: string) => 'en' | 'nl'
  getBrowserLanguage: () => 'en' | 'nl'
}

/**
 * Composable that provides all footer widgets and their management functions
 * Includes AccessibilityWidget and KeyboardShortcutsWidget
 *
 * @returns Object containing widget components and management functions
 */
export const useFooterWidgets = (): FooterWidgetsComposable => {
  // Widget components (lazy-loaded)
  const AccessibilityWidget = defineAsyncComponent(
    () => import('~/components/AccessibilityWidget.vue')
  )
  const KeyboardShortcutsWidget = defineAsyncComponent(
    () => import('~/components/KeyboardShortcutsWidget.vue')
  )

  // Import helper functions and widget handlers
  const { validateLanguage, getBrowserLanguage, showKeyboardShortcuts, openAccessibilityWidget } =
    createFooterWidgetHandlers()

  return {
    // Widget components
    AccessibilityWidget,
    KeyboardShortcutsWidget,

    // Management functions
    showKeyboardShortcuts,
    openAccessibilityWidget,

    // Helper functions (in case needed)
    validateLanguage,
    getBrowserLanguage,
  }
}
