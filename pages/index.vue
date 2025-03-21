// index.vue
<template>
  <div>
    <twNavbarMain />
    
    <!-- Video section -->
    <twDash />
    
    <!-- About Us section -->
    <twAboutUs />
    
    <!-- Services/Expertise section -->
    <tw-SectionConnectorSolid />
    <twServices />
      
    <!-- Testimonials section -->
    <tw-SectionConnectorSolid />
    <twTestimonials class="mt-0" />
    
    <!-- Transparent section with background video -->
    <tw-FixedBackgroundVideo />
    <twTransparentSection />

    <twFooterMain />
  </div>
</template>

<script setup>
  import twNavbarMain from '~/components/tw-NavbarMain.vue';
  import twDash from '~/components/tw-Dash.vue';
  import twSectionConnectorSolid from '~/components/tw-SectionConnectorSolid.vue';
  import twAboutUs from '~/components/tw-AboutUs.vue';
  import twServices from '~/components/tw-Services.vue';
  import twTestimonials from '~/components/tw-Testimonials.vue';
  import twTransparentSection from '~/components/tw-TransparentSection.vue';
  import twFixedBackgroundVideo from '~/components/tw-FixedBackgroundVideo.vue';
  import twFooterMain from '~/components/tw-FooterMain.vue';

  // Improved SEO description
  const description = 'Team Blaeu provides expert consulting on legal aspects of data architectures and complex data flows, specializing in privacy, data protection, and compliance solutions.';
  const ogTitle = 'Team Blaeu | Data Privacy and Compliance Experts';
  const twitterCard = 'https://blaeu.com/assets/img/camera.png';
  const mySite = 'https://blaeu.com';
  
  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Team Blaeu',
    'description': description,
    'url': mySite,
    'logo': 'https://blaeu.com/assets/img/logo.png',
    'serviceType': [
      'Privacy Consulting', 
      'Data Protection', 
      'Compliance Solutions',
      'Data Architecture'
    ],
    'knowsAbout': [
      'GDPR',
      'AI Governance',
      'Privacy by Design',
      'Data Protection'
    ]
  };

  useHead({
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    title: 'Team Blaeu | Privacy & Data Protection Consulting',
    meta: [
      { name: 'description', content: description },
      { property: 'og:site_name', content: mySite },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: mySite },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: twitterCard },
      // Added Twitter meta tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCard },
      // Additional SEO meta tags
      { name: 'keywords', content: 'privacy consulting, data protection, GDPR compliance, data architecture, legal compliance' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Team Blaeu' }
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

<style>
/* Global link styling */
a:not(.no-hover) {
  @apply transition-colors duration-200;
}

a:not(.no-hover):hover {
  @apply text-[#ffcc00];
}

/* You may need to exclude certain links like navigation items that have their own hover styles */
nav a:hover {
  /* Keep existing nav hover styles */
}

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