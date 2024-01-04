<template>
  <!-- 

	This template is wrapped inside a <div> with a class name hello.
    The blog post title is displayed within an <h3> tag. Clicking on the title will lead to the post's link, which will open in a new tab (target="_blank").
    There's a section dedicated to displaying the blog post's image. This is wrapped in a <div> with a class name img-holder.
    The post's author and date are displayed in a paragraph tag. Clicking on this information also leads to the blog post's link.
    Following this, the post's introduction or excerpt (post.intro) is displayed.
    Lastly, the source or the publication name from which the blog post originates is displayed in a <strong> tag.

  -->	
    <div class="hello">
        <h3 :style="{ 'font-family': 'big_johnregular, Raleway, Helvetica, sans-serif' }">
            <a :href="post.link" target="_blank">{{ post.title }}</a>
        </h3>
        <div class="img-holder my-5">
           <a :href="post.link" target="_blank"><img :src="post.image" :alt="post.alttext" class="rounded" /></a>
        </div>
        <p class="my-5"><strong><a :href="post.link" target="_blank">{{ post.author }} ({{post.date}})</a></strong></p>
        <a :href="post.link" target="_blank"><p class="my-5">{{ post.intro }} </p></a>
        <a :href="post.link" target="_blank"><strong class="my-5">{{ post.publication }}</strong></a>
    </div>
</template>

<script>
//
// The component has a single prop named post which is expected to be an object and is mandatory for this component to function correctly.
// This prop contains details about the blog post, such as its title, link, image, alt text, author, date, introduction, and publication.
// The tw-Blogpost.vue component uses the BlogItem.vue component to render each individual blog post. 
// The data for each blog post is passed from the parent (tw-Blogpost.vue) to the child (BlogItem.vue) through the post prop. 
// The structure of the post object should be in line with what's expected by the BlogItem.vue (i.e., having properties like link, title, image, alttext, author, date, intro, and publication).
//
// In a nutshell, the BlogItem.vue component is designed to receive data for an individual blog post and display it in a structured format. 
// The dynamic properties from the post object, like the link, title, image, etc., get bound to the HTML using Vue's binding syntax, allowing for a reactive display of the data.
//
export default {
    name: 'BlogItem',
    props: {
        post: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
a:hover {
    @apply text-red-600;
}
h3 {
    font-family: 'big_johnregular, Raleway, Helvetica, sans-serif';
}

@media only screen and (max-width: 768px) {
    h3 {
        font-family: 'big_johnregular, Raleway, Helvetica, sans-serif';
    }
}
</style>