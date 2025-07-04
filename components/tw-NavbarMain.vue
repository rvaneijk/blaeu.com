<!-- 
  @component tw-NavbarMain
  @description Main navigation component for the site that includes:
  - Skip-to-content link for keyboard users
  - Responsive desktop/mobile navigation with hamburger menu
  - Smooth scrolling navigation links
  - Accessibility features (proper ARIA attributes and keyboard support)
-->
<template>
  <!-- Skip link for keyboard users - A11Y feature for keyboard navigation -->
  <a 
    href="#main-content" 
    class="skip-to-content"
  >
    Skip to main content
  </a>
  
  <nav 
    class="fixed w-full z-30 transition-all duration-300 top-0 bg-white shadow-md opacity-100" 
    aria-label="Main Navigation"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
       <div class="flex items-center ml-2">
         <a href="#top" @click.prevent="scrollTo('#top')" class="flex items-center">
           <NuxtImg 
             src="/assets/png/logo.png" 
             alt="Blaeu Logo" 
             class="h-8 transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:z-50 relative"
             format="webp"
             quality="85"
             :width="90"
             :height="32"
             sizes="(max-width: 640px) 80px, 90px"
           />
         </a>
       </div>  
       
        <!-- Mobile menu button - Hidden on desktop, with proper ARIA attributes -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          type="button" 
          class="inline-flex items-center justify-center p-2 rounded-md md:!hidden text-gray-600 hover:text-gray-900" 
          aria-controls="mobile-menu" 
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          id="mobile-menu-button"
        >
          <span class="sr-only">{{ mobileMenuOpen ? 'Close' : 'Open' }} main menu</span>
          <svg 
            class="h-6 w-6" 
            :class="{'hidden': mobileMenuOpen, 'block': !mobileMenuOpen}" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            class="h-6 w-6" 
            :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Desktop menu - With proper tabindex, aria attributes and active section tracking -->
        <div class="hidden md:flex md:items-center md:space-x-8 font-amblelight" role="navigation" aria-label="Desktop Navigation" tabindex="-1">
          <a 
            href="#top" 
            @click.prevent="scrollTo('#top')" 
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-blue-600 border-b-2 border-blue-600 font-semibold': activeSection === 'top'
            }"
            :aria-current="activeSection === 'top' ? 'page' : undefined"
          >
            <span class="flex items-center">Home</span>
          </a>
          <a 
            href="#about-us" 
            @click.prevent="scrollTo('#about-us')" 
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-blue-600 border-b-2 border-blue-600 font-semibold': activeSection === 'about-us'
            }"
            :aria-current="activeSection === 'about-us' ? 'page' : undefined"
          >
            <span class="flex items-center">About</span>
          </a>
          <a 
            href="#expertise" 
            @click.prevent="scrollTo('#expertise')" 
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-blue-600 border-b-2 border-blue-600 font-semibold': activeSection === 'expertise' 
            }"
            :aria-current="activeSection === 'expertise' ? 'page' : undefined"
          >
            <span class="flex items-center">Services</span>
          </a>
          <a 
            href="#news" 
            @click.prevent="scrollTo('#news')" 
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-blue-600 border-b-2 border-blue-600 font-semibold': activeSection === 'news'
            }"
            :aria-current="activeSection === 'news' ? 'page' : undefined"
          >
            <span class="flex items-center">Insights</span>
          </a>
          <a 
            href="#about" 
            @click.prevent="scrollTo('#about')" 
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-blue-600 border-b-2 border-blue-600 font-semibold': activeSection === 'about'
            }"
            :aria-current="activeSection === 'about' ? 'page' : undefined"
          >
            <span class="flex items-center">Contact</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile menu - Better accessibility approach that works with animation -->
    <div 
      class="md:hidden transition-all duration-300 ease-in-out overflow-hidden" 
      :class="{
        'max-h-60': mobileMenuOpen, 
        'max-h-0': !mobileMenuOpen,
        'bg-white shadow-md': globalState.reduceMotion && mobileMenuOpen
      }"
      id="mobile-menu"
      role="menu"
      aria-labelledby="mobile-menu-button"
      :aria-hidden="!mobileMenuOpen"
      ref="mobileMenuRef"
    >
      <!-- Keep the menu in the DOM but disable tab access when hidden -->
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
        <a 
          href="#top" 
          @click.prevent="scrollTo('#top'); mobileMenuOpen = false" 
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          :aria-current="activeSection === 'top' ? 'page' : undefined"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </span>
        </a>
        <a 
          href="#about-us" 
          @click.prevent="scrollTo('#about-us'); mobileMenuOpen = false" 
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          :aria-current="activeSection === 'about-us' ? 'page' : undefined"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </span>
        </a>
        <a 
          href="#expertise" 
          @click.prevent="scrollTo('#expertise'); mobileMenuOpen = false" 
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          :aria-current="activeSection === 'expertise' ? 'page' : undefined"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Services
          </span>
        </a>
        <a 
          href="#news" 
          @click.prevent="scrollTo('#news'); mobileMenuOpen = false" 
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          :aria-current="activeSection === 'news' ? 'page' : undefined"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Insights
          </span>
        </a>
        <a 
          href="#about" 
          @click.prevent="scrollTo('#about'); mobileMenuOpen = false" 
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-blue-600 hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          :aria-current="activeSection === 'about' ? 'page' : undefined"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </span>
        </a>
      </div>
    </div>
    
  </nav>
  
  <!-- Back to top button - Positioned based on accessibility widget preference -->
  <div 
    :class="[
      'fixed bottom-0 transition-opacity duration-300 back-to-top-container',
      {'opacity-100': showScrollButton, 'opacity-0 pointer-events-none': !showScrollButton},
      globalState.widgetPosition === 'bottom-left' ? 'left-aligned' : 'right-aligned'
    ]"
    :style="{
      left: globalState.widgetPosition === 'bottom-left' ? '20px !important' : 'auto !important',
      right: globalState.widgetPosition === 'bottom-left' ? 'auto !important' : '20px !important'
    }"
    :data-position="globalState.widgetPosition === 'bottom-left' ? 'left' : 'right'"
    role="complementary"
    aria-label="Page navigation"
  >
    <button 
      @click="scrollTo('#top')" 
      aria-label="Scroll back to top of page"
      class="back-to-top-btn rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
      title="Back to top"
    >
      <span class="sr-only">Back to top</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
