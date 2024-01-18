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
              {{ tab.name }}
            </a>
          </li>
        </ul>

        <!-- Dynamic component rendering based on the current tab -->
        <div class="flex-grow">
          <component :is="tabComponents[globalState.currentTab]" />
        </div>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import { useNuxtApp } from '#app';
import { globalState } from '~/composables/globalState';

// Importing tab content components
import TabContent1 from '~/components/TabContent1.vue';
import TabContent2 from '~/components/TabContent2.vue';
import TabContent3 from '~/components/TabContent3.vue';
import TabContent4 from '~/components/TabContent4.vue';
import TabContent5 from '~/components/TabContent5.vue';
import TabContent6 from '~/components/TabContent6.vue';
import TabContent7 from '~/components/TabContent7.vue';
import TabContent8 from '~/components/TabContent8.vue';
import TabContent9 from '~/components/TabContent9.vue';

const { NuxtLink } = useNuxtApp();

// Example tab data structure
const tabs = ref([
  { name: 'All', slug: 'tab1' },
  { name: 'Scholarly', slug: 'tab2' },
  { name: 'Professional', slug: 'tab3' },
  { name: 'Popular', slug: 'tab4' },
  { name: 'Media', slug: 'tab5' },
  { name: 'Keynotes', slug: 'tab6' },
  { name: 'Panels', slug: 'tab7' },
  { name: 'Teaching', slug: 'tab8' },
  { name: 'Committees', slug: 'tab9' },
]);

// Define tab components here
const tabComponents = {
  tab1: TabContent1,
  tab2: TabContent2,
  tab3: TabContent3,
  tab4: TabContent4,
  tab5: TabContent5,
  tab6: TabContent6,
  tab7: TabContent7,
  tab8: TabContent8,
  tab9: TabContent9,
};

// Function to determine CSS classes for each tab
function tabClasses(index) {
  return {
    'block p-4 rounded-lg': true,
    'active': globalState.currentTab === index
  };
}

// Function to change the active tab
function changeTab(index) {
  const selectedTab = tabs.value[index];
  globalState.currentTab = selectedTab.slug;

  // Use Nuxt's router to update the URL
  this.$router.push(`/tabs/${selectedTab.slug}`);
}

// Watcher to react to changes in the currentTab global state
watch(() => globalState.currentTab, (newVal) => {
  // Implement any additional logic needed when currentTab changes
});
</script>

<style>
  /* Styles for the active tab */
  .active {
    @apply text-white bg-red-700; 
    border-color: currentColor;
  }

  /* Responsive styles for smaller screens */
  @media screen and (max-width: 420px) {
    ul, .flex-grow {
      width: 100%;
      overflow-x: auto;
    }
  }

  /* Hover effect for tab links */
  a:hover {
    @apply text-red-700;
  }
  .active:hover {
    @apply text-white;
  }
</style>
