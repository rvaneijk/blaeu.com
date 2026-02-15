/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

import { ref, computed, watch, nextTick, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseInfiniteScrollOptions {
  /**
   * Number of items to load per batch
   * @default 3
   */
  batchSize?: number

  /**
   * Initial number of items to show
   * @default 5
   */
  initialCount?: number

  /**
   * Root margin for intersection observer (distance from bottom to trigger)
   * @default "100px"
   */
  rootMargin?: string

  /**
   * Threshold for intersection observer
   * @default 0.1
   */
  threshold?: number

  /**
   * Whether infinite scroll is enabled
   * @default true
   */
  enabled?: boolean
}

export interface UseInfiniteScrollReturn<T> {
  /**
   * Currently visible items
   */
  visibleItems: Ref<T[]>

  /**
   * Whether more items are currently loading
   */
  isLoading: Ref<boolean>

  /**
   * Whether there are more items to load
   */
  hasMore: Ref<boolean>

  /**
   * Template ref for the sentinel element
   */
  sentinelRef: Ref<HTMLElement | undefined>

  /**
   * Manually load more items
   */
  loadMore: () => void

  /**
   * Reset to initial state
   */
  reset: () => void

  /**
   * Set new source data
   */
  setItems: (newItems: T[]) => void
}

/**
 * Composable for infinite scroll functionality using Intersection Observer
 *
 * @example
 * ```vue
 * <template>
 *   <div>
 *     <div v-for="item in visibleItems" :key="item.id">
 *       {{ item.title }}
 *     </div>
 *
 *     <!-- Loading indicator -->
 *     <div v-if="isLoading" class="loading">Loading...</div>
 *
 *     <!-- Sentinel element -->
 *     <div ref="sentinelRef" class="h-1"></div>
 *   </div>
 * </template>
 *
 * <script setup>
 * const { visibleItems, isLoading, hasMore, sentinelRef, setItems } = useInfiniteScroll({
 *   batchSize: 3,
 *   initialCount: 5
 * })
 *
 * // Set your data
 * setItems(myDataArray)
 * </script>
 * ```
 */
function createObserver(
  loadMore: () => void,
  hasMore: Ref<boolean>,
  isLoading: Ref<boolean>,
  rootMargin: string,
  threshold: number
): IntersectionObserver | null {
  if (!process.client) return null

  return new IntersectionObserver(
    entries => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore.value && !isLoading.value) {
        loadMore()
      }
    },
    { rootMargin, threshold }
  )
}

function useObserverManagement(
  observer: Ref<IntersectionObserver | null>,
  sentinelRef: Ref<HTMLElement | undefined>
): { observeSentinel: () => void; unobserveSentinel: () => void } {
  const observeSentinel = (): void => {
    if (observer.value && sentinelRef.value) {
      observer.value.observe(sentinelRef.value)
    }
  }

  const unobserveSentinel = (): void => {
    if (observer.value && sentinelRef.value) {
      observer.value.unobserve(sentinelRef.value)
    }
  }

  return { observeSentinel, unobserveSentinel }
}

export function useInfiniteScroll<T>(
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn<T> {
  const {
    batchSize = 3,
    initialCount = 5,
    rootMargin = '100px',
    threshold = 0.1,
    enabled = true,
  } = options

  const allItems = ref<T[]>([]) as Ref<T[]>
  const visibleItems = ref<T[]>([]) as Ref<T[]>
  const isLoading = ref(false)
  const currentIndex = ref(0)
  const sentinelRef = ref<HTMLElement>()
  const observer = ref<IntersectionObserver | null>(null)

  const hasMore = computed(() => currentIndex.value < allItems.value.length)

  const loadMore = (): void => {
    if (isLoading.value || !hasMore.value || !enabled) return

    isLoading.value = true
    setTimeout(() => {
      const nextBatch = allItems.value.slice(currentIndex.value, currentIndex.value + batchSize)
      visibleItems.value.push(...nextBatch)
      currentIndex.value += nextBatch.length
      isLoading.value = false
    }, 300)
  }

  const { observeSentinel, unobserveSentinel } = useObserverManagement(observer, sentinelRef)

  const reset = (): void => {
    visibleItems.value = []
    currentIndex.value = 0
    isLoading.value = false

    if (allItems.value.length > 0) {
      const initialItems = allItems.value.slice(0, Math.min(initialCount, allItems.value.length))
      visibleItems.value = [...initialItems]
      currentIndex.value = initialItems.length
    }
  }

  const setItems = (newItems: T[]): void => {
    allItems.value = [...newItems]
    reset()
  }

  watch(sentinelRef, (newSentinel, oldSentinel) => {
    if (oldSentinel) unobserveSentinel()
    if (newSentinel) nextTick(() => observeSentinel())
  })

  onMounted(() => {
    observer.value = createObserver(loadMore, hasMore, isLoading, rootMargin, threshold)
    if (sentinelRef.value) nextTick(() => observeSentinel())
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  })

  return { visibleItems, isLoading, hasMore, sentinelRef, loadMore, reset, setItems }
}
