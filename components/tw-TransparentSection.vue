<!-- tw-TransparentSection.vue -->
<template>
  <section class="transparent-section">
    <!-- Content that appears over the fixed background video -->
    <div class="container mx-auto px-4 py-24 md:py-32">
      <div class="mx-auto max-w-3xl">
        <!-- Content with enhanced contrast for accessibility -->
        <div class="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
          <h2 class="text-4xl font-bold mb-6 text-[#ffcc00] drop-shadow-lg">Get in Touch</h2>
          <p class="text-xl text-white mb-8 font-semibold drop-shadow-md">
            Ready to enhance your data privacy compliance? Our experts are here to help you navigate complex regulations.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" @click.prevent="scrollTo('#about')" class="bg-[#ffcc00] hover:bg-blue-700 text-black hover:text-[#ffcc00] font-medium py-3 px-8 rounded-lg text-center transition-colors shadow-md">
              Contact Us
            </a>
            <a href="#" @click.prevent="scrollTo('#expertise')" class="bg-white hover:bg-gray-100 text-slate-900 hover:text-blue-700 py-3 px-8 rounded-lg font-medium text-center transition-colors shadow-md">
              Our Services
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import the same scroll function logic as in the navbar
const scrollTo = (selector) => {
  const topPosition = selector === '#top' ? 0 : document.querySelector(selector)?.offsetTop || 0;
  window.scrollTo({ top: topPosition, behavior: 'smooth' });
};
</script>

<script>
export default {
  name: 'TransparentSection'
}
</script>

<style scoped>
.transparent-section {
  position: relative;
  z-index: 5; /* Elevate above videos and static images */
  min-height: 50vh; /* Half the viewport height */
  display: flex;
  align-items: center;
  background: transparent !important;
  
  /* Enhanced text shadow for better contrast and readability */
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

/* Enhanced styling for reduce motion mode with better contrast */
:global(.reduce-motion) .transparent-section {
  background: rgba(0, 0, 0, 0.85) !important;
  position: relative !important;
  z-index: 5 !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
</style>