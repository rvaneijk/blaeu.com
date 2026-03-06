<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <!-- ACCESSIBILITY: Skip Navigation Link -->
  <a href="#main-content" class="skip-to-content" tabindex="0">Skip to main content</a>

  <!-- MAIN NAVIGATION CONTAINER -->
  <nav class="w-full z-40 bg-white dark:bg-gray-900 shadow-md opacity-100">
    <!-- =================================================================== -->
    <!-- TIER 1: PRIMARY NAVIGATION                                          -->
    <!-- Main site navigation with logo, primary links, and mobile toggle    -->
    <!-- =================================================================== -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4">
        <div class="relative flex items-center justify-between h-16">
          <!-- LEFT: Mobile hamburger | Desktop logo -->
          <div class="flex items-center">
            <!-- Mobile-only: hamburger (left) -->
            <button
              class="md:hidden p-2 text-gray-600 dark:text-gray-300"
              style="touch-action: manipulation"
              aria-label="Toggle mobile menu"
              @click="toggleMobileMenu"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  v-if="!mobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <!-- Desktop-only: logo (left) -->
            <div class="hidden md:flex items-center ml-2">
              <span class="logo-tooltip-wrap">
                <NuxtLink to="/" class="flex items-center" aria-label="Go to homepage">
                  <NuxtImg
                    src="/assets/png/logo_transparent.png"
                    alt="Blaeu Logo"
                    class="h-8"
                    format="webp"
                    quality="85"
                    :width="90"
                    :height="32"
                  />
                </NuxtLink>
                <span class="logo-tooltip-text">Go to homepage</span>
              </span>
            </div>
          </div>

          <!-- Mobile-only: logo centered -->
          <div class="md:hidden absolute left-1/2 -translate-x-1/2">
            <NuxtLink to="/" class="flex items-center" aria-label="Go to homepage">
              <NuxtImg
                src="/assets/png/logo_transparent.png"
                alt="Blaeu Logo"
                class="h-8"
                format="webp"
                quality="85"
                :width="90"
                :height="32"
              />
            </NuxtLink>
          </div>

          <!-- DESKTOP PRIMARY NAVIGATION -->
          <div class="hidden md:flex md:items-center md:space-x-8 font-amblelight">
            <!-- Home -->
            <NuxtLink
              to="/"
              class="font-medium text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
              :class="{
                'text-gray-900 dark:text-gray-100 font-semibold':
                  $route.path === '/' && !$route.hash,
              }"
            >
              Home
            </NuxtLink>

            <!-- About -->
            <NuxtLink
              to="/team/rvaneijk"
              class="font-medium text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
              :class="{
                'text-gray-900 dark:text-gray-100 font-semibold': $route.path === '/team/rvaneijk',
              }"
            >
              About
            </NuxtLink>

            <!-- Portfolio -->
            <NuxtLink
              to="/portfolio"
              class="font-medium text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
              :class="{
                'text-gray-900 dark:text-gray-100 font-semibold':
                  $route.path === '/portfolio' || $route.path.startsWith('/recordings'),
              }"
            >
              Portfolio
            </NuxtLink>

            <!-- Blog -->
            <NuxtLink
              to="/blog"
              class="font-medium text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
              :class="{
                'text-gray-900 dark:text-gray-100 font-semibold': $route.path.startsWith('/blog'),
              }"
            >
              Blog
            </NuxtLink>

            <!-- Contact -->
            <NuxtLink
              to="/contact"
              class="font-medium text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
              :class="{
                'text-gray-900 dark:text-gray-100 font-semibold': $route.path === '/contact',
              }"
            >
              Contact
            </NuxtLink>

            <!-- Icon toolbar separator -->
            <div
              class="flex items-center border-l border-gray-200 dark:border-gray-700 pl-4 ml-4 gap-2"
            >
              <!-- Dark Mode Toggle -->
              <span class="darkmode-tooltip-wrap">
                <button
                  class="dark-mode-toggle dark-mode-toggle-desktop p-1 text-gray-500 hover:text-brand-gold transition-colors"
                  :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                  @click="toggleDark($event)"
                >
                  <svg
                    v-if="isDark"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
                <span class="darkmode-tooltip-text">
                  {{ isDark ? 'Switch to light mode' : 'Switch to dark mode' }}
                </span>
              </span>

              <!-- Accessibility Toggle -->
              <span class="a11y-tooltip-wrap">
                <button
                  class="a11y-toggle dark-mode-toggle-desktop p-1 text-gray-500 hover:text-brand-gold transition-colors"
                  aria-label="Open accessibility settings"
                  @click="toggleAccessibility($event)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="4.5" r="1.5" fill="currentColor" stroke="none" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v3m0 0l-3 7m3-7l3 7m-8-9h10"
                    />
                    <circle cx="12" cy="12" r="10" stroke-width="2" />
                  </svg>
                </button>
                <span class="a11y-tooltip-text">Accessibility settings</span>
              </span>
            </div>
          </div>

          <!-- MOBILE RIGHT: dark mode + accessibility -->
          <div class="flex items-center md:hidden">
            <button
              class="dark-mode-toggle p-2 text-gray-500 hover:text-brand-gold transition-colors"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="toggleDark($event)"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button
              class="a11y-toggle p-2 text-gray-500 hover:text-brand-gold transition-colors"
              aria-label="Open accessibility settings"
              title="Accessibility settings"
              @click="toggleAccessibility($event)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="4.5" r="1.5" fill="currentColor" stroke="none" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v3m0 0l-3 7m3-7l3 7m-8-9h10"
                />
                <circle cx="12" cy="12" r="10" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- MOBILE NAVIGATION MENU                                              -->
    <!-- =================================================================== -->
    <div v-show="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-900 shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          to="/"
          class="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
          @click="closeMobileMenu"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/team/rvaneijk"
          class="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
          @click="closeMobileMenu"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/portfolio"
          class="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
          @click="closeMobileMenu"
        >
          Portfolio
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
          @click="closeMobileMenu"
        >
          Blog
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="block px-3 py-2 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
          @click="closeMobileMenu"
        >
          Contact
        </NuxtLink>
      </div>
    </div>
  </nav>

  <!-- =================================================================== -->
  <!-- BACK-TO-TOP BUTTON                                                  -->
  <!-- Simple back-to-top button that appears when scrolling              -->
  <!-- =================================================================== -->
  <div
    :class="[
      'fixed z-50 transition-all duration-300 back-to-top-container right-aligned',
      { 'opacity-100': showScrollButton, 'opacity-0 pointer-events-none': !showScrollButton },
    ]"
    :style="{
      right: '20px',
      left: 'auto',
      bottom: backToTopBottom,
    }"
    data-position="right"
    role="complementary"
    aria-label="Page navigation"
  >
    <button
      aria-label="Scroll back to top of page"
      class="back-to-top-btn rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
      title="Back to top"
      @click="scrollToTop"
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
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useBackToTop } from '~/composables/useBackToTop'
  import { useDarkMode } from '~/composables/useDarkMode'
  import { globalState } from '~/composables/globalState'

  defineOptions({
    name: 'NavbarMinimal',
  })

  // Simple reactive state without composable
  const mobileMenuOpen = ref(false)

  // Back-to-top functionality
  const { showScrollButton, scrollToTop } = useBackToTop()

  // Dark mode
  const { isDark, toggleDarkMode: _toggleDarkMode } = useDarkMode()
  const toggleDark = (e: Event): void => {
    ;(e.currentTarget as HTMLElement)?.blur()
    _toggleDarkMode()
  }

  // Back-to-top position: lower when cookie widget is hidden (return visitors)
  const backToTopBottom = computed(() => (globalState.cookiePolicyAcknowledged ? '20px' : '90px'))

  // Accessibility widget toggle
  const toggleAccessibility = (e: Event): void => {
    ;(e.currentTarget as HTMLElement)?.blur()
    document.dispatchEvent(new CustomEvent('toggle-accessibility-widget'))
  }

  // Mobile menu methods
  const toggleMobileMenu = (): void => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  const closeMobileMenu = (): void => {
    mobileMenuOpen.value = false
  }

  // Close mobile menu when clicking outside the navbar
  const handleClickOutside = (e: Event): void => {
    if (!mobileMenuOpen.value) return
    const nav = (e.target as HTMLElement).closest('nav')
    if (!nav) closeMobileMenu()
  }

  onMounted(() => {
    document.addEventListener('pointerdown', handleClickOutside)
  })
  onUnmounted(() => {
    document.removeEventListener('pointerdown', handleClickOutside)
  })
