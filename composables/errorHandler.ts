/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @module composables/errorHandler
 * @description Centralized error handling utility for the application.
 * Provides consistent error logging, formatting, and user notifications
 * with different severity levels (error, warning, info, debug).
 */
import { reactive } from 'vue'
import { useNuxtApp } from '#app'

export interface ErrorLogEntry {
  id: string
  level: 'error' | 'warning' | 'info' | 'debug'
  message: string
  details: Record<string, unknown>
  component: string
  timestamp: Date
}

export interface ErrorHandlerOptions {
  logToConsole: boolean
  showToUser: boolean
  trackErrors: boolean
  maxLogEntries: number
}

export interface HandleErrorOptions {
  component?: string
  showToUser?: boolean
  logToConsole?: boolean
}

export interface TryExecOptions extends HandleErrorOptions {
  message?: string
}

/**
 * Default options for the error handler
 */
const defaultOptions: ErrorHandlerOptions = {
  logToConsole: process.env.NODE_ENV !== 'production',
  showToUser: true,
  trackErrors: true,
  maxLogEntries: 100,
}

/**
 * Reactive state containing the error log and settings
 */
const state = reactive({
  errorLog: [] as ErrorLogEntry[],
  options: { ...defaultOptions },
})

/**
 * Generate a unique error ID
 */
const generateErrorId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

/**
 * Format error message with consistent structure
 */
const formatErrorMessage = (message: string, details: unknown, component: string): string => {
  let formattedMessage = message

  if (component) {
    formattedMessage = `[${component}] ${formattedMessage}`
  }

  // Add error code if available
  if (details && typeof details === 'object' && 'code' in details) {
    formattedMessage = `${formattedMessage} (Code: ${(details as { code: string }).code})`
  }

  return formattedMessage
}

/**
 * Get the announce function from the Nuxt app if available
 */
const getAnnounce = (): ((message: string, priority: string) => void) | null => {
  try {
    if (process.client) {
      const nuxtApp = useNuxtApp()
      return (nuxtApp.$announce as (message: string, priority: string) => void) || null
    }
  } catch {
    // useNuxtApp not available in test environment
  }
  return null
}

/**
 * Add entry to error log
 */
const addToErrorLog = (entry: ErrorLogEntry): void => {
  if (!state.options.trackErrors) return

  state.errorLog.unshift(entry)

  // Trim log if it exceeds the maximum size
  if (state.errorLog.length > state.options.maxLogEntries) {
    state.errorLog.length = state.options.maxLogEntries
  }
}

/**
 * Log message to console based on level
 */
const logToConsole = (level: string, formattedMessage: string, errorDetails: unknown): void => {
  if (!process.client) return

  switch (level) {
    case 'error':
      // eslint-disable-next-line no-console
      console.error(formattedMessage, errorDetails)
      break
    case 'warning':
      // eslint-disable-next-line no-console
      console.warn(formattedMessage, errorDetails)
      break
    case 'info':
      // eslint-disable-next-line no-console
      console.info(formattedMessage, errorDetails)
      break
    case 'debug':
      // eslint-disable-next-line no-console
      console.debug(formattedMessage, errorDetails)
      break
    default:
      // eslint-disable-next-line no-console
      console.log(formattedMessage, errorDetails)
  }
}

/**
 * Announce error to screen reader if enabled
 */
const announceToUser = (level: string, errorMessage: string): void => {
  if (!process.client) return

  const announce = getAnnounce()
  if (!announce) return

  if (level === 'error') {
    announce(`Error: ${errorMessage}`, 'assertive')
  } else if (level === 'warning') {
    announce(`Warning: ${errorMessage}`, 'polite')
  }
}

/**
 * Process error details if it's an Error object
 */
const processErrorDetails = (details: unknown): Record<string, unknown> => {
  if (details instanceof Error) {
    return {
      name: details.name,
      message: details.message,
      stack: details.stack,
      ...(details.cause ? { cause: details.cause } : {}),
    }
  }
  if (details && typeof details === 'object') {
    return details as Record<string, unknown>
  }
  return { value: details }
}

