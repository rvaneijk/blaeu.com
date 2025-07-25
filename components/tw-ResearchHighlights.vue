<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <section id="research" class="pt-8 pb-8 bg-white font-amblelight" tabindex="-1">
    <!-- Skip link target for internal section navigation -->
    <div id="research-content" tabindex="-1" class="sr-only">Research highlights section</div>

    <div class="container mx-auto px-4">
      <h2 id="research-highlights-heading" class="text-3xl font-bold mb-8 text-center">
        Research Highlights
      </h2>

      <div class="max-w-3xl mx-auto mb-6 text-center">
        <p id="research-description" class="text-lg mx-4 md:mx-0">
          My research focuses on privacy engineering, data protection, and the legal aspects of data
          architectures, with particular emphasis on real-time bidding systems and online tracking
          technologies.
        </p>
      </div>

      <!-- Accessibility note: this adds semantic relationship between heading and content -->
      <div class="sr-only" aria-live="polite">
        The following research highlights are presented as a list of cards, each with an image,
        title, author, date, and a brief summary. Click "Read more" on any card to view detailed
        information.
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading research highlights: {{ error }}</p>
      </div>

      <!-- Research Highlights Grid -->
      <div
        v-else-if="highlightItems.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-8"
        role="list"
        aria-label="Research highlights"
      >
        <ResearchHighlightCard
          v-for="(item, index) in highlightItems.slice(0, 4)"
          :key="item.id"
          :item="item"
          :index="index"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import type { MediaItem, MediaContentData } from '~/data/schema/media-content.schema'
import researchHighlightsData from '~/data/research-highlights.json'

// No props needed - uses JSON data directly

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)
const highlightItems = ref<MediaItem[]>([])


// Load data on component mount
onMounted(async () => {
  try {
    loading.value = true
    
    // Use new JSON data structure
    const data = researchHighlightsData as MediaContentData
    
    // Flatten all items from all sections
    highlightItems.value = data.sections.flatMap(section => section.items)
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    // eslint-disable-next-line no-console
    console.error('Error loading research highlights:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Transition for smooth loading */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>