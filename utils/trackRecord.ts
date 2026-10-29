import scholarlyWorksData from '~/data/scholarly-works.json'
import keynoteData from '~/data/keynote-speaker.json'
import panelExpertData from '~/data/panel-expert.json'
import panelModeratorData from '~/data/panel-expert_with_moderator.json'
import publicationsData from '~/data/professional-publications.json'
import committeesData from '~/data/committees-boards.json'
import mediaMentionsData from '~/data/media-mentions.json'
import popularMediaData from '~/data/popular-media.json'
import academicTeachingData from '~/data/academic-teaching.json'
import professionalLearningData from '~/data/professional-learning.json'

interface CountableData {
  sections: { items?: unknown[] }[]
}

// Count every item, including sections whose year is a range string
const countItems = (...data: CountableData[]): number =>
  data.reduce(
    (total, d) => total + d.sections.reduce((sum, s) => sum + (s.items?.length ?? 0), 0),
    0
  )

// Anchors match the section ids on /portfolio
export const trackRecordRows = [
  {
    anchor: 'panels',
    count: countItems(keynoteData, panelExpertData, panelModeratorData),
    label: 'Talks & panels',
  },
  { anchor: 'media-mentions', count: countItems(mediaMentionsData), label: 'Media mentions' },
  {
    anchor: 'committees',
    count: countItems(committeesData),
    label: 'Committees & boards',
  },
  { anchor: 'scholarly', count: countItems(scholarlyWorksData), label: 'Scholarly works' },
  {
    anchor: 'publications',
    count: countItems(publicationsData),
    label: 'Professional publications',
  },
  {
    anchor: 'teaching',
    count: countItems(academicTeachingData, professionalLearningData),
    label: 'Teaching',
  },
  {
    anchor: 'popular-media',
    count: countItems(popularMediaData),
    label: 'Public engagement',
  },
]

export const trackRecordCount = (anchor: string): number =>
  trackRecordRows.find(row => row.anchor === anchor)?.count ?? 0
