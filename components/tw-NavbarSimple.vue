<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <!-- ACCESSIBILITY: Skip Navigation Link -->
  <!-- Allows keyboard users to bypass navigation and jump directly to main content -->
  <!-- Hidden by default, becomes visible when focused via Tab key -->
  <a href="#main-content" class="skip-to-content" tabindex="0">Skip to main content</a>

  <!-- MAIN NAVIGATION CONTAINER -->
  <!-- Fixed positioning ensures navigation stays visible during scroll -->
  <!-- High z-index (40) places it above most content but below modals -->
  <nav class="fixed w-full z-40 bg-white shadow-md opacity-100">
    <!-- =================================================================== -->
    <!-- TIER 1: PRIMARY NAVIGATION                                          -->
    <!-- Main site navigation with logo, primary links, and mobile toggle    -->
    <!-- =================================================================== -->
    <div class="border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- BRAND LOGO -->
          <!-- Semantic link to home page with optimized image -->
          <div class="flex items-center ml-2">
            <NuxtLink to="/" class="flex items-center">
              <NuxtImg
                src="/assets/png/logo.png"
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
          <!-- Hidden on mobile (md:flex), contains main site navigation links -->
          <div class="hidden md:flex md:items-center md:space-x-8 font-amblelight">
            <!-- Home -->
            <NuxtLink
              to="/"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{ 'text-brand-blue font-semibold': _route.path === '/' }"
            >
              Home
            </NuxtLink>

            <!-- ABOUT DROPDOWN MENU -->
            <!-- Complex dropdown with accessibility features -->
            <!-- Uses click handlers and blur management for keyboard support -->
            <div class="relative">
              <button
                class="navbar-about-button font-medium text-base text-gray-700 hover:text-brand-gold"
                :class="{ 'active': isAboutActive || showDropdown }"
                @click="toggleDropdown"
                @blur="handleDropdownBlur"
              >
                About
                <i 
                  :class="showDropdown ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" 
                  class="ml-1 fa-xs" 
                  aria-hidden="true"
                ></i>
              </button>
              
              <!-- DROPDOWN MENU PANEL -->
              <!-- Conditionally rendered with v-show for better performance -->
              <!-- Positioned absolutely with custom shadow and rounded corners -->
              <div
                v-show="showDropdown"
                class="absolute left-0 mt-2 w-48 bg-white rounded-xl border-0 z-[5000] transition-all duration-200 ease-in-out"
                style="box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);"
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
                    to="/team/rvaneijk"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-brand-gold transition-colors"
                    @click="closeDropdown"
                  >
                    Rob van Eijk
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
            </div>

            <!-- Services -->
            <NuxtLink
              to="/#expertise"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
            >
              Services
            </NuxtLink>

            <!-- Blog -->
            <NuxtLink
              to="/blog"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
              :class="{ 'text-brand-blue font-semibold': _route.path === '/blog' }"
            >
              Blog
            </NuxtLink>

            <!-- Publications -->
            <NuxtLink
              to="/#news"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
            >
              Publications
            </NuxtLink>

            <!-- Contact -->
            <NuxtLink
              to="/#about"
              class="font-medium text-base text-gray-700 hover:text-brand-blue"
            >
              Contact
            </NuxtLink>
          </div>

          <!-- MOBILE MENU TOGGLE -->
          <!-- Hamburger menu button visible only on mobile -->
          <!-- Accessible with proper ARIA labeling (handled by icon) -->
          <button
            class="md:hidden p-2 text-gray-600"
            @click="toggleMobileMenu"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TIER 2: SECTION NAVIGATION                                          -->
    <!-- Dynamic secondary navigation that shows/hides based on scroll       -->
    <!-- Content changes based on current page route                         -->
    <!-- =================================================================== -->
    <div 
      class="tier2-nav bg-white h-12 overflow-hidden"
      :class="{ 'tier2-hidden': !showTier2 }"
    >
      <div class="container mx-auto px-4">
        <div class="flex justify-end space-x-6 h-12 items-center text-sm overflow-x-auto">
          <a
            v-for="section in currentSections"
            :key="section.id"
            :href="section.href"
            class="font-normal text-sm text-gray-600 hover:text-brand-blue whitespace-nowrap"
            :class="{ 'text-brand-blue border-b-2 border-brand-blue font-semibold': activeSection === section.id }"
            @click.prevent="scrollToSection(section.href)"
          >
            {{ section.label }}
          </a>
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- MOBILE NAVIGATION MENU                                              -->
    <!-- Full mobile menu panel with all navigation links                    -->
    <!-- Hidden by default, shown when mobileMenuOpen is true               -->
    <!-- =================================================================== -->
    <div
      v-show="mobileMenuOpen"
      class="md:hidden bg-white shadow-lg"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink to="/" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="/#about-us" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">About Us</NuxtLink>
        <NuxtLink to="/team/rvaneijk" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Rob van Eijk</NuxtLink>
        <NuxtLink to="/team" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Our Team</NuxtLink>
        <NuxtLink to="/#expertise" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Services</NuxtLink>
        <NuxtLink to="/blog" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Blog</NuxtLink>
        <NuxtLink to="/#news" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Publications</NuxtLink>
        <NuxtLink to="/#about" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-brand-blue" @click="closeMobileMenu">Contact</NuxtLink>
      </div>
    </div>
  </nav>

  <!-- =================================================================== -->
  <!-- BACK-TO-TOP BUTTON                                                  -->
  <!-- Accessibility-aware floating action button                          -->
  <!-- Dynamically positioned to avoid conflicts with accessibility widgets-->
  <!-- =================================================================== -->
  <div
    :class="[
      'fixed bottom-0 transition-opacity duration-300 back-to-top-container',
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
    <!-- ACCESSIBILITY FEATURES:
         - aria-label: Clear description for screen readers
         - title: Tooltip for mouse users  
         - sr-only span: Additional context for screen readers
         - focus:ring: Visible focus indicator for keyboard users
         - aria-hidden on icon: Prevents double-reading by screen readers
    -->
    <button
      aria-label="Scroll back to top of page"
      class="back-to-top-btn rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
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

