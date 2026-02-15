/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @composable useErrorPage
 * @description Provides utilities for error page functionality including
 * retry logic, offline detection, and error reporting
 */
import { ref, readonly, type Ref } from 'vue'
import { errorHandler } from '~/composables/errorHandler'
import { navigateTo, useRoute, useNuxtApp } from '#app'

export interface ErrorPageState {
  isRetrying: boolean
  retryCount: number
  maxRetries: number
  lastRetryTime: Date | null
}

export interface ErrorContext {
  statusCode: number
  statusMessage?: string
  message?: string
  stack?: string
  url?: string
  userAgent?: string
  timestamp: string
}

export interface UseErrorPageReturn {
  state: Readonly<Ref<ErrorPageState>>
  isOnline: Readonly<Ref<boolean>>
  getErrorTitle: (statusCode: number) => string
  getErrorMessage: (statusCode: number, defaultMessage?: string) => string
  isRetryable: (statusCode: number) => boolean
  retry: (context?: Partial<ErrorContext>) => Promise<boolean>
  resetRetryState: () => void
  reportError: (context: ErrorContext) => string
  getRetryButtonState: (statusCode: number) => {
    disabled: boolean
    text: string
    canRetry: boolean
  }
}

/**
 * Get appropriate error title based on status code
 */
const getErrorTitle = (statusCode: number): string => {
  const titles: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Page Not Found',
    408: 'Request Timeout',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
  }

  return titles[statusCode] || 'Error'
}

/**
 * Get user-friendly error message
 */
const getErrorMessage = (statusCode: number, defaultMessage?: string): string => {
  const messages: Record<number, string> = {
    400: 'The request was invalid. Please check your input and try again.',
    401: 'You need to sign in to access this page.',
    403: "You don't have permission to access this page.",
    404: "The page you're looking for seems to have sailed away. Let's get you back on course!",
    408: 'The request took too long. Please try again.',
    429: 'Too many requests. Please wait a moment before trying again.',
    500: "Our servers encountered an unexpected error. We're working to fix this issue.",
    502: "We're having trouble connecting to our services. Please try again in a moment.",
    503: 'Our services are temporarily unavailable due to maintenance or high traffic.',
    504: 'The request took too long to process. Please try again.',
  }

  return messages[statusCode] || defaultMessage || 'An unexpected error occurred. Please try again.'
}

/**
 * Check if error is retryable
 */
const isRetryable = (statusCode: number): boolean => {
  const retryableCodes = [408, 429, 500, 502, 503, 504]
  return retryableCodes.includes(statusCode)
}

/**
 * Initialize online status monitoring
 */
const initializeOnlineMonitoring = (isOnline: Ref<boolean>): void => {
  if (!process.client) return

  isOnline.value = navigator.onLine

  window.addEventListener('online', () => {
    isOnline.value = true
  })

  window.addEventListener('offline', () => {
    isOnline.value = false
  })
}

/**
 * Perform page reload with navigation fallback
 */
const performPageReload = async (): Promise<void> => {
  if (process.client) {
    window.location.reload()
  } else {
    await navigateTo(useRoute().path)
  }
}

/**
 * Execute retry with network awareness
 */
const executeRetryWithNetwork = async (): Promise<boolean> => {
  const nuxtApp = useNuxtApp()
  const networkRetry = nuxtApp.$networkRetry

  if (networkRetry) {
    const result = await networkRetry.withRetry(async () => {
      await performPageReload()
      return true
    }, 'Error Page Retry')

    return result !== null
  } else {
    await new Promise(resolve => setTimeout(resolve, 1000))
    await performPageReload()
    return true
  }
}

/**
 * Validate retry conditions
 */
const validateRetryConditions = (
  state: Ref<ErrorPageState>,
  isOnline: Ref<boolean>,
  context: Partial<ErrorContext>
): { canRetry: boolean; reason?: string } => {
  if (state.value.isRetrying) {
    return { canRetry: false, reason: 'Already retrying' }
  }

  if (state.value.retryCount >= state.value.maxRetries) {
    errorHandler.warning(
      'Maximum retry attempts reached',
      {
        retryCount: state.value.retryCount,
        maxRetries: state.value.maxRetries,
        ...context,
      },
      {
        component: 'useErrorPage',
      }
    )
    return { canRetry: false, reason: 'Max retries reached' }
  }

  if (!isOnline.value) {
    errorHandler.warning('Cannot retry while offline', context, {
      component: 'useErrorPage',
    })
    return { canRetry: false, reason: 'Offline' }
  }

  return { canRetry: true }
}

/**
 * Get retry button text based on current state
 */
