/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @plugin fixNavigation.ts
 * @description Fixes Nuxt navigation issues between pages
 * Resolves issues with client-side navigation when dashCache is present
 */
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  // Only run on client side
  if (process.client) {
    // Add a navigation hook to handle all navigations
    nuxtApp.hook('page:finish', () => {
      // Ensure we reset any cached transition states
      if (window.dashCache) {
        window.dashCache.inTransition = false
      }
    })

    // Add another hook for failed navigations
    nuxtApp.hook('app:error', () => {
      // Reset transition state if there's an error
      if (window.dashCache) {
        window.dashCache.inTransition = false
      }
    })

    // Intercept all navigation to ensure proper handling between pages
    document.addEventListener('click', (e: MouseEvent) => {
      // Check if the click was on a link
      let target: Node | null = e.target as Node
      while (target && (target as Element).tagName !== 'A') {
        target = target.parentNode
        if (!target || target === document.body) break
      }

      // If we found a link
      if (target && (target as Element).tagName === 'A') {
        const linkElement = target as HTMLAnchorElement
        const href = linkElement.getAttribute('href')

        // Handle navigation between main pages (/, /team/rvaneijk)
        if (
          (href === '/' && window.location.pathname !== '/') ||
          (href === '/team/rvaneijk' && window.location.pathname !== '/team/rvaneijk')
        ) {
          // Don't interfere with middle clicks or ctrl+click for new tabs
          if (e.ctrlKey || e.metaKey || e.which === 2) {
            return
          }

          // For normal clicks, ensure we do a hard navigation
          e.preventDefault()
          window.location.href = href
        }
      }
    })
  }
})
