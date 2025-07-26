/**
 * @fileoverview Navigation Composable for Site Navigation Components
 * 
 * This composable provides comprehensive navigation functionality for the Blaeu website,
 * designed specifically to work with navigation components like tw-NavbarSimple.vue.
 * 
 * It follows the Vue 3 Composition API pattern of separating logic from presentation,
 * allowing components to focus on templating while this composable handles:
 * - Complex scroll-based interactions
 * - State management for multiple navigation elements
 * - Event handling and lifecycle management
 * - Integration with global application state
 * 
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 * 
 * @see tw-NavbarSimple.vue - Primary component that uses this composable
 */

import { ref, computed, onMounted, onUnmounted, watch, nextTick, type Ref, type ComputedRef } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { globalState } from '~/composables/globalState'

/**
 * Represents a navigation section in the secondary navigation tier
 * 
 * @interface NavigationSection
 * @since 1.0.0
 * @example
 * ```typescript
 * const section: NavigationSection = {
 *   id: 'about-us',
 *   label: 'About Us',
 *   href: '#about-us'
 * }
 * ```
 */
export interface NavigationSection {
  /** Unique identifier for the section, used for active state tracking */
  id: string
  /** Display label shown in the navigation */
  label: string
  /** URL or anchor link for the section */
  href: string
}

/**
 * Configuration options for the useNavigation composable
 * 
 * @interface UseNavigationOptions
 * @since 1.0.0
 * @example
 * ```typescript
 * const options: UseNavigationOptions = {
 *   scrollThreshold: 300,
 *   tier2ScrollThreshold: 50,
 *   backToTopThreshold: 400
 * }
 * const navigation = useNavigation(options)
 * ```
 */
export interface UseNavigationOptions {
  /** Custom navigation sections (overrides route-based sections) */
  sections?: Ref<NavigationSection[]>
  /** Scroll position threshold for active section detection (default: 200px) */
  scrollThreshold?: number
  /** Minimum scroll movement to trigger tier2 visibility changes (default: 25px) */
  tier2ScrollThreshold?: number
  /** Scroll position to show back-to-top button (default: 300px) */
  backToTopThreshold?: number
}

/**
 * Helper function to get navigation sections based on route
 * @param route - Vue router route object
 * @param customSections - Optional custom sections override
 * @returns Array of navigation sections
 */
function getNavigationSections(route: RouteLocationNormalizedLoaded, customSections?: Ref<NavigationSection[]>): NavigationSection[] {
  if (customSections) {
    return customSections.value
  }
  
  const path = route.path
  
  if (path === '/team/rvaneijk' || path === '/team/rvaneijk/') {
    return [
      { id: 'profile', label: 'Profile', href: '#profile' },
      { id: 'book', label: 'My Book', href: '#book' },
      { id: 'media', label: 'Media', href: '#media' },
      { id: 'research', label: 'Research', href: '#research' },
      { id: 'about', label: 'Connect', href: '#about' }
    ]
  } else if (path === '/team/rvaneijk_dev' || path === '/team/rvaneijk_dev/') {
    return [
      { id: 'profile', label: 'Profile', href: '#profile' },
      { id: 'book', label: 'My Book', href: '#book' },
      { id: 'media', label: 'Media', href: '#media' },
      { id: 'research', label: 'Research', href: '#research' }
    ]
  } else if (path === '/team' || path === '/team/') {
    return [
      { id: 'top', label: 'Overview', href: '#top' },
      { id: 'rob', label: 'Rob', href: '#rob' },
      { id: 'member2', label: 'Member 2', href: '#member2' },
      { id: 'member3', label: 'Member 3', href: '#member3' }
    ]
  } else if (path === '/blog' || path === '/blog/') {
    return [
      { id: 'top', label: 'Latest', href: '#top' },
      { id: 'categories', label: 'Categories', href: '#categories' },
      { id: 'featured', label: 'Featured', href: '#featured' }
    ]
  } else if (path === '/index_dev' || path === '/index_dev/' || path === '/main_dev' || path === '/main_dev/') {
    return [
      { id: 'top', label: 'Overview', href: '#top' },
      { id: 'about-us', label: 'About Us', href: '#about-us' },
      { id: 'expertise', label: 'Services', href: '#expertise' },
      { id: 'news', label: 'News', href: '#news' }
    ]
  }
  
  return [
    { id: 'top', label: 'Overview', href: '#top' },
    { id: 'about-us', label: 'About Us', href: '#about-us' },
    { id: 'expertise', label: 'Services', href: '#expertise' },
    { id: 'news', label: 'News', href: '#news' }
  ]
}

