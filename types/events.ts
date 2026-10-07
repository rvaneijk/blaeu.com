/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

// Event type definitions for accessibility and video components

// DOM Element type guard
export function isHTMLElement(element: Element | null): element is HTMLElement {
  return element !== null && element instanceof HTMLElement
}

// Event handler types
export type KeyboardEventHandler = (event: KeyboardEvent) => void
export type MouseEventHandler = (event: MouseEvent) => void

// Global event map for custom events
declare global {
  interface DocumentEventMap {
    'update-accessibility-setting': CustomEvent
    'update-widget-position': CustomEvent
    'open-accessibility-policy': CustomEvent
    'close-accessibility-policy': CustomEvent
    'close-all-widgets': CustomEvent
    'language-change': CustomEvent
    'video-player-event': CustomEvent
    'toggle-dyslexic-mode': CustomEvent
    'show-privacy-policy': CustomEvent
    'open-cookie-widget': CustomEvent
    'open-keyboard-shortcuts': CustomEvent
    'toggle-keyboard-shortcuts': CustomEvent
    'open-privacy-widget': CustomEvent
    'open-terms-widget': CustomEvent
  }

  interface WindowEventMap {
    'accessibility-settings-changed': CustomEvent
    'widget-position-changed': CustomEvent
  }
}

export {}