<!--
/**
 * @fileoverview Simple Navigation Bar Component
 * 
 * A comprehensive navigation component featuring:
 * - Two-tier navigation (primary + section-based secondary)
 * - Responsive design with mobile hamburger menu
 * - Dropdown menu for About section
 * - Smooth scroll-based tier2 visibility
 * - Accessibility-first design with ARIA attributes
 * - Dynamic back-to-top button with widget conflict avoidance
 * 
 * This component serves as the main site navigation and integrates tightly
 * with the useNavigation composable for all interactive functionality.
 * 
 * @component tw-NavbarSimple
 * @since 1.0.0
 * 
 * @example
 * ```vue
 * <template>
 *   <tw-NavbarSimple />
 * </template>
 * ```
 * 
 * @accessibility
 * - Skip link for keyboard users
 * - ARIA labels and roles
 * - Focus management for dropdown
 * - Screen reader friendly
 * - High contrast support
 * 
 * @dependencies
 * - useNavigation composable (all interactive logic)
 * - globalState (accessibility widget positioning)
 * - Vue Router (route-based styling)
 * 
 * @relationship
 * This component follows the Vue 3 Composition API pattern of separating
 * presentation from logic. The useNavigation composable contains all the
 * complex state management, scroll handling, and business logic, while
 * this component focuses purely on:
 * - Template structure and styling
 * - User interaction binding
 * - Accessibility markup
 * - Responsive design implementation
 * 
 * This separation provides several benefits:
 * - Easier testing (logic can be tested independently)
 * - Better reusability (composable can be used by other nav components)
 * - Cleaner code organization (concerns are properly separated)
 * - Maintainability (changes to logic don't affect presentation)
 */
