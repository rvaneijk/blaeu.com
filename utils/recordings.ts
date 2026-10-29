import academicTeachingData from '~/data/academic-teaching.json'
import committeesBoardsData from '~/data/committees-boards.json'
import keynoteSpeakerData from '~/data/keynote-speaker.json'
import mediaMentionsData from '~/data/media-mentions.json'
import newsHighlightsData from '~/data/news-highlights.json'
import scholarlyWorksData from '~/data/scholarly-works.json'
import professionalPublicationsData from '~/data/professional-publications.json'
import popularMediaData from '~/data/popular-media.json'
import panelExpertData from '~/data/panel-expert.json'
import panelModeratorData from '~/data/panel-expert_with_moderator.json'
import professionalLearningData from '~/data/professional-learning.json'

interface ArchiveUrl {
  url: string
  source: string
  status: string
}

export interface MediaLink {
  url: string
  type: string
  title?: string
  status?: string
  archiveUrls?: ArchiveUrl[]
}

export interface MediaItem {
  id: string
  title: string
  year: number | string
  authors?: string[]
  venue?: string
  location?: string
  category?: string
  metadata?: Record<string, unknown>
  summary?: string
  links?: MediaLink[]
}

interface MediaSection {
  year: number | string
  items: MediaItem[]
}

interface MediaData {
  sections: MediaSection[]
}

function flattenSections(data: MediaData): MediaItem[] {
  return (data.sections ?? []).flatMap((s: MediaSection) =>
    (s.items ?? []).map((item: MediaItem) => ({ ...item, year: item.year ?? s.year }))
  )
}

// Data titles use the citation form 'Eijk R. van' and spaced hyphens
export const displayTitle = (title: string): string =>
  title
    .replace(/^Eijk R\. van:\s*/, '')
    .replace(/Eijk R\. van/g, 'Rob van Eijk')
    .replace(/ - /g, ' – ')

function activeLinks(item: MediaItem): MediaLink[] {
  if (!item.links) return []
  return item.links.filter(link => link.status !== 'broken')
}

export function isYouTube(item: MediaItem): boolean {
  return /youtube\.com|youtu\.be/.test(primaryLink(item)?.url ?? '')
}

export function isVideo(item: MediaItem): boolean {
  const link = primaryLink(item)
  return !!link && (link.type === 'video' || /youtube|vimeo|webcast|npostart/.test(link.url))
}

// Role (moderator), venue and year, e.g. 'Moderator, CPDP Conference 2026, Brussels'
export function byline(item: MediaItem): string {
  const role = typeof item.metadata?.role === 'string' ? item.metadata.role : ''
  const moderator =
    (item.authors ?? []).some(a => /Eijk R\. van/.test(a) && /Moderator/.test(a)) ||
    (/Eijk R\. van/.test(role) && /moderator/i.test(role))
  const venue = [item.venue, item.location].filter(Boolean).join(', ')
  const year = venue.includes(String(item.year)) ? '' : String(item.year)
  return [moderator ? 'Moderator' : '', venue, year].filter(Boolean).join(', ')
}

export const recordingKinds = [
  'TV & radio',
  'Talks & panels',
  'Teaching',
  'Podcast',
  'Webinar',
  'Interview',
  'Other',
] as const
export type RecordingKind = (typeof recordingKinds)[number]

export function recordingKind(item: MediaItem): RecordingKind {
  const c = (item.category ?? '').toLowerCase()
  if (['panel', 'keynote', 'presentation', 'opening remarks'].includes(c)) return 'Talks & panels'
  if (c === 'television interview' || c === 'radio interview') return 'TV & radio'
  if (c.includes('interview')) return 'Interview'
  if (c === 'podcast') return 'Podcast'
  if (c === 'webinar') return 'Webinar'
  if (['professional learning', 'lecture', 'guest professor'].includes(c)) return 'Teaching'
  return 'Other'
}

