import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue'
import type { MediaItem, MediaLink } from '~/data/schema/media-content.schema'

interface ModalScroll {
  modalContainer: Ref<HTMLElement | null>
  progressBarEl: Ref<HTMLElement | null>
  scrollProgress: Ref<number>
  showBackToTop: Ref<boolean>
  scrollToTop: () => void
}

const formattedEditors = (item: MediaItem): string => {
  const editors = item.metadata?.editors
  if (!editors || editors.length === 0) return ''
  const list = editors.join(', ')
  return `${editors.length === 1 ? 'Ed.' : 'Eds.'} ${list}${list.endsWith('.') ? '' : '.'}`
}

export function useTabContentShared(): {
  sortItemsByDate: (items: MediaItem[]) => MediaItem[]
  recordingUrl: (item: MediaItem) => string | null
  formattedAuthors: (item: MediaItem) => string
  formattedEditors: (item: MediaItem) => string
  activeLinks: (item: MediaItem) => MediaLink[]
  useModalScroll: () => ModalScroll
} {
  const recordingUrl = (item: MediaItem): string | null => {
    const link = (item.links ?? []).find(
      link =>
        ['video', 'audio', 'podcast', 'recording'].includes(link.type) && link.status !== 'broken'
    )
    return link?.url ?? null
  }

  const sortItemsByDate = (items: MediaItem[]): MediaItem[] => {
    return items.sort((a, b) => {
      const dateA = new Date(a.date || `${a.year || 2000}-01-01`)
      const dateB = new Date(b.date || `${b.year || 2000}-01-01`)
      return dateB.getTime() - dateA.getTime()
    })
  }

  const formattedAuthors = (item: MediaItem): string => {
    if (!item.authors || item.authors.length === 0) return ''
    return item.authors.join(', ')
  }

  // Broken links fall back to their archived copy when one is available
  const activeLinks = (item: MediaItem): MediaLink[] =>
    (item.links ?? []).flatMap(link => {
      if (link.status === 'active' || !link.status)
        return [link.url.includes('web.archive.org') ? { ...link, archived: true } : link]
      const archive = link.archiveUrls?.find(a => a.status === 'active')
      return archive ? [{ ...link, url: archive.url, archived: true }] : []
    })

  // Scroll progress bar and back-to-top button for a tab rendered inside the modal
  const useModalScroll = (): ModalScroll => {
    const modalContainer = ref<HTMLElement | null>(null)
    const progressBarEl = ref<HTMLElement | null>(null)
    const scrollProgress = ref(0)
    const showBackToTop = ref(false)

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
      if (import.meta.client) {
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
      if (import.meta.client && modalContainer.value) {
        modalContainer.value.removeEventListener('scroll', handleScroll)
      }
    })

    return { modalContainer, progressBarEl, scrollProgress, showBackToTop, scrollToTop }
  }

  return {
    sortItemsByDate,
    recordingUrl,
    formattedAuthors,
    formattedEditors,
    activeLinks,
    useModalScroll,
  }
}
