<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header landmark with the new unified navigation -->
    <header>
      <tw-NavbarSimple />
    </header>

    <!-- H1 tag for screen readers -->
    <h1 class="sr-only">Rob van Eijk | Privacy Executive & Strategic Technology Leader</h1>

    <!-- Main content landmark -->
    <main id="main-content" class="pt-28" tabindex="-1" aria-label="Main content">
      <tw-hero />
      <tw-SectionConnectorSolid />
      <tw-book />
      <tw-SectionConnectorSolid />
      <twMediaHighlights class="mb-0" />
      <tw-SectionConnectorSolid />
      <twResearchHighlights />
    </main>

    <!-- Footer landmark -->
    <tw-footer />

    <!-- Accessibility Widget -->
    <AccessibilityWidget />

    <!-- Cookie Policy Widget -->
    <CookiePolicyWidget />

    <!-- Keyboard Shortcuts Widget -->
    <KeyboardShortcutsWidget />
  </div>
</template>

<script setup>
  import { defineAsyncComponent } from 'vue'

  // Import components - using the new simple navbar
  import twSectionConnectorSolid from '~/components/tw-SectionConnectorSolid.vue'
  import twHero from '~/components/tw-Hero.vue'
  import twBook from '~/components/tw-Book.vue'
  import twResearchHighlights from '~/components/tw-ResearchHighlights.vue'
  import twMediaHighlights from '~/components/tw-MediaHighlights.vue'
  import twFooter from '~/components/tw-Footer.vue'

  // Convert policy widgets to lazy loading for better bundle optimization
  const AccessibilityWidget = defineAsyncComponent(
    () => import('~/components/AccessibilityWidget.vue')
  )
  const CookiePolicyWidget = defineAsyncComponent(
    () => import('~/components/CookiePolicyWidget.vue')
  )
  const KeyboardShortcutsWidget = defineAsyncComponent(
    () => import('~/components/KeyboardShortcutsWidget.vue')
  )

  // Enhanced description with executive focus and keywords
  const description =
    'Rob van Eijk - Senior privacy executive and C-suite advisor with expertise in data protection, regulatory affairs, and AI governance, specializing in privacy engineering.'
  const ogTitle = 'Rob van Eijk | Privacy Executive & Technology Leader'
  const profileImageWebp = '/assets/img/rvaneijk-profile.webp'
  const profileImageJpg = '/assets/img/rvaneijk-profile.jpg' // Fallback
  const twitterCardWebp = profileImageWebp // Use same image for Twitter
  const _twitterCardJpg = profileImageJpg // Fallback
  const mySite = 'https://blaeu.com/rvaneijk_dev'

  // JSON-LD structured data for personal brand with executive emphasis
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rob van Eijk',
    url: mySite,
    image: profileImageJpg,
    jobTitle: 'Founder & Managing Director Europe',
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Team Blaeu',
        url: 'https://blaeu.com',
      },
      {
        '@type': 'Organization',
        name: 'Future of Privacy Forum',
        url: 'https://fpf.org',
      },
    ],
    description: description,
    knowsAbout: [
      'Privacy Leadership',
      'Regulatory Strategy',
      'Data Protection',
      'Privacy by Design',
      'AI Governance',
      'Executive Management',
      'Privacy Engineering',
      'GDPR Compliance',
      'Data Ethics',
      'Online Privacy',
      'AdTech',
      'AI Ethics',
      'Real-Time Bidding',
      'Machine Learning',
      'Online Tracking Technologies',
      'De-identification Techniques',
      'Data Anonymization',
      'Privacy by Design',
      'Data Protection Law',
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Leiden University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'TU Delft',
      },
    ],
    // Social media profiles from footer
    sameAs: [
      'https://www.linkedin.com/in/rvaneijk88',
      'https://bsky.app/profile/rvaneijk.bsky.social',
      'https://mastodon.nl/@rvaneijk',
      'https://orcid.org/0000-0002-2203-6819',
      'https://scholar.google.nl/citations?user=p4VBH-4AAAAJ',
      'https://github.com/rvaneijk',
      'https://fpf.org/person/rob-van-eijk/',
    ],
    email: 'team@blaeu.com',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Privacy Executive',
      occupationCategory: 'Executive Leadership',
      skills: 'Privacy Engineering, Technology Governance, AI Ethics, Data Strategy',
    },
    // Publications and research
    author: [
      {
        '@type': 'Book',
        name: 'Web Privacy Measurement in Real-Time Bidding Systems',
        url: 'https://ssrn.com/abstract=3319284',
        datePublished: '2019',
        publisher: {
          '@type': 'Organization',
          name: 'Leiden University',
        },
        description:
          'Research on privacy engineering, data protection, and online tracking technologies in Real-Time Bidding systems',
        sameAs:
          'https://scholar.google.nl/citations?view_op=view_citation&hl=nl&user=p4VBH-4AAAAJ&citation_for_view=p4VBH-4AAAAJ:roLk4NBRz8UC',
        citation: 10,
      },
    ],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blaeu.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Rob van Eijk (Dev)',
          item: 'https://blaeu.com/rvaneijk_dev',
        },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    title: 'Rob van Eijk | Privacy Executive & Technology Leader (Dev)',
    meta: [
      // Basic meta tags
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Rob van Eijk' },
      { name: 'robots', content: 'noindex, nofollow' }, // Dev version should not be indexed

      // Open Graph Profile tags
      { property: 'og:site_name', content: mySite },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: mySite },
      { property: 'og:title', content: ogTitle + ' (Dev)' },
      { property: 'og:description', content: description },
      { property: 'og:profile:first_name', content: 'Rob' },
      { property: 'og:profile:last_name', content: 'van Eijk' },
      { property: 'og:profile:username', content: 'rvaneijk' },

      // Open Graph Image tags
      { property: 'og:image', content: profileImageWebp },
      { property: 'og:image:alt', content: 'Rob van Eijk - Privacy Executive & Technology Leader' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle + ' (Dev)' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCardWebp },
      { name: 'twitter:image:alt', content: 'Rob van Eijk - Privacy Executive' },

      // Keywords
      {
        name: 'keywords',
        content:
          'privacy executive, managing director, data protection officer, strategic leadership, Rob van Eijk, privacy engineering, GDPR expert, AI ethics, data strategy',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: mySite },
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
    outline: 2px solid #FFD700;
    outline-offset: 2px;
  }
</style>