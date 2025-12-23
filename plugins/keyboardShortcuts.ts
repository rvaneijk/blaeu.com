/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @plugin keyboardShortcuts.ts
 * @description Provides keyboard shortcut functionality for the application
 * Implements accessibility-focused keyboard navigation including:
 * - Section navigation (Alt+1, Alt+2, etc.)
 * - Accessibility feature toggles (Alt+A, Alt+F, Alt+X, Alt+Z)
 * - Keyboard shortcuts help dialog (Alt+/)
 * - Navigation to top/bottom of page (Alt+0, Alt+9)
 * - Widget toggles for privacy policy, terms, etc.
 */
import { defineNuxtPlugin } from '#app'
import { globalState } from '~/composables/globalState'

interface VueInstance {
  ctx?: {
    openWidget?: () => void
    [key: string]: unknown
  }
}

interface ElementWithVue extends Element {
  __vueParentComponent?: VueInstance
}

// Helper function to create announcement function
const createAnnounceAction = (nuxtApp: {
  $announce?: (message: string, priority: string) => void
}) => {
  return (message: string): void => {
    const { $announce } = nuxtApp
    if ($announce && typeof $announce === 'function') {
      $announce(message, 'polite')
    }
  }
}

// Download shortcuts content generation
const generateShortcutsContent = (isNL: boolean): string => {
  if (isNL) {
    return `TOETSENBORDSNELKOPPELINGEN - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)

STANDAARD NAVIGATIE
- Alt+0: Ga naar bovenkant pagina
- Alt+1: Spring naar hoofdinhoud
- Alt+2: Spring naar navigatiemenu
- Alt+9: Spring naar Contact

HOMEPAGINA SECTIES
- Alt+3: Over ons
- Alt+4: Diensten
- Alt+5: Getuigenissen
- Alt+6: Contact

PERSOONLIJKE PAGINA SECTIES
- Alt+3: Mijn Boek
- Alt+4: Onderzoekspublicaties
- Alt+5: Media & Thought Leadership
- Alt+6: Contact

TOEGANKELIJKHEIDSFUNCTIES
- Alt+A: Toegankelijkheidswidget aan/uit
- Alt+K: Toetsenbordsnelkoppelingen aan/uit
- Alt+F: Focusmodus aan/uit
- Alt+X: Hoog contrast modus aan/uit
- Alt+Z: Verminderde beweging aan/uit

HULPSNELKOPPELINGEN
- Alt+B: Terug naar boven
- Alt+/: Open deze snelkoppelingendialoog

STANDAARD BROWSERSNELKOPPELINGEN
- Tab: Vooruit bewegen door focusbare elementen
- Shift+Tab: Achteruit bewegen door focusbare elementen
- Enter: Activeer het gefocuste element
- Space: Activeer knoppen en schakel formulierelementen`
  } else {
    return `KEYBOARD SHORTCUTS - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)

STANDARD NAVIGATION
- Alt+0: Go to top of page
- Alt+1: Skip to main content
- Alt+2: Jump to navigation menu
- Alt+9: Jump to Contact

HOME PAGE SECTIONS
- Alt+3: About Us
- Alt+4: Services
- Alt+5: Testimonials
- Alt+6: Contact

PERSONAL PAGE SECTIONS
- Alt+3: My Book
- Alt+4: Research Publications
- Alt+5: Media & Thought Leadership
- Alt+6: Contact

ACCESSIBILITY FEATURES
- Alt+A: Toggle accessibility widget
- Alt+K: Toggle keyboard shortcuts
- Alt+F: Toggle focus mode
- Alt+X: Toggle high contrast mode
- Alt+Z: Toggle reduce motion

UTILITY SHORTCUTS
- Alt+B: Back to top
- Alt+/: Open this shortcuts dialog

STANDARD BROWSER SHORTCUTS
- Tab: Move forward through focusable elements
- Shift+Tab: Move backward through focusable elements
- Enter: Activate the focused element
- Space: Activate buttons and toggle form controls`
  }
}

