<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <!-- Main content -->
    <main id="main-content" class="pt-12 flex-1">
      <!-- Page header -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-2xl mx-auto px-4">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                  Home
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Portfolio</span>
              </li>
            </ol>
          </nav>

          <h1
            class="section-accent-left text-[2rem] font-semibold mb-3 text-gray-900 dark:text-gray-100 leading-tight"
          >
            Professional portfolio
          </h1>
        </div>
      </section>

      <!-- Selected recordings -->
      <section aria-labelledby="recordings-heading" class="pb-8 bg-white dark:bg-gray-900">
        <div class="max-w-2xl mx-auto px-4">
          <h2
            id="recordings-heading"
            class="text-2xl font-semibold mb-4 section-accent-left text-gray-900 dark:text-gray-100 leading-tight"
          >
            Selected recordings
          </h2>
          <ul class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <li
              v-for="(item, i) in recordingTeasers"
              :key="item.id"
              :class="i === 2 ? 'hidden sm:block' : ''"
            >
              <a
                :href="primaryLink(item)!.url"
                target="_blank"
                rel="noopener"
                class="no-external-icon no-hover group block !p-0"
              >
                <span
                  class="relative block mb-2 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
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
                      class="flex items-center justify-center w-8 h-8 rounded-full bg-black/70 text-white group-hover:bg-black/85 transition-colors"
                    >
                      <i class="fa-solid fa-play ml-0.5 text-sm" aria-hidden="true"></i>
                    </span>
                  </span>
                </span>
                <span
                  class="block text-sm text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:underline underline-offset-2"
                >
                  {{ displayTitle(item.title) }}
                </span>
              </a>
            </li>
          </ul>
          <NuxtLink
            to="/recordings"
            class="inline-block mt-3 !p-0 text-sm font-semibold text-gray-900 dark:text-gray-100 underline underline-offset-2"
          >
            All {{ recordings.length }} recordings
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Highlights -->
      <section aria-labelledby="highlights-heading" class="pb-8 bg-white dark:bg-gray-900">
        <div class="max-w-2xl mx-auto px-4">
          <h2
            id="highlights-heading"
            class="text-2xl font-semibold mb-4 section-accent-left text-gray-900 dark:text-gray-100 leading-tight"
          >
            Highlights
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li
              v-for="item in portfolioHighlights"
              :key="item.url"
              class="rounded-lg bg-sky-50 dark:bg-gray-800 p-4"
            >
              <p
                class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 first-letter:uppercase"
              >
                {{ item.kind }}, {{ item.year }}
              </p>
              <a
                :href="item.url"
                target="_blank"
                rel="noopener"
                class="font-semibold text-gray-900 dark:text-gray-100 leading-snug hover:underline underline-offset-2 !p-0"
              >
                {{ item.title }}
              </a>
              <span
                v-if="item.url.includes('web.archive.org')"
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                (archived)
              </span>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ item.venue }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Track record -->
      <section aria-labelledby="track-record-heading" class="pb-8 bg-white dark:bg-gray-900">
        <div class="max-w-2xl mx-auto px-4">
          <h2
            id="track-record-heading"
            class="text-2xl font-semibold mb-4 section-accent-left text-gray-900 dark:text-gray-100 leading-tight"
          >
            Track record
          </h2>
          <div class="border-t border-gray-200 dark:border-gray-700">
            <details
              v-for="section in sections"
              :id="section.anchor"
              :key="section.anchor"
              name="track-record"
              class="group border-b border-gray-200 dark:border-gray-700"
              @toggle="keepInView"
            >
              <summary
                class="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                  {{ section.label }}
                </h3>
                <span class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  {{ trackRecordCount(section.anchor) }}
                  <i
                    class="fa-solid fa-chevron-right text-xs transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  ></i>
                </span>
              </summary>
              <div class="pb-6">
                <component :is="section.component" />
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  import { markRaw, onBeforeUnmount, onMounted, provide } from 'vue'

  import TabContent2 from '~/components/TabContent2.vue'
  import TabContent3 from '~/components/TabContent3.vue'
  import TabContent4 from '~/components/TabContent4.vue'
  import TabContent5 from '~/components/TabContent5.vue'
  import TabContent7 from '~/components/TabContent7.vue'
  import TabContent8b from '~/components/TabContent8b.vue'
  import TabContent9 from '~/components/TabContent9.vue'
  import { portfolioHighlights } from '~/data/portfolio-highlights'
  import { displayTitle, primaryLink, recordings, thumbnail } from '~/utils/recordings'
  import { trackRecordCount } from '~/utils/trackRecord'

  defineOptions({
    name: 'PortfolioPage',
  })

  provide('showAllItems', true)

  const recordingTeasers = recordings.filter(item => thumbnail(item)).slice(0, 3)

  // Links like /portfolio/#panels open that section
  function openFromHash(): void {
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (el instanceof HTMLDetailsElement) {
      el.open = true
      el.scrollIntoView()
    }
  }

  // Opening one section closes the other; keep the opened one on screen
  function keepInView(event: Event): void {
    const el = event.target as HTMLDetailsElement
    if (el.open && el.getBoundingClientRect().top < 0) el.scrollIntoView()
  }

  onMounted(() => {
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
  })
  onBeforeUnmount(() => window.removeEventListener('hashchange', openFromHash))

  const sections = [
    { anchor: 'panels', label: 'Talks & panels', component: markRaw(TabContent7) },
    { anchor: 'media-mentions', label: 'Media mentions', component: markRaw(TabContent5) },
    { anchor: 'committees', label: 'Committees & boards', component: markRaw(TabContent9) },
    { anchor: 'scholarly', label: 'Scholarly works', component: markRaw(TabContent2) },
    {
      anchor: 'publications',
      label: 'Professional publications',
      component: markRaw(TabContent3),
    },
    { anchor: 'teaching', label: 'Teaching', component: markRaw(TabContent8b) },
    { anchor: 'popular-media', label: 'Public engagement', component: markRaw(TabContent4) },
  ]

  const title = 'Portfolio'
  const description =
    'Keynotes, panels, publications, and media mentions by Rob van Eijk, including presentations to the Article 29 Working Party and the European Parliament.'
  const pageUrl = 'https://blaeu.com/portfolio/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Professional portfolio – Rob van Eijk',
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
        { '@type': 'ListItem', position: 2, name: 'Portfolio', item: pageUrl },
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
          'Rob van Eijk portfolio, EU regulatory affairs, media mentions, keynote speaker, OECD, WP29, panel expert, scholarly works, AI governance, GDPR, privacy expert, Future of Privacy Forum',
      },

      { property: 'og:site_name', content: 'Blaeu' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: `${title} | Blaeu` },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_GB' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${title} | Blaeu` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>

<style>
  /* Hide modal back-to-top buttons — on a full page, browser scroll is sufficient */
  .modal-back-to-top-btn {
    display: none !important;
  }
</style>
