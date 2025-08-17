/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * @composable useVideoValidation
 * @description Provides video source validation and player health checks
 * Ensures video sources are secure and players are working correctly
 */
import { errorHandler } from '~/composables/errorHandler'
import { URLValidator, type ValidationResult } from '~/utils/validation'
import type { DashPlayer } from '~/composables/useVideoPlayer'

export interface SourcesValidationResult {
  results: Record<string, ValidationResult>
  allValid: boolean
  errors: string[]
}

export interface VideoElementHealth {
  isHealthy: boolean
  issues: string[]
  networkState: number | null
  readyState: number | null
  hasError: boolean
  duration: number
  currentTime: number
}

export interface PlayerHealth {
  isHealthy: boolean
  issues: string[]
  hasSource: boolean
  isPaused: boolean | null
}

export interface PlayerValidation {
  setup: ValidationResult
  health: PlayerHealth
}

export interface VideoSetupConfig {
  dashSource: string
  fallbackSource: string
  player?: unknown
  videoElement?: HTMLVideoElement
  decorative?: boolean
}

export interface VideoSetupValidationResult {
  sources: SourcesValidationResult | null
  player: PlayerValidation | null
  videoElement: VideoElementHealth | null
  overall: {
    isValid: boolean
    errors: string[]
    warnings: string[]
  }
}

/**
 * Validate video source URL for security and format compliance
 */
function validateVideoSource(src: string): ValidationResult {
  if (!src || typeof src !== 'string') {
    return {
      isValid: false,
      error: 'Source is empty or not a string',
    }
  }

  if (URLValidator && typeof URLValidator.validateVideoSource === 'function') {
    const validation = URLValidator.validateVideoSource(src)
    if (!validation.isValid) {
      errorHandler.warning(`Invalid video source: ${src} - ${validation.error}`, null, {
        component: 'useVideoValidation',
      })
      return validation
    }
    return validation
  }

  try {
    const url = new URL(src, window.location.origin)
    const allowedDomains = ['blaeu.com', 'localhost']
    const allowedExtensions = ['.mpd', '.mp4']

    if (url.hostname !== window.location.hostname && !allowedDomains.includes(url.hostname)) {
      return {
        isValid: false,
        error: 'Domain not allowed',
      }
    }

    const hasValidExtension = allowedExtensions.some(ext => url.pathname.endsWith(ext))
    if (!hasValidExtension) {
      return {
        isValid: false,
        error: 'File extension not allowed',
      }
    }

    return {
      isValid: true,
    }
  } catch (_e) {
    return {
      isValid: false,
      error: 'Invalid URL format',
    }
  }
}

/**
 * Validate multiple video sources
 */
function validateVideoSources(sources: Record<string, string>): SourcesValidationResult {
  const results: Record<string, ValidationResult> = {}

  for (const [key, src] of Object.entries(sources)) {
    results[key] = validateVideoSource(src)
  }

  const allValid = Object.values(results).every(result => result.isValid)

  return {
    results,
    allValid,
    errors: Object.entries(results)
      .filter(([_key, result]) => !result.isValid)
      .map(([key, result]) => `${key}: ${result.error}`),
  }
}

/**
 * Validate that a DASH player is properly set up and working
 */
function validatePlayerSetup(
  player: unknown,
  videoElement: HTMLVideoElement,
  expectedSource: string
): ValidationResult {
  if (!videoElement || !player) {
    return {
      isValid: false,
      error: 'Video element or player is missing',
    }
  }

  try {
    if (
      !player ||
      typeof player !== 'object' ||
      typeof (player as Record<string, unknown>).getSource !== 'function' ||
      typeof (player as Record<string, unknown>).isPaused !== 'function'
    ) {
      return {
        isValid: false,
        error: 'Player missing required methods',
      }
    }

    const dashPlayer = player as DashPlayer
    const source = dashPlayer.getSource()
    if (!source || source !== expectedSource) {
      return {
        isValid: false,
        error: 'Player source mismatch',
      }
    }

    if (
      !videoElement.src &&
      !videoElement.currentSrc &&
      (!videoElement.children || videoElement.children.length === 0)
    ) {
      return {
        isValid: false,
        error: 'Video element has no source',
      }
    }

    return {
      isValid: true,
    }
  } catch (err: unknown) {
    errorHandler.warning('Player validation error', err, { component: 'useVideoValidation' })
    return {
      isValid: false,
      error: `Validation exception: ${(err as Error).message}`,
    }
  }
}

/**
 * Check if video element is in a healthy state
 */
