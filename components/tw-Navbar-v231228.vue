// tw-Navbar.vue
<template>
  <nav class="bg-[#4B5563] p-2 fixed w-full top-0 z-50 font-amblelight">
    <ul class="flex justify-around">
      <li><a class="text-white px-4 py-1 block text-sm" href="#" @click.prevent="scrollToElement('#top')">Portfolio</a></li>
	  <li><a class="text-white px-4 py-1 block text-sm" href="#aggregator" @click.prevent="scrollToElement('#aggregator')">Highlights</a></li>
	  <li><a class="text-white px-4 py-1 block text-sm" href="#tabular" @click.prevent="scrollToElement('#tabular')">Overview</a></li>
    </ul>
      <div class="absolute bottom-0 left-0 h-1 bg-red-600" :style="{ width: scrollPercentage + '%' }"></div>
  </nav>
    <div  ref="scrollTopButton" class="visible">
        <button @click="scrollToTop">
		  <i class="fa fa-arrow-circle-up bottom-right-circle" style="color: #b50000;"></i>
	    </button>
    </div>  -->
	<!-- scrollTopButton -->
    <div ref="scrollTopButton" class="invisible flex fixed bottom-0 w-full justify-end pb-3 pr-5 lg:pr-16">
      <div>
        <button class="rounded-full bg-red-700 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg" @click="scrollToTop">
		  <svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			class="h-4 w-4"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512">
			<path
			  fill="currentColor"
			  d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
		  </svg>
	    </button>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'; // Importing the required module
import { globalState } from '~/composables/globalState.js';
import { watch } from 'vue';

export default defineComponent({
    data() {
        return {
            scrollPercentage: 0,
            observer: null  // New data property
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
		watch(() => globalState.currentTab, () => {
        // Wait for the next DOM update cycle to ensure all content is rendered
        this.$nextTick(() => {
            this.updateScrollPercentage();
        });
    });
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        if (this.observer) {
            this.observer.disconnect();  // Disconnecting the observer
        }
    },
    methods: {
		updateScrollPercentage() {
			const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrollPosition = window.scrollY;
			this.scrollPercentage = (scrollPosition / totalHeight) * 100;
		},
        handleScroll() {
            const scrollBtn = this.$refs.scrollTopButton;  
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPosition = window.scrollY;
            this.scrollPercentage = (scrollPosition / totalHeight) * 100;

            if (window.scrollY > 88) {                                
                scrollBtn.classList.remove("invisible");
            } else {
                scrollBtn.classList.add("invisible");
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        scrollToElement(selector) {
            if (selector === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });  
                return;
            }
            const element = document.querySelector(selector);
            if (element) {
                const topPosition = element.offsetTop;
                window.scrollTo({ top: topPosition, behavior: 'smooth' });
            }
        },
    },
});
</script>