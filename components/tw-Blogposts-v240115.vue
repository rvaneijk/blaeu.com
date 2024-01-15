// tw-Blogposts.vue: This Vue component renders a collection of blog posts. It uses a grid layout, with the number of columns adjusting based on screen size. The template uses a v-for directive to loop through an array of blog posts.
<template>
    <section id="aggregator">
        <div class="container mx-auto">
            <div class="flex flex-col items-center">
                <div class="w-full text-center">
                    <h3 class="font-big-john relative mb-0 pb-0 pt-20 font-bold uppercase text-3xl text-header portfolio-title text-black">Highlights</h3>
                </div>
            </div>
        </div>
    <br />
    <br />
    <br />
	<div class="mx-4 md:mx-8 lg:mx-12"> <!-- Additional margin classes for responsive design -->
		<!-- 
		  mx-4: Applies horizontal margin of 1rem (4 units in Tailwind) on all screen sizes.
		  md:mx-8: Increases horizontal margin to 2rem (8 units) on medium-sized screens and above.
		  lg:mx-12: Further increases horizontal margin to 3rem (12 units) on large screens and above.
		  This ensures the content does not touch the sides of the screen, especially on smaller devices.
		-->
		<ul class="list-none p-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"> <!-- Setting up the grid layout for blog posts -->
			<!--
			  list-none: Removes default list styling (bullets, etc.).
			  p-0: Removes default padding from the list.
			  grid: Enables grid layout for the child elements (blog posts).
			  grid-cols-1: Sets up a single column grid layout for small screens.
			  md:grid-cols-3: Changes the layout to 3 columns on medium-sized screens and above.
			  lg:grid-cols-6: Changes the layout to 6 columns on large screens and above.
			  gap-4: Adds a gap of 1rem (4 units) between grid items.
			-->
			<li v-for="blog in visibleBlogs" :key="blog.id" class="border border-gray-200 p-5"> <!-- Each blog post styling -->
				<!-- 
				  Iterating over 'blogs' array with v-for directive, setting unique :key for each item.
				  border border-gray-200: Adds a light grey border to each blog item.
				  p-5: Adds padding of 1.25rem (5 units) inside each blog item for spacing the content.
				-->
				<BlogItem :post="blog" /> <!-- Injects the BlogItem component for each blog post -->
			</li>
		</ul>
	</div>

<!-- Load More button container -->
<div class="flex justify-center w-full my-5">
	<!-- Load More button
  <button @click="loadMore" v-if="visiblePosts < blogs.length">Load More</button> -->
  <button
  class="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center shadow-lg"
  @click="loadMore"
  v-if="visiblePosts < blogs.length"
>
  Load more
  <!-- Font Awesome icon for the arrow -->
  <i class="fas fa-chevron-down ml-2"></i>
</button>
</div>


  </section>
</template>

<script>
// Script section of the Vue component

// Importing the BlogItem component
// This is necessary to use the BlogItem component within this Vue component.
import BlogItem from "/components/BlogItem.vue";

export default {
  // Component registration
  // Here we declare which components are being used within this Vue component.
  components: {
    BlogItem // Registering BlogItem so it can be used in the template
  },

  // Declaring props passed to this component
  // Props are custom attributes you can register on a component.
  props: {
    blogs: {
      type: Array, // Specifies that 'blogs' should be an array
      required: true // This prop is mandatory for the component to function properly
    }
  },
  // 'blogs' prop is expected to be passed from the parent component.
  // It should contain the array of blog posts that will be displayed by this component.

  data() {
    return {
      visiblePosts: 3, // Initially show 3 posts
    };
  },
  computed: {
    visibleBlogs() {
      return this.blogs.slice(0, this.visiblePosts);
    }
  },
  mounted() {
    this.adjustVisiblePosts();
    window.addEventListener('resize', this.adjustVisiblePosts);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustVisiblePosts);
  },
  methods: {
    adjustVisiblePosts() {
      const width = window.innerWidth;
      if (width >= 1024) { // Assuming 1024px as a breakpoint for large screens
        this.visiblePosts = 6;
      } else {
        this.visiblePosts = 3;
      }
    },
    loadMore() {
      const width = window.innerWidth;
      if (width >= 1024) { // Large screens (6-column layout)
        this.visiblePosts += 6;
      } else if (width >= 768) { // Medium screens (3-column layout)
        this.visiblePosts += 3;
      } else { // Small screens (1-column layout)
        this.visiblePosts += 2;
      }
    }
  }
};
</script>