/**
 * Core error handling function
 */
const handleError = (
  level: 'error' | 'warning' | 'info' | 'debug',
  message: string,
  details: unknown = null,
  options: HandleErrorOptions = {}
): string => {
  const errorOptions = {
    component: options.component || 'unknown',
    showToUser: options.showToUser !== undefined ? options.showToUser : state.options.showToUser,
    logToConsole:
      options.logToConsole !== undefined ? options.logToConsole : state.options.logToConsole,
  }

  const errorMessage = message
  const errorDetails = processErrorDetails(details)
  const formattedMessage = formatErrorMessage(errorMessage, errorDetails, errorOptions.component)

  const errorId = generateErrorId()
  const errorEntry: ErrorLogEntry = {
    id: errorId,
    level,
    message: errorMessage,
    details: errorDetails,
    component: errorOptions.component,
    timestamp: new Date(),
  }

  if (errorOptions.logToConsole) {
    logToConsole(level, formattedMessage, errorDetails)
  }

  if (errorOptions.showToUser) {
    announceToUser(level, errorMessage)
  }

  addToErrorLog(errorEntry)
  return errorId
}

/**
 * Update the global error handler options
 */
const updateOptions = (options: Partial<ErrorHandlerOptions> = {}): void => {
  state.options = {
    ...state.options,
    ...options,
  }
}

/**
 * Clear the error log
 */
const clearErrorLog = (): void => {
  state.errorLog.length = 0
}

/**
 * Get the current error log
 */
const getErrorLog = (): ErrorLogEntry[] => {
  return [...state.errorLog]
}

/**
 * Log an error message
 */
const error = (
  message: string,
  details: unknown = null,
  options: HandleErrorOptions = {}
): string => {
  return handleError('error', message, details, options)
}

/**
 * Log a warning message
 */
const warning = (
  message: string,
  details: unknown = null,
  options: HandleErrorOptions = {}
): string => {
  return handleError('warning', message, details, options)
}

/**
 * Log an info message
 */
const info = (
  message: string,
  details: unknown = null,
  options: HandleErrorOptions = {}
): string => {
  return handleError('info', message, details, options)
}

/**
 * Log a debug message
 */
const debug = (
  message: string,
  details: unknown = null,
  options: HandleErrorOptions = {}
): string => {
  return handleError('debug', message, details, options)
}

/**
 * Create a component-specific error handler
 */
const createComponentHandler = (
  componentName: string
): {
  error: (message: string, details?: unknown, options?: HandleErrorOptions) => string
  warning: (message: string, details?: unknown, options?: HandleErrorOptions) => string
  info: (message: string, details?: unknown, options?: HandleErrorOptions) => string
  debug: (message: string, details?: unknown, options?: HandleErrorOptions) => string
} => {
  return {
    error: (message: string, details: unknown = null, options: HandleErrorOptions = {}): string => {
      return error(message, details, { ...options, component: componentName })
    },
    warning: (
      message: string,
      details: unknown = null,
      options: HandleErrorOptions = {}
    ): string => {
      return warning(message, details, { ...options, component: componentName })
    },
    info: (message: string, details: unknown = null, options: HandleErrorOptions = {}): string => {
      return info(message, details, { ...options, component: componentName })
    },
    debug: (message: string, details: unknown = null, options: HandleErrorOptions = {}): string => {
      return debug(message, details, { ...options, component: componentName })
    },
  }
}

/**
 * Try to execute a function and handle any errors
 */
const tryExec = async <T>(
  fn: () => Promise<T> | T,
  options: TryExecOptions = {}
): Promise<T | null> => {
  try {
    return await fn()
  } catch (err) {
    error(options.message || 'Error executing function', err, options)
    return null
  }
}

export const errorHandler = {
  error,
  warning,
  info,
  debug,
  getErrorLog,
  clearErrorLog,
  updateOptions,
  createComponentHandler,
  tryExec,
}

export default errorHandler
