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
    class="pb-8 bg-white dark:bg-gray-900 font-amblelight"
    aria-labelledby="news-heading"
  >
    <div class="container mx-auto px-4 border-t border-gray-200 dark:border-gray-700 pt-8">
      <!-- Section header -->
      <div class="text-center mb-6">
        <h2
          id="news-heading"
          class="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
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
          class="bg-white dark:bg-gray-900 p-6 flex flex-col"
        >
          <h3
            class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 text-left leading-tight tracking-tight"
          >
            <a
              :href="item.primaryLink.url"
              :target="item.primaryLink.type === 'external' ? '_blank' : '_self'"
              :rel="item.primaryLink.type === 'external' ? 'noopener' : undefined"
              class="no-external-icon hover:underline transition-colors duration-200 text-left leading-tight !p-0"
              :title="item.primaryLink.title"
            >
              {{ item.title }}
            </a>
          </h3>
          <div class="mb-4">
            <span class="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {{ item.category }}
            </span>
            <span class="text-xs text-gray-600 dark:text-gray-400 ml-2">
              {{ item.year }}
            </span>
          </div>
          <div class="mb-4 text-gray-700 dark:text-gray-300 text-xs">
            {{ item.venue }}
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed flex-grow">
            {{ item.rssMetadata?.excerpt || item.description }}
          </p>
        </article>
      </div>

      <!-- Strategic CTA -->
      <div class="text-center max-w-2xl mx-auto mt-12">
        <div class="flex flex-col items-center gap-4">
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center px-6 py-3 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 font-semibold transition-colors duration-200"
          >
            Explore All Publications & Appearances
          </NuxtLink>
          <div class="flex items-center text-gray-600 text-sm">
            <span class="mr-2">Stay updated:</span>
            <a
              href="/assets/rss/rvaneijk.xml"
              target="_blank"
              rel="noopener noreferrer"
              class="no-external-icon inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
              title="Subscribe to RSS feed for latest insights"
            >
              <i class="fa-solid fa-rss fa-sm text-brand-gold" aria-hidden="true"></i>
              RSS Feed
              <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
            </a>
          </div>
        </div>
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
          url: primaryLink.url,
          title: primaryLink.title,
          type: primaryLink.type,
        },
        rssMetadata: item.rssMetadata,
      }
    })
  })
</script>
