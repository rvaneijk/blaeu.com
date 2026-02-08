<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header landmark with the new unified navigation -->
    <header>
      <tw-NavbarMinimal />
    </header>

    <!-- H1 tag is now visible in hero section for better SEO -->

    <!-- Main content landmark -->
    <main id="main-content" class="pt-28" tabindex="-1" aria-label="Main content">
      <tw-hero />
      <tw-SectionConnectorSolid />
      <tw-book />
      <tw-SectionConnectorSolid />
      <twMediaHighlights class="mb-0" />
    </main>

    <!-- Footer landmark -->
    <tw-footer />
  </div>
</template>

<script setup>
  // Define component name to satisfy multi-word rule
  defineOptions({
    name: 'RobVanEijkPage',
  })

  // Enhanced description with executive focus and quantified achievements
  const description =
    'Rob van Eijk - International privacy executive with 78+ media mentions in NYT, Bloomberg, POLITICO. 23+ keynote presentations at OECD, WP29. Expert in data protection, AI governance, and privacy engineering.'
  const ogTitle = 'Rob van Eijk | Privacy Executive & Technology Leader'
  const profileImageWebp = '/assets/img/rvaneijk-profile.webp'
  const profileImageJpg = '/assets/img/rvaneijk-profile.jpg' // Fallback
  const twitterCardWebp = profileImageWebp // Use same image for Twitter
  const _twitterCardJpg = profileImageJpg // Fallback
  const mySite = 'https://blaeu.com/team/rvaneijk'

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
      name: 'Privacy Executive & International Keynote Speaker',
      occupationCategory: 'Executive Leadership',
      skills: 'Privacy Engineering, Technology Governance, AI Ethics, Data Strategy',
      responsibilities: [
        '78+ international media mentions in major publications',
        '23+ keynote presentations at OECD, WP29, Conference Board',
        '11 research publications on AI and privacy technologies',
        'Expert commentary in NYT, Bloomberg, POLITICO, Euronews',
        'International speaking across 7+ languages',
      ],
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
      {
        '@type': 'CreativeWork',
        name: 'AI-Learning by Building Series',
        description: 'Technical blog series on AI implementation and engineering',
        publisher: {
          '@type': 'Organization',
          name: 'Team Blaeu',
        },
        datePublished: '2025',
        workExample: [
          'AI Prompting Trap Over-Engineering',
          'OCR Vision AI Understanding',
          'Email Security System',
          'Multi-Tier Backup System',
        ],
      },
    ],
    // International speaking engagements
    performerIn: [
      {
        '@type': 'Event',
        name: 'OECD Consent Technologies Roundtable',
        description: 'Moderator for emerging consent practices in digital ecosystem',
        location: {
          '@type': 'Place',
          name: 'Paris, France',
        },
        startDate: '2025-03-18',
        organizer: {
          '@type': 'Organization',
          name: 'OECD',
        },
      },
      {
        '@type': 'Event',
        name: 'EDAA Summit 2023',
        description: "Keynote: Ethics in Tech - Online Advertiser's Path Forward",
        location: {
          '@type': 'Place',
          name: 'Brussels, Belgium',
        },
        startDate: '2023-03-15',
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
          name: 'Rob van Eijk',
          item: 'https://blaeu.com/team/rvaneijk',
        },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    title: 'Rob van Eijk | Privacy Executive & Technology Leader',
    meta: [
      // Basic meta tags
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Rob van Eijk' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph Profile tags
      { property: 'og:site_name', content: mySite },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: mySite },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:profile:first_name', content: 'Rob' },
      { property: 'og:profile:last_name', content: 'van Eijk' },
      { property: 'og:profile:username', content: 'rvaneijk' },

      // Open Graph Image tags (WebP + JPEG fallback)
      { property: 'og:image', content: `https://blaeu.com${profileImageWebp}` },
      { property: 'og:image:secure_url', content: `https://blaeu.com${profileImageWebp}` },
      {
        property: 'og:image:alt',
        content:
          'Rob van Eijk - International privacy executive with 78+ media mentions and 23+ keynote presentations',
      },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image', content: `https://blaeu.com${profileImageJpg}` },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCardWebp },
      { name: 'twitter:image:alt', content: 'Rob van Eijk - Privacy Executive' },

      // Enhanced keywords with quantified achievements and media presence
      {
        name: 'keywords',
        content:
          'Rob van Eijk, privacy executive, keynote speaker, OECD expert, NYT Bloomberg POLITICO expert, 78+ media mentions, 23+ keynote presentations, privacy thought leader, AI governance, GDPR compliance, de-identification techniques, real-time bidding expert, international speaker',
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
    outline: 2px solid #ffd700;
    outline-offset: 2px;
  }
</style>
