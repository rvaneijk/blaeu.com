// Update tw-Navbar.vue to connect to footer and align with landing page

<template>
  <nav 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{'bg-white shadow-md opacity-100': scrolled, 'bg-transparent opacity-0 pointer-events-none': !scrolled}"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand - Same as main navbar -->
        <div class="flex items-center ml-2">
          <img src="/assets/png/logo.png" alt="Blaeu Logo" class="h-8">
        </div>
        
        <!-- Mobile menu button - Hidden on desktop -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          type="button" 
          class="inline-flex items-center justify-center p-2 rounded-md md:!hidden" 
          :class="{'text-gray-600 hover:text-gray-900': scrolled, 'text-white hover:text-gray-200': !scrolled}"
          aria-controls="mobile-menu" 
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
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
        
        <!-- Desktop menu - Aligned with landing page structure -->
        <div class="hidden md:flex md:items-center md:space-x-8 font-amblelight">
          <a 
            href="#top" 
            class="font-medium text-sm transition-all duration-200"
            :class="{'text-gray-700 hover:text-blue-600': scrolled, 'text-white hover:text-gray-200': !scrolled}"
          >
            Home
          </a>
          <a 
            href="#book" 
            class="font-medium text-sm transition-all duration-200"
            :class="{'text-gray-700 hover:text-blue-600': scrolled, 'text-white hover:text-gray-200': !scrolled}"
          >
            My Book
          </a>
          <a 
            href="#research" 
            class="font-medium text-sm transition-all duration-200"
            :class="{'text-gray-700 hover:text-blue-600': scrolled, 'text-white hover:text-gray-200': !scrolled}"
          >
            Publications
          </a>
          <a 
            href="#media" 
            class="font-medium text-sm transition-all duration-200"
            :class="{'text-gray-700 hover:text-blue-600': scrolled, 'text-white hover:text-gray-200': !scrolled}"
          >
            Thought Leadership
          </a>
          <a 
            href="#" 
            @click.prevent="scrollTo('footer')" 
            class="font-medium text-sm transition-all duration-200"
            :class="{'text-gray-700 hover:text-blue-600': scrolled, 'text-white hover:text-gray-200': !scrolled}"
          >
            Contact
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile menu - Aligned with landing page structure -->
    <div 
      class="md:hidden transition-all duration-300 ease-in-out overflow-hidden" 
      :class="{'max-h-60': mobileMenuOpen, 'max-h-0': !mobileMenuOpen}"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
        <a 
          href="#top" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        >
          Home
        </a>
        <a 
          href="#book" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        >
          My Book
        </a>
        <a 
          href="#research" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        >
          Research
        </a>
        <a 
          href="#media" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        >
          Thought Leadership
        </a>
        <a 
          href="#" 
          @click.prevent="scrollTo('footer'); mobileMenuOpen = false" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        >
          Contact
        </a>
      </div>
    </div>
    
    <!-- Progress bar -->
    <div class="absolute bottom-0 left-0 h-1 bg-[#ffcc00]" :style="{ width: scrollPercentage + '%' }"></div>
  </nav>
  
  <!-- Back to top button -->
  <div 
    class="fixed bottom-6 right-6 z-50 transition-opacity duration-300"
    :class="{'opacity-100': showScrollButton, 'opacity-0 pointer-events-none': !showScrollButton}"
  >
    <button 
      @click="scrollTo('#top')" 
      class="rounded-full p-3 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style="background-color: #ffcc00; color: #333;" 
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { globalState } from '~/composables/globalState.js';

// Reactive state
const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const scrollPercentage = ref(0);
const showScrollButton = ref(false);

// Update scroll state
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  scrolled.value = scrollPosition > 50;
  showScrollButton.value = scrollPosition > 300;
  
  // Calculate scroll percentage
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollPercentage.value = (scrollPosition / totalHeight) * 100;
};

// Smooth scroll function
const scrollTo = (selector) => {
  if (selector === 'footer') {
    // Scroll to the footer element
    const footer = document.querySelector('footer');
    if (footer) {
      window.scrollTo({ top: footer.offsetTop, behavior: 'smooth' });
    }
  } else {
    const topPosition = selector === '#top' ? 0 : document.querySelector(selector)?.offsetTop || 0;
    window.scrollTo({ top: topPosition, behavior: 'smooth' });
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initialize values
  
  // Add watch for global state changes (if needed)
  watch(() => globalState.currentTab, () => {
    nextTick(handleScroll);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Force-hide the hamburger on desktop */
@media (min-width: 768px) {
  button[aria-controls="mobile-menu"] {
    display: none !important;
  }
}
</style>