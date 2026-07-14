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

    <div v-else-if="loaded">
      <!-- Filter -->
      <div v-if="availableFilters.length > 0" class="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <span class="mr-2">Filter:</span>
        <a
          href="#"
          :class="[
            'filter-link mr-1 transition-colors duration-200',
            selectedFilter === null
              ? 'text-gray-900 dark:text-gray-100 underline underline-offset-2'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
          ]"
          @click.prevent="handleFilter(null)"
        >
          All ({{ totalAllItems }})
        </a>
        <template v-for="opt in availableFilters" :key="opt.filter.type + ':' + opt.filter.value">
          <span class="mx-1 text-gray-500 dark:text-gray-400">|</span>
          <a
            href="#"
            :class="[
              'filter-link transition-colors duration-200',
              isActiveFilter(opt.filter)
                ? 'text-gray-900 dark:text-gray-100 underline underline-offset-2'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
            ]"
            @click.prevent="handleFilter(opt.filter)"
          >
            {{ opt.label }} ({{ opt.count }})
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
              <a
                v-if="recordingUrl(item)"
                :href="recordingUrl(item)!"
                target="_blank"
                rel="noopener"
                class="no-external-icon !p-0 ml-1.5 text-[#00a8e6]"
                :aria-label="`Watch recording: ${item.title}`"
              >
                <i class="fa-solid fa-circle-play fa-xs" aria-hidden="true"></i>
              </a>
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
          v-if="filteredItems.length > 0"
          class="text-center py-4 text-sm text-gray-600 dark:text-gray-400"
        >
          {{ totalFilteredItems }} items
        </div>
      </div>
    </div>

    <!-- Back to top button -->
    <div
      v-if="showBackToTop"
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
  import type {
    MediaContentData,
    MediaItem,
    MediaLink,
    MediaSection,
  } from '~/data/schema/media-content.schema'
  import keynoteData from '~/data/keynote-speaker.json'
  import panelExpertData from '~/data/panel-expert.json'
  import panelModeratorData from '~/data/panel-expert_with_moderator.json'
  import { useTabContentShared } from '~/composables/useTabContentShared'
  import { useModalBackToTop } from '~/composables/useModalBackToTop'

  type Role = 'keynote' | 'panelist' | 'moderator'
  type TaggedItem = MediaItem & { _role: Role }

  const { sortItemsByDate, recordingUrl } = useTabContentShared()
  const { containerClasses } = useModalBackToTop()

  type Filter = { type: 'year'; value: string } | { type: 'role'; value: Role }

  const loading = ref(false)
  const error = ref<string | null>(null)
  const loaded = ref(false)
  const selectedFilter = ref<Filter | null>(null)
  const scrollProgress = ref(0)
  const progressBarEl = ref<HTMLElement | null>(null)
  const showBackToTop = ref(false)

  const modalContainer = ref<HTMLElement | null>(null)

  const tagItems = (data: MediaContentData, resolveRole: (item: MediaItem) => Role): TaggedItem[] =>
    data.sections.flatMap((s: MediaSection) =>
      s.items.map(item => ({ ...item, _role: resolveRole(item) }))
    )

  // panel-expert_with_moderator.json mixes Rob's roles; metadata.role is prefixed
  // "Speaker: …" / "Panelist: …" / "Moderator: …" / "Moderators: …".
  const roleFromMetadata = (item: MediaItem): Role => {
    const r = item.metadata?.role?.toLowerCase() ?? ''
    if (r.startsWith('speaker')) return 'keynote'
    if (r.startsWith('panelist')) return 'panelist'
    return 'moderator'
  }

  const allItems = computed<TaggedItem[]>(() => {
    if (!loaded.value) return []
    const items: TaggedItem[] = [
      ...tagItems(keynoteData as MediaContentData, () => 'keynote'),
      ...tagItems(panelExpertData as MediaContentData, () => 'panelist'),
      ...tagItems(panelModeratorData as MediaContentData, roleFromMetadata),
    ]
    return sortItemsByDate(items) as TaggedItem[]
  })

  const normalizeYearCategory = (year: number): string => {
    if (year >= 2026) return '2026'
    if (year >= 2025) return '2025'
    if (year >= 2022) return '2024–2022'
    return 'Earlier'
  }

  const getYear = (item: MediaItem): number =>
    item.date ? new Date(item.date).getFullYear() : (item.year as number)

  type FilterOption = { filter: Filter; label: string; count: number }

  const availableFilters = computed<FilterOption[]>(() => {
    const yearCount: Record<string, number> = {}
    const roleCount: Record<Role, number> = { keynote: 0, panelist: 0, moderator: 0 }
    allItems.value.forEach(item => {
      yearCount[normalizeYearCategory(getYear(item))] =
        (yearCount[normalizeYearCategory(getYear(item))] || 0) + 1
      roleCount[item._role]++
    })
    const options: FilterOption[] = []
    const roles: { value: Role; label: string }[] = [
      { value: 'keynote', label: 'Keynote' },
      { value: 'panelist', label: 'Panelist' },
      { value: 'moderator', label: 'Moderator' },
    ]
    for (const r of roles) {
      if (roleCount[r.value] > 0)
        options.push({
          filter: { type: 'role', value: r.value },
          label: r.label,
          count: roleCount[r.value],
        })
    }
    for (const y of ['2026', '2025', '2024–2022', 'Earlier']) {
      if (yearCount[y] > 0)
        options.push({ filter: { type: 'year', value: y }, label: y, count: yearCount[y] })
    }
    return options
  })

  const isActiveFilter = (f: Filter): boolean =>
    !!selectedFilter.value &&
    selectedFilter.value.type === f.type &&
    selectedFilter.value.value === f.value

  const filteredItems = computed(() => {
    const f = selectedFilter.value
    if (!f) return allItems.value
    if (f.type === 'year') {
      return allItems.value.filter(item => normalizeYearCategory(getYear(item)) === f.value)
    }
    return allItems.value.filter(item => item._role === f.value)
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

  const handleFilter = (f: Filter | null): void => {
    selectedFilter.value = f
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
    loaded.value = true

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
