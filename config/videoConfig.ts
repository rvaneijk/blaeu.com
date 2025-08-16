/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

/**
 * Centralized Video Configuration
 * Manages all video-related settings for the DASH streaming system
 */

// Ensure process.env is available in all environments
const isProduction =
  (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') || false
const isDevelopment =
  (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') || false

export interface BufferConfig {
  INITIAL_LEVEL: number
  INITIAL_LEVEL_BACKGROUND: number
  TIME_AT_TOP_QUALITY: number
  TIME_AT_TOP_QUALITY_LONG_FORM: number
}

export interface BitrateConfig {
  INITIAL_VIDEO: number
  INITIAL_VIDEO_BACKGROUND: number
  QUALITY_THRESHOLDS: {
    HD: number
    MEDIUM: number
    LOW: number
    MOBILE: number
  }
}

export interface GapHandlingConfig {
  SMALL_GAP_LIMIT: number
}

export interface RetryConfig {
  MPD_ATTEMPTS: number
  MEDIA_SEGMENT_ATTEMPTS: number
  MPD_INTERVAL: number
  MEDIA_SEGMENT_INTERVAL: number
  MAX_ATTEMPTS: number
  INTERVAL: number
  RECOVERY_ATTEMPTS: number
}

export interface TimingConfig {
  STARTUP_DELAY: number
  RECOVERY_DELAY: number
  RETRY_DELAY: number
  FALLBACK_DELAY: number
  HERO_WAIT_DELAY: number
  PAUSE_DELAY_REDUCED_MOTION: number
  RESTART_AFTER_FAILURE: number
  CAPTION_RETRY_DELAYS: number[]
}

export interface IntersectionConfig {
  ROOT_MARGIN_DEFAULT: string
  ROOT_MARGIN_BACKGROUND: string
  THRESHOLDS: number[]
}

export interface SourcesConfig {
  DEFAULT_DASH: string
  DEFAULT_FALLBACK: string
  DEFAULT_CAPTIONS: string
}

export interface DeviceConfig {
  MOBILE_BREAKPOINT: number
  MOBILE_USER_AGENTS: RegExp
}

export interface SecurityConfig {
  ALLOWED_DOMAINS: string[]
  ALLOWED_EXTENSIONS: string[]
}

export interface ErrorsConfig {
  CRITICAL_CODES: string[]
  NETWORK_STATES: {
    NETWORK_EMPTY: number
    NETWORK_LOADING: number
    NETWORK_NO_SOURCE: number
  }
  READY_STATES: {
    HAVE_NOTHING: number
  }
}

export interface PerformanceConfig {
  CACHE_CLEANUP_INTERVAL: number
  MEMORY_MONITORING: boolean
  LOG_LEVEL: 'error' | 'debug'
}

export interface VideoConfigType {
  BUFFER: BufferConfig
  BITRATE: BitrateConfig
  GAP_HANDLING: GapHandlingConfig
  RETRY: RetryConfig
  TIMING: TimingConfig
  INTERSECTION: IntersectionConfig
  SOURCES: SourcesConfig
  DEVICE: DeviceConfig
  SECURITY: SecurityConfig
  ERRORS: ErrorsConfig
  PERFORMANCE: PerformanceConfig
  development?: {
    LOG_LEVEL: string
    ENABLE_MEMORY_MONITORING: boolean
    EXTENDED_RETRY_ATTEMPTS: number
    VERBOSE_LOGGING: boolean
  }
  production?: {
    LOG_LEVEL: string
    ENABLE_MEMORY_MONITORING: boolean
    OPTIMIZED_BUFFERS: boolean
    MINIMAL_LOGGING: boolean
  }
}

export const VIDEO_CONFIG: VideoConfigType = {
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
      MOBILE: 800,
    },
  },

  // Gap Handling
  GAP_HANDLING: {
    SMALL_GAP_LIMIT: 1.5,
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
    RECOVERY_ATTEMPTS: 3,
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
    CAPTION_RETRY_DELAYS: [100, 500, 1000],
  },

  // === Intersection Observer Settings ===

  INTERSECTION: {
    ROOT_MARGIN_DEFAULT: '200px 0px',
    ROOT_MARGIN_BACKGROUND: '400px 0px',
    THRESHOLDS: [0, 0.1],
  },

  // === Video Sources ===

  SOURCES: {
    DEFAULT_DASH: '/assets/dash/video/adaptive.mpd',
    DEFAULT_FALLBACK: '/assets/dash/video/GettyImages-1368070487.mp4',
    DEFAULT_CAPTIONS: '/assets/dash/video/captions-en.vtt',
  },

  // === Device Detection ===

  DEVICE: {
    MOBILE_BREAKPOINT: 768,
    MOBILE_USER_AGENTS: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  },

  // === Security Settings ===

  SECURITY: {
    ALLOWED_DOMAINS: ['blaeu.com', 'cdn.blaeu.com'],
    ALLOWED_EXTENSIONS: ['.mpd', '.mp4', '.vtt'],
  },

  // === Error Handling ===

  ERRORS: {
    CRITICAL_CODES: [
      'MEDIA_ERR_SRC_NOT_SUPPORTED',
      'MANIFEST_LOADER_LOADING_FAILURE',
      'MANIFEST_LOADER_PARSING_FAILURE',
    ],
    NETWORK_STATES: {
      NETWORK_EMPTY: 0,
      NETWORK_LOADING: 2,
      NETWORK_NO_SOURCE: 3,
    },
    READY_STATES: {
      HAVE_NOTHING: 0,
    },
  },

  // === Performance Settings ===

  PERFORMANCE: {
    CACHE_CLEANUP_INTERVAL: 300000, // 5 minutes
    MEMORY_MONITORING: isDevelopment,
    LOG_LEVEL: isProduction ? 'error' : 'debug',
  },

  // === Environment-Specific Overrides ===

  ...(isDevelopment && {
    development: {
      LOG_LEVEL: 'debug',
      ENABLE_MEMORY_MONITORING: true,
      EXTENDED_RETRY_ATTEMPTS: 20,
      VERBOSE_LOGGING: true,
    },
  }),

  ...(isProduction && {
    production: {
      LOG_LEVEL: 'error',
      ENABLE_MEMORY_MONITORING: false,
      OPTIMIZED_BUFFERS: true,
      MINIMAL_LOGGING: true,
    },
  }),
}