// Thumbnails are stored locally as 16:9 WebP: YouTube video ids, or the recording id for other platforms.
// File names carry a content hash because /assets/img is cached for 30 days as immutable.
const thumbnails: Record<string, string> = {
  '9g10a3dh3ZA': '9g10a3dh3ZA-5a2b299c.webp',
  m7fEXSUEILU: 'm7fEXSUEILU-30b7d1bc.webp',
  UnkrPiCn5To: 'UnkrPiCn5To-7a7c6545.webp',
  opUC4PpFgd0: 'opUC4PpFgd0-4b3b01ba.webp',
  BYAcDaUifLI: 'BYAcDaUifLI-c64bb80b.webp',
  '1ehPLYzv6ZM': '1ehPLYzv6ZM-329f2a3a.webp',
  'cPhl2P-It4E': 'cPhl2P-It4E-99f942a1.webp',
  zBJ3MYSQpH8: 'zBJ3MYSQpH8-93bb5196.webp',
  IxFsoaH_chY: 'IxFsoaH_chY-b1a32fdf.webp',
  otnaSlX_78w: 'otnaSlX_78w-9d198e14.webp',
  LVi1_ZpCe5U: 'LVi1_ZpCe5U-9de62edc.webp',
  ODYNFuSpULg: 'ODYNFuSpULg-c4beca54.webp',
  uzkgvRFFZjY: 'uzkgvRFFZjY-9260372c.webp',
  EL66ujQNk88: 'EL66ujQNk88-09b7b2b1.webp',
  fKCtR34kgVk: 'fKCtR34kgVk-f9734049.webp',
  icSjq1umcaw: 'icSjq1umcaw-987b4571.webp',
  'dYu7Xvg-VPE': 'dYu7Xvg-VPE-e6415eba.webp',
  r1J93rTeeaY: 'r1J93rTeeaY-5692feef.webp',
  MauPHIRmUmc: 'MauPHIRmUmc-1ddd33ee.webp',
  SEIWCJCLwZk: 'SEIWCJCLwZk-4c762f71.webp',
  '6H_Dwcy8F-8': '6H_Dwcy8F-8-96d5fa8a.webp',
  QkK8Wsfz9Kg: 'QkK8Wsfz9Kg-99fa775f.webp',
  bieY6Y6pGps: 'bieY6Y6pGps-244769ae.webp',
  Ju4mFBafSaE: 'Ju4mFBafSaE-eb3a9325.webp',
  VvEcFsXoDps: 'VvEcFsXoDps-842420f0.webp',
  CnQSv5SVZ3Q: 'CnQSv5SVZ3Q-a815b392.webp',
  lBJSiMFooC4: 'lBJSiMFooC4-b0f445bd.webp',
  GJH_Pk29TK4: 'GJH_Pk29TK4-bcc36d07.webp',
  NtL94krUwDg: 'NtL94krUwDg-bc0f4438.webp',
  E5R77OseaEk: 'E5R77OseaEk-b97cb200.webp',
  nKpoWj1MQek: 'nKpoWj1MQek-59b6d640.webp',
  uRJsTy50Sqs: 'uRJsTy50Sqs-4f298479.webp',
  TKwtnywIQr0: 'TKwtnywIQr0-4b5354dc.webp',
  MId8BQSTlTE: 'MId8BQSTlTE-53d994fb.webp',
  T7gsnd55yzE: 'T7gsnd55yzE-9c5aca13.webp',
  '7Qj0eMYZBkE': '7Qj0eMYZBkE-55f3a36f.webp',
  'vre3q8D-J68': 'vre3q8D-J68-017a6a82.webp',
  YWJ7ZXEmzHw: 'YWJ7ZXEmzHw-38ea998d.webp',
  _ehlooemvJ0: '_ehlooemvJ0-ded8241d.webp',
  BMcxO7PRsKQ: 'BMcxO7PRsKQ-0988db7d.webp',
  '6SEdnWlSZyk': '6SEdnWlSZyk-3207e0c5.webp',
  T9fqpE5e5S0: 'T9fqpE5e5S0-54513602.webp',
  'mO7bjmUAq-Q': 'mO7bjmUAq-Q-18cf79d0.webp',
  mtPqt906u_g: 'mtPqt906u_g-4ae34e1d.webp',
  PPO65tKPI7I: 'PPO65tKPI7I-090b60ef.webp',
  Ys1hgKtG3eg: 'Ys1hgKtG3eg-bc62f966.webp',
  // Other platforms, by recording id (preview image from the source page)
  '2020-us-legislation': '2020-us-legislation-204c6657.webp',
  '2020-schrems-ii-guidance': '2020-schrems-ii-guidance-ed8dff19.webp',
  '2013-fractie-seconde': '2013-fractie-seconde-da2f7d3e.webp',
  '2013-rtb-growth': '2013-rtb-growth-a18a4213.webp',
  '2025-bph-panel': '2025-bph-panel-d7a10035.webp',
  '2022-nieuwsuur-adfraud': '2022-nieuwsuur-adfraud-8b3c2ab9.webp',
  '2021-green-certificate': '2021-green-certificate-4e809e58.webp',
  '2021-serious-privacy-podcast': '2021-serious-privacy-podcast-beda0cf4.webp',
  '2019-privacy-advisor-podcast': '2019-privacy-advisor-podcast-ad05347e.webp',
  '2019-radio-tracking': '2019-radio-tracking-adbf1b59.webp',
}

export function thumbnail(item: MediaItem): string | null {
  const url = primaryLink(item)?.url ?? ''
  const id =
    url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([\w-]{11})/)?.[1] ?? item.id
  const file = thumbnails[id]
  return file ? `/assets/img/recordings/${file}` : null
}

export function primaryLink(item: MediaItem): MediaLink | null {
  const links = activeLinks(item)
  if (links.length === 0) return null
  return links.find(l => l.type === 'video' || l.type === 'recording') ?? links[0] ?? null
}

const allSources = [
  academicTeachingData,
  committeesBoardsData,
  keynoteSpeakerData,
  mediaMentionsData,
  newsHighlightsData,
  scholarlyWorksData,
  professionalPublicationsData,
  popularMediaData,
  panelExpertData,
  panelModeratorData,
  professionalLearningData,
]

export const recordings = allSources
  .flatMap(flattenSections)
  .filter(item => item.summary && primaryLink(item))
  .sort((a, b) => Number(b.year) - Number(a.year))