// Download shortcuts functionality
const createDownloadShortcuts = (announceAction: (message: string) => void) => {
  return (isNL: boolean): void => {
    if (process.client) {
      const fileName = isNL
        ? 'toetsenbordsnelkoppelingen-blaeu.txt'
        : 'keyboard-shortcuts-blaeu.txt'

      const content = generateShortcutsContent(isNL)
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()

      setTimeout(() => {
        if (process.client && document.body) {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          announceAction(
            isNL
              ? 'Toetsenbordsnelkoppelingen worden gedownload'
              : 'Keyboard shortcuts are downloading'
          )
        }
      }, 100)
    }
  }
}

// Focus mode toggle functionality
const createFocusModeToggle = (announceAction: (message: string) => void) => {
  return (): void => {
    const htmlElement = document.documentElement
    const hasFocusMode = htmlElement.classList.contains('focus-mode')

    if (hasFocusMode) {
      htmlElement.classList.remove('focus-mode')
      htmlElement.classList.remove('enhanced-focus')
      globalState.focusMode = false

      const focusCheckbox = document.getElementById('focus-mode') as HTMLInputElement
      if (focusCheckbox) {
        focusCheckbox.checked = false
      }
      announceAction('Focus mode disabled')
    } else {
      htmlElement.classList.add('focus-mode')
      htmlElement.classList.add('enhanced-focus')
      globalState.focusMode = true

      const focusCheckbox = document.getElementById('focus-mode') as HTMLInputElement
      if (focusCheckbox) {
        focusCheckbox.checked = true
      }
      announceAction('Focus mode enabled - focus indicators enhanced')
    }
  }
}

// High contrast toggle functionality
const createHighContrastToggle = (announceAction: (message: string) => void) => {
  return (): void => {
    const htmlElement = document.documentElement
    const hasHighContrast = htmlElement.classList.contains('high-contrast-mode')

    if (hasHighContrast) {
      htmlElement.classList.remove('high-contrast-mode')
      globalState.highContrast = false

      const accessibilityWidgets = document.querySelectorAll('.accessibility-widget')
      accessibilityWidgets.forEach(widget => {
        const defaultContrastButton = widget.querySelector('button[aria-label="Default contrast"]')
        const highContrastButton = widget.querySelector('button[aria-label="High contrast"]')

        if (defaultContrastButton && highContrastButton) {
          defaultContrastButton.classList.add('active')
          highContrastButton.classList.remove('active')
          defaultContrastButton.setAttribute('aria-checked', 'true')
          highContrastButton.setAttribute('aria-checked', 'false')
        }
      })
      announceAction('High contrast mode disabled')
    } else {
      htmlElement.classList.add('high-contrast-mode')
      globalState.highContrast = true

      const accessibilityWidgets = document.querySelectorAll('.accessibility-widget')
      accessibilityWidgets.forEach(widget => {
        const defaultContrastButton = widget.querySelector('button[aria-label="Default contrast"]')
        const highContrastButton = widget.querySelector('button[aria-label="High contrast"]')

        if (defaultContrastButton && highContrastButton) {
          defaultContrastButton.classList.remove('active')
          highContrastButton.classList.add('active')
          defaultContrastButton.setAttribute('aria-checked', 'false')
          highContrastButton.setAttribute('aria-checked', 'true')
        }
      })
      announceAction('High contrast mode enabled')
    }
  }
}