/**
 * Import section with logical grouping:
 * 1. Vue core functionality
 * 2. Composables and utilities
 */
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { globalState } from '~/composables/globalState.js';
import { useNuxtApp } from '#app';

/**
 * Get the Nuxt app instance for accessibility announcements
 * Used to provide screen reader notifications for navigation changes
 */
const nuxtApp = useNuxtApp();

/**
 * Reactive state variables for navigation behavior
 */
const scrolled = ref(true);               // Always true to keep navbar visible
const mobileMenuOpen = ref(false);        // Mobile menu open/closed state
const showScrollButton = ref(false);      // Whether to show back-to-top button
const mobileMenuRef = ref(null);          // Reference to mobile menu DOM element
const activeSection = ref('top');         // Currently active section for nav highlighting

/**
 * Handles scroll events to update navbar appearance and behavior
 * Updates scroll tracking, back-to-top button visibility, progress bar,
 * and the currently active section for navigation highlighting
 */
const handleScroll = () => {
  // Always show navbar, only update scroll button visibility
  scrolled.value = true;
  const scrollPosition = window.scrollY;
  showScrollButton.value = scrollPosition > 300;
  
  // Update active section based on scroll position
  updateActiveSection();
};

/**
 * Determines which section is currently active based on scroll position
 * Used to highlight the correct navigation item in the navbar
 * Sections are checked from bottom to top to ensure proper activation
 */
