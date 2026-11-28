<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-News
  @description Curated thought leadership section for landing page business development.
  Features 3-4 most impactful recent items with clear CTA to comprehensive archive.
  @example
  <tw-News />
-->
<template>
  <section
    id="news"
    class="pb-8 bg-white dark:bg-gray-900 font-sourcesans3"
    aria-labelledby="news-heading"
  >
    <div class="container mx-auto px-4 border-t border-gray-200 dark:border-gray-700 pt-8">
      <!-- Section header -->
      <div class="text-center mb-6">
        <h2
          id="news-heading"
          class="section-accent text-3xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100 leading-tight"
        >
          Recent
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Selected engagements and media.
        </p>
      </div>

      <!-- Dynamic highlights grid -->
      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto justify-center">
        <article
          v-for="item in newsItems"
          :key="item.id"
          class="rounded-lg bg-sky-50 dark:bg-gray-800 p-6 flex flex-col"
        >
          <p
            class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 first-letter:uppercase"
          >
            {{ item.category }}, {{ item.year }}
          </p>
          <h3
            class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1 text-left leading-snug"
          >
            <a
              :href="item.primaryLink.url"
              :target="item.primaryLink.type === 'external' ? '_blank' : '_self'"
              :rel="item.primaryLink.type === 'external' ? 'noopener' : undefined"
              class="text-left hover:underline underline-offset-2 !p-0"
              :title="item.primaryLink.title"
            >
              {{ item.title }}
            </a>
          </h3>
          <p class="mb-3 text-sm text-gray-600 dark:text-gray-400">{{ item.venue }}</p>
          <p class="text-gray-800 dark:text-gray-300 leading-relaxed flex-grow">
            {{ item.rssMetadata?.excerpt || item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { MediaContentData } from '~/data/schema/media-content.schema'
  import newsHighlightsData from '~/data/news-highlights.json'

  interface NewsItem {
    id: string
    title: string
    category: string
    year: number
    venue: string
    description?: string
    primaryLink: {
      url: string
      title: string
      type: string
    }
    rssMetadata?: {
      excerpt: string
    }
  }

  // Process the news data to extract featured items
  const newsData = newsHighlightsData as MediaContentData
  const allNewsItems = newsData.sections.flatMap(section => section.items)
  const featuredItems = allNewsItems.filter(item => item.rssMetadata?.featured === true)

  // Sort and transform items for display (moved outside computed to avoid side effects)
  const sortedFeaturedItems = featuredItems
    .sort((a, b) => {
      // Sort by RSS publication date if available, fallback to year
      if (a.rssMetadata?.pubDate && b.rssMetadata?.pubDate) {
        return new Date(b.rssMetadata.pubDate).getTime() - new Date(a.rssMetadata.pubDate).getTime()
      }
      return Number(b.year) - Number(a.year)
    })
    .slice(0, 4) // Limit to 4 items

  // Transform items for display (pure computed property)
  const newsItems = computed((): NewsItem[] => {
    return sortedFeaturedItems.map(item => {
      // Prioritize internal links over external links for primary navigation
      const primaryLink =
        item.links.find(link => link.type === 'internal') ||
        item.links.find(link => link.type === 'external') ||
        item.links[0]

      return {
        id: item.id,
        title: item.title,
        category: item.category,
        year: Number(item.year),
        venue: item.venue || 'Unknown venue',
        description: item.description,
        primaryLink: {
          url: primaryLink?.url ?? '',
          title: primaryLink?.title ?? '',
          type: primaryLink?.type ?? 'external',
        },
        rssMetadata: item.rssMetadata,
      }
    })
  })
</script>
