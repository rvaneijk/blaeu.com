/**
 * Centralized Video Configuration
 * Manages all video-related settings for the DASH streaming system
 */

// Ensure process.env is available in all environments
const isProduction = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') || false
const isDevelopment = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') || false

export const VIDEO_CONFIG = {
  // === DASH Player Settings ===
  
  // Buffer Configuration
  BUFFER: {
    INITIAL_LEVEL: 2,
    INITIAL_LEVEL_BACKGROUND: 1, // Lower for background videos
    TIME_AT_TOP_QUALITY: 8,
    TIME_AT_TOP_QUALITY_LONG_FORM: 12,
  },
  
  // Bitrate Configuration
  BITRATE: {
    INITIAL_VIDEO: 3000,
    INITIAL_VIDEO_BACKGROUND: 1500, // Lower for background videos
    QUALITY_THRESHOLDS: {
      HD: 3000,
      MEDIUM: 1500,
      LOW: 800,
      MOBILE: 800
    }
  },
  
  // Gap Handling
  GAP_HANDLING: {
    SMALL_GAP_LIMIT: 1.5
  },
  
  // === Retry & Recovery Settings ===
  
  // Network Retry Configuration
  RETRY: {
    MPD_ATTEMPTS: 3,
    MEDIA_SEGMENT_ATTEMPTS: 3,
    MPD_INTERVAL: 500,
    MEDIA_SEGMENT_INTERVAL: 500,
    MAX_ATTEMPTS: isProduction ? 3 : 20, // More retries in development
    INTERVAL: 100,
    RECOVERY_ATTEMPTS: 3
  },
  
  // === Timing & Delays ===
  
  // Player Initialization
  TIMING: {
    STARTUP_DELAY: 10,
    RECOVERY_DELAY: 100,
    RETRY_DELAY: 200,
    FALLBACK_DELAY: 1000,
    HERO_WAIT_DELAY: 200,
    PAUSE_DELAY_REDUCED_MOTION: 100,
    RESTART_AFTER_FAILURE: 1000,
    CAPTION_RETRY_DELAYS: [100, 500, 1000]
  },
  
  // === Intersection Observer Settings ===
  
  INTERSECTION: {
    ROOT_MARGIN_DEFAULT: '200px 0px',
    ROOT_MARGIN_BACKGROUND: '400px 0px',
    THRESHOLDS: [0, 0.1]
  },
  
  // === Video Sources ===
  
  SOURCES: {
    DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
    DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4',
    DEFAULT_CAPTIONS: '/assets/dash/video/captions-en.vtt'
  },
  
  // === Device Detection ===
  
  DEVICE: {
    MOBILE_BREAKPOINT: 768,
    MOBILE_USER_AGENTS: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  },
  
  // === Security Settings ===
  
  SECURITY: {
    ALLOWED_DOMAINS: ['blaeu.com', 'cdn.blaeu.com'],
    ALLOWED_EXTENSIONS: ['.mpd', '.mp4', '.vtt']
  },
  
  // === Error Handling ===
  
  ERRORS: {
    CRITICAL_CODES: [
      'MEDIA_ERR_SRC_NOT_SUPPORTED',
      'MANIFEST_LOADER_LOADING_FAILURE',
      'MANIFEST_LOADER_PARSING_FAILURE'
    ],
    NETWORK_STATES: {
      NETWORK_EMPTY: 0,
      NETWORK_LOADING: 2,
      NETWORK_NO_SOURCE: 3
    },
    READY_STATES: {
      HAVE_NOTHING: 0
    }
  },
  
  // === Performance Settings ===
  
  PERFORMANCE: {
    CACHE_CLEANUP_INTERVAL: 300000, // 5 minutes
    MEMORY_MONITORING: isDevelopment,
    LOG_LEVEL: isProduction ? 'error' : 'debug'
  },
  
  // === Environment-Specific Overrides ===
  
  ...(isDevelopment && {
    development: {
      LOG_LEVEL: 'debug',
      ENABLE_MEMORY_MONITORING: true,
      EXTENDED_RETRY_ATTEMPTS: 20,
      VERBOSE_LOGGING: true
    }
  }),
  
  ...(isProduction && {
    production: {
      LOG_LEVEL: 'error',
      ENABLE_MEMORY_MONITORING: false,
      OPTIMIZED_BUFFERS: true,
      MINIMAL_LOGGING: true
    }
  })
}

// === Helper Functions ===

/**
 * Get device-specific configuration
 * @param {boolean} isMobile - Whether the device is mobile
 * @returns {Object} Device-specific config overrides
 */
export function getDeviceConfig(isMobile = false) {
  if (isMobile) {
    return {
      BITRATE: {
        ...VIDEO_CONFIG.BITRATE,
        INITIAL_VIDEO: VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.MOBILE
      },
      BUFFER: {
        ...VIDEO_CONFIG.BUFFER,
        INITIAL_LEVEL: 1,
        TIME_AT_TOP_QUALITY: 4
      }
    }
  }
  return {}
}

/**
 * Get configuration for background videos
 * @returns {Object} Background video config overrides
 */
export function getBackgroundVideoConfig() {
  return {
    BITRATE: {
      ...VIDEO_CONFIG.BITRATE,
      INITIAL_VIDEO: VIDEO_CONFIG.BITRATE.INITIAL_VIDEO_BACKGROUND
    },
    BUFFER: {
      ...VIDEO_CONFIG.BUFFER,
      INITIAL_LEVEL: VIDEO_CONFIG.BUFFER.INITIAL_LEVEL_BACKGROUND
    },
    INTERSECTION: {
      ...VIDEO_CONFIG.INTERSECTION,
      ROOT_MARGIN_DEFAULT: VIDEO_CONFIG.INTERSECTION.ROOT_MARGIN_BACKGROUND
    }
  }
}

/**
 * Validate video source URL
 * @param {string} url - Video source URL
 * @returns {boolean} Whether URL is valid
 */
export function validateVideoSource(url) {
  if (!url) return false
  
  const { ALLOWED_DOMAINS, ALLOWED_EXTENSIONS } = VIDEO_CONFIG.SECURITY
  
  // Check if URL uses allowed extensions
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => 
    url.toLowerCase().includes(ext)
  )
  
  // For relative URLs, assume they're valid
  if (url.startsWith('/')) {
    return hasValidExtension
  }
  
  // For absolute URLs, check domain
  try {
    const urlObj = new URL(url)
    const isAllowedDomain = ALLOWED_DOMAINS.some(domain => 
      urlObj.hostname.includes(domain)
    )
    return isAllowedDomain && hasValidExtension
  } catch {
    return false
  }
}

// Default export for convenience
export default VIDEO_CONFIG