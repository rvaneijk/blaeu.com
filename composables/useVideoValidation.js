/**
 * @composable useVideoValidation
 * @description Provides video source validation and player health checks
 * Ensures video sources are secure and players are working correctly
 */
import { errorHandler } from '~/composables/errorHandler'
import { URLValidator } from '@/utils/validation'

export const useVideoValidation = () => {
  /**
   * Validate video source URL for security and format compliance
   * @param {string} src - Video source URL to validate
   * @returns {Object} Validation result with isValid flag and error message
   */
  const validateVideoSource = (src) => {
    if (!src || typeof src !== 'string') {
      return {
        isValid: false,
        error: 'Source is empty or not a string'
      }
    }

    // Use the existing URLValidator if available
    if (URLValidator && typeof URLValidator.validateVideoSource === 'function') {
      const validation = URLValidator.validateVideoSource(src)
      if (!validation.isValid) {
        errorHandler.warning(`Invalid video source: ${src} - ${validation.error}`, null, { component: 'useVideoValidation' })
        return validation
      }
      return validation
    }

    // Fallback validation implementation
    try {
      const url = new URL(src, window.location.origin)
      const allowedDomains = ['blaeu.com', 'localhost']
      const allowedExtensions = ['.mpd', '.mp4']

      // Check domain (for external sources)
      if (url.hostname !== window.location.hostname && 
          !allowedDomains.includes(url.hostname)) {
        return {
          isValid: false,
          error: 'Domain not allowed'
        }
      }

      // Check file extension
      const hasValidExtension = allowedExtensions.some(ext => url.pathname.endsWith(ext))
      if (!hasValidExtension) {
        return {
          isValid: false,
          error: 'File extension not allowed'
        }
      }

      return {
        isValid: true,
        error: null
      }
    } catch (e) {
      return {
        isValid: false,
        error: 'Invalid URL format'
      }
    }
  }

  /**
   * Validate multiple video sources
   * @param {Object} sources - Object containing video sources
   * @returns {Object} Validation results for all sources
   */
  const validateVideoSources = (sources) => {
    const results = {}
    
    for (const [key, src] of Object.entries(sources)) {
      results[key] = validateVideoSource(src)
    }
    
    const allValid = Object.values(results).every(result => result.isValid)
    
    return {
      results,
      allValid,
      errors: Object.entries(results)
        .filter(([key, result]) => !result.isValid)
        .map(([key, result]) => `${key}: ${result.error}`)
    }
  }

  /**
   * Validate that a DASH player is properly set up and working
   * @param {Object} player - DASH player instance
   * @param {HTMLVideoElement} videoElement - Video element
   * @param {string} expectedSource - Expected source URL
   * @returns {Object} Validation result
   */
  const validatePlayerSetup = (player, videoElement, expectedSource) => {
    if (!videoElement || !player) {
      return {
        isValid: false,
        error: 'Video element or player is missing'
      }
    }

    try {
      // Check if player has basic required methods
      if (typeof player.getSource !== 'function' || 
          typeof player.isPaused !== 'function') {
        return {
          isValid: false,
          error: 'Player missing required methods'
        }
      }

      // Check if player has a valid source
      const source = player.getSource()
      if (!source || source !== expectedSource) {
        return {
          isValid: false,
          error: 'Player source mismatch'
        }
      }

      // Check if video element has a source or src
      if (!videoElement.src && !videoElement.currentSrc && 
          (!videoElement.children || videoElement.children.length === 0)) {
        return {
          isValid: false,
          error: 'Video element has no source'
        }
      }

      return {
        isValid: true,
        error: null
      }
    } catch (err) {
      errorHandler.warning('Player validation error', err, { component: 'useVideoValidation' })
      return {
        isValid: false,
        error: `Validation exception: ${err.message}`
      }
    }
  }

  /**
   * Check if video element is in a healthy state
   * @param {HTMLVideoElement} videoElement - Video element to check
   * @returns {Object} Health check result
   */
  const checkVideoElementHealth = (videoElement) => {
    if (!videoElement) {
      return {
        isHealthy: false,
        issues: ['Video element is missing'],
        networkState: null,
        readyState: null
      }
    }

    const issues = []
    const networkState = videoElement.networkState
    const readyState = videoElement.readyState

    // Check network state
    switch (networkState) {
      case 0: // NETWORK_EMPTY
        issues.push('No source loaded')
        break
      case 2: // NETWORK_LOADING
        // This is normal during loading
        break
      case 3: // NETWORK_NO_SOURCE
        issues.push('No source found or network error')
        break
    }

    // Check ready state
    if (readyState === 0) { // HAVE_NOTHING
      issues.push('No data available')
    }

    // Check for error state
    if (videoElement.error) {
      issues.push(`Video error: ${videoElement.error.message}`)
    }

    // Check if video ended unexpectedly (should loop)
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
      currentTime: videoElement.currentTime
    }
  }

  /**
   * Check if DASH player is in a healthy state
   * @param {Object} player - DASH player instance
   * @returns {Object} Health check result
   */
  const checkPlayerHealth = (player) => {
    if (!player) {
      return {
        isHealthy: false,
        issues: ['Player is missing'],
        hasSource: false,
        isPaused: null
      }
    }

    const issues = []
    let hasSource = false
    let isPaused = null

    try {
      // Check if player has a source
      if (typeof player.getSource === 'function') {
        const source = player.getSource()
        hasSource = !!source
        if (!hasSource) {
          issues.push('Player has no source')
        }
      }

      // Check if player is paused
      if (typeof player.isPaused === 'function') {
        isPaused = player.isPaused()
      }

      // Check if player has required methods
      const requiredMethods = ['getSource', 'isPaused', 'play', 'pause', 'reset']
      for (const method of requiredMethods) {
        if (typeof player[method] !== 'function') {
          issues.push(`Player missing method: ${method}`)
        }
      }

    } catch (err) {
      issues.push(`Player health check error: ${err.message}`)
    }

    return {
      isHealthy: issues.length === 0,
      issues,
      hasSource,
      isPaused
    }
  }

  /**
   * Comprehensive validation of video setup
   * @param {Object} config - Configuration object
   * @returns {Object} Complete validation result
   */
  const validateVideoSetup = (config) => {
    const {
      dashSource,
      fallbackSource,
      player,
      videoElement,
      decorative = true
    } = config

    const results = {
      sources: null,
      player: null,
      videoElement: null,
      overall: {
        isValid: false,
        errors: [],
        warnings: []
      }
    }

    // Validate sources
    results.sources = validateVideoSources({
      dashSource,
      fallbackSource
    })

    if (!results.sources.allValid) {
      results.overall.errors.push(...results.sources.errors)
    }

    // Validate player setup if player exists
    if (player) {
      results.player = {
        setup: validatePlayerSetup(player, videoElement, dashSource),
        health: checkPlayerHealth(player)
      }

      if (!results.player.setup.isValid) {
        results.overall.errors.push(`Player setup: ${results.player.setup.error}`)
      }

      if (!results.player.health.isHealthy) {
        results.overall.warnings.push(...results.player.health.issues)
      }
    }

    // Validate video element
    if (videoElement) {
      results.videoElement = checkVideoElementHealth(videoElement)

      if (!results.videoElement.isHealthy) {
        // Only treat as errors if not decorative
        if (!decorative) {
          results.overall.errors.push(...results.videoElement.issues)
        } else {
          results.overall.warnings.push(...results.videoElement.issues)
        }
      }
    }

    // Determine overall validity
    results.overall.isValid = results.overall.errors.length === 0

    return results
  }

  return {
    validateVideoSource,
    validateVideoSources,
    validatePlayerSetup,
    checkVideoElementHealth,
    checkPlayerHealth,
    validateVideoSetup
  }
}