<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <main id="main-content" class="pt-12 flex-1">
      <div class="max-w-6xl mx-auto px-4 py-8 text-lg">
        <div class="max-w-[40rem] mx-auto">
          <header class="mb-3">
            <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
              <ol class="flex items-center gap-1.5">
                <li>
                  <NuxtLink to="/" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                    Home
                  </NuxtLink>
                </li>
                <li aria-hidden="true" class="text-gray-400">/</li>
                <li>
                  <NuxtLink
                    to="/portfolio"
                    class="breadcrumb-link transition-colors !px-0 !min-w-0 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    Portfolio
                  </NuxtLink>
                </li>
                <li aria-hidden="true" class="text-gray-400">/</li>
                <li>
                  <span class="text-gray-700 dark:text-gray-300" aria-current="page">
                    Recordings
                  </span>
                </li>
              </ol>
            </nav>

            <h1
              class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Selected recordings
            </h1>
          </header>

          <!-- Filter -->
          <nav
            v-if="availableFilters.length > 0"
            aria-label="Filter recordings by type or year"
            class="mb-6"
          >
            <ul class="flex flex-wrap gap-2">
              <li>
                <button
                  type="button"
                  :class="[
                    'no-hover inline-block !px-3 !py-1 !min-h-0 !min-w-0 rounded-full border text-sm whitespace-nowrap transition-colors duration-200',
                    selectedFilter === null
                      ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                      : 'border-gray-300 text-gray-700 hover:border-gray-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400',
                  ]"
                  :aria-pressed="selectedFilter === null"
                  @click="selectedFilter = null"
                >
                  All ({{ recordings.length }})
                </button>
              </li>
              <li v-for="opt in availableFilters" :key="opt.value">
                <button
                  type="button"
                  :class="[
                    'no-hover inline-block !px-3 !py-1 !min-h-0 !min-w-0 rounded-full border text-sm whitespace-nowrap transition-colors duration-200',
                    selectedFilter === opt.value
                      ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                      : 'border-gray-300 text-gray-700 hover:border-gray-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400',
                  ]"
                  :aria-pressed="selectedFilter === opt.value"
                  @click="selectedFilter = opt.value"
                >
                  {{ opt.label }} ({{ opt.count }})
                </button>
              </li>
            </ul>
          </nav>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
            See also:
            <NuxtLink
              to="/portfolio"
              class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
            >
              Portfolio
              <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </p>
        </div>

        <ShowAllSection
          id="recordings"
          :count="filteredRecordings.length"
          preview-class="max-h-[120rem]"
        >
          <div aria-label="Recordings" class="mt-4">
            <div class="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <article v-for="item in filteredRecordings" :key="item.id" class="flex flex-col">
                <a
                  v-if="thumbnail(item)"
                  :href="primaryLink(item)!.url"
                  target="_blank"
                  rel="noopener"
                  tabindex="-1"
                  aria-hidden="true"
                  class="no-external-icon no-hover group relative block w-full mb-4 !p-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <img
                    :src="thumbnail(item)!"
                    alt=""
                    width="640"
                    height="360"
                    loading="lazy"
                    class="w-full aspect-video object-cover"
                  />
                  <span class="absolute inset-0 flex items-center justify-center">
                    <span
                      class="flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white group-hover:bg-black/85 transition-colors"
                    >
                      <i class="fa-solid fa-play ml-1" aria-hidden="true"></i>
                    </span>
                  </span>
                </a>
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-snug"
                >
                  <a
                    v-if="primaryLink(item)"
                    :href="primaryLink(item)!.url"
                    target="_blank"
                    rel="noopener"
                    class="hover:underline underline-offset-2 !p-0"
                  >
                    {{ displayTitle(item.title) }}
                  </a>
                  <span v-else>{{ displayTitle(item.title) }}</span>
                </h3>

                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ byline(item) }}</p>

                <p
                  :class="[
                    'text-base text-gray-800 dark:text-gray-300 leading-relaxed',
                    !expandedItems[item.id] && hasLongSummary(item) ? 'line-clamp-2' : '',
                  ]"
                >
                  {{ item.summary }}
                </p>
                <p class="mt-auto pt-2 text-sm">
                  <button
                    v-if="hasLongSummary(item)"
                    type="button"
                    class="!px-0 !min-w-0 !min-h-6 mr-4 text-gray-600 dark:text-gray-400 underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-200"
                    :aria-expanded="!!expandedItems[item.id]"
                    @click="expandedItems[item.id] = !expandedItems[item.id]"
                  >
                    {{ expandedItems[item.id] ? 'Show less' : 'Read more' }}
                  </button>
                  <a
                    v-if="primaryLink(item)"
                    :href="primaryLink(item)!.url"
                    target="_blank"
                    rel="noopener"
                    class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
                  >
                    {{
                      isYouTube(item)
                        ? 'Watch on YouTube'
                        : isVideo(item)
                          ? 'Watch the recording'
                          : 'Listen or read more'
                    }}
                  </a>
                </p>
              </article>
            </div>
          </div>
        </ShowAllSection>
      </div>
    </main>

    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  import ShowAllSection from '~/components/ShowAllSection.vue'
  import {
    byline,
    displayTitle,
    isVideo,
    isYouTube,
    primaryLink,
    recordingKind,
    recordingKinds,
    recordings,
    thumbnail,
    type MediaItem,
  } from '~/utils/recordings'

  defineOptions({ name: 'RecordingsPage' })

  const expandedItems = ref<Record<string, boolean>>({})
  const selectedFilter = ref<string | null>(null)

  function hasLongSummary(item: MediaItem): boolean {
    return (item.summary?.length ?? 0) > 110
  }

  const normalizeYearCategory = (yearValue: number | string): string => {
    const year = Number(yearValue)
    if (year >= 2024) return '2026–2024'
    if (year >= 2022) return '2023–2022'
    if (year >= 2020) return '2021–2020'
    return 'Earlier'
  }

  type FilterOption = { value: string; label: string; count: number }

  const availableFilters = computed<FilterOption[]>(() => {
    const counts: Record<string, number> = {}
    for (const item of recordings) {
      for (const key of [recordingKind(item), normalizeYearCategory(item.year)])
        counts[key] = (counts[key] ?? 0) + 1
    }
    return [...recordingKinds, '2026–2024', '2023–2022', '2021–2020', 'Earlier']
      .filter(b => (counts[b] ?? 0) > 0)
      .map(b => ({ value: b, label: b, count: counts[b] ?? 0 }))
  })

  const filteredRecordings = computed(() => {
    if (!selectedFilter.value) return recordings
    return recordings.filter(
      item =>
        recordingKind(item) === selectedFilter.value ||
        normalizeYearCategory(item.year) === selectedFilter.value
    )
  })

  const title = 'Selected recordings'
  const description =
    'Recordings of panels, masterclasses, and media appearances on EU regulatory affairs, AI governance, and data protection by Rob van Eijk.'
  const ogImage = 'https://blaeu.com/assets/blog/rothko-abstracts/recordings-index.svg'
  const pageUrl = 'https://blaeu.com/recordings/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected recordings – Rob van Eijk',
    description: description,
    url: pageUrl,
    author: {
      '@type': 'Person',
      '@id': 'https://blaeu.com/team/rvaneijk/#person',
      name: 'Rob van Eijk',
      url: 'https://blaeu.com/team/rvaneijk/',
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
    title: `${title} | Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'author', content: 'Rob van Eijk' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'keywords',
        content:
          'privacy recordings, CPDP conference, data protection panels, AI governance talks, privacy engineering masterclass, GDPR compliance, consent technologies, de-identification techniques, differential privacy, homomorphic encryption, Rob van Eijk speaking, Future of Privacy Forum, OECD privacy, panel moderator, privacy expert recordings, digital privacy conferences',
      },
      { property: 'og:site_name', content: 'Blaeu' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: `${title} | Blaeu` },
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
      { property: 'og:locale', content: 'en_GB' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${title} | Blaeu` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      {
        name: 'twitter:image:alt',
        content: 'Selected recordings from privacy conferences and panel discussions',
      },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>

<style scoped>
  .filter-link {
    padding: 0 !important;
    min-width: unset !important;
    min-height: unset !important;
  }

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
