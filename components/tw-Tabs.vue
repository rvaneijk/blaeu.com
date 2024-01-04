// tw-Tabs
<template>
  <div id="tabular">
    <div class="container mx-auto">
      <div class="flex flex-col items-center">
        <div class="w-full text-center">
          <h3 class="font-big-john relative mb-0 pb-0 pt-20 font-bold uppercase text-3xl text-header portfolio-title text-black">
            Publications & Other Work
          </h3>
        </div>
      </div>
    </div>
    <br />
    <br />
    <section class="w-full bg-white">
      <div class="container mx-auto px-4 flex">
        <!-- Vertical Tabs -->
        <ul class="flex flex-col text-sm font-medium text-center text-gray-500 border-r border-gray-200">
          <!-- Loop through each tab and display -->
          <li v-for="(tab, index) in tabs" :key="index" class="mr-2">
            <!-- Tab item; clicking changes the active tab -->
            <a :class="tabClasses(index)" @click.prevent="changeTab(index)">
              {{ tab }}
            </a>
          </li>
        </ul>

        <!-- Dynamic component rendering based on the current tab -->
        <div class="flex-grow">
          <component :is="tabComponents[globalState.currentTab]"></component>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Importing Vue reactivity and state management functions
import { ref, watch } from 'vue';
import { globalState } from '~/composables/globalState';
import Content1 from './TabContent1.vue';
import Content2 from './TabContent2.vue';
import Content3 from './TabContent3.vue';
import Content4 from './TabContent4.vue';
import Content5 from './TabContent5.vue';
import Content6 from './TabContent6.vue';
import Content7 from './TabContent7.vue';
import Content8 from './TabContent8.vue';
import Content9 from './TabContent9.vue';

// Definition of tab labels and corresponding components
const tabs = ['All', 'Scholarly', 'Professional', 'Popular', 'Media', 'Keynotes', 'Panels', 'Teaching', 'Committees'];
const tabComponents = [Content1, Content2, Content3, Content4, Content5, Content6, Content7, Content8, Content9];

// Function to change the current active tab
function changeTab(index) {
  globalState.currentTab = index;
}

// Function to determine CSS classes for each tab
function tabClasses(index) {
  // Returns 'active' class for the current active tab
  return {
    'block p-4 rounded-lg': true,
    'active': globalState.currentTab === index
  };
}

// Watcher to react to changes in the currentTab global state
watch(() => globalState.currentTab, (newVal) => {
  // Implement any additional logic needed when currentTab changes
});
</script>

<style>
  /* Styles for the active tab */
  .active {
    color: #DC2626;
    border-color: currentColor;
  }

  /* Responsive styles for smaller screens */
  @media screen and (max-width: 420px) {
    ul, .flex-grow {
      width: 100%;
      overflow-x: auto;
    }
  }
</style>

<style scoped>
  /* Hover effect for tab links */
  a:hover {
    @apply text-red-600;
  }
</style>
