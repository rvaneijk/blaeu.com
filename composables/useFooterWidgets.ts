/**
 * @file useFooterWidgets.ts
 * @description Composable for managing common footer policy widgets
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
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
    if (process.client) {
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
  openCookieWidget: (language?: string) => void
  openAccessibilityWidget: (language?: string) => void
  openAccessibilityPolicyWidget: (language?: string) => void
  openPrivacyWidget: (language?: string) => void
  openTermsWidget: (language?: string) => void
  openResponsibleDisclosureWidget: (language?: string) => void
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
    openCookieWidget: createWidgetEventDispatcher('open-cookie-widget'),
    openAccessibilityWidget: createWidgetEventDispatcher('open-accessibility'),
    openAccessibilityPolicyWidget: createWidgetEventDispatcher('open-accessibility-policy'),
    openPrivacyWidget: createWidgetEventDispatcher('open-privacy-widget'),
    openTermsWidget: createWidgetEventDispatcher('open-terms-widget'),
    openResponsibleDisclosureWidget: createWidgetEventDispatcher('open-disclosure-widget'),
  }
}

/**
 * Return type for the useFooterWidgets composable
 */
interface FooterWidgetsComposable {
  // Widget components
  AccessibilityWidget: ReturnType<typeof defineAsyncComponent>
  AccessibilityPolicyWidget: ReturnType<typeof defineAsyncComponent>
  CookiePolicyWidget: ReturnType<typeof defineAsyncComponent>
  KeyboardShortcutsWidget: ReturnType<typeof defineAsyncComponent>
  PrivacyStatementWidget: ReturnType<typeof defineAsyncComponent>
  ResponsibleDisclosureWidget: ReturnType<typeof defineAsyncComponent>
  TermsWidget: ReturnType<typeof defineAsyncComponent>

  // Management functions
  showKeyboardShortcuts: () => void
  openCookieWidget: (language?: string) => void
  openAccessibilityWidget: (language?: string) => void
  openAccessibilityPolicyWidget: (language?: string) => void
  openPrivacyWidget: (language?: string) => void
  openTermsWidget: (language?: string) => void
  openResponsibleDisclosureWidget: (language?: string) => void

  // Helper functions
  validateLanguage: (lang?: string) => 'en' | 'nl'
  getBrowserLanguage: () => 'en' | 'nl'
}

/**
 * Composable that provides all footer widgets and their management functions
 * Includes all 7 widgets: AccessibilityWidget, AccessibilityPolicyWidget, CookiePolicyWidget,
 * KeyboardShortcutsWidget, PrivacyStatementWidget, ResponsibleDisclosureWidget, TermsWidget
 *
 * @returns Object containing widget components and management functions
 */
export const useFooterWidgets = (): FooterWidgetsComposable => {
  // Widget components (lazy-loaded)
  const AccessibilityWidget = defineAsyncComponent(
    () => import('~/components/AccessibilityWidget.vue')
  )
  const AccessibilityPolicyWidget = defineAsyncComponent(
    () => import('~/components/AccessibilityPolicyWidget.vue')
  )
  const CookiePolicyWidget = defineAsyncComponent(
    () => import('~/components/CookiePolicyWidget.vue')
  )
  const KeyboardShortcutsWidget = defineAsyncComponent(
    () => import('~/components/KeyboardShortcutsWidget.vue')
  )
  const PrivacyStatementWidget = defineAsyncComponent(
    () => import('~/components/PrivacyStatementWidget.vue')
  )
  const ResponsibleDisclosureWidget = defineAsyncComponent(
    () => import('~/components/ResponsibleDisclosureWidget.vue')
  )
  const TermsWidget = defineAsyncComponent(() => import('~/components/TermsWidget.vue'))

  // Import helper functions and widget handlers
  const {
    validateLanguage,
    getBrowserLanguage,
    showKeyboardShortcuts,
    openCookieWidget,
    openAccessibilityWidget,
    openAccessibilityPolicyWidget,
    openPrivacyWidget,
    openTermsWidget,
    openResponsibleDisclosureWidget,
  } = createFooterWidgetHandlers()

  return {
    // Widget components
    AccessibilityWidget,
    AccessibilityPolicyWidget,
    CookiePolicyWidget,
    KeyboardShortcutsWidget,
    PrivacyStatementWidget,
    ResponsibleDisclosureWidget,
    TermsWidget,

    // Management functions
    showKeyboardShortcuts,
    openCookieWidget,
    openAccessibilityWidget,
    openAccessibilityPolicyWidget,
    openPrivacyWidget,
    openTermsWidget,
    openResponsibleDisclosureWidget,

    // Helper functions (in case needed)
    validateLanguage,
    getBrowserLanguage,
  }
}
