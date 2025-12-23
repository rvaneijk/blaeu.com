<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div :class="cardClasses" role="listitem">
    <!-- Image -->
    <div class="h-48 overflow-hidden">
      <img
        :src="item.image"
        :alt="item.imageAlt || item.title"
        class="w-full h-full object-cover"
        loading="lazy"
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
        <span v-if="formattedAuthors && formattedDate">•</span>
        <span>{{ formattedDate }}</span>
      </div>

      <!-- Category/Tags -->
      <div class="mb-3 flex flex-wrap gap-2">
        <span :class="categoryClasses" class="px-2 py-1 rounded text-xs">
          {{ formatCategory(item.category) }}
        </span>
        <span
          v-for="tag in limitedTags"
          :key="tag"
          class="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700"
        >
          {{ tag }}
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

        <!-- Show Details button if intro is long -->
        <button
          v-if="hasLongIntro"
          class="mt-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
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

      <!-- Read Blog Post Link -->
      <div class="flex flex-col">
        <NuxtLink
          to="/blog/multi-tier-backup"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
        >
          <i class="fas fa-book-open fa-xs text-blue-500"></i>
          Read Full Post
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MediaItem } from '~/data/schema/media-content.schema'

  interface Props {
    item: MediaItem
    index?: number
  }

  const props = defineProps<Props>()
  const { formatAuthors } = useMediaContent()

  // Reactive state for expansion
  const showFullIntro = ref(false)

  // Computed properties
  const formattedAuthors = computed(() => formatAuthors(props.item.authors))

  const formattedDate = computed(() => {
    if (!props.item.date) return props.item.year?.toString() || ''

    try {
      const date = new Date(props.item.date)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return props.item.year?.toString() || ''
    }
  })

  const cardClasses = computed(() => {
    return `bg-gray-50 rounded-lg shadow-md overflow-hidden border-l-4 border-blue-600`
  })

  const categoryClasses = computed(() => {
    const categoryColorMap: Record<string, string> = {
      privacy: 'bg-blue-600 text-white',
      development: 'bg-green-600 text-white',
      security: 'bg-red-600 text-white',
      default: 'bg-gray-600 text-white',
    }

    return categoryColorMap[props.item.category || 'default'] || categoryColorMap.default
  })

  // Limit tags display to first 2 tags
  const limitedTags = computed(() => {
    if (!props.item.tags || !Array.isArray(props.item.tags)) return []
    return props.item.tags.slice(0, 2)
  })

  // Check if intro text is long enough to show Details button
  const hasLongIntro = computed(() => {
    const introText = props.item.intro || props.item.description || ''
    return introText.length > 200
  })

  // Helper functions
  const formatCategory = (category?: string): string => {
    if (!category) return 'Blog Post'

    const categoryMap: Record<string, string> = {
      privacy: 'Privacy',
      development: 'Development',
      security: 'Security',
      engineering: 'Engineering',
    }
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1)
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
