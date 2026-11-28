export interface Highlight {
  kind: string
  title: string
  venue: string
  year: number
  url: string
}

// Hand-picked from the portfolio data; titles, venues and links as recorded there
export const portfolioHighlights: Highlight[] = [
  {
    kind: 'Report',
    title: 'From Pseudonymised to Anonymous Data',
    venue: 'Cabinet SAMMAN & Blaeu',
    year: 2026,
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6972998',
  },
  {
    kind: 'Opening remarks & moderation',
    title: 'OECD Roundtable on Scoping Emerging Consent Practices in the Digital Ecosystem',
    venue: 'OECD',
    year: 2025,
    url: 'https://web.archive.org/web/20250318163703/https://www.linkedin.com/pulse/opening-remarks-evolution-consent-technologies-rob-van-eijk-7i8ne',
  },
  {
    kind: 'PhD',
    title: 'Web Privacy Measurement in Real-Time Bidding Systems',
    venue: 'Leiden University',
    year: 2019,
    url: 'https://ssrn.com/abstract=3319284',
  },
  {
    kind: 'Media',
    title: 'You for sale: Your Attention, Bought in an Instant',
    venue: 'The New York Times',
    year: 2012,
    url: 'https://www.nytimes.com/2012/11/18/technology/your-online-attention-bought-in-an-instant-by-advertisers.html',
  },
]
