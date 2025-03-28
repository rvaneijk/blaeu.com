<template>
  <div class="min-h-screen bg-gray-50">
    <tw-navbar />
    <!-- H1 tag -->
    <h1 class="sr-only">Rob van Eijk | Privacy Executive & Strategic Technology Leader</h1>
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

// Enhanced description with executive focus and keywords
const description = 'Rob van Eijk - Senior privacy executive and C-suite advisor with expertise in data protection, regulatory affairs, and AI governance, specializing in privacy engineering.';
const ogTitle = 'Rob van Eijk | Privacy Executive & Strategic Technology Leader';
const profileImage = 'https://blaeu.com/assets/img/tiny_welcome.png';
const twitterCard = profileImage;
const mySite = 'https://blaeu.com/rvaneijk';

// JSON-LD structured data for personal brand with executive emphasis
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Rob van Eijk',
  'url': mySite,
  'image': profileImage,
  'jobTitle': 'Founder & Managing Director Europe',
  'worksFor': [
    {
      '@type': 'Organization',
      'name': 'Team Blaeu',
      'url': 'https://blaeu.com'
    },
    {
      '@type': 'Organization',
      'name': 'Future of Privacy Forum',
      'url': 'https://fpf.org'
    }
  ],
  'description': description,
  'knowsAbout': [
    'Privacy Leadership',
    'Regulatory Strategy',
    'Data Protection',
    'Privacy by Design',
    'AI Governance',
    'Executive Management',
    'Privacy Engineering',
    'GDPR Compliance',
    'Data Ethics'
  ],
  'alumniOf': [
    {
      '@type': 'CollegeOrUniversity',
      'name': 'Leiden University'
    }
  ],
  // Social media profiles from footer
  'sameAs': [
    'https://www.linkedin.com/in/rvaneijk88',
    'https://bsky.app/profile/rvaneijk.bsky.social',
    'https://mastodon.nl/@rvaneijk',
    'https://orcid.org/0000-0002-2203-6819',
    'https://scholar.google.nl/citations?user=p4VBH-4AAAAJ',
    'https://github.com/rvaneijk',
    'https://fpf.org/person/rob-van-eijk/'
  ],
  'email': 'rob@blaeu.com',
  'hasOccupation': {
    '@type': 'Occupation',
    'name': 'Privacy Executive',
    'occupationCategory': 'Executive Leadership',
    'skills': 'Privacy Engineering, Technology Governance, AI Ethics, Data Strategy'
  }
};

useHead({
  htmlAttrs: { lang: 'en' },
  charset: 'utf-8',
  title: 'Rob van Eijk | Privacy Executive & Strategic Technology Leader',
  meta: [
    { name: 'description', content: description },
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: mySite },
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: twitterCard },
    { property: 'og:profile:first_name', content: 'Rob' },
    { property: 'og:profile:last_name', content: 'van Eijk' },
    { property: 'og:profile:username', content: 'rvaneijk' },
    { property: 'og:profile:gender', content: 'male' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: twitterCard },
    // Mastodon verification
    { name: 'mastodon:creator', content: '@rvaneijk@mastodon.nl' },
    { name: 'mastodon:verified', content: 'true' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Enhanced keywords for executive positioning
    { name: 'keywords', content: 'privacy executive, managing director, data protection officer, strategic leadership, C-suite advisor, board advisory, Rob van Eijk, regulatory affairs, technology governance, AI ethics, data strategy, privacy engineering, GDPR expert, responsible innovation' },
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'Rob van Eijk' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: mySite },
    // Add Mastodon verification link
    { rel: 'me', href: 'https://mastodon.nl/@rvaneijk' }
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