-->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { globalState } from '~/composables/globalState'
import { useNavigation } from '~/composables/useNavigation'

// Route information for active state styling
const _route = useRoute()

/**
 * Navigation state and methods from the useNavigation composable
 * This provides all interactive functionality including:
 * - Dropdown menu management
 * - Mobile menu toggle
 * - Scroll-based active section tracking
 * - Tier2 navigation visibility
 * - Back-to-top button control
 * - Smooth scrolling to sections
 */
const {
  // Reactive state for template binding
  showDropdown,      // About dropdown visibility
  mobileMenuOpen,    // Mobile menu toggle state
  activeSection,     // Currently active navigation section
  showTier2,         // Tier2 navigation visibility
  showScrollButton,  // Back-to-top button visibility
  isAboutActive,     // Computed: About section active state
  currentSections,   // Array of navigation sections for current page
  
  // Methods for template event handlers
  scrollToSection,   // Smooth scroll to specific section
  scrollTo,          // General scroll method (used by back-to-top)
  toggleDropdown,    // Toggle About dropdown
  closeDropdown,     // Close About dropdown
  handleDropdownBlur,// Handle dropdown blur events
  toggleMobileMenu,  // Toggle mobile menu
  closeMobileMenu    // Close mobile menu
} = useNavigation()

/**
 * All navigation logic is encapsulated in the useNavigation composable
 * This component focuses purely on presentation and user interaction
 * while the composable handles the complex state management and scroll behavior
 */
</script>

<style scoped>
.skip-to-content {
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

.skip-to-content:focus {
  top: 0;
}

.tier2-nav {
  transform: translateY(0) !important;
  opacity: 1 !important;
  height: 48px !important;
  border-bottom: 1px solid rgb(229, 231, 235) !important; /* Same as border-gray-200 to match tier1 */
  background-color: white !important;
  box-shadow: none !important; /* Remove any inherited shadow */
  transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.26s cubic-bezier(0.4, 0, 0.2, 1),
              height 0.26s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.tier2-nav.tier2-hidden {
  transform: translateY(-100%) !important;
  opacity: 0 !important;
  height: 0 !important;
  border-bottom: none !important;
}

/* Back to top button styling */
.back-to-top-btn {
  background-color: #FFD700;
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
  background-color: #E6C200 !important;
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

/* Fix About button styling to match other nav items exactly */
button.navbar-about-button,
.navbar-about-button {
  color: rgb(55, 65, 81) !important; /* text-gray-700 */
  font-weight: 500 !important; /* font-medium */
  font-size: 1rem !important; /* text-base */
  font-family: inherit !important;
  line-height: 1.5rem !important; /* text-base line-height */
  display: inline-block !important; /* Use inline-block for better control */
  background: none !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
  text-decoration: none !important;
  vertical-align: top !important; /* Align to top like other nav items */
  transform: translateY(-1px) !important; /* Move up 1 pixel for perfect alignment */
  cursor: pointer !important;
  min-height: auto !important; /* Override accessibility min-height */
  min-width: auto !important; /* Override accessibility min-width */
  touch-action: auto !important; /* Override accessibility touch-action */
  height: 1.5rem !important; /* Match line-height exactly */
}

button.navbar-about-button:hover,
.navbar-about-button:hover {
  color: #FFD700 !important; /* brand-gold */
  font-weight: 500 !important; /* keep same weight, no bold */
  text-decoration: none !important;
}

button.navbar-about-button.active,
.navbar-about-button.active {
  color: #FFD700 !important; /* brand-gold when active */
  font-weight: 500 !important; /* keep same weight, no bold */
}

/* FontAwesome chevron inherits color naturally, no special styling needed */
.navbar-about-button i {
  color: inherit !important;
  vertical-align: baseline !important; /* Ensure icon doesn't affect button alignment */
  line-height: inherit !important;
}
</style>