// index.vue
<script setup>
	const description = 'Contact me: rob@blaeu.com, @rvaneijk@mastodon.nl, or rvaneijk88 (LinkedIn)'
	const ogTitle = 'Rob helps others with legal aspects of data architectures and complex data flows'
	const twitterDescription = 'Contact me: rob@blaeu.com, @rvaneijk@mastodon.nl, or rvaneijk88 (LinkedIn)'
	const twitterCard = 'https://blaeu.com/assets/img/tiny_twitter-card.png'
	const mySite = 'https://blaeu.com/portfolio/rvaneijk'

//  https://socialsharepreview.com/
	useHead({
	  htmlAttrs: {
		lang: 'en',
	  },
	  charset: 'utf-8',
	  title: 'Team Blaeu',
	  meta: [
		{
		  name: 'description',
		  content:
			  description,
		},
		{ property: 'og:site_name', content: mySite },
		{ property: 'og:type', content: 'website' },
		{
		  property: 'og:url',
		  content: mySite,
		},
		{
		  property: 'og:title',
		  content: ogTitle
		  ,
		},
		{
		  property: 'og:description',
		  content:
			  description,
		},
		{
		  property: 'og:image',
		  content: twitterCard,
		},
		{ name: 'twitter:site', content: '@rvaneijk' },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{
		  name: 'twitter:url',
		  content: mySite,
		},
		{
		  name: 'twitter:title',
		  content: ogTitle,
		},
		{
		  name: 'twitter:description',
		  content: twitterDescription,
		},
		{
		  name: 'twitter:image',
		  content: twitterCard,
		},

	  ],
	  link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{
		  rel: 'canonical',
		  href: mySite,
		},
	  ],
	})
</script>

<template>
  <div>
    <tw-Navbar-v240103 />
    <br />
    <br />
    <tw-Profilepicture />
    <tw-Introduction />
    <tw-Blogposts :blogs="blogs" />
    <div class="p-6 pl-0">
	  <tw-Tabs-v240103 />
    </div>
    <br />
    <tw-Footer />
  </div>
</template>

<script>
	import { ref } from 'vue';
	import blogPosts from "/assets/content.json";
	import twBlogposts from "/components/tw-Blogposts.vue"; // Path to the new tw-Blogposts component

	const blogs = ref(blogPosts);

	export default {
	  components: {
		twBlogposts
	  }
	};
</script>