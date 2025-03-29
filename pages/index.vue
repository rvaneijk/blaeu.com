// index.vue
<template>
  <div>
    <twNavbarMain />

    <!-- H1 tag -->
    <h1 class="sr-only">Team Blaeu | Privacy & Data Protection Consulting</h1>
    
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
  const description = 'Team Blaeu provides expert consulting on data architecture legal aspects, specializing in privacy, data protection, and compliance solutions.';
  const ogTitle = 'Team Blaeu | Data Privacy and Compliance Experts';
  const ogImage = 'https://blaeu.com/assets/img/og-image.webp';
  const ogImageJpg = 'https://blaeu.com/assets/img/og-image.jpg'; // Fallback
  const twitterCardWebp = 'https://blaeu.com/assets/img/twitter-card.webp';
  const twitterCardJpg = 'https://blaeu.com/assets/img/twitter-card.jpg'; // Fallback
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
    ],
    // Business details from footer
    'foundingDate': '2019',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Wilhelminaplein 1-40, p/a Element Offices, Suite 8.16',
      'addressLocality': 'Rotterdam',
      'postalCode': '3072 DE',
      'addressCountry': 'Netherlands'
    },
    'email': 'info@blaeu.com',
    'serviceType': [
      'Privacy Compliance Assessments',
      'Privacy by Design Implementation',
      'Technical Expert in Legal Proceedings',
      'Executive & Board Training',
      'Advanced Impact Assessments',
      'Privacy Program Development'
    ],
    // Add testimonials section
    'review': [
      {
        '@type': 'Review',
        'reviewBody': 'As head of Private Sector Oversight at the Dutch Data Protection Authority (Autoriteit Persoonsgegevens), I enjoyed working with Rob for many years. He is analytically strong, thoughtful and very diplomatic. He has great knowledge at the intersection of privacy and technology and knows how to connect and relate these worlds like no other. His dissertation on Real Time Bidding is the exemplary example of this. Finally, but also very important, Rob is just an incredibly nice and pleasant colleague that I wish everyone on his team.',
        'author': {
          '@type': 'Person',
          'name': 'Udo Oelen'
        }
      },
      {
        '@type': 'Review',
        'reviewBody': 'I had the chance to work with Rob while I was at CNIL and we collaborated on several projects related to online tracking. Rob has a comprehensive view of the complex ecosystem that is the online advertising industry and also manages to know all the technical and legal details. Rob identifies the key challenges and successfully explains this highly complex topic to non-experts by providing useful examples. He is also able to design tools and write concise code to implement them.',
        'author': {
          '@type': 'Person',
          'name': 'Vincent Toubiana'
        }
      }
    ],
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
      { property: 'og:image:alt', content: 'Team Blaeu provides expert consulting on data architecture legal aspects, specializing in privacy, data protection, and compliance solutions.' },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      // Add fallback JPG
      { property: 'og:image', content: ogImageJpg },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },
      // Twitter meta tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCardWebp },
      { name: 'twitter:image:alt', content: 'Team Blaeu logo and branding' },
      // Add fallback JPG for Twitter
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.jpg' },
      { name: 'twitter:image:width', content: '1200' },
      { name: 'twitter:image:height', content: '630' },

      // Add viewport tag
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Enhanced keywords with trending terms
      { name: 'keywords', content: 'privacy consulting, data protection, GDPR compliance, data architecture, legal compliance, AI governance, privacy by design, data ethics, responsible AI' },
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