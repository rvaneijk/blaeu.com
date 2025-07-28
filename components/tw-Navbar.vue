<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!-- 
  @component tw-Navbar
  @description Navigation component that provides site-wide navigation with scrolling functionality.
  Features responsive design with mobile menu, accessibility enhancements, and visual effects based on scroll position.
  Includes skip-to-content link and proper ARIA attributes for screen readers.
  @example
  <tw-Navbar />
-->
<template>
  <!-- Custom skip link for keyboard users - should be the first focusable element -->
  <a href="#main-content" class="skip-to-content" tabindex="0">Skip to main content</a>

  <nav
    class="fixed w-full z-40 transition-all duration-300 top-0 bg-white shadow-md opacity-100"
    aria-hidden="false"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand - Using Vue router for smooth navigation to main page -->
        <div class="flex items-center ml-2">
          <NuxtLink to="/" class="flex items-center">
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
          </NuxtLink>
        </div>

        <!-- Mobile menu button - Hidden on desktop -->
        <button
          id="mobile-menu-button"
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md md:!hidden text-gray-600 hover:text-gray-900"
          aria-controls="mobile-menu"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="h-6 w-6"
            :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop menu - Increased font size from text-sm to text-base -->
        <div
          class="hidden md:flex md:items-center md:space-x-8 font-amblelight"
          role="navigation"
          aria-label="Desktop Navigation"
          tabindex="-1"
        >
          <a
            href="/"
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-brand-blue border-b-2 border-brand-blue font-semibold': activeSection === 'top',
            }"
            :aria-current="activeSection === 'top' ? 'page' : undefined"
          >
            <span class="flex items-center">Home</span>
          </a>
          <a
            href="#book"
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-brand-blue border-b-2 border-brand-blue font-semibold': activeSection === 'book',
            }"
            :aria-current="activeSection === 'book' ? 'page' : undefined"
            @click.prevent="scrollTo('#book')"
          >
            <span class="flex items-center">My Book</span>
          </a>
          <a
            href="#media"
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-brand-blue border-b-2 border-brand-blue font-semibold': activeSection === 'media',
            }"
            :aria-current="activeSection === 'media' ? 'page' : undefined"
            @click.prevent="scrollTo('#media')"
          >
            <span class="flex items-center">Insights</span>
          </a>
          <a
            href="#research"
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-brand-blue border-b-2 border-brand-blue font-semibold':
                activeSection === 'research',
            }"
            :aria-current="activeSection === 'research' ? 'page' : undefined"
            @click.prevent="scrollTo('#research')"
          >
            <span class="flex items-center">Publications</span>
          </a>
          <a
            href="#about"
            class="font-medium text-base transition-all duration-200 inline-flex items-center text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:rounded-md hover:px-2 hover:py-1 hover:scale-105"
            :class="{
              'text-brand-blue border-b-2 border-brand-blue font-semibold': activeSection === 'about',
            }"
            :aria-current="activeSection === 'about' ? 'page' : undefined"
            @click.prevent="scrollTo('#about')"
          >
            <span class="flex items-center">Contact</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile menu - Better accessibility approach that works with animation -->
    <div
      id="mobile-menu"
      ref="mobileMenuRef"
      class="md:hidden transition-all duration-300 ease-in-out overflow-hidden"
      :class="{
        'max-h-60': mobileMenuOpen,
        'max-h-0': !mobileMenuOpen,
        'bg-white shadow-md': globalState.reduceMotion && mobileMenuOpen,
      }"
      role="menu"
      aria-labelledby="mobile-menu-button"
      :aria-hidden="!mobileMenuOpen"
    >
      <!-- Keep the menu in the DOM but disable tab access when hidden -->
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
        <a
          href="/"
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          @click="mobileMenuOpen = false"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </span>
        </a>
        <a
          href="#book"
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          @click.prevent="handleMenuClick('#book')"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            My Book
          </span>
        </a>
        <a
          href="#media"
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          @click.prevent="handleMenuClick('#media')"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Insights
          </span>
        </a>
        <a
          href="#research"
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          @click.prevent="handleMenuClick('#research')"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Publications
          </span>
        </a>
        <a
          href="#about"
          class="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:font-semibold hover:text-brand-blue hover:bg-blue-50 hover:pl-4 hover:scale-105"
          role="menuitem"
          :tabindex="mobileMenuOpen ? '0' : '-1'"
          @click.prevent="handleMenuClick('#about')"
        >
          <span class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
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
      'fixed bottom-20 z-50 transition-opacity duration-300 back-to-top-container',
      { 'opacity-100': showScrollButton, 'opacity-0 pointer-events-none': !showScrollButton },
      globalState.widgetPosition === 'bottom-left' ? 'left-aligned' : 'right-aligned',
    ]"
    :style="{
      left: globalState.widgetPosition === 'bottom-left' ? '20px !important' : 'auto !important',
      right: globalState.widgetPosition === 'bottom-left' ? 'auto !important' : '20px !important',
    }"
    :data-position="globalState.widgetPosition === 'bottom-left' ? 'left' : 'right'"
    role="complementary"
    aria-label="Page navigation"
  >
    <button
      aria-label="Scroll back to top of page"
      class="back-to-top-btn rounded-full p-3 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
      title="Back to top"
      @click="scrollTo('#top')"
    >
      <span class="sr-only">Back to top</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import { globalState } from '~/composables/globalState'
  import { useNuxtApp } from '#app'

  // Get the Nuxt app instance
  const nuxtApp = useNuxtApp()

  // Reactive state
  const scrolled = ref(true) // Always set to true to keep navbar visible
  const mobileMenuOpen = ref(false)
  const showScrollButton = ref(false)
  const mobileMenuRef = ref<HTMLElement | null>(null)
  const activeSection = ref('top')

  // Update scroll state and progress bar width using CSS custom property
  const handleScroll = (): void => {
    // Always show navbar, only update scroll button visibility
    scrolled.value = true
    const scrollPosition = window.scrollY
    showScrollButton.value = scrollPosition > 300

    // Update active section based on scroll position
    updateActiveSection()
  }

  // Function to determine active section based on scroll position
  const updateActiveSection = (): void => {
    if (process.client) {
      // Add footer selection detection - Order matters: check from bottom to top
      // Updated order to match actual DOM structure: hero -> book -> media -> research -> footer
      const sections = ['about', 'research', 'media', 'book', 'top']
      const scrollPosition = window.scrollY + 200 // Add offset to trigger section earlier

      // Special case: if we're near the bottom of the page, activate the "Contact" section
      const bodyHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight
      const scrollBottom = window.scrollY + windowHeight

      // If we're within 50px of the bottom, consider it the "about" (contact) section
      if (bodyHeight - scrollBottom < 50) {
        activeSection.value = 'about'
        return
      }

      // Normal section detection logic
      for (const section of sections) {
        const element =
          document.getElementById(section) || document.querySelector(`[id="${section}"]`)
        if (element && element.offsetTop <= scrollPosition) {
          activeSection.value = section
          return
        }
      }

      // Default to top if no section is active
      activeSection.value = 'top'
    }
  }

  /**
   * Smoothly scrolls to the specified section and updates the active section state.
   * Also announces the section change to screen readers for accessibility.
   * @param {string} selector - CSS selector of the target section
   * @returns {void}
   */
  const scrollTo = (selector: string): void => {
    const topPosition =
      selector === '#top' ? 0 : (document.querySelector(selector) as HTMLElement)?.offsetTop || 0
    window.scrollTo({ top: topPosition, behavior: 'smooth' })

    // Update active section
    const sectionName = selector.replace('#', '')
    activeSection.value = sectionName

    // Announce section change to screen readers
    if (nuxtApp.$announce) {
      // Convert section ID to a more readable name
      const sectionLabels: Record<string, string> = {
        top: 'home',
        book: 'my book',
        research: 'research publications',
        media: 'insights and thought leadership',
        about: 'contact information',
      }

      const readableName = sectionLabels[sectionName] || sectionName
      nuxtApp.$announce(`Navigated to ${readableName} section`, 'polite')
    }
  }

  const handleMenuClick = (selector: string): void => {
    scrollTo(selector)
    mobileMenuOpen.value = false
  }

  // Setup keyboard trap for mobile menu
  const setupFocusTrap = (): (() => void) | undefined => {
    if (!process.client) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!mobileMenuOpen.value) return

      // If Escape key is pressed, close the menu
      if (e.key === 'Escape') {
        mobileMenuOpen.value = false
        return
      }

      // Only trap focus if Tab key is pressed
      if (e.key !== 'Tab') return

      // Get all focusable elements in the menu
      const menu = mobileMenuRef.value
      if (!menu) return

      const focusableElements = menu.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // If shift+tab on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        ;(lastElement as HTMLElement).focus()
      }
      // If tab on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        ;(firstElement as HTMLElement).focus()
      }
    }

    // Add event listener
    window.addEventListener('keydown', handleKeyDown)

    // Return cleanup function
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    if (!process.client) return

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize values

    // Set up focus trap for accessibility
    const cleanup = setupFocusTrap()

    // Add watch for global state changes (if needed)
    watch(
      () => globalState.currentTab,
      () => {
        nextTick(handleScroll)
      }
    )

    // Announce mobile menu state changes
    watch(
      () => mobileMenuOpen.value,
      isOpen => {
        if (nuxtApp.$announce) {
          nuxtApp.$announce(isOpen ? 'Mobile menu opened' : 'Mobile menu closed', 'polite')
        }

        // When opening menu, focus the first link
        if (isOpen && mobileMenuRef.value) {
          nextTick(() => {
            const firstLink = mobileMenuRef.value?.querySelector('a')
            if (firstLink) firstLink.focus()
          })
        }
      }
    )

    // Listen for widget position update events
    const handleWidgetPositionUpdate = (event: CustomEvent): void => {
      if (event.detail && event.detail.position) {
        // Force immediate update of back-to-top button
        const backToTopBtn = document.querySelector('.back-to-top-container')
        if (backToTopBtn) {
          if (event.detail.position === 'bottom-left') {
            // Force more specific styling for left-handed mode
            ;(backToTopBtn as HTMLElement).style.setProperty('left', '20px', 'important')
            ;(backToTopBtn as HTMLElement).style.setProperty('right', 'auto', 'important')
            backToTopBtn.classList.remove('right-aligned')
            backToTopBtn.classList.add('left-aligned')
            backToTopBtn.setAttribute('data-position', 'left')
          } else {
            // Force more specific styling for right-handed mode
            ;(backToTopBtn as HTMLElement).style.setProperty('right', '20px', 'important')
            ;(backToTopBtn as HTMLElement).style.setProperty('left', 'auto', 'important')
            backToTopBtn.classList.remove('left-aligned')
            backToTopBtn.classList.add('right-aligned')
            backToTopBtn.setAttribute('data-position', 'right')
          }
        }
      }
    }

    // Register event listener
    document.addEventListener('update-widget-position', handleWidgetPositionUpdate)

    // Clean up on component unmount
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('update-widget-position', handleWidgetPositionUpdate)
      if (cleanup) cleanup()
    })
  })

  // Cleanup handled in onMounted
