export type PolicyBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export type PolicySection = {
  id: string
  number?: number
  title: string
  blocks: PolicyBlock[]
}

export type PolicyDocument = {
  slug: string
  title: string
  description: string
  intro: string[]
  sections: PolicySection[]
  contactEmail?: string
}