// Reduce motion toggle functionality
const createReduceMotionToggle = (announceAction: (message: string) => void) => {
  return (): void => {
    const htmlElement = document.documentElement
    const hasReducedMotion = htmlElement.classList.contains('reduce-motion')

    if (hasReducedMotion) {
      htmlElement.classList.remove('reduce-motion')
      globalState.reduceMotion = false

      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (video && typeof video.play === 'function') {
          video.play().catch(_err => {
            /* console.warn('Could not play video:', err) */
          })
        }
      })

      const reduceMotionCheckbox = document.getElementById('reduce-motion') as HTMLInputElement
      if (reduceMotionCheckbox) {
        reduceMotionCheckbox.checked = false
      }

      try {
        const reduceMotionEvent = new Event('reduceMotionChange')
        document.dispatchEvent(reduceMotionEvent)
      } catch (_err) {
        // console.warn('Error dispatching reduceMotionChange event:', err);
      }
      announceAction('Reduced motion disabled, videos playing')
    } else {
      htmlElement.classList.add('reduce-motion')
      globalState.reduceMotion = true

      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (video && typeof video.pause === 'function') {
          video.pause()
        }
      })

      const reduceMotionCheckbox = document.getElementById('reduce-motion') as HTMLInputElement
      if (reduceMotionCheckbox) {
        reduceMotionCheckbox.checked = true
      }

      try {
        const reduceMotionEvent = new Event('reduceMotionChange')
        document.dispatchEvent(reduceMotionEvent)
      } catch (_err) {
        // console.warn('Error dispatching reduceMotionChange event:', err);
      }
      announceAction('Reduced motion enabled, videos paused')
    }
  }
}

// Widget display functionality
const createShowKeyboardShortcuts = (
  announceAction: (message: string) => void,
  previousFocusRef: { current: Element | null }
) => {
  return (): void => {
    const widgetElement = document.querySelector('keyboard-shortcuts-widget')
    if (widgetElement) {
      const elementWithVue = widgetElement as ElementWithVue
      if (elementWithVue.__vueParentComponent?.ctx) {
        const widgetInstance = elementWithVue.__vueParentComponent.ctx
        if (widgetInstance.openWidget) {
          widgetInstance.openWidget()
          return
        }
      }
    }

    try {
      previousFocusRef.current = document.activeElement
      const event = new CustomEvent('open-keyboard-shortcuts', {
        detail: {
          language: document.documentElement.lang === 'nl' ? 'nl' : 'en',
        },
      })
      document.dispatchEvent(event)
      announceAction('Keyboard shortcuts opened')
    } catch (_err) {
      /* console.warn('Error opening keyboard shortcuts widget:', _err) */
    }
  }
}

// Navigation helper functions
const createNavigationHelpers = (
  announceAction: (message: string) => void
): {
  handleNavigationJump: () => void
  isMobileMenuClosed: () => boolean
  openMobileMenuAndFocus: (containerElement: Element) => void
  focusNavigationElement: (element: Element) => void
} => {
  const isMobileMenuClosed = (): boolean => {
    const isMobileView = window.innerWidth < 768
    const mobileMenuButton = document.querySelector('#mobile-menu-button') as HTMLButtonElement
    const mobileMenuClosed =
      mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'false'
    return isMobileView && mobileMenuClosed && !!mobileMenuButton
  }

  const openMobileMenuAndFocus = (containerElement: Element): void => {
    const mobileMenuButton = document.querySelector('#mobile-menu-button') as HTMLButtonElement
    if (mobileMenuButton) {
      mobileMenuButton.click()
      setTimeout(() => {
        const firstMenuItem = document.querySelector(
          '#mobile-menu a[role="menuitem"]'
        ) as HTMLElement
        if (firstMenuItem) {
          firstMenuItem.focus()
          containerElement.scrollIntoView({ behavior: 'smooth' })
          announceAction('Opened mobile menu, use Tab to navigate menu items')
        }
      }, 300)
    }
  }

  const focusNavigationElement = (element: Element): void => {
    const firstFocusableElement = element.querySelector('a, button, [tabindex="0"]') as HTMLElement
    if (firstFocusableElement) {
      firstFocusableElement.focus()
      element.scrollIntoView({ behavior: 'smooth' })
      announceAction('Jumped to navigation menu, use Tab to navigate menu items')
    } else {
      ;(element as HTMLElement).focus()
      element.scrollIntoView({ behavior: 'smooth' })
      announceAction('Jumped to navigation menu')
    }
  }

  const handleNavigationJump = (): void => {
    const navigation = document.querySelector('nav[aria-label="Main Navigation"]')
    if (navigation) {
      if (isMobileMenuClosed()) {
        openMobileMenuAndFocus(navigation)
        return
      }
      focusNavigationElement(navigation)
    } else {
      const navbar = document.querySelector('nav')
      if (navbar) {
        if (isMobileMenuClosed()) {
          openMobileMenuAndFocus(navbar)
          return
        }
        focusNavigationElement(navbar)
      }
    }
  }

  return {
    handleNavigationJump,
    isMobileMenuClosed,
    openMobileMenuAndFocus,
    focusNavigationElement,
  }
}