</script>

<style scoped>
  .skip-to-content {
    position: absolute;
    top: -9999px;
    left: -9999px;
    width: 1px;
    height: 1px;
    padding: 8px 10px;
    background: #ffcc00;
    color: #333;
    font-weight: bold;
    text-decoration: none;
    z-index: 100;
    transition: all 0.3s;
    overflow: hidden;
  }

  .skip-to-content:focus {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: visible;
  }

  /* Dark mode toggle */
  .darkmode-tooltip-wrap {
    position: relative;
    display: inline-flex;
  }
  .darkmode-tooltip-text {
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #1f2937;
    color: #f9fafb;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 50;
  }
  .darkmode-tooltip-text::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-bottom-color: #1f2937;
  }
  @media (min-width: 768px) {
    .darkmode-tooltip-wrap:hover .darkmode-tooltip-text,
    .darkmode-tooltip-wrap:focus-within .darkmode-tooltip-text {
      opacity: 1;
    }
    .darkmode-tooltip-wrap:active .darkmode-tooltip-text {
      opacity: 0;
    }
  }

  .logo-tooltip-wrap {
    position: relative;
    display: inline-flex;
  }
  .logo-tooltip-text {
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #1f2937;
    color: #f9fafb;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 50;
  }
  .logo-tooltip-text::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-bottom-color: #1f2937;
  }
  @media (min-width: 768px) {
    .logo-tooltip-wrap:hover .logo-tooltip-text,
    .logo-tooltip-wrap:focus-within .logo-tooltip-text {
      opacity: 1;
    }
    .logo-tooltip-wrap:active .logo-tooltip-text {
      opacity: 0;
    }
  }

  /* Accessibility toggle tooltip */
  .a11y-tooltip-wrap {
    position: relative;
    display: inline-flex;
  }
  .a11y-tooltip-text {
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #1f2937;
    color: #f9fafb;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 50;
  }
  .a11y-tooltip-text::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-bottom-color: #1f2937;
  }
  @media (min-width: 768px) {
    .a11y-tooltip-wrap:hover .a11y-tooltip-text,
    .a11y-tooltip-wrap:focus-within .a11y-tooltip-text {
      opacity: 1;
    }
    .a11y-tooltip-wrap:active .a11y-tooltip-text {
      opacity: 0;
    }
  }

  .a11y-toggle {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  .dark-mode-toggle {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }
  .dark-mode-toggle-desktop {
    transform: translateY(-3px);
  }

  /* Back to top button styling */
  .back-to-top-btn {
    background-color: #ffd700;
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

  .back-to-top-btn:hover {
    background-color: #e6c200 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25) !important;
  }

  .back-to-top-btn:hover::after {
    border-color: rgba(51, 51, 51, 0.5);
  }
</style>