/**
 * Helper function to set up scroll event handlers
 * @param handleScroll - Main scroll handler function
 * @param handleClickOutside - Click outside handler function
 * @param lastScrollY - Ref to track last scroll position
 */
function setupEventListeners(
  handleScroll: () => void,
  handleClickOutside: (event: Event) => void,
  lastScrollY: Ref<number>
): void {
  if (process.client) {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    lastScrollY.value = window.scrollY
    
    // Use nextTick to ensure DOM is ready before initial scroll handling
    nextTick(() => {
      handleScroll()
    })
  }
}

/**
 * Create navigation methods (scroll functions)
 */
function createNavigationMethods(activeSection: Ref<string>): {
  scrollToSection: (selector: string) => void
  scrollTo: (selector: string) => void
} {
  const scrollToSection = (selector: string): void => {
    if (!process.client) return
    
    const element = document.querySelector(selector)
    if (element) {
      // Calculate navbar height: tier1 (64px) + tier2 (48px if visible)
      const tier1Height = 64
      const tier2Element = document.querySelector('.tier2-nav')
      // Safely check if tier2 is hidden - handle test environment where classList might not exist
      let tier2Height = 0
      try {
        tier2Height = tier2Element && tier2Element.classList && !tier2Element.classList.contains('tier2-hidden') ? 48 : 0
      } catch {
        tier2Height = 0
      }
      const totalOffset = tier1Height + tier2Height
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - totalOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      activeSection.value = selector.replace('#', '')
    }
  }
  
  const scrollTo = (selector: string): void => {
    if (!process.client) return
    
    const topPosition = selector === '#top' ? 0 : (document.querySelector(selector) as HTMLElement)?.offsetTop || 0
    window.scrollTo({ top: topPosition, behavior: 'smooth' })
    activeSection.value = selector.replace('#', '')
  }
  
  return { scrollToSection, scrollTo }
}

/**
 * Create dropdown management methods
 */
function createDropdownMethods(showDropdown: Ref<boolean>): {
  toggleDropdown: () => void
  closeDropdown: () => void
  handleDropdownBlur: () => void
} {
  const toggleDropdown = (): void => {
    showDropdown.value = !showDropdown.value
  }
  
  const closeDropdown = (): void => {
    showDropdown.value = false
  }
  
  const handleDropdownBlur = (): void => {
    setTimeout(() => {
      if (!showDropdown.value) return
      closeDropdown()
    }, 150)
  }
  
  return { toggleDropdown, closeDropdown, handleDropdownBlur }
}

/**
 * Create mobile menu management methods
 */
function createMobileMenuMethods(mobileMenuOpen: Ref<boolean>): {
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
} {
  const toggleMobileMenu = (): void => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
  
  const closeMobileMenu = (): void => {
    mobileMenuOpen.value = false
  }
  
  return { toggleMobileMenu, closeMobileMenu }
}

/**
 * Create scroll handling methods
 */
