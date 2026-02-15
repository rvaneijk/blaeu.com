/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
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
 * Video player health logging
 * Logs video player health checks and diagnostics
 */
export const logVideoPlayerHealth = (
  status: string,
  diagnostics?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`🏥 Video player health: ${status}`, diagnostics || '')
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

/**
 * Performance timing logging
 * Logs performance metrics for video operations
 */
export const logPerformanceTiming = (
  operation: string,
  startTime: number,
  endTime: number,
  details?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  const duration = endTime - startTime
  // eslint-disable-next-line no-console
  console.log(`⏱️ ${operation} took ${duration}ms`, details || '')
}

/**
 * Network request logging
 * Logs network requests for video resources
 */
export const logNetworkRequest = (
  url: string,
  method: string,
  status?: number,
  details?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`🌐 ${method} ${url} ${status ? `(${status})` : ''}`, details || '')
}

/**
 * Cache operation logging
 * Logs video cache operations
 */
export const logCacheOperation = (
  operation: string,
  key: string,
  details?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`💾 Cache ${operation}: ${key}`, details || '')
}

/**
 * Device detection logging
 * Logs device detection results
 */
export const logDeviceDetection = (
  deviceType: string,
  capabilities: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`📱 Device detected: ${deviceType}`, capabilities)
}

/**
 * Quality adaptation logging
 * Logs video quality changes and adaptations
 */
export const logQualityAdaptation = (
  fromQuality: string | number,
  toQuality: string | number,
  reason: string,
  details?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  // eslint-disable-next-line no-console
  console.log(`📊 Quality change: ${fromQuality} → ${toQuality} (${reason})`, details || '')
}

/**
 * Buffer status logging
 * Logs video buffer health and status
 */
export const logBufferStatus = (
  buffered: number,
  duration: number,
  details?: Record<string, unknown>
): void => {
  if (!isDevMode()) return

  const percentage = duration > 0 ? Math.round((buffered / duration) * 100) : 0
  // eslint-disable-next-line no-console
  console.log(`🔄 Buffer: ${buffered}s/${duration}s (${percentage}%)`, details || '')
}