// Page navigation helpers
const createPageNavigationHelpers = (
  announceAction: (message: string) => void
): {
  getCurrentLanguage: () => 'nl' | 'en'
  handleMainContentJump: () => void
  handleLastSectionJump: () => void
  handleAccessibilityWidgetToggle: () => void
  handleHomeNavigation: () => void
  handleKeyboardShortcutsToggle: () => void
} => {
  const getCurrentLanguage = (): 'nl' | 'en' => {
    return document.documentElement.lang === 'nl' ? 'nl' : 'en'
  }

  const handleMainContentJump = (): void => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
      announceAction('Jumped to main content')
    }
  }

  const handleLastSectionJump = (): void => {
    const contactSection = document.getElementById('about')
    const footer = document.querySelector('footer')

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      const firstFocusableElement = contactSection.querySelector(
        'a, button, [tabindex="0"]'
      ) as HTMLElement
      if (firstFocusableElement) {
        firstFocusableElement.focus()
      } else {
        ;(contactSection as HTMLElement).focus()
      }
      announceAction('Jumped to last section')
    } else if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
      ;(footer as HTMLElement).focus()
      announceAction('Jumped to last section')
    }
  }

  const handleAccessibilityWidgetToggle = (): void => {
    const accessibilityWidgetButton = document.querySelector('.accessibility-widget-toggle')
    if (accessibilityWidgetButton) {
      ;(accessibilityWidgetButton as HTMLElement).click()
      announceAction('Toggled accessibility widget')
    }
  }

  const handleHomeNavigation = (): void => {
    const homeLink = document.querySelector('a[href="#top"]') as HTMLElement
    if (homeLink) {
      homeLink.click()
      announceAction('Navigated to top section')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      announceAction('Scrolled to top of page')
    }
  }

  const handleKeyboardShortcutsToggle = (): void => {
    document.dispatchEvent(new CustomEvent('toggle-keyboard-shortcuts'))
  }

  return {
    getCurrentLanguage,
    handleMainContentJump,
    handleLastSectionJump,
    handleAccessibilityWidgetToggle,
    handleHomeNavigation,
    handleKeyboardShortcutsToggle,
  }
}

// Event dispatch helpers
const createEventHelpers = (
  announceAction: (message: string) => void
): {
  dispatchCustomEvent: (eventName: string, detail?: unknown, successMessage?: string) => void
  handleWidgetShortcut: (
    eventName: string,
    language: 'nl' | 'en',
    message: string,
    expandPolicy?: boolean
  ) => void
  handleSimpleWidgetEvent: (eventName: string, message: string) => void
} => {
  const dispatchCustomEvent = (
    eventName: string,
    detail?: unknown,
    successMessage?: string
  ): void => {
    try {
      const event = new CustomEvent(eventName, detail ? { detail } : undefined)
      document.dispatchEvent(event)
      if (successMessage) {
        announceAction(successMessage)
      }
    } catch (_err) {
      /* console.error(`Error dispatching ${eventName} event:`, _err) */
    }
  }

  const handleWidgetShortcut = (
    eventName: string,
    language: 'nl' | 'en',
    message: string,
    expandPolicy = false
  ): void => {
    const detail = expandPolicy ? { language, expandPolicy } : { language }
    dispatchCustomEvent(eventName, detail, message)
  }

  const handleSimpleWidgetEvent = (eventName: string, message: string): void => {
    dispatchCustomEvent(eventName, undefined, message)
  }

  return { dispatchCustomEvent, handleWidgetShortcut, handleSimpleWidgetEvent }
}

