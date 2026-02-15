<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div :class="cardClasses" role="listitem">
    <!-- Image -->
    <div class="h-48 overflow-hidden bg-gray-50">
      <img
        :src="item.image"
        :alt="item.imageAlt || item.title"
        class="w-full h-full object-contain"
        width="800"
        height="400"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : undefined"
      />
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-xl font-semibold mb-2 text-gray-900">
        {{ item.title }}
      </h3>

      <!-- Author & Date -->
      <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span v-if="formattedAuthors">{{ formattedAuthors }}</span>
        <span v-if="formattedAuthors && item.year">•</span>
        <span>{{ item.year }}</span>
      </div>

      <!-- Category Badge -->
      <div class="mb-3">
        <span :class="categoryClasses" class="px-2 py-1 rounded text-xs">
          {{ formatCategory(item.mediaType) }}
        </span>
      </div>

      <!-- Description/Intro -->
      <div class="mb-4">
        <p
          :class="[
            'text-gray-700 text-sm leading-relaxed transition-all duration-300',
            showFullIntro ? '' : 'line-clamp-4',
          ]"
        >
          {{ item.intro || item.description }}
        </p>

        <!-- Show Details button if intro is longer than description -->
        <button
          v-if="hasLongIntro"
          class="mt-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
          :aria-expanded="showFullIntro"
          :aria-label="showFullIntro ? 'Show less details' : 'Show more details'"
          @click="showFullIntro = !showFullIntro"
        >
          {{ showFullIntro ? 'Show Less' : 'Details' }}
          <i
            :class="showFullIntro ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
            class="ml-1 fa-xs"
          ></i>
        </button>
      </div>

      <!-- Action Links -->
      <div
        v-if="hasLinks"
        class="flex flex-col"
        style="gap: 0.0625rem !important; line-height: 1.2 !important"
      >
        <!-- Main links (active only) -->
        <a
          v-for="link in activeLinks"
          :key="link.url"
          :href="link.url"
          :target="link.type === 'internal' ? '_self' : '_blank'"
          class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
          style="margin: 0 !important; padding: 0 !important"
        >
          <i :class="getLinkIcon(link.type)" class="fa-xs text-brand-gold"></i>
          {{ link.title }}
        </a>

        <!-- Archive links from archiveUrls -->
        <template v-for="link in item.links" :key="`archives-${link.url}`">
          <a
            v-for="archive in getActiveArchives(link.archiveUrls)"
            :key="archive.url"
            :href="archive.url"
            target="_blank"
            class="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            style="margin: 0 !important; padding: 0 !important"
          >
            <i class="fa-solid fa-copy fa-xs text-gray-400"></i>
            {{ getArchiveTitle(archive.source) }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MediaItem, ArchiveUrl } from '~/data/schema/media-content.schema'

  interface Props {
    item: MediaItem
    index?: number
  }

  const props = defineProps<Props>()
  const { getLinkIcon, formatAuthors } = useMediaContent()

  // Reactive state for expansion
  const showFullIntro = ref(false)

  // Computed properties
  const formattedAuthors = computed(() => formatAuthors(props.item.authors))

  const cardClasses = computed(() => {
    return `bg-gray-50 rounded-lg shadow-md overflow-hidden border-l-4 border-brand-grey`
  })

  const categoryClasses = computed(() => {
    return 'bg-brand-grey text-white'
  })

  // Filter active links only
  const activeLinks = computed(() => {
    if (!props.item.links) return []
    return props.item.links.filter(link => link.status !== 'broken')
  })

  // Check if there are any links to display
  const hasLinks = computed(() => {
    if (!props.item.links || props.item.links.length === 0) return false

    // Check if there are active main links or any active archive links
    const hasActiveLinks = activeLinks.value.length > 0
    const hasArchiveLinks = props.item.links.some(
      link => link.archiveUrls && link.archiveUrls.some(archive => archive.status !== 'broken')
    )

    return hasActiveLinks || hasArchiveLinks
  })

  // Check if intro text is significantly longer to show Details button
  const hasLongIntro = computed(() => {
    const introText = props.item.intro || props.item.description || ''
    return introText.length > 200 // Show Details button if intro is longer than 200 chars
  })

  // Helper functions
  const formatCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      report: 'Report',
      blogpost: 'Blog Post',
      slides: 'Presentation',
      other: 'Publication',
    }
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  const getActiveArchives = (archiveUrls?: ArchiveUrl[]): ArchiveUrl[] => {
    if (!archiveUrls) return []
    return archiveUrls.filter(archive => archive.status !== 'broken')
  }

  const getArchiveTitle = (source: string): string => {
    const sourceMap: Record<string, string> = {
      'archive.org': 'Internet Archive',
      'UK Web Archive': 'UK Web Archive',
      'archive.today': 'Archive Today',
      'Perma.cc': 'Perma.cc',
      unknown: 'Archived version',
    }

    return sourceMap[source] || 'Archived version'
  }
</script>

<style scoped>
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
