/**
 * Composable for managing modal content data across all TabContent components
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

import type {
  MediaContentData,
  MediaItem,
  YearSection,
  LinkType,
  MediaType,
} from '~/data/schema/media-content.schema'
import { LINK_ICONS, CATEGORY_STYLES } from '~/data/schema/media-content.schema'

/**
 * Get media type icon based on content (FontAwesome classes)
 */
const createGetMediaTypeIcon =
  () =>
  (mediaType: string): string => {
    const iconMap: Record<string, string> = {
      // Core interview types
      interview: 'fa-solid fa-microphone',
      'radio interview': 'fa-solid fa-radio',
      'television interview': 'fa-solid fa-tv',

      // Panels and discussions
      panel: 'fa-solid fa-users',

      // Audio content
      podcast: 'fa-solid fa-headphones',

      // Visual/digital content
      infographic: 'fa-solid fa-chart-line',
      'mobile/web application': 'fa-solid fa-mobile-screen',

      // Speaking engagements
      keynote: 'fa-solid fa-presentation-screen',
      conference: 'fa-solid fa-building-columns',

      // Written content
      report: 'fa-solid fa-file-contract',
      blogpost: 'fa-solid fa-blog',
      slides: 'fa-solid fa-file-powerpoint',
      academic: 'fa-solid fa-graduation-cap',

      // Media mentions, press quotes, newspaper articles
      other: 'fa-solid fa-newspaper',
    }

    return iconMap[mediaType.toLowerCase()] || iconMap.other
  }

/**
 * Filter and sort items by year
 */
const createOrganizeByYear =
  () =>
  (items: MediaItem[]): YearSection[] => {
    const yearMap = new Map<number, MediaItem[]>()

    items.forEach(item => {
      if (!yearMap.has(item.year)) {
        yearMap.set(item.year, [])
      }
      yearMap.get(item.year)!.push(item)
    })

    return Array.from(yearMap.entries())
      .map(([year, items]) => ({
        year,
        count: items.length,
        items: items.sort(
          (a, b) =>
            new Date(b.metadata?.eventDate || '').getTime() -
            new Date(a.metadata?.eventDate || '').getTime()
        ),
      }))
      .sort((a, b) => b.year - a.year)
  }

/**
 * Filter items to only show active links
 */
const createFilterActiveLinks =
  () =>
  (items: MediaItem[]): MediaItem[] => {
    return items
      .map(item => ({
        ...item,
        links: item.links.filter(link => link.status === 'active' || !link.status),
      }))
      .filter(item => item.links.length > 0)
  }

/**
 * Search and filter functionality
 */
const createFilterItems =
  () =>
  (items: MediaItem[], query: string): MediaItem[] => {
    if (!query.trim()) return items

    const lowerQuery = query.toLowerCase()
    return items.filter(
      item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.authors.some(author => author.toLowerCase().includes(lowerQuery)) ||
        item.venue.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    )
  }

/**
 * Convert legacy content.json format to new schema
 */
const createConvertLegacyContent =
  () =>
  (legacyItem: Record<string, unknown>): MediaItem => {
    const getLinkType = (url: string): LinkType => {
      if (url.includes('.pdf')) return 'pdf'
      if (url.startsWith('http')) return 'external'
      return 'web'
    }

    return {
      id: `legacy-${legacyItem.title.replace(/\s+/g, '-').toLowerCase()}`,
      year: parseInt(legacyItem.date),
      title: legacyItem.title,
      description:
        legacyItem.intro.length > 200
          ? legacyItem.intro.substring(0, 200) + '...'
          : legacyItem.intro,
      intro: legacyItem.intro,
      authors: legacyItem.author ? legacyItem.author.split(', ') : [],
      venue: '',
      category: legacyItem.pubcategory || 'other',
      mediaType: (legacyItem.publication as MediaType) || 'other',
      contentType: 'research',
      displayContext: 'highlight',
      image: legacyItem.image,
      imageAlt: legacyItem.alttext,
      links: [
        {
          type: getLinkType(legacyItem.link),
          url: legacyItem.link,
          title: legacyItem.publication === 'blogpost' ? 'Read Post' : 'Read More',
        },
      ],
    }
  }

export const useMediaContent = (): {
  loadMediaData: (contentType: string) => Promise<MediaContentData | null>
  getLinkIcon: (linkType: LinkType) => string
  getCategoryStyle: (category: string) => Record<string, string>
  formatAuthors: (authors: string[]) => string
  generateDescription: (item: MediaItem) => string
  getMediaTypeIcon: (mediaType: string) => string
  organizeByYear: (items: MediaItem[]) => YearSection[]
  filterItems: (items: MediaItem[], query: string) => MediaItem[]
  filterActiveLinks: (items: MediaItem[]) => MediaItem[]
  convertLegacyContent: (legacyItem: Record<string, unknown>) => MediaItem
} => {
  /**
   * Load media content data from JSON file
   */
  const loadMediaData = async (contentType: string): Promise<MediaContentData | null> => {
    try {
      const { data } = await $fetch(`/api/media-content/${contentType}`)
      return data
    } catch {
      // Silently handle errors in production
      return null
    }
  }

  /**
   * Get icon class for link type
   */
  const getLinkIcon = (linkType: LinkType): string => {
    return LINK_ICONS[linkType] || 'fa-solid fa-external-link'
  }

  /**
   * Get category styling classes
   */
  const getCategoryStyle = (category: string): Record<string, string> => {
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '')
    return CATEGORY_STYLES[normalizedCategory] || CATEGORY_STYLES.other
  }

  /**
   * Format author names for display
   */
  const formatAuthors = (authors: string[]): string => {
    if (authors.length === 0) return ''
    if (authors.length === 1) return authors[0]
    if (authors.length === 2) return authors.join(' & ')

    const lastAuthor = authors[authors.length - 1]
    const otherAuthors = authors.slice(0, -1).join(', ')
    return `${otherAuthors} & ${lastAuthor}`
  }

  /**
   * Generate item description from venue and metadata
   */
  const generateDescription = (item: MediaItem): string => {
    const parts: string[] = []

    if (item.venue) parts.push(item.venue)
    if (item.location) parts.push(item.location)
    if (item.metadata?.timestamp) parts.push(`[${item.metadata.timestamp}]`)
    if (item.metadata?.duration) parts.push(`Duration: ${item.metadata.duration}`)

    return parts.join(' • ')
  }

  const convertLegacyContent = createConvertLegacyContent()

  const getMediaTypeIcon = createGetMediaTypeIcon()
  const organizeByYear = createOrganizeByYear()
  const filterItems = createFilterItems()
  const filterActiveLinks = createFilterActiveLinks()

  return {
    loadMediaData,
    getLinkIcon,
    getCategoryStyle,
    formatAuthors,
    generateDescription,
    getMediaTypeIcon,
    organizeByYear,
    filterItems,
    filterActiveLinks,
    convertLegacyContent,
  }
}