// Primary navigation handler (Alt+0,1,2,9)
const createPrimaryNavigationHandler = (handlers: {
  handleMainContentJump: () => void
  handleNavigationWithScroll: () => void
  handleLastSectionJump: () => void
  handleHomeNavigation: () => void
}) => {
  return (e: KeyboardEvent, key: string): boolean => {
    switch (key) {
      case '1':
        e.preventDefault()
        handlers.handleMainContentJump()
        return true
      case '2':
        e.preventDefault()
        handlers.handleNavigationWithScroll()
        return true
      case '9':
        e.preventDefault()
        handlers.handleLastSectionJump()
        return true
      case '0':
        e.preventDefault()
        handlers.handleHomeNavigation()
        return true
      default:
        return false
    }
  }
}

// Accessibility features handler (Alt+A,F,X,Z)
const createAccessibilityFeaturesHandler = (handlers: {
  toggleFocusMode: () => void
  toggleHighContrast: () => void
  toggleReduceMotion: () => void
  handleAccessibilityWidgetToggle: () => void
}) => {
  return (e: KeyboardEvent, key: string): boolean => {
    switch (key) {
      case 'a':
      case 'A':
        e.preventDefault()
        handlers.handleAccessibilityWidgetToggle()
        return true
      case 'f':
      case 'F':
        e.preventDefault()
        handlers.toggleFocusMode()
        return true
      case 'x':
      case 'X':
        e.preventDefault()
        handlers.toggleHighContrast()
        return true
      case 'z':
      case 'Z':
        e.preventDefault()
        handlers.toggleReduceMotion()
        return true
      default:
        return false
    }
  }
}

// Language-specific widget handler (Alt+I,C,P,T)
const createLanguageWidgetHandler = (
  handleWidgetShortcut: (
    eventName: string,
    language: 'nl' | 'en',
    message: string,
    expandPolicy?: boolean
  ) => void
) => {
  return (e: KeyboardEvent, key: string, lang: 'nl' | 'en'): boolean => {
    switch (key) {
      case 'i':
      case 'I':
        e.preventDefault()
        handleWidgetShortcut('open-impressum-widget', lang, 'Opened impressum widget')
        return true
      case 'c':
      case 'C':
        e.preventDefault()
        handleWidgetShortcut('open-cookie-widget', lang, 'Opened cookie policy widget')
        return true
      case 'p':
      case 'P':
        e.preventDefault()
        handleWidgetShortcut('open-privacy-widget', lang, 'Opened privacy statement widget', true)
        return true
      case 't':
      case 'T':
        e.preventDefault()
        handleWidgetShortcut('open-terms-widget', lang, 'Opened terms and conditions widget')
        return true
      default:
        return false
    }
  }
}

