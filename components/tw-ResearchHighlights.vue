// tw-ResearchHighlights.vue
<template>
  <section id="research" class="py-16 bg-white font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Research Highlights</h2>
      
      <div class="max-w-3xl mx-auto mb-10 text-center">
        <p class="text-lg">
          My research focuses on privacy engineering, data protection, and the legal aspects of data architectures, 
          with particular emphasis on real-time bidding systems and online tracking technologies.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(blog, index) in blogs.slice(0, 4)" :key="index" class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <!-- Image -->
          <div class="h-48 overflow-hidden">
            <img :src="blog.image" :alt="blog.alttext || blog.title" class="w-full h-full object-cover">
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ blog.title }}</h3>
            <p class="text-gray-500 mb-3 text-sm">{{ blog.author }} ({{ blog.date }})</p>
            
            <!-- Summary - First 150 characters -->
            <p class="mb-4">{{ truncateText(blog.intro, 150) }}</p>
            
            <div class="flex justify-between items-center">
              <div>
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{{ blog.publication }}</span>
              </div>
              <a href="#" @click.prevent="openModal(blog)" class="inline-flex items-center text-blue-600">
                Read more 
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-10">
        <button @click="showAllResearch" class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          View All Research
        </button>
      </div>
    </div>

    <!-- Modal for expanded research content -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-90vh overflow-y-auto" @click.stop>
          <div class="relative">
            <!-- Close button -->
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <!-- Modal content -->
            <div v-if="selectedBlog" class="p-6">
              <div class="flex mb-6">
                <div class="w-1/4 mr-4">
                  <img :src="selectedBlog.image" :alt="selectedBlog.alttext || selectedBlog.title" class="w-full h-32 object-cover rounded-lg">
                </div>
                <div class="w-3/4">
                  <h2 class="text-2xl font-bold mb-3">{{ selectedBlog.title }}</h2>
                  <p class="text-gray-600">{{ selectedBlog.author }} ({{ selectedBlog.date }})</p>
                </div>
              </div>
              
              <!-- Full content -->
              <div class="prose max-w-none mb-8">
                <p>{{ selectedBlog.intro }}</p>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{{ selectedBlog.publication }}</span>
                <a :href="selectedBlog.link" class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Access Full Research
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      showModal: false,
      selectedBlog: null
    }
  },
  methods: {
    truncateText(text, length) {
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    },
    showAllResearch() {
      // Implement navigation to full research page or expand current view
      document.getElementById('aggregator').scrollIntoView({ behavior: 'smooth' });
    },
    openModal(blog) {
      this.selectedBlog = blog;
      this.showModal = true;
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
      // Re-enable body scrolling
      document.body.style.overflow = 'auto';
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.max-h-90vh {
  max-height: 90vh;
}
</style>