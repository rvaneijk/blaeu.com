<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="p-1 sm:p-2">
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-grey"></div>
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-600">
      <p>Error loading content: {{ error }}</p>
    </div>

    <div v-else-if="mediaData" class="grid gap-6">
      <!-- Academic Activity Type Filters -->
      <div class="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Filter by activity type:</h3>
        <div class="flex flex-wrap gap-2">
          <button
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200',
              selectedCategory === null
                ? 'bg-brand-grey text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            @click="handleCategoryFilter(null)"
          >
            All ({{ totalAllItems }})
          </button>
          <button
            v-for="type in availableCategories"
            :key="type.value"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200',
              selectedCategory === type.value
                ? 'bg-brand-grey text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            @click="handleCategoryFilter(type.value)"
          >
            {{ type.label }} ({{ type.count }})
          </button>
        </div>
      </div>

      <!-- Academic Teaching Items -->
      <div class="space-y-3">
        <!-- Visible Items with Staggered Animation -->
        <transition-group
          name="fade-slide"
          tag="div"
          class="space-y-3"
          appear
          @before-enter="onBeforeEnter"
          @enter="onEnter"
        >
          <template v-for="(item, index) in visibleItems" :key="`container-${item.id}`">
            <!-- Enhanced Year Header with Sticky Positioning -->
            <div
              v-if="shouldShowYearHeader(item, index)"
              class="year-header sticky top-16 z-10 bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg border-l-4 border-brand-grey mb-3 shadow-sm backdrop-blur-sm transition-all duration-300"
              :data-index="index"
            >
              <div class="flex items-center">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span class="w-2 h-2 bg-brand-grey rounded-full"></span>
                  {{ getItemYear(item) }}
                </h3>
              </div>
            </div>

            <!-- Media Content Card with Animation Data -->
            <MediaContentCard
              :item="item"
              class="media-card-item transition-all duration-300"
              :data-index="index"
            />
          </template>
        </transition-group>

        <!-- Loading Indicator with Skeleton -->
        <template v-if="isInfiniteLoading">
          <MediaContentCardSkeleton v-for="n in 3" :key="`skeleton-${n}`" class="mb-3" />
        </template>

        <!-- End of Content -->
        <div v-else-if="!hasMore && visibleItems.length > 0" class="text-center py-6 text-gray-500">
          <p class="text-sm">You've seen all {{ totalFilteredItems }} items</p>
        </div>

        <!-- No Results -->
        <div
          v-else-if="!hasMore && visibleItems.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <p class="text-lg font-medium mb-2">No academic activities found</p>
          <p class="text-sm">Try selecting a different activity type filter</p>
        </div>

        <!-- Intersection Observer Sentinel -->
        <div ref="sentinelRef" class="h-1 w-full" aria-hidden="true"></div>
      </div>
    </div>

    <!-- Back to Top Button - Fixed Position Modal Context -->
    <div
      v-show="showBackToTop"
      :class="containerClasses"
      style="bottom: 140px"
      role="complementary"
      aria-label="Modal navigation"
    >
      <button
        aria-label="Scroll back to top of modal"
        class="modal-back-to-top-btn rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
        title="Back to top"
        @click="scrollToTop"
      >
        <span class="sr-only">Back to top</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
  import { useInfiniteScroll } from '~/composables/useInfiniteScroll'
  import type { MediaContentData, MediaItem } from '~/data/schema/media-content.schema'
  import academicTeachingData from '~/data/academic-teaching.json'
  import { useModalBackToTop } from '~/composables/useModalBackToTop'
  import { useTabContentShared } from '~/composables/useTabContentShared'

  // Modal back-to-top positioning composable
  const { containerClasses } = useModalBackToTop()

  // Shared TabContent utilities
  const { onBeforeEnter, createOnEnter, sortItemsByDate, createScrollHandlers } =
    useTabContentShared()

  // Component state
  const loading = ref(false)
  const error = ref<string | null>(null)
  const mediaData = ref<MediaContentData | null>(null)
  const selectedCategory = ref<string | null>(null)
  const showBackToTop = ref(false)

  // Helper functions for academic activity categorization
  const isStudentSupervision = (category: string): boolean => {
    return category.includes('thesis')
  }

  const isGuestProfessor = (category: string): boolean => {
    return category.includes('guest professor')
  }

  const isKeynotePresentation = (category: string): boolean => {
    return category.includes('keynote')
  }

  const isAcademicLecture = (category: string): boolean => {
    return category.includes('lecture') && !category.includes('keynote')
  }

  // Get academic activity type from item for filtering
  const getAcademicActivityType = (item: MediaItem): string => {
    const category = (item.category as string)?.toLowerCase() || ''

    if (isStudentSupervision(category)) return 'supervision'
    if (isGuestProfessor(category)) return 'professor'
    if (isKeynotePresentation(category)) return 'keynote'
    if (isAcademicLecture(category)) return 'lecture'

    return 'lecture'
  }

  // Flatten all items from all sections and sort chronologically
  const allItems = computed(() => {
    if (!mediaData.value) return []

    const items: MediaItem[] = []
    mediaData.value.sections.forEach(section => {
      items.push(...section.items)
    })

    // Sort by date descending (newest first) - show all items regardless of link status
    return sortItemsByDate(items)
  })

  // Filter items by selected category
  const filteredItems = computed(() => {
    if (!selectedCategory.value) return allItems.value

    return allItems.value.filter(item => {
      const activityType = getAcademicActivityType(item)
      return activityType === selectedCategory.value
    })
  })

  // Calculate available categories with counts
  const availableCategories = computed(() => {
    if (!mediaData.value) return []

    const categoryCounts = allItems.value.reduce(
      (acc, item) => {
        const type = getAcademicActivityType(item)
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const categoryLabels = {
      supervision: 'Student Supervision',
      professor: 'Guest Professorships',
      lecture: 'Academic Lectures',
      keynote: 'Keynote Presentations',
    }

    return Object.entries(categoryCounts)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        value: type,
        label: categoryLabels[type as keyof typeof categoryLabels] || type,
        count,
      }))
      .sort((a, b) => b.count - a.count)
  })

  // Total count for "All" button - always shows unfiltered total
  const totalAllItems = computed(() => {
    return allItems.value.length
  })

  // Current filtered items count for "You've seen all X items" message
  const totalFilteredItems = computed(() => filteredItems.value.length)

  // Infinite scroll setup
  const {
    visibleItems,
    isLoading: isInfiniteLoading,
    hasMore,
    sentinelRef,
    setItems,
  } = useInfiniteScroll<MediaItem>({
    batchSize: 4,
    initialCount: 6,
  })

  // Category filter handler
  const handleCategoryFilter = (category: string | null): void => {
    selectedCategory.value = category
    setItems(filteredItems.value)
  }

  // Utility functions
  const getItemYear = (item: MediaItem): string => {
    if (item.date) {
      return new Date(item.date).getFullYear().toString()
    }
    return (item.year || new Date().getFullYear()).toString()
  }

  const shouldShowYearHeader = (item: MediaItem, index: number): boolean => {
    if (index === 0) return true
    const currentYear = getItemYear(item)
    const previousItem = visibleItems.value[index - 1]
    const previousYear = getItemYear(previousItem)
    return currentYear !== previousYear
  }

  const _getYearCount = (year: string): number => {
    return filteredItems.value.filter(item => getItemYear(item) === year).length
  }

  // Animation handlers
  const onEnter = createOnEnter(50, false) // 50ms delay per index, no modulo

  // Reactive state for modal context
  const modalContainer = ref<HTMLElement | null>(null)

  // Back to top functionality
  const { scrollToTop, handleScroll } = createScrollHandlers(modalContainer, showBackToTop)

  // Watch for changes in filtered items and update infinite scroll
  watch(
    filteredItems,
    newItems => {
      setItems(newItems)
    },
    { immediate: false }
  )

  // Load data on component mount
  onMounted(async () => {
    try {
      loading.value = true

      // Load the static JSON data
      mediaData.value = academicTeachingData as MediaContentData

      nextTick(() => {
        setItems(filteredItems.value)

        if (process.client) {
          const modalEl = document.querySelector('.max-h-90vh.overflow-y-auto')
          if (modalEl) {
            modalContainer.value = modalEl as HTMLElement
            modalContainer.value.addEventListener('scroll', handleScroll, { passive: true })
          } else {
            window.addEventListener('scroll', handleScroll, { passive: true })
          }
        }
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      loading.value = false
    }
  })

  // Cleanup scroll listener
  onUnmounted(() => {
    if (process.client) {
      if (modalContainer.value) {
        modalContainer.value.removeEventListener('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  })
</script>

<style scoped>
  /* Fade-slide transition for new items */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  /* Ensure smooth transitions for media cards */
  .media-card-item {
    transition: all 0.3s ease-in-out;
  }

  /* Enhanced year header styling */
  .year-header {
    border: 1px solid rgba(59, 130, 246, 0.2);
    transition:
      box-shadow 0.3s ease,
      transform 0.2s ease;
  }

  .year-header:hover {
    transform: translateX(2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  /* Add visual separation between sections */
  .year-header + .media-card-item {
    margin-top: 1rem;
  }

  /* Improve backdrop blur support */
  @supports (backdrop-filter: blur(8px)) {
    .year-header {
      backdrop-filter: blur(8px);
      background: rgba(239, 246, 255, 0.9);
    }
  }

  /* Modal back to top button - matches main site widget styling */
  .modal-back-to-top-btn {
    background-color: #ffcc00;
    color: #333;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    position: relative;
  }

  .modal-back-to-top-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(51, 51, 51, 0.3);
    transition: all 0.2s ease;
  }

  .modal-back-to-top-btn:hover {
    background-color: #e6b800;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }

  .modal-back-to-top-btn:hover::after {
    border-color: rgba(51, 51, 51, 0.5);
  }

  .modal-back-to-top-btn:focus-visible {
    outline: 2px solid #ffcc00;
    outline-offset: 2px;
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .fade-slide-enter-active,
    .fade-slide-leave-active,
    .media-card-item {
      transition: none !important;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
      transform: none !important;
    }
  }
</style>
