export interface PolicyBlock {
  type: 'p' | 'list' | 'olist'
  text?: string // for 'p'; newlines become line breaks
  strong?: boolean // for 'p' used as a sub-heading
  small?: boolean // for 'p' rendered as small print
  items?: string[] // for 'list' (bullets) and 'olist' (numbered)
}

export interface PolicySection {
  title?: string
  blocks: PolicyBlock[]
}

export interface Policy {
  title: string
  updated: string
  sections: PolicySection[]
}

export type PolicyLang = 'en' | 'nl'
export type LocalizedPolicy = Record<PolicyLang, Policy>
