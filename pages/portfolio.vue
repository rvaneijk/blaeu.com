<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <!-- Header -->
    <tw-NavbarMinimal />
    <ScrollProgressBar />

    <!-- Main content -->
    <main id="main-content" class="pt-12 flex-1">
      <!-- Page header -->
      <section class="py-8 bg-white dark:bg-gray-900">
        <div class="max-w-2xl mx-auto px-4">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors" aria-label="Home">
                  <i class="fas fa-house fa-sm text-brand-gold" aria-hidden="true"></i>
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Portfolio</span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
          >
            Professional Portfolio
          </h1>
          <p class="text-base text-gray-600 dark:text-gray-400 mb-8">
            Fifteen years of engagement with European regulatory institutions — keynotes, panel
            appearances, media coverage, scholarly works, and committee memberships.
          </p>

          <!-- Table of contents -->
          <nav aria-label="Portfolio sections" class="mb-6">
            <div class="bg-[#f3f3f0] dark:bg-gray-800 px-6 py-5">
              <p
                class="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-3"
              >
                Sections
              </p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <li v-for="section in sections" :key="section.anchor">
                  <a
                    :href="`#${section.anchor}`"
                    class="text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {{ section.label }}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
            See also:
            <NuxtLink
              to="/recordings"
              class="text-gray-700 dark:text-gray-300 underline underline-offset-2 transition-colors !p-0"
            >
              Selected Recordings
            </NuxtLink>
          </p>
        </div>
      </section>

      <!-- Portfolio sections -->
      <section
        v-for="section in sections"
        :id="section.anchor"
        :key="section.anchor"
        class="pt-4 pb-8 bg-white dark:bg-gray-900 scroll-mt-0"
      >
        <div class="max-w-2xl mx-auto px-4">
          <h2
            class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
          >
            {{ section.label }}
          </h2>
          <component :is="section.component" />
        </div>
      </section>
    </main>

    <!-- Footer -->
    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  import { markRaw, provide } from 'vue'

  import TabContent2 from '~/components/TabContent2.vue'
  import TabContent3 from '~/components/TabContent3.vue'
  import TabContent4 from '~/components/TabContent4.vue'
  import TabContent5 from '~/components/TabContent5.vue'
  import TabContent6 from '~/components/TabContent6.vue'
  import TabContent7 from '~/components/TabContent7.vue'
  import TabContent8a from '~/components/TabContent8a.vue'
  import TabContent8b from '~/components/TabContent8b.vue'
  import TabContent9 from '~/components/TabContent9.vue'

  defineOptions({
    name: 'PortfolioPage',
  })

  provide('showAllItems', true)

  const sections = [
    { anchor: 'media-mentions', label: 'Media Mentions', component: markRaw(TabContent5) },
    { anchor: 'keynotes', label: 'Keynote Speaker', component: markRaw(TabContent6) },
    { anchor: 'panels', label: 'Panel Expert', component: markRaw(TabContent7) },
    { anchor: 'popular-media', label: 'Popular Media', component: markRaw(TabContent4) },
    {
      anchor: 'publications',
      label: 'Professional Publications',
      component: markRaw(TabContent3),
    },
    { anchor: 'scholarly', label: 'Scholarly Works', component: markRaw(TabContent2) },
    { anchor: 'training', label: 'Professional Learning', component: markRaw(TabContent8a) },
    { anchor: 'teaching', label: 'Academic Teaching', component: markRaw(TabContent8b) },
    { anchor: 'committees', label: 'Committees & Boards', component: markRaw(TabContent9) },
  ]

  const title = 'Professional Portfolio | Rob van Eijk'
  const description =
    'Professional portfolio of Rob van Eijk — media mentions (NYT, Bloomberg, POLITICO), keynotes (OECD, WP29), panel appearances, scholarly works, and committee memberships spanning fifteen years of EU regulatory engagement.'
  const pageUrl = 'https://blaeu.com/portfolio/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Professional Portfolio — Rob van Eijk',
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
        { '@type': 'ListItem', position: 2, name: 'Portfolio', item: pageUrl },
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
          'Rob van Eijk portfolio, EU regulatory affairs, media mentions, keynote speaker, OECD, WP29, panel expert, scholarly works, AI governance, GDPR, privacy expert, Future of Privacy Forum',
      },

      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
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
