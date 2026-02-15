/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
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
  readonly widgetPosition: WidgetPosition
  readonly languagePreference: Language
  readonly activeWidget: string | null
  readonly forceLanguageUpdate?: () => void
}

export type FontFamily = 'default' | 'dyslexic'
export type FontSizeLevel = -2 | -1 | 0 | 1 | 2 | 3
export type WidgetPosition = 'bottom-left' | 'bottom-right'
export type Language = 'nl' | 'en'
export type ContrastMode = 'default' | 'high'

export interface AccessibilityPreferences {
  readonly reduceMotion: boolean
  readonly highContrast: boolean
  readonly focusMode: boolean
  readonly videoCaptions: boolean
  readonly fontFamily: FontFamily
  readonly fontSizeLevel: FontSizeLevel
  readonly widgetPosition: WidgetPosition
  readonly languagePreference: Language
}

export interface AccessibilityWidget {
  readonly isOpen: boolean
  readonly position: WidgetPosition
  toggleWidget(): void
  closeWidget(): void
  setPosition(position: WidgetPosition): void
  resetAll(): void
}

export interface FontSizeControl {
  readonly level: FontSizeLevel
  increase(): void
  decrease(): void
  reset(): void
  apply(): void
}

export interface ContrastControl {
  readonly mode: ContrastMode
  setContrast(mode: ContrastMode): void
  apply(): void
}

export interface FocusModeControl {
  readonly enabled: boolean
  toggle(): void
  apply(): void
}

export interface ReduceMotionControl {
  readonly enabled: boolean
  toggle(): void
  apply(): void
}

export interface FontFamilyControl {
  readonly family: FontFamily
  setFontFamily(family: FontFamily): void
  apply(): void
}

export interface CaptionsControl {
  readonly enabled: boolean
  readonly hasVideos: boolean
  toggle(): void
  apply(): void
}

export interface LanguageControl {
  readonly current: Language
  readonly supported: readonly Language[]
  setLanguage(language: Language): void
  getBrowserLanguage(): Language
  validateLanguage(lang?: string): Language
}

export interface AccessibilityAnnouncer {
  announce(message: string, priority?: 'polite' | 'assertive'): void
}

export interface AccessibilityKeyboardHandler {
  readonly shortcuts: Record<string, () => void>
  handleKeyboardEvent(event: KeyboardEvent): boolean
  registerShortcut(key: string, handler: () => void): void
  unregisterShortcut(key: string): void
}

// Event interfaces
export interface AccessibilityChangeEvent extends CustomEvent {
  detail: {
    setting: keyof AccessibilityPreferences
    value: boolean | FontFamily | FontSizeLevel | WidgetPosition | Language
    previousValue?: boolean | FontFamily | FontSizeLevel | WidgetPosition | Language
  }
}

export interface WidgetStateChangeEvent extends CustomEvent {
  detail: {
    widget: string
    state: 'opened' | 'closed'
    position?: WidgetPosition
  }
}

export interface AccessibilityErrorEvent extends CustomEvent {
  detail: {
    error: Error
    context: string
    component?: string
  }
}

// CSS class names for accessibility features
export const AccessibilityClasses = {
  HIGH_CONTRAST: 'high-contrast-mode',
  FOCUS_MODE: 'focus-mode',
  ENHANCED_FOCUS: 'enhanced-focus',
  REDUCE_MOTION: 'reduce-motion',
  CAPTIONS_ENABLED: 'captions-enabled',
  DYSLEXIC_FONT: 'dyslexic-font',
  FONT_SIZE_DECREASE_2: 'font-size-decrease-2',
  FONT_SIZE_DECREASE_1: 'font-size-decrease-1',
  FONT_SIZE_INCREASE_1: 'font-size-increase-1',
  FONT_SIZE_INCREASE_2: 'font-size-increase-2',
  FONT_SIZE_INCREASE_3: 'font-size-increase-3',
  ACCESSIBILITY_PANEL_OPEN: 'accessibility-panel-open',
} as const

// Storage keys for accessibility preferences
export const AccessibilityStorageKeys = {
  PRIMARY_STATE: 'accessibility-state',
  LEGACY_PREFERENCES: 'accessibility-preferences',
  KEYBOARD_SHORTCUTS_LANGUAGE: 'keyboard-shortcuts-language',
} as const

// Type guards for accessibility settings
export function isValidLanguage(value: unknown): value is Language {
  return typeof value === 'string' && ['nl', 'en'].includes(value)
}

export function isValidFontFamily(value: unknown): value is FontFamily {
  return typeof value === 'string' && ['default', 'dyslexic'].includes(value)
}

export function isValidFontSizeLevel(value: unknown): value is FontSizeLevel {
  return typeof value === 'number' && Number.isInteger(value) && value >= -2 && value <= 3
}

export function isValidWidgetPosition(value: unknown): value is WidgetPosition {
  return typeof value === 'string' && ['bottom-left', 'bottom-right'].includes(value)
}

export function isValidContrastMode(value: unknown): value is ContrastMode {
  return typeof value === 'string' && ['default', 'high'].includes(value)
}

// Global accessibility state interface
declare global {
  interface Window {
    accessibilityState?: AccessibilityState
    $announce?: AccessibilityAnnouncer['announce']
    $toggleCaptions?: () => void
  }
}

export {}
