<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0 
-->
// index.vue
<template>
  <div class="min-h-screen overflow-x-hidden bg-white dark:bg-gray-900 flex flex-col">
    <!-- Header landmark with the main navigation -->
    <header>
      <tw-NavbarMinimal />
    </header>

    <!-- H1 tag is now in the hero section for better SEO and accessibility -->

    <!-- Main content landmark -->
    <main id="main-content" class="pt-0 flex-1" tabindex="-1" aria-label="Main content">
      <!-- Video section -->
      <VideoErrorBoundary>
        <twDash />
      </VideoErrorBoundary>

      <!-- About Us section -->
      <twAboutUs />

      <!-- Services/Expertise section -->
      <twServices />

      <!-- Testimonials section -->
      <twTestimonials class="mt-0" />

      <!-- News section -->
      <twNews />

      <!-- Closing CTA -->
      <section class="pb-8 bg-white dark:bg-gray-900 font-amblelight">
        <div class="container mx-auto px-4 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div class="max-w-2xl mx-auto text-center">
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Fifteen years in data protection. Available for your next engagement.
            </p>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center px-6 py-3 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 font-semibold transition-colors duration-200"
            >
              Get in touch
            </NuxtLink>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Engagements start with a scoping call. Most matters on fixed fee or retainer.
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer landmark -->
    <twFooterMain />
  </div>
</template>

<script setup>
  // Use device detection for conditional background video loading
  const { isDesktop, shouldUseLightweight: _shouldUseLightweight } = useDeviceDetection()

  // Improved SEO description
  const description =
    'Team Blaeu advises technology companies, industry associations, and regulatory bodies on EU privacy and AI regulation — drawing on fifteen years of direct engagement with European institutions.'
  const ogTitle = 'Team Blaeu | AI, Privacy & EU Regulatory Affairs'
  const ogImage = 'https://blaeu.com/assets/img/og-image.webp'
  const ogImageJpg = 'https://blaeu.com/assets/img/og-image.jpg' // Fallback
  const twitterCardWebp = 'https://blaeu.com/assets/img/twitter-card.webp'
  const _twitterCardJpg = 'https://blaeu.com/assets/img/twitter-card.jpg' // Fallback
  const mySite = 'https://blaeu.com'

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Team Blaeu',
    description: description,
    url: mySite,
    logo: 'https://blaeu.com/assets/img/logo.png',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI, Privacy & EU Regulatory Affairs Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Expert Witness & Legal Advisory' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'AI Act Compliance & Red Team Testing' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'EU Regulatory Strategy & AI Governance' },
        },
      ],
    },
    knowsAbout: [
      'GDPR',
      'EU AI Act',
      'Digital Services Act',
      'AI Governance',
      'Privacy by Design',
      'EU Public Affairs',
      'Data Protection',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5,
      ratingCount: 2,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Udo Oelen' },
        reviewBody:
          'He is analytically strong, thoughtful and very diplomatic. He has great knowledge at the intersection of privacy and technology and knows how to connect and relate these worlds like no other.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Vincent Toubiana' },
        reviewBody:
          'Rob has a comprehensive view of the complex ecosystem that is the online advertising industry and also manages to know all the technical and legal details. He identifies the key challenges and successfully explains this highly complex topic to non-experts.',
      },
    ],
    // Business details from footer
    foundingDate: '2019',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wilhelminaplein 1-40, p/a Element Offices, Suite 8.16',
      addressLocality: 'Rotterdam',
      postalCode: '3072 DE',
      addressCountry: 'Netherlands',
    },
    email: 'team@blaeu.com',
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    title: 'Team Blaeu | AI, Privacy & EU Regulatory Affairs',
    meta: [
      // Basic meta tags
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Team Blaeu' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph tags
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: mySite },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      {
        property: 'og:image:alt',
        content: 'Team Blaeu logo and branding',
      },
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
      { name: 'twitter:image', content: _twitterCardJpg },
      { name: 'twitter:image:width', content: '1200' },
      { name: 'twitter:image:height', content: '630' },

      // Enhanced keywords with trending terms
      {
        name: 'keywords',
        content:
          'EU regulatory affairs, AI Act compliance, GDPR, privacy consulting, AI governance, EU public affairs, data protection, expert witness, privacy by design, responsible AI',
      },

      // Enhanced professional categories and expertise keywords
      { name: 'expertise:area', content: 'EU Regulatory Affairs' },
      { name: 'expertise:area', content: 'AI Act Compliance' },
      { name: 'expertise:area', content: 'GDPR' },
      { name: 'expertise:area', content: 'AI Governance' },
      { name: 'expertise:area', content: 'EU Public Affairs' },

      // Resource hints for accessibility
      { name: 'resource:priority', content: 'high' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: mySite },
      // DASH preloading only on desktop for video optimization
      ...(isDesktop
        ? [
            {
              rel: 'preload',
              href: '/assets/dash/video/adaptive.mpd',
              as: 'fetch',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: '/assets/dash/video/init-stream0.m4s',
              as: 'fetch',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: '/assets/dash/video/chunk-stream0-00001.m4s',
              as: 'fetch',
              crossorigin: 'anonymous',
            },
          ]
        : []),
      // Note: Font preloading removed - Nuxt handles font optimization automatically via CSS
      // Hero image preloading removed - causes unused resource warnings on wrong device types
      // Images will be loaded efficiently via responsive picture elements with fetchpriority="high"
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),
      },
    ],
  })
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
