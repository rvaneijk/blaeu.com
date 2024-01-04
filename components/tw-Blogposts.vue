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
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <li v-for="blog in blogs" :key="blog.id" class="border border-gray-200 p-5 list-none">
        <BlogItem :post="blog" />
      </li>
    </div>
  </section>
</template>

<script>
import BlogItem from "/components/BlogItem.vue";

export default {
  components: {
    BlogItem
  },
  props: {
    blogs: {
      type: Array,
      required: true
    }
  }
};
</script>
