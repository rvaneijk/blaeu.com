/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

declare global {
  interface Window {
    dashCache?: import('../types/video-player').VideoPlayerCache
  }
}

declare module '#app' {
  interface NuxtApp {
    $announce?: (message: string, priority?: 'polite' | 'assertive') => void
    $networkRetry?: {
      withRetry: <T>(operation: () => Promise<T>, context: string) => Promise<T>
    }
  }
}

export {}