const getRetryButtonText = (
  isRetrying: boolean,
  retryCount: number,
  maxRetries: number,
  isOnline: boolean,
  statusCode: number
): string => {
  if (isRetrying) {
    return 'Retrying...'
  } else if (retryCount >= maxRetries) {
    return 'Max Retries Reached'
  } else if (!isOnline) {
    return 'Offline'
  } else if (!isRetryable(statusCode)) {
    return 'Reload Page'
  }
  return 'Try Again'
}

/**
 * Create error report data
 */
const createErrorReportData = (
  context: ErrorContext,
  retryCount: number,
  isOnline: boolean
): Record<string, unknown> => {
  return {
    statusCode: context.statusCode,
    statusMessage: context.statusMessage,
    message: context.message,
    url: context.url || (process.client ? window.location.href : 'SSR'),
    userAgent: context.userAgent || (process.client ? navigator.userAgent : 'SSR'),
    timestamp: context.timestamp,
    retryCount,
    isOnline,
  }
}

/**
 * Create composable return object
 */
const createUseErrorPageReturn = (
  state: Ref<ErrorPageState>,
  isOnline: Ref<boolean>,
  retry: (context?: Partial<ErrorContext>) => Promise<boolean>,
  resetRetryState: () => void,
  reportError: (context: ErrorContext) => string,
  getRetryButtonState: (statusCode: number) => {
    disabled: boolean
    text: string
    canRetry: boolean
  }
): UseErrorPageReturn => {
  return {
    state: readonly(state),
    isOnline: readonly(isOnline),
    getErrorTitle,
    getErrorMessage,
    isRetryable,
    retry,
    resetRetryState,
    reportError,
    getRetryButtonState,
  }
}

const createRetryFunction = (
  state: Ref<ErrorPageState>,
  isOnline: Ref<boolean>
): ((context?: Partial<ErrorContext>) => Promise<boolean>) => {
  return async (context: Partial<ErrorContext> = {}): Promise<boolean> => {
    const validation = validateRetryConditions(state, isOnline, context)
    if (!validation.canRetry) {
      return false
    }

    state.value.isRetrying = true
    state.value.retryCount++
    state.value.lastRetryTime = new Date()

    try {
      errorHandler.info(
        `Retry attempt ${state.value.retryCount}/${state.value.maxRetries}`,
        {
          retryCount: state.value.retryCount,
          isOnline: isOnline.value,
          ...context,
        },
        {
          component: 'useErrorPage',
        }
      )

      return await executeRetryWithNetwork()
    } catch (error) {
      errorHandler.error(
        'Retry failed',
        {
          error,
          retryCount: state.value.retryCount,
          ...context,
        },
        {
          component: 'useErrorPage',
        }
      )

      return false
    } finally {
      state.value.isRetrying = false
    }
  }
}

const createResetFunction = (state: Ref<ErrorPageState>): (() => void) => {
  return (): void => {
    state.value.retryCount = 0
    state.value.isRetrying = false
    state.value.lastRetryTime = null
  }
}

const createReportFunction = (
  state: Ref<ErrorPageState>,
  isOnline: Ref<boolean>
): ((context: ErrorContext) => string) => {
  return (context: ErrorContext): string => {
    const reportData = createErrorReportData(context, state.value.retryCount, isOnline.value)
    return errorHandler.error('Error page displayed', reportData, {
      component: 'ErrorPage',
      showToUser: false,
    })
  }
}

const createRetryButtonStateFunction = (
  state: Ref<ErrorPageState>,
  isOnline: Ref<boolean>
): ((statusCode: number) => { disabled: boolean; text: string; canRetry: boolean }) => {
  return (statusCode: number): { disabled: boolean; text: string; canRetry: boolean } => {
    const canRetry =
      isRetryable(statusCode) && state.value.retryCount < state.value.maxRetries && isOnline.value

    const text = getRetryButtonText(
      state.value.isRetrying,
      state.value.retryCount,
      state.value.maxRetries,
      isOnline.value,
      statusCode
    )

    return {
      disabled:
        state.value.isRetrying ||
        (state.value.retryCount >= state.value.maxRetries && isRetryable(statusCode)) ||
        (!isOnline.value && isRetryable(statusCode)),
      text,
      canRetry,
    }
  }
}

export const useErrorPage = (): UseErrorPageReturn => {
  const state = ref<ErrorPageState>({
    isRetrying: false,
    retryCount: 0,
    maxRetries: 3,
    lastRetryTime: null,
  })

  const isOnline = ref(true)
  initializeOnlineMonitoring(isOnline)

  const retry = createRetryFunction(state, isOnline)
  const resetRetryState = createResetFunction(state)
  const reportError = createReportFunction(state, isOnline)
  const getRetryButtonState = createRetryButtonStateFunction(state, isOnline)

  return createUseErrorPageReturn(
    state,
    isOnline,
    retry,
    resetRetryState,
    reportError,
    getRetryButtonState
  )
}