// Utility keys handler (Alt+D,R,L,K,/)
const createUtilityKeysHandler = (handlers: {
  handleSimpleWidgetEvent: (eventName: string, message: string) => void
  handleKeyboardShortcutsToggle: () => void
  _downloadShortcuts: (isNL: boolean) => void
  getCurrentLanguage: () => 'nl' | 'en'
}) => {
  return (e: KeyboardEvent, key: string): boolean => {
    switch (key) {
      case 'd':
      case 'D':
        e.preventDefault()
        handlers._downloadShortcuts(handlers.getCurrentLanguage() === 'nl')
        return true
      case 'r':
      case 'R':
        e.preventDefault()
        handlers.handleSimpleWidgetEvent('update-widget-position', 'Changed widget position')
        return true
      case 'l':
      case 'L':
        e.preventDefault()
        handlers.handleSimpleWidgetEvent('update-widget-position', 'Changed widget position')
        return true
      case 'k':
      case 'K':
        e.preventDefault()
        handlers.handleKeyboardShortcutsToggle()
        return true
      case '/':
        e.preventDefault()
        handlers.handleSimpleWidgetEvent('open-keyboard-shortcuts', 'Opened keyboard shortcuts')
        return true
      default:
        return false
    }
  }
}

// Factory function to create all keyboard handlers
const createKeyboardHandlers = (handlers: {
  handleMainContentJump: () => void
  handleNavigationWithScroll: () => void
  handleLastSectionJump: () => void
  handleHomeNavigation: () => void
  toggleFocusMode: () => void
  toggleHighContrast: () => void
  toggleReduceMotion: () => void
  handleAccessibilityWidgetToggle: () => void
  handleKeyboardShortcutsToggle: () => void
  handleWidgetShortcut: (
    eventName: string,
    language: 'nl' | 'en',
    message: string,
    expandPolicy?: boolean
  ) => void
  handleSimpleWidgetEvent: (eventName: string, message: string) => void
  _downloadShortcuts: (isNL: boolean) => void
  getCurrentLanguage: () => 'nl' | 'en'
}): {
  handlePrimaryNavigation: (e: KeyboardEvent, key: string) => boolean
  handleAccessibilityFeatures: (e: KeyboardEvent, key: string) => boolean
  handleLanguageWidgetKeys: (e: KeyboardEvent, key: string, lang: 'nl' | 'en') => boolean
  handleOtherUtilityKeys: (e: KeyboardEvent, key: string) => boolean
} => {
  const handlePrimaryNavigation = createPrimaryNavigationHandler({
    handleMainContentJump: handlers.handleMainContentJump,
    handleNavigationWithScroll: handlers.handleNavigationWithScroll,
    handleLastSectionJump: handlers.handleLastSectionJump,
    handleHomeNavigation: handlers.handleHomeNavigation,
  })

  const handleAccessibilityFeatures = createAccessibilityFeaturesHandler({
    toggleFocusMode: handlers.toggleFocusMode,
    toggleHighContrast: handlers.toggleHighContrast,
    toggleReduceMotion: handlers.toggleReduceMotion,
    handleAccessibilityWidgetToggle: handlers.handleAccessibilityWidgetToggle,
  })

  const handleLanguageWidgetKeys = createLanguageWidgetHandler(handlers.handleWidgetShortcut)

  const handleOtherUtilityKeys = createUtilityKeysHandler({
    handleSimpleWidgetEvent: handlers.handleSimpleWidgetEvent,
    handleKeyboardShortcutsToggle: handlers.handleKeyboardShortcutsToggle,
    _downloadShortcuts: handlers._downloadShortcuts,
    getCurrentLanguage: handlers.getCurrentLanguage,
  })

  return {
    handlePrimaryNavigation,
    handleAccessibilityFeatures,
    handleLanguageWidgetKeys,
    handleOtherUtilityKeys,
  }
}

interface NuxtAppWithProvide {
  provide?: (key: string, value: unknown) => void
  $announce?: (message: string, priority: string) => void
}

