/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @plugin deferCSS.client.ts
 * @description Client-side plugin for deferring non-critical CSS loading
 * Implements performance optimization by loading FontAwesome CSS files
 * asynchronously after the initial page render to avoid render blocking
 */
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Load non-critical CSS files asynchronously after page load
  if (process.client) {
    const loadCSS = (href: string, media: string = 'all'): void => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.media = 'print' // Load as print to avoid render blocking
      link.onload = (): void => {
        link.media = media
      } // Switch to actual media when loaded
      document.head.appendChild(link)
    }

    // Defer loading until after initial render
    setTimeout(() => {
      // Load FontAwesome CSS files from public assets
      loadCSS('/assets/css/fontawesome-v7.1.0.css')
      loadCSS('/assets/css/fontawesome-additions.css')
    }, 100)
  }
})