</script>

<style scoped>
  /* Force-hide the hamburger on desktop */
  @media (min-width: 768px) {
    button[aria-controls='mobile-menu'] {
      display: none !important;
    }
  }

  /* Back to top button styling */
  .back-to-top-btn {
    background-color: #FFD700;
    color: #333;
  }

  /* Skip to content link styling */
  .skip-to {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px 10px;
    background: #ffcc00;
    color: #333;
    font-weight: bold;
    text-decoration: none;
    z-index: 100;
    transition: top 0.3s;
  }

  .skip-to:focus {
    top: 0;
  }

  /* Mobile menu styling */
  #mobile-menu {
    transition:
      max-height 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
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

  /* Mobile menu specific styles */
  @media (max-width: 767px) {
    #mobile-menu {
      display: block !important;
      height: auto;
    }

    #mobile-menu.max-h-0 {
      visibility: hidden;
      opacity: 0;
    }

    #mobile-menu.max-h-60 {
      visibility: visible;
      opacity: 1;
    }

    /* Ensure hamburger menu is properly visible when scrolled */
    nav.bg-white button[aria-controls='mobile-menu'] {
      color: #374151 !important;
    }

    /* Ensure hamburger menu is properly visible when not scrolled */
    nav.bg-transparent button[aria-controls='mobile-menu'] {
      color: white !important;
    }
  }
</style>
