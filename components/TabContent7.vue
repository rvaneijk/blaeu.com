<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div>
    <!-- Scroll progress bar -->
    <div class="sticky top-0 z-10 h-[3px] bg-transparent">
      <div
        ref="progressBarEl"
        class="h-full transition-[width] duration-50 scroll-progress-fill"
      ></div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-600">
      <p>Error loading content: {{ error }}</p>
    </div>

    <div v-else-if="mediaData">
      <!-- Filters -->
      <div class="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <span class="mr-2">Filter:</span>
        <a
          href="#"
          :class="[
            'filter-link mr-1 transition-colors duration-200',
            selectedCategory === null
              ? 'text-gray-900 dark:text-gray-100 underline underline-offset-2'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
          ]"
          @click.prevent="handleCategoryFilter(null)"
        >
          All ({{ totalAllItems }})
        </a>
        <template v-for="type in availableCategories" :key="type.value">
          <span class="mx-1 text-gray-500 dark:text-gray-400">|</span>
          <a
            href="#"
            :class="[
              'filter-link transition-colors duration-200',
              selectedCategory === type.value
                ? 'text-gray-900 dark:text-gray-100 underline underline-offset-2'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
            ]"
            @click.prevent="handleCategoryFilter(type.value)"
          >
            {{ type.label }} ({{ type.count }})
          </a>
        </template>
      </div>

      <!-- Items grouped by year -->
      <div>
        <template v-for="(item, index) in filteredItems" :key="item.id">
          <div v-if="shouldShowYearHeader(item, index)" class="mt-6 mb-4 first:mt-0">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
              {{ getItemYear(item) }}
            </h3>
          </div>

          <div class="mb-3">
            <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 leading-snug">
              <a
                v-if="activeLinks(item).length > 0"
                :href="activeLinks(item)[0].url"
                target="_blank"
                rel="noopener"
                class="hover:underline transition-colors duration-200 !p-0"
              >
                {{ item.title }}
              </a>
              <span v-else>{{ item.title }}</span>
            </h4>

            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span v-if="formattedAuthors(item)">{{ formattedAuthors(item) }}</span>
              <span v-if="formattedAuthors(item) && item.year">{{ ' (' + item.year + ').' }}</span>
              <span v-if="item.venue" class="italic">{{ ' ' + item.venue }}</span>
              <span v-if="item.venue">.</span>
              <span v-if="item.location">{{ ' ' + item.location }}</span>
              <span v-if="item.location && item.publisher">:</span>
              <span v-if="item.publisher">{{ item.publisher }}</span>
              <span v-if="item.publisher">.</span>
            </p>

            <p
              v-if="item.description"
              class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-1"
            >
              {{ item.description }}
            </p>
          </div>
        </template>

        <div
          v-if="filteredItems.length === 0"
          class="text-center py-8 text-sm text-gray-600 dark:text-gray-400"
        >
          No panel discussions found for this filter.
        </div>

        <div v-else class="text-center py-4 text-sm text-gray-600 dark:text-gray-400">
          {{ totalFilteredItems }} items
        </div>
      </div>
    </div>

    <!-- Back to top button -->
    <div
      v-if="showBackToTop"
      ref="backToTopContainerEl"
      :class="containerClasses"
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
  import type { MediaContentData, MediaItem, MediaLink } from '~/data/schema/media-content.schema'
  import panelExpertData from '~/data/panel-expert.json'
  import panelExpertModeratorData from '~/data/panel-expert_with_moderator.json'
  import { useTabContentShared } from '~/composables/useTabContentShared'
  import { useModalBackToTop } from '~/composables/useModalBackToTop'

  const { sortItemsByDate } = useTabContentShared()
  const { containerClasses, bottomPosition } = useModalBackToTop()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const mediaData = ref<MediaContentData | null>(null)
  const selectedCategory = ref<string | null>(null)
  const scrollProgress = ref(0)
  const progressBarEl = ref<HTMLElement | null>(null)
  const showBackToTop = ref(false)
  const backToTopContainerEl = ref<HTMLElement | null>(null)
  const modalContainer = ref<HTMLElement | null>(null)

  // Venue classification helpers
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
    if (role.includes('Moderator') && role.includes('Eijk R. van')) return 'moderator'
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
      if (selectedCategory.value === 'has-recording') return hasVideoRecording(item)
      if (selectedCategory.value === 'moderator' || selectedCategory.value === 'panelist') {
        return getRoleType(item) === selectedCategory.value
      }
      return getVenueType(item) === selectedCategory.value
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

    const categoryLabels: Record<string, string> = {
      moderator: 'Moderator',
      panelist: 'Panelist',
      academic: 'Academic',
      professional: 'Professional',
      policy: 'Policy',
      industry: 'Industry',
      forum: 'Forums',
    }

    const allCategories = []

    const recordingCount = allItems.value.filter(item => hasVideoRecording(item)).length
    if (recordingCount > 0) {
      allCategories.push({ value: 'has-recording', label: 'Has Recording', count: recordingCount })
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
        label: categoryLabels[type] || type,
        count,
      }))
      .sort((a, b) => b.count - a.count)

    return [...allCategories, ...venueCategories]
  })

  const totalAllItems = computed(() => allItems.value.length)
  const totalFilteredItems = computed(() => filteredItems.value.length)

  const getItemYear = (item: MediaItem): number => {
    if (item.date) return new Date(item.date).getFullYear()
    return item.year || new Date().getFullYear()
  }

  const shouldShowYearHeader = (item: MediaItem, index: number): boolean => {
    if (index === 0) return true
    const previousItem = filteredItems.value[index - 1]
    return getItemYear(item) !== getItemYear(previousItem)
  }

  const formattedAuthors = (item: MediaItem): string => {
    if (!item.authors || item.authors.length === 0) return ''
    return item.authors.join(', ')
  }

  const activeLinks = (item: MediaItem): MediaLink[] => {
    if (!item.links) return []
    return item.links.filter(link => link.status === 'active' || !link.status)
  }

  const handleCategoryFilter = (category: string | null): void => {
    selectedCategory.value = category
  }

  const handleScroll = (): void => {
    if (!modalContainer.value) return
    const el = modalContainer.value
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    scrollProgress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
    if (progressBarEl.value) progressBarEl.value.style.width = scrollProgress.value + '%'
    showBackToTop.value = scrollTop > 300
  }

  const scrollToTop = (): void => {
    if (modalContainer.value) {
      modalContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onMounted(() => {
    loading.value = true

    // Merge panel expert data with moderated panels and deduplicate by ID
    const mergedSections = new Map<number, { year: number; count: number; items: MediaItem[] }>()
    const seenIds = new Set<string>()

    panelExpertData.sections.forEach(section => {
      const uniqueItems = section.items.filter(item => {
        if (seenIds.has(item.id)) return false
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

    panelExpertModeratorData.sections.forEach(section => {
      const uniqueItems = section.items.filter(item => {
        if (seenIds.has(item.id)) return false
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

    const sortedSections = Array.from(mergedSections.values()).sort((a, b) => b.year - a.year)
    const totalItems = sortedSections.reduce((sum, section) => sum + section.count, 0)

    mediaData.value = {
      title: panelExpertData.title,
      contentType: panelExpertData.contentType,
      totalItems,
      lastUpdated: panelExpertData.lastUpdated,
      sections: sortedSections,
    } as MediaContentData

    loading.value = false

    if (process.client) {
      nextTick(() => {
        const modalEl = document.querySelector('.max-h-90vh.overflow-y-auto')
        if (modalEl) {
          modalContainer.value = modalEl as HTMLElement
          modalContainer.value.addEventListener('scroll', handleScroll, { passive: true })
        }
      })
    }
  })

  onUnmounted(() => {
    if (process.client && modalContainer.value) {
      modalContainer.value.removeEventListener('scroll', handleScroll)
    }
  })

  watch(
    bottomPosition,
    val => {
      if (backToTopContainerEl.value) backToTopContainerEl.value.style.bottom = val
    },
    { immediate: true }
  )
</script>

<style scoped>
  .scroll-progress-fill {
    background: #00a8e6;
    width: 0;
  }

  .filter-link {
    padding: 0 !important;
    min-width: unset !important;
    min-height: unset !important;
  }

  .modal-back-to-top-btn {
    background-color: #ffcc00;
    color: #333;
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }

  .modal-back-to-top-btn:hover {
    background-color: #e6b800;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }

  .modal-back-to-top-btn:focus-visible {
    outline: 2px solid #ffcc00;
    outline-offset: 2px;
  }
</style>
