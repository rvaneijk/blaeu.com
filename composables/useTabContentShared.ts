import type { Ref } from 'vue'
import type { MediaItem } from '~/data/schema/media-content.schema'

export function useTabContentShared(): {
  onBeforeEnter: (el: Element) => void
  createOnEnter: (delay: number, useModulo?: boolean) => (el: Element, done?: () => void) => void
  sortItemsByDate: (items: MediaItem[]) => MediaItem[]
  createScrollHandlers: (
    modalContainer: Ref<HTMLElement | null>,
    showBackToTop: Ref<boolean>
  ) => {
    scrollToTop: () => void
    handleScroll: (event: Event) => void
  }
} {
  const onBeforeEnter = (el: Element): void => {
    const element = el as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
  }

  const createOnEnter =
    (delay: number, useModulo = true) =>
    (el: Element, done?: () => void): void => {
      const element = el as HTMLElement
      const index = parseInt(element.dataset.index || '0')

      const finalDelay = useModulo ? (index % 4) * delay : index * delay

      setTimeout(() => {
        element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
        if (done) setTimeout(done, 400)
      }, finalDelay)
    }

  const sortItemsByDate = (items: MediaItem[]): MediaItem[] => {
    return items.sort((a, b) => {
      const dateA = new Date(a.date || `${a.year || 2000}-01-01`)
      const dateB = new Date(b.date || `${b.year || 2000}-01-01`)
      return dateB.getTime() - dateA.getTime()
    })
  }

  const createScrollHandlers = (
    modalContainer: Ref<HTMLElement | null>,
    showBackToTop: Ref<boolean>
  ): {
    scrollToTop: () => void
    handleScroll: (event: Event) => void
  } => {
    const scrollToTop = (): void => {
      if (modalContainer.value) {
        modalContainer.value.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    }

    const handleScroll = (event: Event): void => {
      const target = event.target as HTMLElement
      const scrollTop = target === document ? window.scrollY : target.scrollTop
      showBackToTop.value = scrollTop > 300
    }

    return { scrollToTop, handleScroll }
  }

  return {
    onBeforeEnter,
    createOnEnter,
    sortItemsByDate,
    createScrollHandlers,
  }
}
