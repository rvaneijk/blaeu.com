<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <tw-NavbarMinimal />
    <ScrollProgressBar />

    <main id="main-content" class="pt-12 flex-1">
      <article class="max-w-2xl mx-auto px-4 py-8 text-lg">
        <header class="mb-10">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors" aria-label="Home">
                  <i class="fas fa-house fa-sm text-brand-gold" aria-hidden="true"></i>
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">About</span>
              </li>
            </ol>
          </nav>

          <!-- Profile -->
          <div class="flex flex-col md:flex-row items-start gap-6 mb-2">
            <div class="shrink-0 w-36 md:w-44 md:-ml-10 md:self-stretch">
              <img
                src="/assets/img/tiny_welcome.webp"
                alt="Rob van Eijk"
                class="w-full h-auto md:h-full object-cover object-top"
                width="672"
                height="682"
                fetchpriority="high"
                loading="eager"
                @error="onImgError"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h1
                class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight tracking-tight"
              >
                Rob van Eijk
              </h1>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Data Privacy Expert · EU Data Protection &amp; AI Governance · PhD
              </p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                I lead organisational change and manage high-level stakeholder relationships across
                the EU, building bridges between technical, legal, and business domains for Fortune
                500 companies, startups, and regulatory bodies. My work has been quoted in the New
                York Times, Bloomberg, and POLITICO.
              </p>
            </div>
          </div>
        </header>

        <!-- Approach -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
            My Approach to Privacy Leadership
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            I approach privacy challenges by integrating technical understanding with regulatory
            expertise, creating solutions that balance innovation with fundamental rights
            protection.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            I also plan from an end-user's perspective with key questions: What are the privacy
            issues? What is the privacy component? These give me a focused starting point to
            identify and assess risks and explore technical, organizational, and contractual
            mitigations.
          </p>
        </section>

        <!-- Key Publication -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
            Key Publication
          </h2>
          <div class="flex flex-col md:flex-row items-start gap-6 mb-4">
            <div class="shrink-0 w-32 md:w-40 md:-ml-10">
              <img
                src="/assets/img/tiny_meijers.webp"
                alt="Cover of Web Privacy Measurement in Real-Time Bidding Systems"
                class="w-full h-auto"
                width="160"
                height="224"
                loading="lazy"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                Web Privacy Measurement in Real-Time Bidding Systems
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Leiden University, Leiden Law School (2019)
              </p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                In my doctoral thesis, I investigated online advertising technologies that appear to
                track user behavior across websites. The research demonstrates how data flows
                between partners in RTB networks due to their specialized roles in the ad tech
                ecosystem.
              </p>
            </div>
          </div>
          <a
            href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3319284"
            target="_blank"
            rel="noopener"
            class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 text-sm !p-0"
          >
            View publication
            <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
          </a>
        </section>
      </article>
    </main>

    <tw-Footer />
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
    category?: string
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
    [key: string]: unknown
  }

  const description =
    'Rob van Eijk - Senior Fellow at Future of Privacy Forum, former Dutch DPA. 78+ media mentions (NYT, Bloomberg, POLITICO), 23+ keynotes (OECD, WP29). EU regulatory affairs, AI governance, and data protection expert.'
  const ogTitle = 'Rob van Eijk | AI, Privacy & EU Regulatory Affairs'
  const profileImageWebp = 'https://blaeu.com/assets/img/rvaneijk-profile.webp'
  const profileImageJpg = 'https://blaeu.com/assets/img/rvaneijk-profile.jpg'
  const twitterCardWebp = profileImageWebp
  const _twitterCardJpg = profileImageJpg
  const mySite = 'https://blaeu.com/team/rvaneijk/'

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
    const descParts = [`Research publication (${item.year})`]
    if (item.publisher) descParts.push(`published by ${item.publisher}`)
    entry.description = descParts.join(', ') + '.'
    if (item.publisher) entry.publisher = item.publisher
    const url = getFirstActiveUrl(item)
    if (url) entry.url = url
    return entry
  }

  function mapEvent(item: MediaItem): SchemaOrgEntry {
    const role =
      item.category === 'keynote' || item.category === 'opening remarks' ? 'keynote' : 'panel'
    const orgPart = item.publisher ? ` at ${item.publisher}` : ''
    const locPart = item.location ? `, ${item.location}` : ''
    const eventUrl = getFirstActiveUrl(item) || 'https://blaeu.com/team/rvaneijk/'
    const entry: SchemaOrgEntry = {
      '@type': 'Event',
      name: item.title,
      startDate: String(item.year),
      endDate: String(item.year),
      description: `Rob van Eijk presented a ${role}${orgPart}${locPart} (${item.year}).`,
      eventStatus: 'https://schema.org/EventScheduled',
      image: {
        '@type': 'ImageObject',
        url: 'https://blaeu.com/assets/img/rvaneijk-profile.jpg',
        width: 1200,
        height: 613,
      },
      performer: {
        '@type': 'Person',
        name: 'Rob van Eijk',
        url: 'https://blaeu.com/team/rvaneijk/',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        validFrom: `${item.year}-01-01`,
        url: eventUrl,
      },
    }
    if (item.location) {
      entry.location = {
        '@type': 'Place',
        name: item.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: item.location,
        },
      }
    } else {
      entry.eventAttendanceMode = 'https://schema.org/MixedEventAttendanceMode'
      entry.location = {
        '@type': 'VirtualLocation',
        url: 'https://blaeu.com/team/rvaneijk/',
      }
    }
    if (item.publisher) {
      entry.organizer = {
        '@type': 'Organization',
        name: item.publisher,
        url: eventUrl,
      }
    }
    entry.url = eventUrl
    return entry
  }

  function mapArticle(item: MediaItem): SchemaOrgEntry {
    const entry: SchemaOrgEntry = {
      '@type': 'Article',
      name: item.title,
      datePublished: String(item.year),
    }
    const descParts = [`Professional publication (${item.year})`]
    if (item.publisher) descParts.push(`published by ${item.publisher}`)
    entry.description = descParts.join(', ') + '.'
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
    jobTitle: 'Founder & Principal',
    worksFor: {
      '@type': 'Organization',
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
    },
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
    affiliation: [
      {
        '@type': 'Organization',
        name: 'Future of Privacy Forum',
        url: 'https://fpf.org',
        description: 'Senior Fellow',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Leiden University',
        department: 'eLaw, Center for Law and Digital Technologies',
        description: 'Guest Professor (2021-2023)',
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
      skills: 'Privacy Engineering, Technology Governance, AI Ethics, Data Strategy',
      responsibilities: [
        '78+ international media mentions in major publications',
        '23+ keynote presentations at OECD, WP29, Conference Board',
        '11 research publications on AI and privacy technologies',
        'Expert commentary in NYT, Bloomberg, POLITICO, Euronews',
        'International speaking across 7+ languages',
      ],
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
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
        item: 'https://blaeu.com/team/rvaneijk/',
      },
    ],
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    charset: 'utf-8',
    title: 'Rob van Eijk | AI, Privacy & EU Regulatory Affairs',
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

      { property: 'og:image', content: profileImageWebp },
      { property: 'og:image:secure_url', content: profileImageWebp },
      {
        property: 'og:image:alt',
        content:
          'Rob van Eijk - International privacy executive with 78+ media mentions and 23+ keynote presentations',
      },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image', content: profileImageJpg },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCardWebp },
      { name: 'twitter:image:alt', content: 'Rob van Eijk - Privacy Executive' },

      {
        name: 'keywords',
        content:
          'Rob van Eijk, EU regulatory affairs, AI Act, EU public affairs, privacy executive, keynote speaker, OECD expert, NYT Bloomberg POLITICO expert, 78+ media mentions, 23+ keynote presentations, AI governance, GDPR compliance, Future of Privacy Forum, Dutch Data Protection Authority',
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
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbLd),
      },
    ],
  })

  const onImgError = (e: Event): void => {
    ;(e.target as HTMLImageElement).setAttribute('data-error', '1')
  }
</script>