// === Helper Functions ===

export interface DeviceConfigOverride {
  BITRATE?: Partial<BitrateConfig>
  BUFFER?: Partial<BufferConfig>
}

export interface BackgroundVideoConfigOverride {
  BITRATE?: Partial<BitrateConfig>
  BUFFER?: Partial<BufferConfig>
  INTERSECTION?: Partial<IntersectionConfig>
}

/**
 * Get device-specific configuration
 */
export function getDeviceConfig(isMobile: boolean = false): DeviceConfigOverride {
  if (isMobile) {
    return {
      BITRATE: {
        ...VIDEO_CONFIG.BITRATE,
        INITIAL_VIDEO: VIDEO_CONFIG.BITRATE.QUALITY_THRESHOLDS.MOBILE,
      },
      BUFFER: {
        ...VIDEO_CONFIG.BUFFER,
        INITIAL_LEVEL: 1,
        TIME_AT_TOP_QUALITY: 4,
      },
    }
  }
  return {}
}

/**
 * Get configuration for background videos
 */
export function getBackgroundVideoConfig(): BackgroundVideoConfigOverride {
  return {
    BITRATE: {
      ...VIDEO_CONFIG.BITRATE,
      INITIAL_VIDEO: VIDEO_CONFIG.BITRATE.INITIAL_VIDEO_BACKGROUND,
    },
    BUFFER: {
      ...VIDEO_CONFIG.BUFFER,
      INITIAL_LEVEL: VIDEO_CONFIG.BUFFER.INITIAL_LEVEL_BACKGROUND,
    },
    INTERSECTION: {
      ...VIDEO_CONFIG.INTERSECTION,
      ROOT_MARGIN_DEFAULT: VIDEO_CONFIG.INTERSECTION.ROOT_MARGIN_BACKGROUND,
    },
  }
}

/**
 * Validate video source URL
 */
export function validateVideoSource(url: string): boolean {
  if (!url) return false

  const { ALLOWED_DOMAINS, ALLOWED_EXTENSIONS } = VIDEO_CONFIG.SECURITY

  // Check if URL uses allowed extensions
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => url.toLowerCase().includes(ext))

  // For relative URLs, assume they're valid
  if (url.startsWith('/')) {
    return hasValidExtension
  }

  // For absolute URLs, check domain
  try {
    const urlObj = new URL(url)
    const isAllowedDomain = ALLOWED_DOMAINS.some(domain => urlObj.hostname.includes(domain))
    return isAllowedDomain && hasValidExtension
  } catch {
    return false
  }
}

// Default export for convenience
export default VIDEO_CONFIG
