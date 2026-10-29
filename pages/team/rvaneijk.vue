<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <main id="main-content" class="pt-12 flex-1">
      <article class="max-w-2xl mx-auto px-4 py-8 text-lg">
        <header class="mb-10">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                  Home
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">About</span>
              </li>
            </ol>
          </nav>

          <!-- Profile -->
          <h1
            class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-tight"
          >
            Rob van Eijk
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            AI, Privacy &amp; EU Regulatory Affairs
          </p>
          <div class="flex flex-col sm:flex-row items-start gap-6">
            <figure class="shrink-0 w-full max-w-xs sm:w-56">
              <img
                src="/assets/img/rvaneijk-leiden-a1862eeb.webp"
                alt="Rob van Eijk speaking at a lectern at Leiden University"
                width="1344"
                height="756"
                fetchpriority="high"
                loading="eager"
                class="w-full aspect-[4/3] object-cover rounded-lg"
              />
              <figcaption class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Photo: @Leiden University
              </figcaption>
            </figure>
            <p class="flex-1 min-w-0 text-gray-800 dark:text-gray-300 leading-relaxed">
              Nine years as technologist and senior supervision officer at the Dutch Data Protection
              Authority, senior fellow at the Future of Privacy Forum, and a PhD from Leiden
              University on how real-time bidding systems process personal data.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6">
            <a
              href="mailto:team@blaeu.com?subject=Scoping%20call"
              aria-label="Book a scoping call by email (team@blaeu.com)"
              class="no-hover inline-flex items-center px-5 py-2.5 bg-brand-gold text-black font-semibold rounded hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
              Book a scoping call
            </a>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Opens your email app: team@blaeu.com
            </span>
          </div>
          <p class="mt-4">
            <a
              href="https://www.linkedin.com/in/rvaneijk88"
              target="_blank"
              rel="noopener"
              class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
            >
              LinkedIn
            </a>
          </p>
        </header>

        <!-- Approach -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How I work</h2>
          <p class="text-gray-800 dark:text-gray-300 leading-relaxed mb-3">
            I start with the system itself: what data it collects, where that data goes, and who can
            use it. Only then do I look at what the law requires.
          </p>
          <p class="text-gray-800 dark:text-gray-300 leading-relaxed">
            I look at it from the end user's point of view: what could go wrong for the people whose
            data is involved? That gives a clear basis for weighing risks and choosing technical,
            organisational, and contractual measures.
          </p>
        </section>

        <!-- Key Publications -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Key publications
          </h2>
          <div class="space-y-10">
            <div
              v-for="pub in publications"
              :key="pub.title"
              class="flex flex-col sm:flex-row items-start gap-6"
            >
              <img
                :src="pub.cover"
                :alt="`Cover of ${pub.short}`"
                class="shrink-0 w-28 sm:w-32 aspect-[1/1.414] object-cover border border-gray-200 dark:border-gray-700"
                width="128"
                height="181"
                loading="lazy"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {{ pub.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ pub.meta }}</p>
                <p class="text-gray-800 dark:text-gray-300 leading-relaxed mb-3">{{ pub.text }}</p>
                <p>
                  <template v-for="(link, i) in pub.links" :key="link.href">
                    <span v-if="i > 0" class="mx-2 text-gray-300 dark:text-gray-600">|</span>
                    <a
                      :href="link.href"
                      :download="
                        link.href.endsWith('.pdf') && link.href.startsWith('/') ? '' : undefined
                      "
                      target="_blank"
                      rel="noopener"
                      class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2 text-sm"
                    >
                      {{ link.label }}
                    </a>
                  </template>
                </p>
              </div>
            </div>
          </div>
          <NuxtLink
            to="/research"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2 mt-6"
          >
            All research
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </section>

        <!-- Track record -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Track record</h2>
          <p class="text-gray-800 dark:text-gray-300 leading-relaxed mb-3">
            Fifteen years of EU regulatory work, including:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-300 leading-relaxed">
            <li>
              Dutch DPA representative in the WP29/EDPB Technology Expert Subgroup (2010–2019)
            </li>
            <li>
              Berlin Group (International Working Group on Data Protection in Technology) since
              2010, first for the Dutch DPA and since 2022 as independent expert
            </li>
            <li>Keynotes at the Conference Board, the Berlin Group, and Deutsche Telekom</li>
            <li>
              Presentations to the Article 29 Working Party, the European Parliament's LIBE
              Committee, and the Council of the EU
            </li>
            <li>Opening remarks at the OECD</li>
          </ul>
        </section>

        <!-- Portfolio links -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            In the portfolio
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
            <li v-for="link in portfolioLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="inline-flex items-center !min-h-6 !min-w-0 !px-0 !py-0.5 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
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
  import { trackRecordRows } from '~/utils/trackRecord'

  const portfolioLinks = [
    ...trackRecordRows.map(row => ({ to: `/portfolio/#${row.anchor}`, label: row.label })),
    { to: '/recordings', label: 'Selected recordings' },
  ]

  const publications = [
    {
      cover: '/assets/img/tiny_samman.webp',
      short: 'From Pseudonymised to Anonymous Data',
      title:
        'From Pseudonymised to Anonymous Data: A practical assessment framework under the SRB ruling, applied to real use cases provided by European companies',
      meta: 'Cabinet SAMMAN & Blaeu (2026)',
      text: 'In this joint policy report with Benjamin de Vanssay, we set out a practical framework for assessing when pseudonymised data becomes anonymous under the SRB ruling. We apply the framework to real use cases provided by European companies.',
      links: [
        {
          label: 'View publication',
          href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6972998',
        },
        {
          label: 'French edition (PDF)',
          href: '/assets/pdf/Etude_Pseudonymisation_vers_Donnees_Anonymes_FR_2026.pdf',
        },
      ],
    },
    {
      cover: '/assets/img/tiny_fpf_article25.webp',
      short: 'Unlocking Data Protection By Design and By Default',
      title:
        'Unlocking Data Protection By Design & By Default: Lessons from the Enforcement of Article 25 GDPR',
      meta: 'Future of Privacy Forum (2023), co-edited with G. Zanfir-Fortuna and I. Perera',
      text: 'A report on how data protection authorities and courts have enforced Article 25 GDPR, and what that means for data protection by design and by default in practice. Written by C. Michelakaki and S. Barros Vale.',
      links: [
        {
          label: 'View publication (PDF)',
          href: 'https://fpf.org/wp-content/uploads/2023/05/FPF-Article-25-GDPR-A4-FINAL-Digital.pdf',
        },
      ],
    },
    {
      cover: '/assets/img/tiny_meijers.webp',
      short: 'Web Privacy Measurement in Real-Time Bidding Systems',
      title:
        'Web Privacy Measurement in Real-Time Bidding Systems: A Graph-Based Approach to RTB System Classification',
      meta: 'Leiden University, Leiden Law School (2019)',
      text: 'My doctoral thesis measured how real-time bidding systems track users across websites, and showed how personal data flows between partners in RTB networks because of their specialised roles in online advertising.',
      links: [
        {
          label: 'View publication',
          href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3319284',
        },
      ],
    },
  ]

  defineOptions({
    name: 'RobVanEijkPage',
  })

  // Type definitions
  interface MediaLink {
    url: string
    status?: string
  }

  interface MediaItem {
    title: string
    year: number | string
    publisher?: string
    location?: string
    category?: string
    authors?: string[]
    metadata?: Record<string, unknown>
    links?: MediaLink[]
  }

  interface MediaSection {
    year: number | string
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
    'Rob van Eijk, senior fellow at the Future of Privacy Forum and former Dutch DPA technologist. EU regulatory affairs, AI governance, and data protection expert.'
  const ogTitle = 'Rob van Eijk | Blaeu'
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

  // What Rob did at the session, from the recorded category and role
  function sessionRole(item: MediaItem): string {
    const role = typeof item.metadata?.role === 'string' ? item.metadata.role : ''
    if (item.category === 'keynote') return 'gave a keynote'
    if (item.category === 'presentation') return 'gave a presentation'
    if (item.category === 'opening remarks')
      return role === 'Moderator' ? 'gave opening remarks and moderated' : 'gave opening remarks'
    const moderated =
      (item.authors ?? []).some(a => /Eijk R\. van/.test(a) && /Moderator/.test(a)) ||
      (/Eijk R\. van/.test(role) && /moderator/i.test(role))
    return moderated ? 'moderated a panel' : 'took part in a panel'
  }

  function mapEvent(item: MediaItem): SchemaOrgEntry {
    const orgPart = item.publisher ? ` at ${item.publisher}` : ''
    const locPart = item.location ? `, ${item.location}` : ''
    const eventUrl = getFirstActiveUrl(item) || 'https://blaeu.com/team/rvaneijk/'
    const entry: SchemaOrgEntry = {
      '@type': 'Event',
      name: item.title,
      startDate: String(item.year),
      endDate: String(item.year),
      description: `Rob van Eijk ${sessionRole(item)}${orgPart}${locPart} (${item.year}).`,
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
    const editors = item.metadata?.editors
    if (Array.isArray(editors) && editors.length) descParts.push(`edited by ${editors.join(', ')}`)
    entry.description = descParts.join(', ').replace(/\.$/, '') + '.'
    if (item.publisher) entry.publisher = item.publisher
    const url = getFirstActiveUrl(item)
    if (url) entry.url = url
    return entry
  }

  // --- Build memberOf from committees data (all 16 items) ---
  const memberOf = flattenSections(committeesData).map(item => {
    const entry: SchemaOrgEntry = {
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
    name: 'Publications and talks by Rob van Eijk',
    numberOfItems: itemListElements.length,
    itemListElement: itemListElements.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item,
    })),
  }

  // JSON-LD structured data for personal brand.
  // The @id values match the homepage @graph so Google resolves this Person and
  // Team Blaeu as the same entities described there, rather than as duplicates.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://blaeu.com/team/rvaneijk/#person',
    name: 'Rob van Eijk',
    url: mySite,
    image: profileImageJpg,
    jobTitle: 'Founder & Principal',
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Blaeu',
      url: 'https://blaeu.com',
    },
    description: description,
    knowsAbout: [
      'Privacy Leadership',
      'Regulatory Strategy',
      'Data Protection',
      'Privacy by Design',
      'AI Governance',
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
      'Data Anonymisation',
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
        department: 'Centre for Professional Learning; Leiden Centre of Data Science',
        description: 'Guest Professor (2020–2023)',
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
      name: 'Technology Policy Expert',
      skills: 'Privacy Engineering, Technology Governance, AI Ethics, Data Strategy',
      responsibilities: [
        'Keynotes at the Conference Board, the Berlin Group, and Deutsche Telekom; presentations to the WP29, LIBE, and the Council of the EU; opening remarks at the OECD',
        'Scholarly works and professional publications',
        'Expert commentary in POLITICO, MLex, Bloomberg, and Euronews',
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
    title: 'Rob van Eijk | Blaeu',
    meta: [
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Rob van Eijk' },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:site_name', content: 'Blaeu' },
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
        content: 'Portrait of Rob van Eijk',
      },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image', content: profileImageJpg },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_GB' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: twitterCardWebp },
      { name: 'twitter:image:alt', content: 'Portrait of Rob van Eijk' },

      {
        name: 'keywords',
        content:
          'Rob van Eijk, EU regulatory affairs, AI Act, EU public affairs, expert witness, keynote speaker, OECD expert, media mentions, keynote presentations, AI governance, GDPR compliance, Future of Privacy Forum, Dutch Data Protection Authority',
      },
    ],
    link: [{ rel: 'canonical', href: mySite }],
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
</script>