const updateActiveSection = () => {
  if (process.client) {
    // Add footer selection detection - Order matters: check from bottom to top
    const sections = ['about', 'news', 'expertise', 'about-us', 'top'];
    const scrollPosition = window.scrollY + 200; // Add offset to trigger section earlier
    
    // Special case: if we're near the bottom of the page, activate the "Contact" section
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = window.scrollY + windowHeight;
    
    // If we're within 100px of the bottom, consider it the "about" (contact) section
    if (bodyHeight - scrollBottom < 100) {
      activeSection.value = 'about';
      return;
    }
    
    // Normal section detection logic
    for (const section of sections) {
      const element = document.getElementById(section) || document.querySelector(`[id="${section}"]`);
      if (element && element.offsetTop <= scrollPosition) {
        activeSection.value = section;
        return;
      }
    }
    
    // Default to top if no section is active
    activeSection.value = 'top';
  }
};

/**
 * Smooth scrolls to the specified section and updates active section state
 * Also announces section changes to screen readers for accessibility
 * @param {string} selector - CSS selector for the target section
 */
const scrollTo = (selector) => {
  const topPosition = selector === '#top' ? 0 : document.querySelector(selector)?.offsetTop || 0;
  window.scrollTo({ top: topPosition, behavior: 'smooth' });
  
  // Update active section
  const sectionName = selector.replace('#', '');
  activeSection.value = sectionName;
  
  // Announce section change to screen readers
  if (nuxtApp.$announce) {
    // Convert section ID to a more readable name
    const sectionLabels = {
      'top': 'home',
      'about-us': 'about us',
      'expertise': 'services',
      'news': 'insights and thought leadership',
      'about': 'contact information'
    };
    
    const readableName = sectionLabels[sectionName] || sectionName;
    nuxtApp.$announce(`Navigated to ${readableName} section`, 'polite');
  }
};

/**
 * Sets up a keyboard focus trap for the mobile menu
 * Ensures keyboard navigation stays within the menu when it's open
 * Implements accessibility best practices for modal-like components
 */
const setupFocusTrap = () => {
  if (!process.client) return;
  
  /**
   * Handles keyboard events for focus trapping in mobile menu
   * @param {KeyboardEvent} e - The keyboard event
   */
  const handleKeyDown = (e) => {
    if (!mobileMenuOpen.value) return;
    
    // If Escape key is pressed, close the menu
    if (e.key === 'Escape') {
      mobileMenuOpen.value = false;
      return;
    }
    
    // Only trap focus if Tab key is pressed
    if (e.key !== 'Tab') return;
    
    // Get all focusable elements in the menu
    const menu = mobileMenuRef.value;
    if (!menu) return;
    
    const focusableElements = menu.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // If shift+tab on first element, move to last element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } 
    // If tab on last element, move to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };
  
  // Add event listener
  window.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
};

// Lifecycle hooks
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize values
    
    // Set up focus trap for accessibility
    const cleanup = setupFocusTrap();
    
    // Initialize back-to-top button position based on current accessibility settings
    nextTick(() => {
      const backToTopBtn = document.querySelector('.back-to-top-container');
      if (backToTopBtn) {
        if (globalState.widgetPosition === 'bottom-left') {
          backToTopBtn.style.setProperty('left', '20px', 'important');
          backToTopBtn.style.setProperty('right', 'auto', 'important');
          backToTopBtn.classList.add('left-aligned');
          backToTopBtn.classList.remove('right-aligned');
          backToTopBtn.setAttribute('data-position', 'left');
        } else {
          backToTopBtn.style.setProperty('right', '20px', 'important');
          backToTopBtn.style.setProperty('left', 'auto', 'important');
          backToTopBtn.classList.add('right-aligned');
          backToTopBtn.classList.remove('left-aligned');
          backToTopBtn.setAttribute('data-position', 'right');
        }
      }
    });
    
    // Add watch for global state changes
    watch(() => globalState.currentTab, () => {
      nextTick(handleScroll);
    });
    
    // Watch for widget position changes to ensure back-to-top button updates
    watch(() => globalState.widgetPosition, (newPosition) => {
      // console.log('Back-to-top position updated to:', newPosition);
      
      // Force a re-render by slightly manipulating the DOM
      const backToTopBtn = document.querySelector('.back-to-top-container');
      if (backToTopBtn) {
        // Apply position directly through DOM for immediate effect
        if (newPosition === 'bottom-left') {
          backToTopBtn.style.left = '20px';
          backToTopBtn.style.right = 'auto';
          // Force reflow
          backToTopBtn.classList.remove('right-aligned');
          backToTopBtn.classList.add('left-aligned');
        } else {
          backToTopBtn.style.right = '20px';
          backToTopBtn.style.left = 'auto';
          // Force reflow
          backToTopBtn.classList.remove('left-aligned');
          backToTopBtn.classList.add('right-aligned');
        }
      }
    });
    
    // Define the event handler as a named function for proper cleanup
    const handleWidgetPositionUpdate = (event) => {
      if (event.detail && event.detail.position) {
        // console.log('NavbarMain received position update:', event.detail.position);
        // Position update received, force immediate update of back-to-top button
        const backToTopBtn = document.querySelector('.back-to-top-container');
        if (backToTopBtn) {
          if (event.detail.position === 'bottom-left') {
            // Force more specific styling for left-handed mode
            backToTopBtn.style.setProperty('left', '20px', 'important');
            backToTopBtn.style.setProperty('right', 'auto', 'important');
            backToTopBtn.classList.remove('right-aligned');
            backToTopBtn.classList.add('left-aligned');
            backToTopBtn.setAttribute('data-position', 'left');
            
            // Also update the HTML data attribute for CSS targeting
            document.documentElement.setAttribute('data-widget-position', 'bottom-left');
          } else {
            // Force more specific styling for right-handed mode
            backToTopBtn.style.setProperty('right', '20px', 'important');
            backToTopBtn.style.setProperty('left', 'auto', 'important');
            backToTopBtn.classList.remove('left-aligned');
            backToTopBtn.classList.add('right-aligned');
            backToTopBtn.setAttribute('data-position', 'right');
            
            // Also update the HTML data attribute for CSS targeting
            document.documentElement.setAttribute('data-widget-position', 'bottom-right');
          }
          // console.log('Back-to-top button updated to:', event.detail.position);
        }
      }
    };
    
    // Register the event listener
    document.addEventListener('update-widget-position', handleWidgetPositionUpdate);
    
    // Cleanup function
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('update-widget-position', handleWidgetPositionUpdate);
      if (cleanup) cleanup();
    });
  }
});
</script>

