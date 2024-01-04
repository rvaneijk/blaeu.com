// tw-Tabs.vue
<template>
  <div id="tabular">
	<div class="container mx-auto">
		<div class="flex flex-col items-center">
			<div class="w-full text-center">
				<h3 class="font-big-john relative mb-0 pb-0 pt-20 font-bold uppercase text-3xl text-header portfolio-title text-black">Publications & Other Work</h3>
			</div>
		</div>
	</div>
    <br />
    <br />
  <section class="w-full bg-white">
    <div class="container mx-auto px-4 flex">
      <!-- Vertical Tabs -->
      <ul class="flex flex-col text-sm font-medium text-center text-gray-500 border-r border-gray-200">
        <li v-for="(tab, index) in tabs" :key="index" class="mr-2">
          <a :class="['block p-4 rounded-lg', { 'active': currentTab === index }]" @click.prevent="currentTab = index">
            {{ tab }}
          </a>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="flex-grow">
        <component :is="tabComponents[currentTab]"></component>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { globalState } from '~/composables/globalState.js';
import Content1 from './TabContent1.vue'
import Content2 from './TabContent2.vue'
import Content3 from './TabContent3.vue'
import Content4 from './TabContent4.vue'
import Content5 from './TabContent5.vue'
import Content6 from './TabContent6.vue'
import Content7 from './TabContent7.vue'
import Content8 from './TabContent8.vue'
import Content9 from './TabContent9.vue'

const tabs = ['All', 'Scholarly', 'Professional', 'Popular', 'Media', 'Keynotes', 'Panels', 'Teaching', 'Committees']
const tabComponents = [Content1, Content2, Content3, Content4, Content5, Content6, Content7, Content8, Content9]
const currentTab = ref(0);

watch(currentTab, (newValue) => {
  globalState.currentTab = newValue;
  // other code if needed
});
</script>


<style>
  .active {
    color: #DC2626;
    border-color: currentColor;
  }

/* Responsive Styles for Small Screens */
@media screen and (max-width: 420px) {
  ul, .flex-grow {
    width: 100%; /* Ensure full width */
    overflow-x: auto; /* Enable horizontal scrolling if needed */
  }
}
</style>

<style scoped>
a:hover {
    @apply text-red-600;
}
</style>
