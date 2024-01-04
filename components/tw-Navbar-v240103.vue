// tw-Navbar
<template>
  <!-- Navigation bar with fixed positioning at the top of the page -->
  <nav class="bg-[#4B5563] p-2 fixed w-full top-0 z-50 font-amblelight">
    <!-- Horizontal list of navigation links -->
    <ul class="flex justify-around">
      <!-- Navigation items with scrollTo method to smoothly navigate to the respective sections -->
      <li><a class="text-white px-4 py-1 block text-sm" href="#" @click.prevent="scrollTo('#top')">Portfolio</a></li>
      <li><a class="text-white px-4 py-1 block text-sm" href="#aggregator" @click.prevent="scrollTo('#aggregator')">Highlights</a></li>
      <li><a class="text-white px-4 py-1 block text-sm" href="#tabular" @click.prevent="scrollTo('#tabular')">Overview</a></li>
    </ul>
    <!-- Progress bar indicating the scroll position on the page -->
    <div class="absolute bottom-0 left-0 h-1 bg-red-600" :style="{ width: scrollPercentage + '%' }"></div>
  </nav>
  <!-- Button for scrolling back to the top of the page, becomes visible on scroll -->
  <div ref="scrollTopButton" class="invisible flex fixed bottom-0 w-full justify-end pb-3 pr-5 lg:pr-16">
    <div>
      <button 
        @click="scrollTo('#top')" 
        class="rounded-full bg-red-700 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" class="h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
// Importing Vue functionalities and the global state
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { globalState } from '~/composables/globalState.js';

// References for DOM elements and reactive properties
const scrollTopButton = ref(null); // Reference to the scroll-to-top button
const scrollPercentage = ref(0); // Reactive property to track scroll progress

// Function to update the scroll progress percentage
const updateScrollPercentage = () => {
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPosition = window.scrollY;
  scrollPercentage.value = (scrollPosition / totalHeight) * 100;
};

// Handle the scroll event, update the scroll progress, and toggle the visibility of the scroll-to-top button
const handleScroll = () => {
  updateScrollPercentage();
  if (window.scrollY > 88) {
    scrollTopButton.value.classList.remove("invisible");
  } else {
    scrollTopButton.value.classList.add("invisible");
  }
};

// Function to smoothly scroll to a specific section of the page
const scrollTo = (selector) => {
  const topPosition = selector === '#top' ? 0 : document.querySelector(selector)?.offsetTop || 0;
  window.scrollTo({ top: topPosition, behavior: 'smooth' });
};

// Lifecycle hooks to manage event listeners and react to changes in global state
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  watch(() => globalState.currentTab, () => {
    nextTick(updateScrollPercentage);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
