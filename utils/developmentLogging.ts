/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @module developmentLogging
 * @description Development-only logging utilities that are conditionally compiled
 * Provides structured logging while maintaining ESLint compliance
 */

/**
 * Check if we're in development mode
 * Uses both process.dev and import.meta.dev for Nuxt compatibility
 */
const isDevMode = (): boolean => {
  // Check process environment first
  if (typeof process !== 'undefined' && process.client && process.dev) {
    return true
  }

  // Check import.meta for Vite/Nuxt
  if (typeof import.meta !== 'undefined' && import.meta.dev) {
    return true
  }

  return false
}

/**
 * DASH.js module structure logging
 * Logs the structure of the DASH.js module for debugging API issues
 */
// Extended DASH.js module interface for logging
interface DashJSModule {
  MediaPlayer?: { (): { create: () => unknown }; create?: () => unknown }
  MediaPlayerFactory?: { create: () => unknown }
}

export const logDashJsModuleStructure = (dashjs: typeof import('dashjs')): void => {
  if (!isDevMode()) return

  const dashModule = dashjs as unknown as DashJSModule
  // eslint-disable-next-line no-console
  console.log('🔍 DASH.js module structure:', {
    availableKeys: Object.keys(dashjs),
    MediaPlayer: typeof dashModule.MediaPlayer,
    MediaPlayerFactory: typeof dashModule.MediaPlayerFactory,
    hasMediaPlayerCreate: typeof dashModule.MediaPlayer?.create,
    hasFactoryCreate: typeof dashModule.MediaPlayerFactory?.create,
    dashjs: dashjs,
  })
}

/**
 * DASH player creation attempt logging
 * Logs the attempt to create a DASH player using different API methods
 */
export const logDashPlayerCreationAttempt = (method: string): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`🎯 Attempting ${method}`)
}

/**
 * DASH player creation result logging
 * Logs the result of DASH player creation attempts
 */
export const logDashPlayerCreationResult = (method: string, result: unknown): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`🎯 ${method} result:`, {
    result: result,
    resultType: typeof result,
    isNull: result === null,
    hasInitialize: result && typeof (result as Record<string, unknown>).initialize === 'function',
  })
}

/**
 * DASH player retry logging
 * Logs retry attempts for DASH player creation
 */
export const logDashPlayerRetry = (method: string, result: unknown): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`Retry ${method} result:`, {
    result: result,
    resultType: typeof result,
    isNull: result === null,
  })
}

/**
 * Generic development logging function
 * Provides structured logging for development debugging
 */
export const logDevelopment = (message: string, data?: Record<string, unknown>): void => {
  if (!isDevMode()) return

  if (data) {
    // eslint-disable-next-line no-console
    console.log(message, data)
  } else {
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

/**
 * Video player initialization logging
 * Logs video player initialization steps
 */
export const logVideoPlayerInit = (step: string, details?: Record<string, unknown>): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`🎬 ${step}`, details || '')
}

/**
 * Video source switching logging
 * Logs video source transitions and switching
 */
export const logVideoSourceSwitch = (
  from: string,
  to: string,
  details?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`🔄 Video source switch: ${from} → ${to}`, details || '')
}

/**
 * Video error logging
 * Logs video-related errors with context
 */
export const logVideoError = (error: string, context?: Record<string, unknown>): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.error(`❌ Video error: ${error}`, context || '')
}

/**
 * Video event logging
 * Logs video player events
 */
export const logVideoEvent = (event: string, details?: Record<string, unknown>): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`📺 Video event: ${event}`, details || '')
}
