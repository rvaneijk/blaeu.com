/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

import { ref, computed, onMounted, onUnmounted, readonly, type Ref, type ComputedRef } from 'vue'

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string
    downlink?: number
  }
  mozConnection?: {
    effectiveType?: string
    downlink?: number
  }
  webkitConnection?: {
    effectiveType?: string
    downlink?: number
  }
}

/**
 * Device detection composable for mobile-first progressive enhancement
 * Provides reactive mobile detection for performance optimizations
 */

export interface DeviceDetectionResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  hasTouch: boolean
  connectionSpeed: string
  downlink: number | null
}

export interface ServerSideDetectionResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export interface DeviceDetectionComposable {
  isMobile: Readonly<Ref<boolean>>
  isTablet: Readonly<Ref<boolean>>
  isDesktop: Readonly<Ref<boolean>>
  connectionSpeed: Readonly<Ref<string>>
  shouldUseLightweight: ComputedRef<boolean>
  shouldPreloadVideo: ComputedRef<boolean>
  detectServerSide: (userAgent?: string) => ServerSideDetectionResult
  detectClientSide: () => DeviceDetectionResult | undefined
}

// Helper: Get device screen metrics
const getScreenMetrics = (): {
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  hasTouch: boolean
} => {
  return {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1,
    hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  }
}

// Helper: Get network connection information
const getNetworkInfo = (): { effectiveType: string; downlink: number | null } => {
  let effectiveType = 'unknown'
  let downlink: number | null = null

  if ('connection' in navigator) {
    const connection =
      (navigator as NavigatorWithConnection).connection ||
      (navigator as NavigatorWithConnection).mozConnection ||
      (navigator as NavigatorWithConnection).webkitConnection
    effectiveType = connection?.effectiveType || 'unknown'
    downlink = connection?.downlink || null
  }

  return { effectiveType, downlink }
}

// Helper: Determine device type based on screen size and touch
const determineDeviceType = (
  screenWidth: number,
  hasTouch: boolean
): { isMobile: boolean; isTablet: boolean; isDesktop: boolean } => {
  const isMobileScreen = screenWidth <= 768
  const isTabletScreen = screenWidth > 768 && screenWidth <= 1024
  const isDesktopScreen = screenWidth > 1024

  return {
    isMobile: isMobileScreen && hasTouch,
    isTablet: isTabletScreen && hasTouch,
    isDesktop: isDesktopScreen, // Prioritize screen size for desktop - touch capability is common on desktop browsers
  }
}

// Helper: Debounce utility
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return function executedFunction(...args: Parameters<T>) {
    const later = (): void => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const useDeviceDetection = (): DeviceDetectionComposable => {
  const isMobile = ref<boolean>(false)
  const isTablet = ref<boolean>(false)
  const isDesktop = ref<boolean>(true)
  const connectionSpeed = ref<string>('unknown')

  // Server-side detection (for initial SSR)
  const detectServerSide = (userAgent: string = ''): ServerSideDetectionResult => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const tabletRegex = /iPad|Android(?!.*Mobile)/i

    const isMobileUA = mobileRegex.test(userAgent)
    const isTabletUA = tabletRegex.test(userAgent)

    return {
      isMobile: isMobileUA && !isTabletUA,
      isTablet: isTabletUA,
      isDesktop: !isMobileUA,
    }
  }

  // Client-side detection (more accurate)
  const detectClientSide = (): DeviceDetectionResult | undefined => {
    if (!process.client || typeof window === 'undefined') return

    const { screenWidth, screenHeight, pixelRatio, hasTouch } = getScreenMetrics()
    const { effectiveType, downlink } = getNetworkInfo()
    const {
      isMobile: likelyMobile,
      isTablet: likelyTablet,
      isDesktop: likelyDesktop,
    } = determineDeviceType(screenWidth, hasTouch)

    // Update reactive values
    isMobile.value = likelyMobile
    isTablet.value = likelyTablet
    isDesktop.value = likelyDesktop
    connectionSpeed.value = effectiveType

    return {
      isMobile: likelyMobile,
      isTablet: likelyTablet,
      isDesktop: likelyDesktop,
      screenWidth,
      screenHeight,
      pixelRatio,
      hasTouch,
      connectionSpeed: effectiveType,
      downlink,
    }
  }

  // Should use lightweight content (images vs video)
  const shouldUseLightweight = computed<boolean>(() => {
    // Use lightweight on mobile/tablet or slow connections
    return (
      isMobile.value ||
      isTablet.value ||
      connectionSpeed.value === 'slow-2g' ||
      connectionSpeed.value === '2g'
    )
  })

  // Should preload video (only on desktop with good connection)
  const shouldPreloadVideo = computed<boolean>(() => {
    return isDesktop.value && connectionSpeed.value !== 'slow-2g' && connectionSpeed.value !== '2g'
  })

  // Initialize detection
  let handleResize: (() => void) | undefined

  onMounted(() => {
    detectClientSide()

    // Re-detect on resize (orientation change, window resize)
    handleResize = debounce(() => {
      detectClientSide()
    }, 250)

    if (process.client && typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }
  })

  // Clean up listener
  onUnmounted(() => {
    if (handleResize && process.client && typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize)
    }
  })

  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    connectionSpeed: readonly(connectionSpeed),
    shouldUseLightweight,
    shouldPreloadVideo,
    detectServerSide,
    detectClientSide,
  }
}