<style scoped>
/* Force-hide the hamburger on desktop */
@media (min-width: 768px) {
  button[aria-controls="mobile-menu"] {
    display: none !important;
  }
}


/* Back to top button styling */
.back-to-top-btn {
  background-color: #ffcc00;
  color: #333;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease !important;
  position: relative;
}

.back-to-top-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(51, 51, 51, 0.3);
  transition: all 0.2s ease;
}

/* Force hover effect with a higher specificity selector */
.back-to-top-container button.back-to-top-btn:hover {
  background-color: #e6b800 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25) !important;
}

.back-to-top-container button.back-to-top-btn:hover::after {
  border-color: rgba(51, 51, 51, 0.5);
}

/* Custom positioning classes for back-to-top button */
.back-to-top-container.left-aligned {
  left: 20px !important;
  right: auto !important;
}

.back-to-top-container.right-aligned {
  right: 20px !important;
  left: auto !important;
}

/* Remove conflicting z-index */

/* Mobile menu styling */
#mobile-menu {
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

#mobile-menu.max-h-0 {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}

#mobile-menu.max-h-60 {
  max-height: 500px; /* Explicit height to ensure animation works */
  opacity: 1;
  pointer-events: auto;
}

/* Logo hover effect - subtle upward movement */
.hover\:translate-y-\[-2px\]:hover {
  transform: translateY(-2px) !important;
}

/* Mobile-specific styles for hamburger menu */
@media (max-width: 767px) {
  /* Ensure hamburger menu is properly visible when scrolled */
  nav.bg-white button[aria-controls="mobile-menu"] {
    color: #374151 !important;
  }
  
  /* Ensure hamburger menu is properly visible when not scrolled */
  nav.bg-transparent button[aria-controls="mobile-menu"] {
    color: white !important;
  }
}
</style>