function createScrollHandlers(params: {
  activeSection: Ref<string>
  showTier2: Ref<boolean>
  showScrollButton: Ref<boolean>
  lastScrollY: Ref<number>
  currentSections: ComputedRef<NavigationSection[]>
  scrollThreshold: number
  tier2ScrollThreshold: number
  backToTopThreshold: number
}): {
  updateActiveSection: () => void
  updateTier2Visibility: () => void
  handleScroll: () => void
} {
  const {
    activeSection,
    showTier2,
    showScrollButton,
    lastScrollY,
    currentSections,
    scrollThreshold,
    tier2ScrollThreshold,
    backToTopThreshold
  } = params
  const updateActiveSection = (): void => {
    if (!process.client) return
    
    const sections = currentSections.value.map(s => s.id).reverse()
    // Use consistent navbar height calculation like scrollToSection
    const tier1Height = 64
    const tier2Element = document.querySelector('.tier2-nav')
    // Safely check if tier2 is hidden - handle test environment where classList might not exist
    let tier2Height = 0
    try {
      tier2Height = tier2Element && tier2Element.classList && !tier2Element.classList.contains('tier2-hidden') ? 48 : 0
    } catch {
      tier2Height = 0
    }
    const navbarOffset = tier1Height + tier2Height
    const scrollPosition = window.scrollY + navbarOffset + scrollThreshold
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element && element.offsetTop <= scrollPosition) {
        activeSection.value = sectionId
        return
      }
    }
    
    // Default to first section in the list for any route
    activeSection.value = currentSections.value[0]?.id || 'top'
  }
  
  const updateTier2Visibility = (): void => {
    if (!process.client) return
    
    const currentScrollY = window.scrollY
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.value)
    
    if (scrollDifference < tier2ScrollThreshold) return
    
    if (currentScrollY <= 150) {
      showTier2.value = true
    } else if (currentScrollY < lastScrollY.value - 30) {
      showTier2.value = true
    } else if (currentScrollY > lastScrollY.value + 30 && currentScrollY > 200) {
      showTier2.value = false
    }
    
    lastScrollY.value = currentScrollY
  }
  
  const handleScroll = (): void => {
    updateActiveSection()
    updateTier2Visibility()
    
    const scrollPosition = window.scrollY
    showScrollButton.value = scrollPosition > backToTopThreshold
  }
  
  return { updateActiveSection, updateTier2Visibility, handleScroll }
}

/**
 * Create back-to-top button management
 */
function createBackToTopManagement(closeDropdown: () => void): {
  updateBackToTopPosition: () => void
  handleClickOutside: (event: Event) => void
} {
  const updateBackToTopPosition = (): void => {
    if (!process.client) return
    
    const backToTopBtn = document.querySelector('.back-to-top-container') as HTMLElement
    if (backToTopBtn) {
      if (globalState.widgetPosition === 'bottom-left') {
        backToTopBtn.style.setProperty('left', '20px', 'important')
        backToTopBtn.style.setProperty('right', 'auto', 'important')
        backToTopBtn.classList.add('left-aligned')
        backToTopBtn.classList.remove('right-aligned')
        backToTopBtn.setAttribute('data-position', 'left')
      } else {
        backToTopBtn.style.setProperty('right', '20px', 'important')
        backToTopBtn.style.setProperty('left', 'auto', 'important')
        backToTopBtn.classList.add('right-aligned')
        backToTopBtn.classList.remove('left-aligned')
        backToTopBtn.setAttribute('data-position', 'right')
      }
    }
  }
  
  const handleClickOutside = (event: Event): void => {
    const target = event.target as HTMLElement
    const dropdown = target.closest('.relative')
    if (!dropdown) {
      closeDropdown()
    }
  }
  
  return { updateBackToTopPosition, handleClickOutside }
}

/**
 * Setup lifecycle management
 */
function setupLifecycleManagement(
  handleScroll: () => void,
  handleClickOutside: (event: Event) => void,
  lastScrollY: Ref<number>,
  updateBackToTopPosition: () => void
): void {
  onMounted(() => {
    setupEventListeners(handleScroll, handleClickOutside, lastScrollY)
    
    if (process.client) {
      nextTick(() => {
        updateBackToTopPosition()
        // Ensure initial active section is set correctly after DOM is ready
        handleScroll()
      })
      
      watch(
        () => globalState.widgetPosition,
        () => {
          updateBackToTopPosition()
        }
      )
    }
  })
  
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  })
}

/**
 * A comprehensive navigation composable that manages all aspects of the site navigation
 * including scroll-based interactions, dropdown menus, mobile navigation, and tier2 visibility.
 * 
 * @param {UseNavigationOptions} options - Configuration options for the composable
 * @returns {Object} Navigation state and methods for component integration
 * 
 * @since 1.0.0
 */
