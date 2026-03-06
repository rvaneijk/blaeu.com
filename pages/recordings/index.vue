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
      <div class="max-w-2xl mx-auto px-4 py-8 text-lg">
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
                <NuxtLink
                  to="/portfolio"
                  class="breadcrumb-link transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Portfolio
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Recordings</span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
          >
            Selected Recordings
          </h1>
        </header>

        <div aria-label="Recordings">
          <template v-for="(item, index) in recordings" :key="item.id">
            <h2
              v-if="index === 0 || item.year !== recordings[index - 1].year"
              class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4"
            >
              {{ item.year }}
            </h2>
            <article
              :class="
                index < recordings.length - 1
                  ? 'mb-8 pb-8 border-b border-gray-200 dark:border-gray-700'
                  : 'mb-8'
              "
            >
              <h3
                class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug tracking-tight"
              >
                <a
                  v-if="primaryLink(item)"
                  :href="primaryLink(item)!.url"
                  target="_blank"
                  rel="noopener"
                  class="hover:underline transition-colors duration-200 !p-0"
                >
                  {{ item.title }}
                </a>
                <span v-else>{{ item.title }}</span>
              </h3>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span>{{ formatAuthors(item.authors) }}</span>
                <span class="mx-1">&middot;</span>
                <span>{{ item.year }}</span>
              </p>

              <p
                :class="[
                  'text-gray-700 dark:text-gray-300 leading-relaxed',
                  !expandedItems[item.id] && hasLongSummary(item) ? 'line-clamp-4' : '',
                ]"
              >
                {{ item.summary }}
              </p>
              <button
                v-if="hasLongSummary(item)"
                class="details-toggle mt-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                :aria-expanded="!!expandedItems[item.id]"
                @click="expandedItems[item.id] = !expandedItems[item.id]"
              >
                {{ expandedItems[item.id] ? 'Less' : 'Details' }}
                <i
                  :class="expandedItems[item.id] ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                  class="ml-1 fa-xs"
                  aria-hidden="true"
                ></i>
              </button>
            </article>
          </template>
        </div>
      </div>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  import academicTeachingData from '~/data/academic-teaching.json'
  import committeesBoardsData from '~/data/committees-boards.json'
  import keynoteSpeakerData from '~/data/keynote-speaker.json'
  import mediaMentionsData from '~/data/media-mentions.json'
  import newsHighlightsData from '~/data/news-highlights.json'
  import researchHighlightsData from '~/data/research-highlights.json'
  import scholarlyWorksData from '~/data/scholarly-works.json'
  import professionalPublicationsData from '~/data/professional-publications.json'
  import popularMediaData from '~/data/popular-media.json'
  import panelExpertData from '~/data/panel-expert.json'
  import panelModeratorData from '~/data/panel-expert_with_moderator.json'
  import professionalLearningData from '~/data/professional-learning.json'

  defineOptions({ name: 'RecordingsPage' })

  interface ArchiveUrl {
    url: string
    source: string
    status: string
  }

  interface MediaLink {
    url: string
    type: string
    title: string
    status: string
    archiveUrls?: ArchiveUrl[]
  }

  interface MediaItem {
    id: string
    title: string
    year: number
    authors?: string[]
    category?: string
    summary?: string
    links?: MediaLink[]
  }

  interface MediaSection {
    year: number
    items: MediaItem[]
  }

  interface MediaData {
    sections: MediaSection[]
  }

  const expandedItems = ref<Record<string, boolean>>({})

  function flattenSections(data: MediaData): MediaItem[] {
    return (data.sections ?? []).flatMap((s: MediaSection) =>
      (s.items ?? []).map((item: MediaItem) => ({ ...item, year: item.year ?? s.year }))
    )
  }

  function formatAuthors(authors?: string[]): string {
    if (!authors || authors.length === 0) return 'Rob van Eijk'
    return authors.join(', ')
  }

  function hasLongSummary(item: MediaItem): boolean {
    return (item.summary?.length ?? 0) > 200
  }

  function activeLinks(item: MediaItem): MediaLink[] {
    if (!item.links) return []
    return item.links.filter(link => link.status !== 'broken')
  }

  function primaryLink(item: MediaItem): MediaLink | null {
    const links = activeLinks(item)
    if (links.length === 0) return null
    return links.find(l => l.type === 'video') ?? links[0]
  }

  const allSources = [
    academicTeachingData,
    committeesBoardsData,
    keynoteSpeakerData,
    mediaMentionsData,
    newsHighlightsData,
    researchHighlightsData,
    scholarlyWorksData,
    professionalPublicationsData,
    popularMediaData,
    panelExpertData,
    panelModeratorData,
    professionalLearningData,
  ]

  const recordings = allSources
    .flatMap(flattenSections)
    .filter(item => item.summary)
    .sort((a, b) => b.year - a.year)

  const title = 'Selected Recordings | AI, Privacy & EU Regulatory Affairs'
  const description =
    'Recordings of panels, masterclasses, and media appearances on EU regulatory affairs, AI governance, and data protection by Rob van Eijk.'
  const ogImage = 'https://blaeu.com/assets/blog/rothko-abstracts/recordings-index.svg'
  const pageUrl = 'https://blaeu.com/recordings/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Recordings — Rob van Eijk',
    description: description,
    url: pageUrl,
    author: {
      '@type': 'Person',
      name: 'Rob van Eijk',
      url: 'https://blaeu.com/team/rvaneijk',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blaeu.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portfolio',
          item: 'https://blaeu.com/portfolio/',
        },
        { '@type': 'ListItem', position: 3, name: 'Recordings', item: pageUrl },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Team Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'author', content: 'Rob van Eijk' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'keywords',
        content:
          'privacy recordings, CPDP conference, data protection panels, AI governance talks, privacy engineering masterclass, GDPR compliance, consent technologies, de-identification techniques, differential privacy, homomorphic encryption, Rob van Eijk speaking, Future of Privacy Forum, OECD privacy, panel moderator, privacy expert recordings, digital privacy conferences',
      },
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:secure_url', content: ogImage },
      {
        property: 'og:image:alt',
        content: 'Selected recordings from privacy conferences and panel discussions',
      },
      { property: 'og:image:type', content: 'image/svg+xml' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '300' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      {
        name: 'twitter:image:alt',
        content: 'Selected recordings from privacy conferences and panel discussions',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: pageUrl },
    ],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>

<style scoped>
  .details-toggle {
    padding: 0 !important;
    min-width: unset !important;
    min-height: unset !important;
  }

  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
