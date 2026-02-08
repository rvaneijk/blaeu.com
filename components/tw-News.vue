<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
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
  <section id="news" class="py-16 bg-gray-50 font-amblelight" aria-labelledby="news-heading">
    <div class="container mx-auto px-4">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 id="news-heading" class="text-3xl font-bold text-gray-900 mb-4">
          Recent Insights & Thought Leadership
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Shaping the conversation in AI, privacy, and security.
        </p>
      </div>

      <!-- Dynamic highlights grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 justify-center">
        <article
          v-for="item in newsItems"
          :key="item.id"
          class="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-brand-grey flex flex-col"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-1 text-left">
            <a
              :href="item.primaryLink.url"
              :target="item.primaryLink.type === 'external' ? '_blank' : '_self'"
              class="hover:text-brand-blue transition-colors duration-200 text-left leading-tight"
              :title="item.primaryLink.title"
            >
              {{ item.title }}
            </a>
          </h3>
          <div class="mb-4">
            <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
              {{ item.category }}
            </span>
          </div>
          <div class="mb-4 text-gray-700 text-xs">
            {{ item.venue }}
          </div>
          <p class="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
            {{ item.rssMetadata?.excerpt || item.description }}
          </p>
          <div
            class="mt-auto flex flex-col"
            style="gap: 0.0625rem !important; line-height: 1.2 !important"
          >
            <a
              :href="item.primaryLink.url"
              :target="item.primaryLink.type === 'external' ? '_blank' : '_self'"
              class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
              :aria-label="`Read more about ${item.title}`"
              style="margin: 0 !important; padding: 0 !important"
            >
              <i
                :class="
                  item.primaryLink.type === 'external'
                    ? 'fas fa-external-link-alt'
                    : 'fas fa-arrow-right'
                "
                class="fa-xs text-brand-gold"
              ></i>
              Read more
              <span class="sr-only">about {{ item.title }}</span>
            </a>
            <a
              v-if="item.archiveLink"
              :href="item.archiveLink.url"
              target="_blank"
              class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
              style="margin: 0 !important; padding: 0 !important"
            >
              <i class="fa-solid fa-copy fa-xs text-gray-400"></i>
              Internet Archive
            </a>
          </div>
        </article>
      </div>

      <!-- Strategic View All CTA -->
      <div class="text-center">
        <div class="bg-[#4B5563] rounded-xl p-8 max-w-2xl mx-auto">
          <p class="text-white mb-6">
            Explore the complete collection of research publications, media coverage, speaking
            engagements, and expert panel participation.
          </p>
          <div class="flex flex-col items-center gap-4">
            <a
              href="/team/rvaneijk#media"
              class="inline-flex items-center px-6 py-3 bg-brand-gold hover:bg-brand-blue text-black hover:text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Explore All Publications & Appearances
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <div class="flex items-center text-gray-300 text-sm">
              <span class="mr-2">Stay updated:</span>
              <a
                href="/assets/rss/rvaneijk.xml"
                target="_blank"
                class="inline-flex items-center gap-1 text-brand-gold hover:text-white transition-colors duration-200"
                title="Subscribe to RSS feed for latest insights"
              >
                <i class="fa-solid fa-rss fa-sm" aria-hidden="true"></i>
                RSS Feed
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </div>
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
    venue: string
    description?: string
    primaryLink: {
      url: string
      title: string
      type: string
    }
    archiveLink?: {
      url: string
      title: string
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
    .slice(0, 4) // Limit to 4 items for the grid

  // Transform items for display (pure computed property)
  const newsItems = computed((): NewsItem[] => {
    return sortedFeaturedItems.map(item => {
      // Prioritize internal links over external links for primary navigation
      const primaryLink =
        item.links.find(link => link.type === 'internal') ||
        item.links.find(link => link.type === 'external') ||
        item.links[0]
      const archiveLink = item.links.find(link => link.type === 'archive')

      return {
        id: item.id,
        title: item.title,
        category: item.category,
        venue: item.venue || 'Unknown venue',
        description: item.description,
        primaryLink: {
          url: primaryLink.url,
          title: primaryLink.title,
          type: primaryLink.type,
        },
        archiveLink: archiveLink
          ? {
              url: archiveLink.url,
              title: archiveLink.title,
            }
          : undefined,
        rssMetadata: item.rssMetadata,
      }
    })
  })
</script>

<style scoped>
  /* Clean, focused styling for business development landing page */
  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  /* Force left alignment for news tile titles */
  h3 {
    text-align: left !important;
    margin: 0 0 0.25rem 0 !important;
    padding: 0 !important;
  }

  h3 a {
    text-align: left !important;
    display: block !important;
    line-height: 1.2 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Force spacing for labels */
  .mb-4 {
    margin-bottom: 1rem !important;
  }

  /* Force left alignment for Read more links */
  .mt-auto a {
    text-align: left !important;
    justify-content: flex-start !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Make icon bold for better contrast */
  .fa-external-link-alt {
    font-weight: 900 !important;
  }

  /* Screen reader only text for accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