function checkVideoElementHealth(videoElement: HTMLVideoElement | null): VideoElementHealth {
  if (!videoElement) {
    return {
      isHealthy: false,
      issues: ['Video element is missing'],
      networkState: null,
      readyState: null,
      hasError: false,
      duration: 0,
      currentTime: 0,
    }
  }

  const issues: string[] = []
  const networkState = videoElement.networkState
  const readyState = videoElement.readyState

  switch (networkState) {
    case 0: // NETWORK_EMPTY
      issues.push('No source loaded')
      break
    case 2: // NETWORK_LOADING
      break
    case 3: // NETWORK_NO_SOURCE
      issues.push('No source found or network error')
      break
  }

  if (readyState === 0) {
    issues.push('No data available')
  }

  if (videoElement.error) {
    issues.push(`Video error: ${videoElement.error.message}`)
  }

  if (videoElement.ended && videoElement.loop) {
    issues.push('Video ended despite loop=true')
  }

  return {
    isHealthy: issues.length === 0,
    issues,
    networkState,
    readyState,
    hasError: !!videoElement.error,
    duration: videoElement.duration,
    currentTime: videoElement.currentTime,
  }
}

/**
 * Check if DASH player is in a healthy state
 */
function checkPlayerHealth(player: unknown): PlayerHealth {
  if (!player) {
    return {
      isHealthy: false,
      issues: ['Player is missing'],
      hasSource: false,
      isPaused: null,
    }
  }

  const issues: string[] = []
  let hasSource = false
  let isPaused: boolean | null = null

  try {
    if (player && typeof player === 'object') {
      const dashPlayer = player as DashPlayer
      if (typeof dashPlayer.getSource === 'function') {
        const source = dashPlayer.getSource()
        hasSource = !!source
        if (!hasSource) {
          issues.push('Player has no source')
        }
      }

      if (typeof dashPlayer.isPaused === 'function') {
        isPaused = dashPlayer.isPaused()
      }
    }

    const requiredMethods = ['getSource', 'isPaused', 'play', 'pause', 'reset']
    for (const method of requiredMethods) {
      if (
        !player ||
        typeof player !== 'object' ||
        typeof (player as Record<string, unknown>)[method] !== 'function'
      ) {
        issues.push(`Player missing method: ${method}`)
      }
    }
  } catch (err) {
    issues.push(`Player health check error: ${(err as Error).message}`)
  }

  return {
    isHealthy: issues.length === 0,
    issues,
    hasSource,
    isPaused,
  }
}

/**
 * Comprehensive validation of video setup
 */
function validateVideoSetup(config: VideoSetupConfig): VideoSetupValidationResult {
  const { dashSource, fallbackSource, player, videoElement, decorative = true } = config

  const results: VideoSetupValidationResult = {
    sources: null,
    player: null,
    videoElement: null,
    overall: {
      isValid: false,
      errors: [],
      warnings: [],
    },
  }

  results.sources = validateVideoSources({
    dashSource,
    fallbackSource,
  })

  if (!results.sources.allValid) {
    results.overall.errors.push(...results.sources.errors)
  }

  if (player) {
    results.player = {
      setup: validatePlayerSetup(player, videoElement!, dashSource),
      health: checkPlayerHealth(player),
    }

    if (!results.player.setup.isValid) {
      results.overall.errors.push(`Player setup: ${results.player.setup.error}`)
    }

    if (!results.player.health.isHealthy) {
      results.overall.warnings.push(...results.player.health.issues)
    }
  }

  if (videoElement) {
    results.videoElement = checkVideoElementHealth(videoElement)

    if (!results.videoElement.isHealthy) {
      if (!decorative) {
        results.overall.errors.push(...results.videoElement.issues)
      } else {
        results.overall.warnings.push(...results.videoElement.issues)
      }
    }
  }

  results.overall.isValid = results.overall.errors.length === 0

  return results
}

export const useVideoValidation = (): {
  validateVideoSource: (src: string) => ValidationResult
  validateVideoSources: (sources: Record<string, string>) => SourcesValidationResult
  validatePlayerSetup: (
    player: unknown,
    videoElement: HTMLVideoElement,
    expectedSource: string
  ) => ValidationResult
  checkVideoElementHealth: (videoElement: HTMLVideoElement | null) => VideoElementHealth
  checkPlayerHealth: (player: unknown) => PlayerHealth
  validateVideoSetup: (config: VideoSetupConfig) => VideoSetupValidationResult
} => {
  return {
    validateVideoSource,
    validateVideoSources,
    validatePlayerSetup,
    checkVideoElementHealth,
    checkPlayerHealth,
    validateVideoSetup,
  }
}
