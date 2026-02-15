/**
 * Unified schema for all TabContent modal data
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

export type LinkType =
  | 'external'
  | 'internal'
  | 'download'
  | 'video'
  | 'audio'
  | 'archive'
  | 'podcast'
  | 'play'
  | 'pdf'
  | 'web'
export type ContentType =
  | 'publication'
  | 'media'
  | 'presentation'
  | 'service'
  | 'teaching'
  | 'training'
  | 'research'
  | 'highlight'
export type MediaType =
  | 'interview'
  | 'podcast'
  | 'panel'
  | 'television'
  | 'radio'
  | 'keynote'
  | 'conference'
  | 'other'
  | 'report'
  | 'blogpost'
  | 'slides'
  | 'academic'
export type DisplayContext = 'modal' | 'highlight' | 'card' | 'list'

export interface MediaLink {
  type: LinkType
  url: string
  title: string
  icon?: string // FontAwesome icon class
  archiveUrls?: ArchiveUrl[] // Multiple archive sources
  lastChecked?: string // ISO date when URL was last verified
  status?: 'active' | 'broken' // Current status of the resource
}

export interface ArchiveUrl {
  source: string // e.g., 'archive.org', 'UK Web Archive', 'BnF Web Archive'
  url: string
  date?: string // Archive date if available
  lastChecked?: string // ISO date when URL was last verified
  status?: 'active' | 'broken' // Current status of the archive URL
}

export interface MediaMetadata {
  // Academic metadata
  isbn?: string
  doi?: string
  pages?: string
  volume?: string
  issue?: string

  // Media metadata
  duration?: string
  timestamp?: string
  broadcaster?: string
  archiveDate?: string

  // Professional metadata
  role?: string // moderator, panelist, keynote speaker, etc.
  coAuthors?: string[]
  supervision?: string // for academic teaching
  certification?: string // for professional training

  // Event metadata
  eventType?: string
  series?: string
  notes?: string

  // Future extensibility
  [key: string]: any
}

export interface RSSMetadata {
  /** Publication date in ISO format for RSS pubDate field */
  pubDate: string
  /** RSS GUID, defaults to primary link URL if not provided */
  guid?: string
  /** Author field for RSS, defaults to "team@blaeu.com (Rob van Eijk)" */
  author?: string
  /** Short excerpt for RSS description and news cards (150-200 chars recommended) */
  excerpt: string
  /** Whether to feature this item in the news section */
  featured: boolean
  /** RSS-specific categories (different from general tags) */
  rssCategories: string[]
  /** Optional venue/publisher for news context */
  venue?: string
}

export interface MediaItem {
  id: string
  year: number | string // Allow year ranges for multi-year activities
  title: string
  description?: string
  authors: string[]
  venue?: string
  location?: string
  publisher?: string
  category: string
  mediaType: MediaType
  contentType: ContentType
  displayContext: DisplayContext
  links: MediaLink[]
  metadata?: MediaMetadata
  tags?: string[]
  featured?: boolean

  // Recording analysis (Tier 1 enrichment)
  summary?: string

  // Research highlights specific fields
  image?: string
  imageAlt?: string
  intro?: string // For longer descriptions in research highlights

  // RSS and News specific metadata (optional)
  rssMetadata?: RSSMetadata
}

export interface YearSection {
  year: number | string // Allow year ranges for multi-year activities
  count: number
  items: MediaItem[]
}

export interface MediaContentData {
  title: string
  contentType: ContentType
  sections: YearSection[]
  totalItems: number
  lastUpdated: string
}

// Icon mapping for different link types
export const LINK_ICONS: Record<LinkType, string> = {
  external: 'fa-solid fa-external-link',
  internal: 'fa-solid fa-link',
  download: 'fa-solid fa-download',
  video: 'fa-solid fa-play-circle',
  audio: 'fa-solid fa-microphone',
  archive: 'fa-solid fa-copy',
  podcast: 'fa-solid fa-headphones',
  play: 'fa-solid fa-play-circle',
  pdf: 'fa-solid fa-file-pdf',
  web: 'fa-solid fa-globe',
}

// Category styling mapping - using brand colors only
export const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  interview: { bg: 'bg-brand-blue', text: 'text-white' },
  podcast: { bg: 'bg-brand-gold', text: 'text-black' },
  panel: { bg: 'bg-brand-blue', text: 'text-white' },
  keynote: { bg: 'bg-brand-gold', text: 'text-black' },
  television: { bg: 'bg-brand-blue', text: 'text-white' },
  radio: { bg: 'bg-brand-gold', text: 'text-black' },
  other: { bg: 'bg-brand-blue', text: 'text-white' },
  conference: { bg: 'bg-brand-gold', text: 'text-black' },
  report: { bg: 'bg-brand-blue', text: 'text-white' },
  blogpost: { bg: 'bg-brand-gold', text: 'text-black' },
  slides: { bg: 'bg-brand-blue', text: 'text-white' },
  academic: { bg: 'bg-brand-gold', text: 'text-black' },
}
