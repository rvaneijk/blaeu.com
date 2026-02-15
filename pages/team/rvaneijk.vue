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

      <!-- Recordings CTA -->
      <section class="py-16 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto bg-[#4B5563] rounded-xl p-8 text-center">
            <p class="text-white text-lg mb-6">
              Watch featured panel discussions, masterclasses, and conference talks on privacy
              engineering, AI governance, and data protection.
            </p>
            <NuxtLink
              to="/recordings"
              class="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-brand-blue hover:text-white hover:shadow-lg transition-colors duration-200"
            >
              Watch Selected Recordings
              <i class="fas fa-arrow-right fa-sm" aria-hidden="true"></i>
            </NuxtLink>
            <div class="mt-6 text-gray-300 text-sm">
              <span class="mr-4">Stay updated:</span>
              <a
                href="/assets/rss/rvaneijk.xml"
                target="_blank"
                class="inline-flex items-center gap-1 text-[#FFD700] hover:text-[#FFC700] transition-colors"
              >
                <i class="fas fa-rss fa-sm" aria-hidden="true"></i>
                RSS Feed
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer landmark -->
    <tw-footer />
  </div>
</template>

<script setup lang="ts">
  import scholarlyWorksData from '~/data/scholarly-works.json'
  import keynoteData from '~/data/keynote-speaker.json'
  import panelExpertData from '~/data/panel-expert.json'
  import panelModeratorData from '~/data/panel-expert_with_moderator.json'
  import publicationsData from '~/data/professional-publications.json'
  import committeesData from '~/data/committees-boards.json'

  defineOptions({
    name: 'RobVanEijkPage',
  })

  // Type definitions
  interface MediaLink {
    url: string
    status: string
  }

  interface MediaItem {
    title: string
    year: number
    publisher?: string
    location?: string
    links?: MediaLink[]
  }

  interface MediaSection {
    year: number
    items: MediaItem[]
  }

  interface MediaData {
    sections: MediaSection[]
  }

  interface SchemaOrgEntry {
    '@type': string
    name: string
    datePublished?: string
    startDate?: string
    publisher?: string
    organizer?: string
    location?: string
    url?: string
  }

  const description =
    'Rob van Eijk - Privacy executive with 78+ media mentions (NYT, Bloomberg, POLITICO) and 23+ keynotes (OECD, WP29). Expert in data protection, AI governance, and privacy engineering.'
  const ogTitle = 'Rob van Eijk | Privacy Executive & Technology Leader'
  const profileImageWebp = '/assets/img/rvaneijk-profile.webp'
  const profileImageJpg = '/assets/img/rvaneijk-profile.jpg'
  const twitterCardWebp = profileImageWebp
  const _twitterCardJpg = profileImageJpg
  const mySite = 'https://blaeu.com/team/rvaneijk'

  // --- Helper: extract first active link URL from an item ---
  function getFirstActiveUrl(item: MediaItem): string | undefined {
    const link = item.links?.find(
      (l: MediaLink) => l.status === 'active' && l.url && !l.url.startsWith('/')
    )
    return link?.url || undefined
  }

  // --- Helper: flatten sections into items ---
  function flattenSections(data: MediaData, minYear = 0): MediaItem[] {
    return data.sections
      .filter((s: MediaSection) => typeof s.year === 'number' && s.year >= minYear)
      .flatMap((s: MediaSection) => s.items)
  }

  // --- Map data to minimal schema.org types (plain strings to minimize size) ---
  function mapScholarlyWork(item: MediaItem): SchemaOrgEntry {
    const entry: SchemaOrgEntry = {
      '@type': 'ScholarlyArticle',
      name: item.title,
      datePublished: String(item.year),
    }
    if (item.publisher) entry.publisher = item.publisher
    const url = getFirstActiveUrl(item)
    if (url) entry.url = url
    return entry
  }

  function mapEvent(item: MediaItem): SchemaOrgEntry {
    const entry: SchemaOrgEntry = {
      '@type': 'Event',
      name: item.title,
      startDate: String(item.year),
    }
    if (item.location) entry.location = item.location
    if (item.publisher) entry.organizer = item.publisher
    const url = getFirstActiveUrl(item)
    if (url) entry.url = url
    return entry
  }

  function mapArticle(item: MediaItem): SchemaOrgEntry {
    const entry: SchemaOrgEntry = {
      '@type': 'Article',
      name: item.title,
      datePublished: String(item.year),
    }
    if (item.publisher) entry.publisher = item.publisher
    const url = getFirstActiveUrl(item)
    if (url) entry.url = url
    return entry
  }

  // --- Build memberOf from committees data (all 16 items) ---
  const memberOf = flattenSections(committeesData).map(item => {
    const entry = {
      '@type': 'Organization',
      name: item.title,
    }
    const url = getFirstActiveUrl(item)
    if (url) entry.url = url
    return entry
  })

  // --- Build ItemList items ---
  const itemListElements = [
    ...flattenSections(scholarlyWorksData).map(mapScholarlyWork),
    ...flattenSections(keynoteData).map(mapEvent),
    ...flattenSections(panelExpertData, 2021).map(mapEvent),
    ...flattenSections(panelModeratorData, 2021).map(mapEvent),
    ...flattenSections(publicationsData, 2021).map(mapArticle),
  ]

  const jsonLdItems = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Professional Achievements of Rob van Eijk',
    numberOfItems: itemListElements.length,
    itemListElement: itemListElements.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item,
    })),
  }

  // JSON-LD structured data for personal brand
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
    affiliation: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Leiden University',
        department: 'eLaw, Center for Law and Digital Technologies',
        description: 'Guest Professor (2021-2023)',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'UC Berkeley School of Law',
        department: 'Berkeley Center for Law and Technology',
        description: 'Guest Lecture',
      },
    ],
    memberOf,
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
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Rob van Eijk' },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: mySite },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:profile:first_name', content: 'Rob' },
      { property: 'og:profile:last_name', content: 'van Eijk' },
      { property: 'og:profile:username', content: 'rvaneijk' },

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

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCardWebp },
      { name: 'twitter:image:alt', content: 'Rob van Eijk - Privacy Executive' },

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
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLdItems),
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
