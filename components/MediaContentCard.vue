<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="bg-gray-50 p-4 rounded-lg shadow-md border-l-4 border-brand-grey">
    <!-- Content -->
    <div>
      <!-- Title -->
      <h4 class="text-xl font-semibold text-gray-900 mb-2 leading-tight">{{ item.title }}</h4>

      <!-- Category Badge -->
      <div class="mb-3">
        <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
          {{ formatCategory(item.category) }}
        </span>
      </div>

      <!-- Description with enhanced styling -->
      <p v-if="item.description" class="mb-4 text-gray-700 text-sm leading-relaxed">
        {{ item.description }}
      </p>

      <!-- Recording summary -->
      <p v-if="item.summary" class="mb-4 text-gray-600 text-sm leading-relaxed">
        {{ item.summary }}
      </p>

      <!-- Publication details with APA style -->
      <div class="text-sm space-y-2 flex-grow text-gray-600 mb-4">
        <div>
          <span v-if="formattedAuthors" class="font-medium">{{ formattedAuthors }}</span>
          <span v-if="formattedAuthors && item.year">({{ item.year }}).</span>
          <span v-if="item.venue" class="italic">{{ item.venue }}</span>
          <span v-if="item.venue">.</span>
          <span v-if="item.location">{{ item.location }}</span>
          <span v-if="item.location && item.publisher">:</span>
          <span v-if="item.publisher">{{ item.publisher }}</span>
          <span v-if="item.publisher">.</span>
          <span v-if="item.metadata?.timestamp" class="font-mono text-xs">
            [{{ item.metadata.timestamp }}]
          </span>
        </div>
      </div>

      <!-- Enhanced action links -->
      <div
        v-if="hasLinks"
        class="flex flex-col"
        style="gap: 0.0625rem !important; line-height: 1.2 !important"
      >
        <!-- Main links - only show if link is active -->
        <template v-for="link in activeLinks" :key="`link-${link.url}`">
          <a
            v-if="isLinkActive(link)"
            :href="link.url"
            target="_blank"
            class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
            style="margin: 0 !important; padding: 0 !important"
          >
            <i :class="getLinkIcon(link.type)" class="fa-xs text-brand-gold"></i>
            {{ link.title }}
          </a>

          <!-- Archive links from archiveUrls -->
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
  import type { MediaItem, ArchiveUrl, MediaLink } from '~/data/schema/media-content.schema'

  interface Props {
    item: MediaItem
  }

  const props = defineProps<Props>()
  const { getLinkIcon, formatAuthors } = useMediaContent()

  // Computed properties
  const formattedAuthors = computed(() => formatAuthors(props.item.authors))

  const activeLinks = computed(() => {
    if (!props.item.links) return []
    // Include links that are active OR have active archive URLs
    return props.item.links.filter(link => {
      const isLinkActive = link.status === 'active' || !link.status
      const hasActiveArchives = link.archiveUrls?.some(archive => archive.status !== 'broken')
      return isLinkActive || hasActiveArchives
    })
  })

  const hasLinks = computed(() => {
    return activeLinks.value.length > 0
  })

  const isLinkActive = (link: MediaLink): boolean => {
    return link.status === 'active' || !link.status
  }

  // Helper functions
  const formatCategory = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1)
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
