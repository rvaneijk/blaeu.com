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
              <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Blog</span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
          >
            Privacy Engineering Insights
          </h1>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            Research and analysis on EU regulatory affairs, AI governance, and data protection.
          </p>
        </header>

        <div role="list" aria-label="Blog posts">
          <article
            v-for="(item, index) in highlightItems"
            :key="item.id"
            role="listitem"
            :class="
              index < highlightItems.length - 1
                ? 'mb-8 pb-8 border-b border-gray-200 dark:border-gray-700'
                : 'mb-8'
            "
          >
            <h2
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug tracking-tight"
            >
              <NuxtLink
                v-if="getPostUrl(item)"
                :to="getPostUrl(item)!"
                class="hover:underline transition-colors duration-200 !p-0"
              >
                {{ item.title }}
              </NuxtLink>
              <span v-else>{{ item.title }}</span>
            </h2>

            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span v-if="formattedAuthors(item)">{{ formattedAuthors(item) }}</span>
              <span v-if="formattedAuthors(item) && item.year" class="mx-1">&middot;</span>
              <span>{{ item.year }}</span>
              <span v-if="item.readingTime" class="mx-1">&middot;</span>
              <span v-if="item.readingTime">{{ item.readingTime }}</span>
            </p>

            <p
              :class="[
                'text-gray-700 dark:text-gray-300 leading-relaxed',
                !expandedItems[item.id] && hasLongIntro(item) ? 'line-clamp-4' : '',
              ]"
            >
              {{ item.intro || item.description }}
            </p>
            <button
              v-if="hasLongIntro(item)"
              class="details-toggle mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
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
        </div>
      </article>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  import type { MediaItem, MediaContentData } from '~/data/schema/media-content.schema'
  import researchHighlightsData from '~/data/research-highlights.json'

  defineOptions({ name: 'BlogPage' })

  const data = researchHighlightsData as MediaContentData
  const highlightItems = data.sections
    .flatMap(section => section.items)
    .filter(item => item.featured === true)

  const expandedItems = ref<Record<string, boolean>>({})

  const hasLongIntro = (item: MediaItem): boolean => {
    const text = item.intro || item.description || ''
    return text.length > 200
  }

  const formattedAuthors = (item: MediaItem): string => {
    if (!item.authors || item.authors.length === 0) return ''
    return item.authors.join(', ')
  }

  const getPostUrl = (item: MediaItem): string | null => {
    if (!item.links) return null
    const internal = item.links.find(l => l.type === 'internal' && l.status !== 'broken')
    return internal?.url ?? null
  }

  const title = 'Blog | AI, Privacy & EU Regulatory Affairs Insights'
  const description =
    'Insights on EU regulatory affairs, AI governance, and data protection from Team Blaeu. Thought leadership on AI Act compliance, GDPR, consent technologies, and responsible AI.'
  const ogImage = 'https://blaeu.com/assets/img/og-image.webp'
  const pageUrl = 'https://blaeu.com/blog/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Team Blaeu AI, Privacy & EU Regulatory Affairs Blog',
    description: description,
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blaeu.com/assets/img/logo.png',
      },
    },
    author: {
      '@type': 'Person',
      name: 'Rob van Eijk',
      url: 'https://blaeu.com/team/rvaneijk/',
      sameAs: ['https://www.linkedin.com/in/rvaneijk88', 'https://orcid.org/0000-0002-2203-6819'],
    },
    about: [
      { '@type': 'Thing', name: 'Privacy Engineering' },
      { '@type': 'Thing', name: 'AI Governance' },
      { '@type': 'Thing', name: 'Data Protection' },
      { '@type': 'Thing', name: 'GDPR Compliance' },
      { '@type': 'Thing', name: 'Consent Technologies' },
    ],
    keywords: [
      'privacy blog',
      'data protection insights',
      'GDPR compliance',
      'AI governance',
      'privacy engineering',
      'consent management',
      'responsible AI',
      'digital privacy',
      'privacy by design',
      'data ethics',
    ],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blaeu.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: pageUrl },
    ],
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Team Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Rob van Eijk' },
      {
        name: 'keywords',
        content:
          'EU regulatory affairs blog, AI Act compliance, GDPR, AI governance, privacy engineering, consent management, EU public affairs, data protection insights',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image:alt', content: 'Team Blaeu privacy and data protection blog' },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: 'Team Blaeu privacy and data protection blog' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) },
      { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbLd) },
    ],
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
