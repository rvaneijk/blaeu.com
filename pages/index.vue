// index.vue
<template>
  <div class="min-h-screen overflow-x-hidden">
    <!-- Header landmark with the main navigation -->
    <header>
      <twNavbarMain />
    </header>

    <!-- H1 tag is now in the hero section for better SEO and accessibility -->
    
    <!-- Main content landmark -->
    <main id="main-content" class="pt-0" tabindex="-1" aria-label="Main content">
      <!-- Video section -->
      <VideoErrorBoundary>
        <twDash />
      </VideoErrorBoundary>
      
      <!-- About Us section -->
      <twAboutUs />
      
      <!-- Services/Expertise section -->
      <tw-SectionConnectorSolid />
      <twServices />
        
      <!-- Testimonials section -->
      <twTestimonials class="mt-0" />
      
      <!-- News section -->
      <twNews />
      
    </main>

    <!-- Footer landmark -->
    <twFooterMain />
    
    <!-- Widget stack - positioned in order from bottom to top -->
    <!-- Accessibility Widget - bottom position -->
    <AccessibilityWidget />
    
    <!-- Cookie Policy Widget - middle position -->
    <CookiePolicyWidget />
    
    <!-- Privacy Statement Widget - higher middle position -->
    <PrivacyStatementWidget />
    
    <!-- Terms Widget - higher position -->
    <TermsWidget />
    
    <!-- Keyboard Shortcuts Widget - highest position -->
    <KeyboardShortcutsWidget />
    
    <!-- Responsible Disclosure Widget removed as requested -->
    
    <!-- Accessibility Policy Widget -->
    <AccessibilityPolicyWidget />
  </div>
</template>

<script setup>
  import twNavbarMain from '~/components/tw-NavbarMain.vue';
  import twDash from '~/components/tw-Dash.vue';
  import twSectionConnectorSolid from '~/components/tw-SectionConnectorSolid.vue';
  import twAboutUs from '~/components/tw-AboutUs.vue';
  import twServices from '~/components/tw-Services.vue';
  import twTestimonials from '~/components/tw-Testimonials.vue';
  import twNews from '~/components/tw-News.vue';
  import twTransparentSection from '~/components/tw-TransparentSection.vue';
  import twFooterMain from '~/components/tw-FooterMain.vue';
  import VideoErrorBoundary from '~/components/VideoErrorBoundary.vue';
  
  // Use device detection for conditional background video loading
  const { isDesktop, shouldUseLightweight } = useDeviceDetection();
  import AccessibilityWidget from '~/components/AccessibilityWidget.vue';
  import CookiePolicyWidget from '~/components/CookiePolicyWidget.vue';
  import PrivacyStatementWidget from '~/components/PrivacyStatementWidget.vue';
  import TermsWidget from '~/components/TermsWidget.vue';
  // Responsible Disclosure Widget removed as requested
  import AccessibilityPolicyWidget from '~/components/AccessibilityPolicyWidget.vue';

  // Improved SEO description
  const description = 'Team Blaeu provides expert consulting on data architecture legal aspects, specializing in privacy, data protection, and compliance solutions.';
  const ogTitle = 'Team Blaeu | Data Privacy and Compliance Experts';
  const ogImage = '/assets/img/og-image.webp';
  const ogImageJpg = '/assets/img/og-image.jpg'; // Fallback
  const twitterCardWebp = '/assets/img/twitter-card.webp';
  const twitterCardJpg = '/assets/img/twitter-card.jpg'; // Fallback
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
      'Data Architecture',
      'Privacy Compliance Assessments',
      'Privacy by Design Implementation',
      'Technical Expert in Legal Proceedings',
      'Executive & Board Training',
      'Advanced Impact Assessments',
      'Privacy Program Development'
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
    'email': 'team@blaeu.com',
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
      // Basic meta tags
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Team Blaeu' },
      { name: 'robots', content: 'index, follow' },
      
      // Open Graph tags
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
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.jpg' },
      { name: 'twitter:image:width', content: '1200' },
      { name: 'twitter:image:height', content: '630' },
      
      // Enhanced keywords with trending terms
      { name: 'keywords', content: 'privacy consulting, data protection, GDPR compliance, data architecture, legal compliance, AI governance, privacy by design, data ethics, responsible AI' },
      
      // Enhanced professional categories and expertise keywords
      { property: 'expertise:area', content: 'Privacy Consulting' },
      { property: 'expertise:area', content: 'Data Protection' },
      { property: 'expertise:area', content: 'GDPR Compliance' },
      { property: 'expertise:area', content: 'AI Governance' },
      { property: 'expertise:area', content: 'Privacy by Design' },
      
      // Resource hints for accessibility
      { property: 'resource:priority', content: 'high' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: mySite },
      // DASH preloading only on desktop for video optimization
      ...(isDesktop ? [
        { rel: 'preload', href: '/assets/dash/video/adaptive.mpd', as: 'fetch', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/assets/dash/video/init-stream0.m4s', as: 'fetch', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/assets/dash/video/chunk-stream0-00001.m4s', as: 'fetch', crossorigin: 'anonymous' }
      ] : []),
      // Note: Font preloading removed - Nuxt handles font optimization automatically via CSS
      // Hero image preloading removed - causes unused resource warnings on wrong device types
      // Images will be loaded efficiently via responsive picture elements with fetchpriority="high"
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

/* Fixed background image for mobile - matches background video positioning */
.fixed-background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10; /* Behind all content */
  overflow: hidden;
  pointer-events: none;
}

.fixed-bg-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>