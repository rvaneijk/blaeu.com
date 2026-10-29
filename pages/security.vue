<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <main id="main-content" class="pt-12 flex-1">
      <article class="max-w-2xl mx-auto px-4 py-8">
        <header class="mb-8">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                  Home
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">
                  {{ lang === 'en' ? 'Security policy' : 'Beveiligingsbeleid' }}
                </span>
              </li>
            </ol>
          </nav>

          <h1
            class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-4 leading-tight"
          >
            {{ lang === 'en' ? 'Security policy' : 'Beveiligingsbeleid' }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4"
          >
            <div class="flex items-center gap-2">
              <span>
                {{ lang === 'en' ? 'Last updated' : 'Laatst bijgewerkt' }}:
                {{ securityPolicy[lang].updated }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span>Blaeu Privacy Response Team B.V.</span>
            </div>
          </div>
          <PolicyLanguageToggle v-model="lang" class="text-sm text-gray-600 dark:text-gray-400" />
        </header>

        <div class="prose prose-lg dark:prose-invert" :lang="lang">
          <PolicyContent :policy="securityPolicy[lang]" :heading-level="2" />
        </div>
      </article>
    </main>

    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  import { securityPolicy } from '~/data/policies/security'
  import type { PolicyLang } from '~/data/policies/types'

  defineOptions({ name: 'SecurityPage' })

  const lang = ref<PolicyLang>('en')

  const title = 'Security policy'
  const ogTitle = 'Security policy | Blaeu'
  const description =
    'Responsible disclosure for blaeu.com (coordinated vulnerability disclosure): how to report a security issue and what we promise. Nederlands: beveiligingsbeleid.'
  const pageUrl = 'https://blaeu.com/security/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    dateModified: '2026-10-23',
    inLanguage: 'en',
    author: { '@id': 'https://blaeu.com/team/rvaneijk/#person' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Blaeu',
      url: 'https://blaeu.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blaeu.com' },
        { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Blaeu' },
      { property: 'og:image:alt', content: 'Blaeu logo' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_GB' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.webp' },
      { name: 'twitter:image:alt', content: 'Blaeu logo' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>
