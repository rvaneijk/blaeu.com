/**
 * @fileoverview Back-to-Top Button Composable
 *
 * Provides shared functionality for back-to-top buttons across navbar components.
 * Handles scroll tracking, visibility logic, and scroll-to-top functionality.
 *
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 *
 * @since 1.0.0
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Configuration options for the useBackToTop composable
 */
export interface UseBackToTopOptions {
  /** Scroll position threshold to show back-to-top button (default: 300px) */
  scrollThreshold?: number
}

/**
 * Composable for back-to-top button functionality
 *
 * Provides reactive state and methods for implementing back-to-top buttons
 * with consistent behavior across different navbar components.
 *
 * @param options Configuration options
 * @returns Object with reactive state and methods
 *
 * @example
 * ```typescript
 * const { showScrollButton, scrollToTop } = useBackToTop()
 * ```
 */
export function useBackToTop(options: UseBackToTopOptions = {}): {
  showScrollButton: Ref<boolean>
  scrollToTop: () => void
} {
  const scrollThreshold = options.scrollThreshold ?? 300

  // Reactive state
  const showScrollButton = ref(false)

  /**
   * Scroll to top of page with smooth behavior
   */
  const scrollToTop = (): void => {
    if (process.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /**
   * Handle scroll events to show/hide back-to-top button
   */
  const handleScroll = (): void => {
    if (process.client) {
      showScrollButton.value = window.scrollY > scrollThreshold
    }
  }

  // Lifecycle management
  onMounted(() => {
    if (process.client) {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Set initial state
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    /** Whether the back-to-top button should be visible */
    showScrollButton,
    /** Function to scroll to top of page */
    scrollToTop,
  }
}
