/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Type definitions for accessibility features

export interface AccessibilityState {
  readonly currentTab: number
  readonly reduceMotion: boolean
  readonly highContrast: boolean
  readonly focusMode: boolean
  readonly videoCaptions: boolean
  readonly fontFamily: FontFamily
  readonly fontSizeLevel: FontSizeLevel
  readonly darkMode: boolean
  readonly widgetPosition: WidgetPosition
  readonly languagePreference: Language
  readonly activeWidget: string | null
  readonly forceLanguageUpdate?: () => void
}

export type FontFamily = 'default' | 'dyslexic'
export type FontSizeLevel = -2 | -1 | 0 | 1 | 2 | 3
export type WidgetPosition = 'bottom-left' | 'bottom-right'
export type Language = 'nl' | 'en'

declare global {
  interface Window {
    accessibilityState?: AccessibilityState
    $announce?: (message: string, priority?: 'polite' | 'assertive') => void
    $toggleCaptions?: () => void
  }
}

export {}
