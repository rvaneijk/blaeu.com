/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Event type definitions for accessibility and video components

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'larger'
  contrast: 'normal' | 'high' | 'dark'
  fontFamily: 'normal' | 'dyslexic'
  language: 'en' | 'nl'
  textSpacing: 'normal' | 'increased'
  cursorSize: 'normal' | 'large'
  linkHighlighting: boolean
  animations: boolean
  soundEffects: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  autoplayVideos: boolean
  showCaptions: boolean
  voiceControl: boolean
  reduceMotion: boolean
  position: 'bottom-right' | 'bottom-left'
}

export interface AccessibilityUpdateEvent extends CustomEvent {
  detail: {
    setting: keyof AccessibilitySettings
    value: AccessibilitySettings[keyof AccessibilitySettings]
    position?: string
  }
}

export interface WidgetPositionUpdateEvent extends CustomEvent {
  detail: {
    position: 'bottom-right' | 'bottom-left'
  }
}

export interface VideoPlayerEvent extends CustomEvent {
  detail: {
    player?: object
    source?: string
    action?: 'play' | 'pause' | 'error' | 'loaded'
    error?: string
  }
}

export interface LanguageChangeEvent extends CustomEvent {
  detail: {
    language: 'en' | 'nl'
    previousLanguage?: 'en' | 'nl'
  }
}

// DOM Element type guards
export function isHTMLElement(element: Element | null): element is HTMLElement {
  return element !== null && element instanceof HTMLElement
}

export function isHTMLVideoElement(element: Element | null): element is HTMLVideoElement {
  return element !== null && element instanceof HTMLVideoElement
}

export function isHTMLInputElement(element: Element | null): element is HTMLInputElement {
  return element !== null && element instanceof HTMLInputElement
}

export function isHTMLButtonElement(element: Element | null): element is HTMLButtonElement {
  return element !== null && element instanceof HTMLButtonElement
}

// Event handler types
export type EventHandler<T = Event> = (event: T) => void
export type KeyboardEventHandler = EventHandler<KeyboardEvent>
export type MouseEventHandler = EventHandler<MouseEvent>
export type CustomEventHandler<T = unknown> = EventHandler<CustomEvent<T>>

// Global event map for custom events
declare global {
  interface DocumentEventMap {
    'update-accessibility-setting': AccessibilityUpdateEvent
    'update-widget-position': WidgetPositionUpdateEvent
    'open-accessibility-policy': CustomEvent
    'close-accessibility-policy': CustomEvent
    'close-all-widgets': CustomEvent
    'language-change': LanguageChangeEvent
    'video-player-event': VideoPlayerEvent
    'toggle-dyslexic-mode': CustomEvent
    'show-privacy-policy': CustomEvent
    'open-cookie-widget': CustomEvent
    'open-keyboard-shortcuts': CustomEvent
    'toggle-keyboard-shortcuts': CustomEvent
    'open-privacy-widget': CustomEvent
    'open-disclosure-widget': CustomEvent
  }

  interface WindowEventMap {
    'accessibility-settings-changed': AccessibilityUpdateEvent
    'widget-position-changed': WidgetPositionUpdateEvent
  }
}

export {}
