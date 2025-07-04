/**
 * Device detection composable for mobile-first progressive enhancement
 * Provides reactive mobile detection for performance optimizations
 */

export interface DeviceDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  hasTouch: boolean;
  connectionSpeed: string;
  downlink: number | null;
}

export interface ServerSideDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface DeviceDetectionComposable {
  isMobile: Readonly<Ref<boolean>>;
  isTablet: Readonly<Ref<boolean>>;
  isDesktop: Readonly<Ref<boolean>>;
  connectionSpeed: Readonly<Ref<string>>;
  shouldUseLightweight: ComputedRef<boolean>;
  shouldPreloadVideo: ComputedRef<boolean>;
  detectServerSide: (userAgent?: string) => ServerSideDetectionResult;
  detectClientSide: () => DeviceDetectionResult | undefined;
}

export const useDeviceDetection = (): DeviceDetectionComposable => {
  const isMobile = ref<boolean>(false);
  const isTablet = ref<boolean>(false); 
  const isDesktop = ref<boolean>(false);
  const connectionSpeed = ref<string>('unknown');

  // Server-side detection (for initial SSR)
  const detectServerSide = (userAgent: string = ''): ServerSideDetectionResult => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /iPad|Android(?!.*Mobile)/i;
    
    const isMobileUA = mobileRegex.test(userAgent);
    const isTabletUA = tabletRegex.test(userAgent);
    
    return {
      isMobile: isMobileUA && !isTabletUA,
      isTablet: isTabletUA,
      isDesktop: !isMobileUA
    };
  };

  // Client-side detection (more accurate)
  const detectClientSide = (): DeviceDetectionResult | undefined => {
    if (!process.client) return;

    // Screen size detection
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Device pixel ratio (high DPI detection)
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Touch capability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Network information (if available)
    let effectiveType = 'unknown';
    let downlink: number | null = null;
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      effectiveType = connection?.effectiveType || 'unknown';
      downlink = connection?.downlink || null;
    }
    
    // Mobile detection logic
    const isMobileScreen = screenWidth <= 768;
    const isTabletScreen = screenWidth > 768 && screenWidth <= 1024;
    const isDesktopScreen = screenWidth > 1024;
    
    // Mobile devices often have touch + small screen
    const likelyMobile = isMobileScreen && hasTouch;
    const likelyTablet = isTabletScreen && hasTouch;
    const likelyDesktop = isDesktopScreen || (!hasTouch && screenWidth > 1024);
    
    // Update reactive values
    isMobile.value = likelyMobile;
    isTablet.value = likelyTablet;
    isDesktop.value = likelyDesktop;
    connectionSpeed.value = effectiveType;
    
    return {
      isMobile: likelyMobile,
      isTablet: likelyTablet, 
      isDesktop: likelyDesktop,
      screenWidth,
      screenHeight,
      pixelRatio,
      hasTouch,
      connectionSpeed: effectiveType,
      downlink
    };
  };

  // Should use lightweight content (images vs video)
  const shouldUseLightweight = computed<boolean>(() => {
    // Use lightweight on mobile/tablet or slow connections
    return isMobile.value || 
           isTablet.value || 
           connectionSpeed.value === 'slow-2g' || 
           connectionSpeed.value === '2g';
  });

  // Should preload video (only on desktop with good connection)  
  const shouldPreloadVideo = computed<boolean>(() => {
    return isDesktop.value && 
           connectionSpeed.value !== 'slow-2g' && 
           connectionSpeed.value !== '2g';
  });

  // Initialize detection
  onMounted(() => {
    detectClientSide();
    
    // Re-detect on resize (orientation change, window resize)
    const handleResize = debounce(() => {
      detectClientSide();
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Clean up listener
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  // Debounce utility
  function debounce<T extends (...args: any[]) => void>(
    func: T, 
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | undefined;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    connectionSpeed: readonly(connectionSpeed),
    shouldUseLightweight,
    shouldPreloadVideo,
    detectServerSide,
    detectClientSide
  };
};