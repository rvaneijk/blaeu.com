// tw-Blogposts.vue - Enhanced version with summaries and CTAs
<template>
  <section class="bg-white py-16 font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Research Highlights</h2>
      
      <!-- Brief introduction to the research -->
      <div class="max-w-3xl mx-auto mb-12 text-center">
        <p>
          Our consulting approach is informed by ongoing research in privacy engineering and data protection. 
          These highlights showcase our contributions to the field and demonstrate our expertise.
        </p>
      </div>
      
      <!-- Research highlights grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Research item 1 -->
        <div v-for="(blog, index) in blogs" :key="index" class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <!-- Image -->
          <img :src="blog.image" :alt="blog.title" class="w-full h-48 object-cover">
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ blog.title }}</h3>
            
            <!-- Authors and date -->
            <p class="text-gray-600 mb-4">{{ blog.authors }} ({{ blog.year }})</p>
            
            <!-- Summary -->
            <p class="mb-4">{{ blog.summary }}</p>
            
            <!-- Key findings as bullet points -->
            <div class="mb-4">
              <p class="font-semibold mb-2">Key Findings:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(point, i) in blog.keyPoints" :key="i">{{ point }}</li>
              </ul>
            </div>
            
            <!-- Read more button -->
            <a :href="blog.link" class="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
              Read Full Research
            </a>
          </div>
        </div>
      </div>
    </div>
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
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>