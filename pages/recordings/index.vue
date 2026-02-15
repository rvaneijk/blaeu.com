<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Header -->
    <tw-NavbarMinimal />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      <section class="pt-8 pb-8 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Selected Recordings
          </h1>

          <div class="text-center mb-10">
            <div class="bg-[#4B5563] rounded-xl p-8 max-w-2xl mx-auto mb-6">
              <p class="text-white text-lg">
                Recordings from conferences, panels, masterclasses, and media appearances on privacy
                engineering, AI governance, and data protection.
              </p>
            </div>
          </div>

          <!-- Recording cards -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-8"
            role="list"
            aria-label="Panel recordings"
          >
            <article
              v-for="item in recordings"
              :key="item.id"
              class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-l-4 border-brand-grey"
              role="listitem"
            >
              <!-- Image slot (commented out for now) -->
              <!-- <div class="h-48 overflow-hidden">
              <img src="/assets/blog/rothko-abstracts/[slug].svg" alt="" class="w-full h-full object-cover" loading="lazy" />
            </div> -->

              <!-- Content -->
              <div class="p-6">
                <!-- Title -->
                <h2 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {{ item.title }}
                </h2>

                <!-- Author & Date -->
                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{{ formatAuthors(item.authors) }}</span>
                  <span>•</span>
                  <span>{{ item.year }}</span>
                </div>

                <!-- Category Badge -->
                <div class="mb-3 flex flex-wrap gap-2">
                  <span
                    class="px-2 py-1 rounded text-xs bg-gray-600 dark:bg-gray-700 text-white capitalize"
                  >
                    {{ item.category }}
                  </span>
                </div>

                <!-- Summary -->
                <div class="mb-4">
                  <p
                    :class="[
                      'text-gray-700 dark:text-gray-300 text-sm leading-relaxed transition-all duration-300',
                      expandedItems[item.id] ? '' : 'line-clamp-4',
                    ]"
                  >
                    {{ item.summary }}
                  </p>

                  <!-- Details button if summary is long -->
                  <button
                    v-if="item.summary && item.summary.length > 200"
                    class="mt-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
                    :aria-expanded="expandedItems[item.id]"
                    @click="toggleExpand(item.id)"
                  >
                    {{ expandedItems[item.id] ? 'Show Less' : 'Details' }}
                    <i
                      :class="expandedItems[item.id] ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                      class="ml-1 fa-xs"
                    ></i>
                  </button>
                </div>

                <!-- Links -->
                <div class="flex flex-col gap-2">
                  <a
                    v-for="link in item.links"
                    :key="link.url"
                    :href="link.url"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium transition-colors duration-200"
                  >
                    <i class="fas fa-book-open fa-xs" style="color: #ffcc00"></i>
                    {{ link.title }}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
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

  defineOptions({
    name: 'RecordingsPage',
  })

  // Type definitions
  interface MediaLink {
    url: string
    type: string
    title: string
    status: string
  }

  interface MediaItem {
    id: string
    title: string
    year?: number
    authors?: string[]
    category?: string
    location?: string
    venue?: string
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

  // Reactive state for expanded items
  const expandedItems = ref<Record<string, boolean>>({})

  function flattenSections(data: MediaData): MediaItem[] {
    return (data.sections ?? []).flatMap((s: MediaSection) =>
      (s.items ?? []).map((item: MediaItem) => ({ ...item, year: item.year ?? s.year }))
    )
  }

  function formatAuthors(authors?: string[]): string {
    if (!authors || authors.length === 0) return 'Rob van Eijk'
    if (authors.length === 1) return authors[0]
    return authors.join(', ')
  }

  function toggleExpand(id: string): void {
    expandedItems.value[id] = !expandedItems.value[id]
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

  const title = 'Selected Recordings | Privacy & Data Protection'
  const description =
    'Recordings from conferences, panels, masterclasses, and media appearances on privacy engineering, AI governance, and data protection — featuring Rob van Eijk at CPDP, OECD, and Future of Privacy Forum events.'
  const ogImage = '/assets/blog/rothko-abstracts/recordings-index.svg'
  const pageUrl = 'https://blaeu.com/recordings'

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
        { '@type': 'ListItem', position: 2, name: 'Recordings', item: pageUrl },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Team Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
      { property: 'og:image', content: `https://blaeu.com${ogImage}` },
      { property: 'og:image:secure_url', content: `https://blaeu.com${ogImage}` },
      {
        property: 'og:image:alt',
        content: 'Selected recordings from privacy conferences and panel discussions',
      },
      { property: 'og:image:type', content: 'image/svg+xml' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '300' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `https://blaeu.com${ogImage}` },
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
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
