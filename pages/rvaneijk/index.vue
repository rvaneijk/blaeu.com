// index.vue
<template>
  <div>
    <twNavbar />
    <br /><br />
    <twProfilepicture />
    <twIntroduction />
    <twBlogposts :blogs="blogs" />
    <div class="p-6 pl-0">
      <twTabs />
    </div>
    <br />
    <twFooter />
  </div>
</template>

<script setup>
  import twNavbar from '~/components/tw-Navbar.vue';
  import twProfilepicture from '~/components/tw-Profilepicture.vue';
  import twIntroduction from '~/components/tw-Introduction.vue';
  import twTabs from '~/components/tw-Tabs.vue';
  import twFooter from '~/components/tw-Footer.vue';
  import twBlogposts from '~/components/tw-Blogposts.vue'; // Updated component name

  const description = 'Contact me: rob@blaeu.com, @rvaneijk@mastodon.nl, or rvaneijk88 (LinkedIn)';
  const ogTitle = 'Rob helps others with legal aspects of data architectures and complex data flows';
  const twitterCard = 'https://blaeu.com/assets/img/tiny_twitter-card.png';
  const mySite = 'https://blaeu.com/portfolio/rvaneijk';

  useHead({
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    title: 'Team Blaeu',
    meta: [
      { name: 'description', content: description },
      { property: 'og:site_name', content: mySite },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: mySite },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: twitterCard },
      { name: 'twitter:site', content: '@rvaneijk' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: mySite },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCard },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: mySite },
    ],
  });
</script>

<script>
  import { ref } from 'vue';
  import blogPosts from "/assets/content.json";

  // Using a ref to make the blogs reactive
  const blogs = ref(blogPosts);

  export default {
    components: {
      twBlogposts, // Updated component name
    }
  };
</script>
