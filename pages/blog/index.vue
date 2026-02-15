<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Header -->
    <tw-NavbarMinimal />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      <twResearchHighlights />
    </main>

    <!-- Footer -->
    <tw-FooterMinimal />
  </div>
</template>

<script setup>
  // Define component name to satisfy multi-word rule
  defineOptions({
    name: 'BlogPage',
  })

  // Enhanced SEO meta with comprehensive optimization
  const title = 'Blog | Privacy & Data Protection Insights'
  const description =
    'Expert insights on privacy engineering, AI governance, and data protection from Team Blaeu. Explore thought leadership on GDPR compliance, consent technologies, and responsible AI development.'
  const ogImage = '/assets/img/og-image.webp'
  const pageUrl = 'https://blaeu.com/blog'

  // JSON-LD structured data for blog section (without hardcoded posts)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Team Blaeu Privacy & Data Protection Blog',
    description: description,
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blaeu.com/assets/img/logo.png',
      },
    },
    author: {
      '@type': 'Person',
      name: 'Rob van Eijk',
      url: 'https://blaeu.com/team/rvaneijk',
      sameAs: ['https://www.linkedin.com/in/rvaneijk88', 'https://orcid.org/0000-0002-2203-6819'],
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Privacy Engineering',
      },
      {
        '@type': 'Thing',
        name: 'AI Governance',
      },
      {
        '@type': 'Thing',
        name: 'Data Protection',
      },
      {
        '@type': 'Thing',
        name: 'GDPR Compliance',
      },
      {
        '@type': 'Thing',
        name: 'Consent Technologies',
      },
    ],
    keywords: [
      'privacy blog',
      'data protection insights',
      'GDPR compliance',
      'AI governance',
      'privacy engineering',
      'consent management',
      'responsible AI',
      'digital privacy',
      'privacy by design',
      'data ethics',
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
          name: 'Blog',
          item: pageUrl,
        },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Team Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Rob van Eijk' },
      {
        name: 'keywords',
        content:
          'privacy blog, data protection insights, GDPR compliance, AI governance, privacy engineering, consent management, responsible AI, digital privacy',
      },

      // Open Graph tags
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Team Blaeu' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: 'Team Blaeu privacy and data protection blog' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),
      },
    ],
  })
</script>