export function useNavigation(options: UseNavigationOptions = {}): {
  showDropdown: Ref<boolean>
  mobileMenuOpen: Ref<boolean>
  activeSection: Ref<string>
  showTier2: Ref<boolean>
  showScrollButton: Ref<boolean>
  isAboutActive: ComputedRef<boolean>
  currentSections: ComputedRef<NavigationSection[]>
  scrollToSection: (selector: string) => void
  scrollTo: (selector: string) => void
  toggleDropdown: () => void
  closeDropdown: () => void
  handleDropdownBlur: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  updateActiveSection: () => void
  updateTier2Visibility: () => void
  handleScroll: () => void
} {
  const route = useRoute()
  
  // Configuration with performance-optimized defaults
  // These thresholds are fine-tuned for smooth user experience
  const scrollThreshold = options.scrollThreshold ?? 200  // Offset for active section detection
  const tier2ScrollThreshold = options.tier2ScrollThreshold ?? 25  // Anti-jitter threshold
  const backToTopThreshold = options.backToTopThreshold ?? 300  // Show back-to-top button
  
  // Reactive state - Vue 3 Composition API refs for optimal reactivity
  const showDropdown = ref(false)        // About dropdown visibility
  const mobileMenuOpen = ref(false)      // Mobile menu toggle state
  const activeSection = ref('top')       // Currently active navigation section
  const showTier2 = ref(true)           // Tier2 nav visibility (starts visible)
  const lastScrollY = ref(0)            // Previous scroll position for direction detection
  const showScrollButton = ref(false)   // Back-to-top button visibility
  
  // Computed properties
  const isAboutActive = computed(() => {
    return route.path === '/team/rvaneijk' || route.path === '/team' || showDropdown.value
  })
  
  // Navigation sections management
  const currentSections = computed(() => getNavigationSections(route, options.sections))
  
  // Create navigation methods
  const { scrollToSection, scrollTo } = createNavigationMethods(activeSection)
  
  // Create scroll handlers
  const { updateActiveSection, updateTier2Visibility, handleScroll } = createScrollHandlers({
    activeSection,
    showTier2,
    showScrollButton,
    lastScrollY,
    currentSections,
    scrollThreshold,
    tier2ScrollThreshold,
    backToTopThreshold
  })
  
  // Create dropdown methods
  const { toggleDropdown, closeDropdown, handleDropdownBlur } = createDropdownMethods(showDropdown)
  
  // Create back-to-top and utility methods
  const { updateBackToTopPosition, handleClickOutside } = createBackToTopManagement(closeDropdown)
  
  // Create mobile menu methods
  const { toggleMobileMenu, closeMobileMenu } = createMobileMenuMethods(mobileMenuOpen)
  
  // Setup lifecycle management
  setupLifecycleManagement(handleScroll, handleClickOutside, lastScrollY, updateBackToTopPosition)
  
  /**
   * Public API returned by the useNavigation composable
   * Provides reactive state and methods for navigation components
   */
  return {
    // Reactive State
    /** Whether the About dropdown menu is visible */
    showDropdown,
    /** Whether the mobile navigation menu is open */
    mobileMenuOpen,
    /** ID of the currently active navigation section */
    activeSection,
    /** Whether the tier2 navigation should be visible */
    showTier2,
    /** Whether the back-to-top button should be shown */
    showScrollButton,
    /** Computed property indicating if About section is active */
    isAboutActive,
    /** Array of navigation sections for the current page */
    currentSections,
    
    // Navigation Methods
    /** Smooth scroll to a specific section */
    scrollToSection,
    /** Scroll to any position or element */
    scrollTo,
    /** Toggle About dropdown visibility */
    toggleDropdown,
    /** Close About dropdown */
    closeDropdown,
    /** Handle dropdown blur events */
    handleDropdownBlur,
    /** Toggle mobile menu visibility */
    toggleMobileMenu,
    /** Close mobile menu */
    closeMobileMenu,
    /** Update active section based on scroll */
    updateActiveSection,
    /** Update tier2 visibility based on scroll */
    updateTier2Visibility,
    /** Main scroll event handler */
    handleScroll
  }
}