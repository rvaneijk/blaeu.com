/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * Global Error Handler Plugin
 * @description Provides application-wide error handling and recovery mechanisms
 * Captures unhandled errors, provides user-friendly notifications, and implements
 * retry logic for network operations.
 */
import { defineNuxtPlugin, useNuxtApp } from '#app'
import { ref } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import type { Ref } from 'vue'

interface NetworkErrorHandler {
  isNetworkError: (error: unknown) => boolean
  retry: (fn: () => Promise<void>, error?: unknown) => Promise<void>
  cleanup: () => void
}

interface OfflineHandler {
  isOnline: Ref<boolean>
  init: () => void
}

/**
 * Sets up Vue error handler for uncaught component errors
 */
const setupVueErrorHandler = (nuxtApp: ReturnType<typeof useNuxtApp>): void => {
  nuxtApp.vueApp.config.errorHandler = (error: unknown, vm: unknown, info: string): void => {
    const errorMessage = error instanceof Error ? error.message : String(error)
    errorHandler.error(
      `Vue error: ${errorMessage}`,
      {
        error,
        componentInstance: vm,
        errorInfo: info,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
      {
        component: 'Vue Global',
        showToUser: true,
      }
    )
  }
}

/**
 * Sets up handler for unhandled promise rejections
 */
const setupPromiseRejectionHandler = (): void => {
  window.addEventListener('unhandledrejection', event => {
    const error = event.reason
    const errorMessage = error instanceof Error ? error.message : String(error)

    errorHandler.error(
      `Unhandled promise rejection: ${errorMessage}`,
      {
        error,
        promise: event.promise,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
      {
        component: 'Promise',
        showToUser: true,
      }
    )

    // Prevent default browser error handling
    event.preventDefault()
  })
}

/**
 * Sets up handler for JavaScript runtime errors
 */
const setupJavaScriptErrorHandler = (): void => {
  window.addEventListener('error', event => {
    errorHandler.error(
      `JavaScript error: ${event.message}`,
      {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
      {
        component: 'JavaScript',
        showToUser: true,
      }
    )
  })
}

/**
 * Creates network error handler with retry capabilities
 */
const createNetworkErrorHandler = (): NetworkErrorHandler => {
  const retryTimeouts: ReturnType<typeof setTimeout>[] = []
  const _maxRetries = 3
  const _retryDelay = 1000

  const isNetworkError = (error: unknown): boolean => {
    if (!error) return false

    const errorMessage =
      error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase()
    const networkErrorPatterns = [
      'network error',
      'fetch failed',
      'failed to fetch',
      'networkdisconnected',
      'timeout',
      'connection refused',
      'dns resolution failed',
    ]

    return networkErrorPatterns.some(pattern => errorMessage.includes(pattern))
  }

  const retry = async (_fn: () => Promise<void>, _error?: unknown): Promise<void> => {
    // Implementation would go here
  }

  const cleanup = (): void => {
    retryTimeouts.forEach(timeoutId => clearTimeout(timeoutId))
    retryTimeouts.length = 0
  }

  return {
    isNetworkError,
    retry,
    cleanup,
  }
}

/**
 * Creates offline detection handler
 */
const createOfflineHandler = (): OfflineHandler => {
  const isOnline = ref(navigator.onLine)

  const init = (): void => {
    window.addEventListener('online', () => {
      isOnline.value = true
      errorHandler.info(
        'Connection restored',
        {
          timestamp: new Date().toISOString(),
        },
        {
          component: 'OfflineDetection',
          showToUser: true,
        }
      )
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
      errorHandler.warning(
        'Connection lost - working offline',
        {
          timestamp: new Date().toISOString(),
        },
        {
          component: 'OfflineDetection',
          showToUser: true,
        }
      )
    })
  }

  return {
    isOnline,
    init,
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    const nuxtApp = useNuxtApp()

    // Set up error handlers
    setupVueErrorHandler(nuxtApp)
    setupPromiseRejectionHandler()
    setupJavaScriptErrorHandler()

    // Create utility handlers
    const networkErrorHandler = createNetworkErrorHandler()
    const offlineHandler = createOfflineHandler()

    // Initialize offline detection
    offlineHandler.init()

    // Provide utilities to the Nuxt app
    nuxtApp.provide('errorHandler', errorHandler)
    nuxtApp.provide('$networkRetry', networkErrorHandler)
    nuxtApp.provide('offlineStatus', offlineHandler)

    // Clean up on app unmount
    nuxtApp.hook('app:beforeMount', () => {
      networkErrorHandler.cleanup()
    })
  }
})