const setupKeyboardShortcutHelpers = (
  nuxtApp: NuxtAppWithProvide
): {
  _previousFocusRef: { current: Element | null }
  announceAction: (message: string, priority?: string) => void
  _downloadShortcuts: ReturnType<typeof createDownloadShortcuts>
  navigationHelpers: ReturnType<typeof createNavigationHelpers>
  pageNavHelpers: ReturnType<typeof createPageNavigationHelpers>
  eventHelpers: ReturnType<typeof createEventHelpers>
  showKeyboardShortcuts: ReturnType<typeof createShowKeyboardShortcuts>
  toggleFocusMode: ReturnType<typeof createFocusModeToggle>
  toggleHighContrast: ReturnType<typeof createHighContrastToggle>
  toggleReduceMotion: ReturnType<typeof createReduceMotionToggle>
} => {
  const _previousFocusRef = { current: null as Element | null }
  const announceAction = createAnnounceAction(nuxtApp)

  return {
    _previousFocusRef,
    announceAction,
    _downloadShortcuts: createDownloadShortcuts(announceAction),
    navigationHelpers: createNavigationHelpers(announceAction),
    pageNavHelpers: createPageNavigationHelpers(announceAction),
    eventHelpers: createEventHelpers(announceAction),
    showKeyboardShortcuts: createShowKeyboardShortcuts(announceAction, _previousFocusRef),
    toggleFocusMode: createFocusModeToggle(announceAction),
    toggleHighContrast: createHighContrastToggle(announceAction),
    toggleReduceMotion: createReduceMotionToggle(announceAction),
  }
}

const initializeKeyboardShortcuts = (nuxtApp: NuxtAppWithProvide): void => {
  const helpers = setupKeyboardShortcutHelpers(nuxtApp)
  let keyboardShortcutsInitialized = false

  const { handleNavigationJump } = helpers.navigationHelpers
  const {
    getCurrentLanguage,
    handleMainContentJump,
    handleLastSectionJump,
    handleAccessibilityWidgetToggle,
    handleHomeNavigation,
    handleKeyboardShortcutsToggle,
  } = helpers.pageNavHelpers
  const { handleWidgetShortcut, handleSimpleWidgetEvent } = helpers.eventHelpers

  const handleNavigationWithScroll = (): void => {
    if (window.scrollY < 100) {
      window.scrollTo({ top: 100, behavior: 'smooth' })
      setTimeout(() => {
        handleNavigationJump()
      }, 500)
    } else {
      handleNavigationJump()
    }
  }

  const keyboardHandlers = createKeyboardHandlers({
    handleMainContentJump,
    handleNavigationWithScroll,
    handleLastSectionJump,
    handleHomeNavigation,
    toggleFocusMode: helpers.toggleFocusMode,
    toggleHighContrast: helpers.toggleHighContrast,
    toggleReduceMotion: helpers.toggleReduceMotion,
    handleAccessibilityWidgetToggle,
    handleKeyboardShortcutsToggle,
    handleWidgetShortcut,
    handleSimpleWidgetEvent,
    _downloadShortcuts: helpers._downloadShortcuts,
    getCurrentLanguage,
  })

  const {
    handlePrimaryNavigation,
    handleAccessibilityFeatures,
    handleLanguageWidgetKeys,
    handleOtherUtilityKeys,
  } = keyboardHandlers

  const handleKeyboardShortcuts = (e: KeyboardEvent): void => {
    if (e.altKey) {
      const lang = getCurrentLanguage()
      if (handlePrimaryNavigation(e, e.key)) return
      if (handleAccessibilityFeatures(e, e.key)) return
      if (handleLanguageWidgetKeys(e, e.key, lang)) return
      if (handleOtherUtilityKeys(e, e.key)) return
    }
  }

  const initKeyboardShortcuts = (): void => {
    if (!keyboardShortcutsInitialized) {
      document.addEventListener('keydown', handleKeyboardShortcuts)
      keyboardShortcutsInitialized = true
    }
  }

  if (document.readyState === 'complete') {
    initKeyboardShortcuts()
  } else {
    window.addEventListener('load', initKeyboardShortcuts)
  }

  if (nuxtApp.provide) {
    nuxtApp.provide('showKeyboardShortcuts', () => {
      helpers.showKeyboardShortcuts()
    })
  }
}

export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    initializeKeyboardShortcuts(nuxtApp)
  }
})
