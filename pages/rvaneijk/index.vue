<template>
  <div class="min-h-screen bg-gray-50">
    <tw-navbar />
    <div class="pt-16">
      <tw-hero />
      <tw-SectionConnectorSolid />
      <tw-book />
      <tw-SectionConnectorSolid />
	  <twResearchHighlights :blogs="blogs" />
      <tw-SectionConnectorSolid />
      <twMediaHighlights class="mb-0" />
      <tw-footer />
   </div>
  </div>
</template>

<script setup>
import twNavbar from '~/components/tw-Navbar.vue';
import SectionConnectorSolid from '~/components/tw-SectionConnectorSolid.vue';
import twHero from '~/components/tw-Hero.vue';
import twExecutiveLeadership from '~/components/tw-ExecutiveLeadership.vue';
import twBook from '~/components/tw-Book.vue';
import twResearchHighlights from '~/components/tw-ResearchHighlights.vue';
import twMediaHighlights from '~/components/tw-MediaHighlights.vue';
import twBlogposts from '~/components/tw-Blogposts.vue';
import twCareerTimeline from '~/components/tw-CareerTimeline.vue';
import twFooter from '~/components/tw-Footer.vue';

// Enhanced description with executive focus
const description = 'Rob van Eijk - privacy executive and strategic technology leader with expertise in data protection, regulatory affairs, and technology governance. Qualified for C-suite and board positions.';
const ogTitle = 'Rob van Eijk | Privacy Executive & Strategic Technology Leader';
const twitterCard = 'https://blaeu.com/assets/img/camera.png';
const mySite = 'https://blaeu.com/rvaneijk';

// JSON-LD structured data for personal brand with executive emphasis
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Rob van Eijk',
  'url': mySite,
  'image': 'https://blaeu.com/assets/img/rob-van-eijk.jpg',
  'jobTitle': 'Founder',
  'worksFor': {
    '@type': 'Organization',
    'name': 'Team Blaeu'
  },
  'description': description,
  'knowsAbout': [
    'Privacy Leadership',
    'Regulatory Strategy',
    'Data Protection',
    'Privacy by Design',
	'AI Governance',
    'Executive Management'
  ],
  'alumniOf': {
    '@type': 'CollegeOrUniversity',
    'name': 'Leiden University'
  }
};

useHead({
  htmlAttrs: { lang: 'en' },
  charset: 'utf-8',
  title: 'Rob van Eijk | Privacy Executive & Strategic Technology Leader',
  meta: [
    { name: 'description', content: description },
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: mySite },
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: twitterCard },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: twitterCard },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Additional SEO meta tags for executive positioning
    { name: 'keywords', content: 'privacy executive, managing director, data protection, strategic leadership, C-suite, board advisory, Rob van Eijk, regulatory affairs, technology governance' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Rob van Eijk' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: mySite },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd)
    }
  ]
});
</script>

<script>
  import { ref } from 'vue';
  import blogPosts from "/assets/content.json";

  // Using a ref to make the blogs reactive
  const blogs = ref(blogPosts);

  export default {
    components: {
      twBlogposts, // Referenced component name
    }
  };
</script>

<style>
/* Improve core web vitals with better text rendering */
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Improve accessibility for focus states */
:focus-visible {
  outline: 2px solid #ffcc00;
  outline-offset: 2px;
}
</style>