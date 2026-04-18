/**
 * Composable for managing modal content data across all TabContent components
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

import type { LinkType } from '~/data/schema/media-content.schema'
import { LINK_ICONS } from '~/data/schema/media-content.schema'

export const useMediaContent = (): {
  getLinkIcon: (linkType: LinkType) => string
  formatAuthors: (authors: string[]) => string
} => {
  /**
   * Get icon class for link type
   */
  const getLinkIcon = (linkType: LinkType): string => {
    return LINK_ICONS[linkType] || 'fa-solid fa-external-link'
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

  return {
    getLinkIcon,
    formatAuthors,
  }
}
