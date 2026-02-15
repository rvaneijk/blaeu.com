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
      <!-- Panel Venue Type Filters -->
      <div class="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Filter by venue type:</h3>
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

      <!-- Panel Expert Items -->
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
          <p class="text-lg font-medium mb-2">No panel discussions found</p>
          <p class="text-sm">Try selecting a different venue type filter</p>
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
  import panelExpertData from '~/data/panel-expert.json'
  import panelExpertModeratorData from '~/data/panel-expert_with_moderator.json'
  import { useModalBackToTop } from '~/composables/useModalBackToTop'
  import { useTabContentShared } from '~/composables/useTabContentShared'

  const { containerClasses } = useModalBackToTop()

  const { onBeforeEnter, createOnEnter, sortItemsByDate, createScrollHandlers } =
    useTabContentShared()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const mediaData = ref<MediaContentData | null>(null)
  const selectedCategory = ref<string | null>(null)
  const showBackToTop = ref(false)

  const isAcademicVenue = (venue: string): boolean => {
    return (
      venue.includes('cpdp') ||
      venue.includes('privacy symposium') ||
      venue.includes('alpine privacy') ||
      venue.includes('data protection conference') ||
      venue.includes('academic') ||
      venue.includes('university')
    )
  }

  const isProfessionalVenue = (venue: string, publisher: string): boolean => {
    return (
      venue.includes('iapp') ||
      venue.includes('scl') ||
      venue.includes('iab') ||
      publisher.includes('iapp') ||
      publisher.includes('law') ||
      venue.includes('legal')
    )
  }

  const isPolicyVenue = (venue: string): boolean => {
    return (
      venue.includes('oecd') ||
      venue.includes('parliament') ||
      venue.includes('government') ||
      venue.includes('commission') ||
      venue.includes('policy') ||
      venue.includes('regulatory')
    )
  }

  const isIndustryVenue = (venue: string): boolean => {
    return (
      venue.includes('google') ||
      venue.includes('mozilla') ||
      venue.includes('meta') ||
      venue.includes('zoom') ||
      venue.includes('industry') ||
      venue.includes('publisher') ||
      venue.includes('summit') ||
      (venue.includes('symposium') && !venue.includes('privacy symposium'))
    )
  }

  const isForumVenue = (venue: string): boolean => {
    return (
      venue.includes('forum') ||
      venue.includes('workshop') ||
      venue.includes('roundtable') ||
      venue.includes('international') ||
      venue.includes('global') ||
      venue.includes('rightscon')
    )
  }

  const hasVideoRecording = (item: MediaItem): boolean => {
    if (!item.links) return false
    const recordingTypes = ['video', 'audio', 'podcast']
    return item.links.some(
      link => recordingTypes.includes(link.type) && (link.status === 'active' || !link.status)
    )
  }

  const getRoleType = (item: Record<string, unknown>): string => {
    const metadata = item.metadata as Record<string, unknown> | undefined
    const role = (metadata?.role as string) || ''

    if (role.includes('Moderator: Eijk R. van')) {
      return 'moderator'
    }

    return 'panelist'
  }

  const getVenueType = (item: Record<string, unknown>): string => {
    const venue = (item.venue as string)?.toLowerCase() || ''
    const publisher = (item.publisher as string)?.toLowerCase() || ''

    if (isAcademicVenue(venue)) return 'academic'
    if (isProfessionalVenue(venue, publisher)) return 'professional'
    if (isPolicyVenue(venue)) return 'policy'
    if (isIndustryVenue(venue)) return 'industry'
    if (isForumVenue(venue)) return 'forum'

    return 'other'
  }

  const allItems = computed(() => {
    if (!mediaData.value) return []

    const items: MediaItem[] = []
    mediaData.value.sections.forEach(section => {
      items.push(...section.items)
    })

    return sortItemsByDate(items)
  })

  const filteredItems = computed(() => {
    if (!selectedCategory.value) return allItems.value

    return allItems.value.filter(item => {
      if (selectedCategory.value === 'has-recording') {
        return hasVideoRecording(item)
      }

      if (selectedCategory.value === 'moderator' || selectedCategory.value === 'panelist') {
        const roleType = getRoleType(item)
        return roleType === selectedCategory.value
      }

      const venueType = getVenueType(item)
      return venueType === selectedCategory.value
    })
  })

  const availableCategories = computed(() => {
    if (!mediaData.value) return []

    const roleCounts = allItems.value.reduce(
      (acc, item) => {
        const roleType = getRoleType(item)
        acc[roleType] = (acc[roleType] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const venueCounts = allItems.value.reduce(
      (acc, item) => {
        const venueType = getVenueType(item)
        if (venueType !== 'other') {
          acc[venueType] = (acc[venueType] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>
    )

    const categoryLabels = {
      moderator: 'Moderator',
      panelist: 'Panelist',
      academic: 'Academic Conferences',
      professional: 'Professional Associations',
      policy: 'Government & Policy',
      industry: 'Industry Events',
      forum: 'International Forums',
    }

    const allCategories = []

    const recordingCount = allItems.value.filter(item => hasVideoRecording(item)).length
    if (recordingCount > 0) {
      allCategories.push({
        value: 'has-recording',
        label: 'Has Recording',
        count: recordingCount,
      })
    }

    if (roleCounts.moderator > 0) {
      allCategories.push({
        value: 'moderator',
        label: categoryLabels.moderator,
        count: roleCounts.moderator,
      })
    }

    if (roleCounts.panelist > 0) {
      allCategories.push({
        value: 'panelist',
        label: categoryLabels.panelist,
        count: roleCounts.panelist,
      })
    }

    const venueCategories = Object.entries(venueCounts)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        value: type,
        label: categoryLabels[type as keyof typeof categoryLabels] || type,
        count,
      }))
      .sort((a, b) => b.count - a.count)

    return [...allCategories, ...venueCategories]
  })

  const totalAllItems = computed(() => {
    return allItems.value.length
  })

  const totalFilteredItems = computed(() => filteredItems.value.length)

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

  const handleCategoryFilter = (category: string | null): void => {
    selectedCategory.value = category
    setItems(filteredItems.value)
  }

  const getItemYear = (item: MediaItem): number => {
    if (item.date) {
      return new Date(item.date).getFullYear()
    }
    return item.year || new Date().getFullYear()
  }

  const shouldShowYearHeader = (item: MediaItem, index: number): boolean => {
    if (index === 0) return true
    const currentYear = getItemYear(item)
    const previousItem = visibleItems.value[index - 1]
    const previousYear = getItemYear(previousItem)
    return currentYear !== previousYear
  }

  const _getYearCount = (year: number): number => {
    return filteredItems.value.filter(item => getItemYear(item) === year).length
  }

  const onEnter = createOnEnter(50, false)

  const modalContainer = ref<HTMLElement | null>(null)

  const { scrollToTop, handleScroll } = createScrollHandlers(modalContainer, showBackToTop)

  watch(
    filteredItems,
    newItems => {
      setItems(newItems)
    },
    { immediate: false }
  )

  onMounted(async () => {
    try {
      loading.value = true

      // Merge panel expert data (panelist) with moderated panels and deduplicate by ID
      const mergedSections = new Map<number, { year: number; count: number; items: MediaItem[] }>()
      const seenIds = new Set<string>()

      // Add panelist data
      panelExpertData.sections.forEach(section => {
        const uniqueItems = section.items.filter(item => {
          if (seenIds.has(item.id)) {
            return false
          }
          seenIds.add(item.id)
          return true
        })

        if (uniqueItems.length > 0) {
          mergedSections.set(section.year, {
            year: section.year,
            count: uniqueItems.length,
            items: uniqueItems,
          })
        }
      })

      // Merge moderator data (deduplicate)
      panelExpertModeratorData.sections.forEach(section => {
        const uniqueItems = section.items.filter(item => {
          if (seenIds.has(item.id)) {
            return false
          }
          seenIds.add(item.id)
          return true
        })

        if (uniqueItems.length > 0) {
          if (mergedSections.has(section.year)) {
            const existing = mergedSections.get(section.year)!
            existing.items.push(...uniqueItems)
            existing.count = existing.items.length
          } else {
            mergedSections.set(section.year, {
              year: section.year,
              count: uniqueItems.length,
              items: uniqueItems,
            })
          }
        }
      })

      // Convert to sorted array
      const sortedSections = Array.from(mergedSections.values()).sort((a, b) => b.year - a.year)

      // Calculate total items
      const totalItems = sortedSections.reduce((sum, section) => sum + section.count, 0)

      mediaData.value = {
        title: panelExpertData.title,
        contentType: panelExpertData.contentType,
        totalItems,
        lastUpdated: panelExpertData.lastUpdated,
        sections: sortedSections,
      } as MediaContentData

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
    /* Subtle border for better separation */
    border: 1px solid rgba(59, 130, 246, 0.2);

    /* Enhanced shadow when sticky */
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
