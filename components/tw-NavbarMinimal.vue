<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <!-- ACCESSIBILITY: Skip Navigation Link -->
  <a href="#main-content" class="skip-to-content" tabindex="0">Skip to main content</a>

  <!-- MAIN NAVIGATION CONTAINER -->
  <nav class="fixed w-full z-40 bg-white shadow-md opacity-100">
    <!-- =================================================================== -->
    <!-- TIER 1: PRIMARY NAVIGATION                                          -->
    <!-- Main site navigation with logo, primary links, and mobile toggle    -->
    <!-- =================================================================== -->
    <div class="border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- BRAND LOGO -->
          <div class="flex items-center ml-2">
            <NuxtLink to="/" class="flex items-center">
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
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{ 'text-brand-blue font-semibold': $route.path === '/' && !$route.hash }"
            >
              Home
            </NuxtLink>

            <!-- ABOUT DROPDOWN MENU -->
            <!-- <div class="relative">
              <button
                class="navbar-about-button font-medium text-base text-gray-700 hover:text-brand-gold"
                :class="{
                  'text-brand-gold font-semibold': isAboutActive,
                }"
                @click="toggleDropdown"
                @blur="handleDropdownBlur"
              >
                About
                <i class="fas fa-chevron-down ml-1 fa-xs" aria-hidden="true"></i>
              </button>

              <div
                v-show="showDropdown"
                class="absolute left-0 mt-2 w-48 bg-white rounded-xl border-0 z-[5000] transition-all duration-200 ease-in-out"
                style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15)"
                @click.stop
              >
                <div class="py-1">
                  <NuxtLink
                    to="/#about-us"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-brand-gold transition-colors"
                    @click="closeDropdown"
                  >
                    About Us
                  </NuxtLink>
                  <NuxtLink
                    to="/team"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-brand-gold transition-colors"
                    @click="closeDropdown"
                  >
                    Our Team
                  </NuxtLink>
                </div>
              </div>
            </div> -->

            <!-- About -->
            <NuxtLink
              to="/team/rvaneijk"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{
                'text-brand-blue font-semibold': $route.path === '/team/rvaneijk',
              }"
            >
              About
            </NuxtLink>

            <!-- Services -->
            <NuxtLink
              to="/#expertise"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{
                'text-brand-blue font-semibold':
                  $route.path === '/' && $route.hash === '#expertise',
              }"
            >
              Services
            </NuxtLink>

            <!-- Blog -->
            <NuxtLink
              to="/blog"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{ 'text-brand-blue font-semibold': $route.path.startsWith('/blog') }"
            >
              Blog
            </NuxtLink>

            <!-- Contact -->
            <NuxtLink
              to="/#about"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{
                'text-brand-blue font-semibold': $route.path === '/' && $route.hash === '#about',
              }"
            >
              Contact
            </NuxtLink>

            <!-- Dark Mode Toggle -->
            <button
              class="dark-mode-toggle dark-mode-toggle-desktop p-1 text-gray-500 hover:text-brand-gold transition-colors"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="toggleDarkMode"
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
          </div>

          <!-- MOBILE CONTROLS -->
          <div class="flex items-center md:hidden">
            <button
              class="dark-mode-toggle p-2 text-gray-500 hover:text-brand-gold transition-colors"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="toggleDarkMode"
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
              class="p-2 text-gray-600"
              aria-label="Toggle mobile menu"
              @click="toggleMobileMenu"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </div>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- MOBILE NAVIGATION MENU                                              -->
    <!-- =================================================================== -->
    <div v-show="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          to="/"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
          @click="closeMobileMenu"
        >
          Home
        </NuxtLink>
        <!-- <NuxtLink
          to="/#about-us"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
          @click="closeMobileMenu"
        >
          About Us
        </NuxtLink>
        <NuxtLink
          to="/team"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
          @click="closeMobileMenu"
        >
          Our Team
        </NuxtLink> -->
        <NuxtLink
          to="/team/rvaneijk"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
          @click="closeMobileMenu"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/#expertise"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
          @click="closeMobileMenu"
        >
          Services
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
          @click="closeMobileMenu"
        >
          Blog
        </NuxtLink>
        <NuxtLink
          to="/#about"
          class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue"
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
      'fixed bottom-20 z-50 transition-opacity duration-300 back-to-top-container right-aligned',
      { 'opacity-100': showScrollButton, 'opacity-0 pointer-events-none': !showScrollButton },
    ]"
    :style="{
      right: '20px !important',
      left: 'auto !important',
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
  import { ref } from 'vue'
  import { useBackToTop } from '~/composables/useBackToTop'
  import { useDarkMode } from '~/composables/useDarkMode'

  defineOptions({
    name: 'NavbarMinimal',
  })

  // Simple reactive state without composable
  const mobileMenuOpen = ref(false)

  // Back-to-top functionality
  const { showScrollButton, scrollToTop } = useBackToTop()

  // Dark mode
  const { isDark, toggleDarkMode } = useDarkMode()

  // Mobile menu methods
  const toggleMobileMenu = (): void => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  const closeMobileMenu = (): void => {
    mobileMenuOpen.value = false
  }
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

  /* Fix About button styling to match other nav items exactly */
  button.navbar-about-button,
  .navbar-about-button {
    color: rgb(55, 65, 81) !important; /* text-gray-700 */
    font-weight: 500 !important; /* font-medium */
    font-size: 1rem !important; /* text-base */
    font-family: inherit !important;
    line-height: 1.5rem !important; /* text-base line-height */
    display: inline-block !important;
    background: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    text-decoration: none !important;
    vertical-align: top !important;
    transform: translateY(-1px) !important;
    cursor: pointer !important;
    min-height: auto !important;
    min-width: auto !important;
    touch-action: auto !important;
    height: 1.5rem !important;
  }

  button.navbar-about-button:hover,
  .navbar-about-button:hover {
    color: #ffd700 !important; /* brand-gold */
    font-weight: 500 !important;
    text-decoration: none !important;
  }

  .navbar-about-button i {
    color: inherit !important;
    vertical-align: baseline !important;
    line-height: inherit !important;
  }

  /* Dark mode toggle */
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
