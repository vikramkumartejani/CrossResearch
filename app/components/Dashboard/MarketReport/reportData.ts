export interface Report {
    id: number
    tags: string[]
    readTime: string
    title: string
    subtitle: string
    body: string
    track: string
    author: string
    date: string
    contentHtml: string
    chartImage?: string | null
}

export interface MarketReportsPage {
    eyebrow: string
    title: string
    subtitle: string
}

export interface MarketReportsPayload {
    page: MarketReportsPage
    reports: Report[]
    sidebarIds: number[]
}
