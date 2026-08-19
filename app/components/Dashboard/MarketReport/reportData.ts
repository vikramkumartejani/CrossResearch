export type ReportPlacement = 'main' | 'sidebar'

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
    placement?: ReportPlacement
    sidebarId?: number | null
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

export type ReportRow = {
    main: Report
    side: Report | null
}

function newestFirst(a: Report, b: Report) {
    return Number(b.id) - Number(a.id)
}

/** Left-column cards plus an optional right-panel article linked by `sidebarId`. */
export function buildReportRows(reports: Report[]): ReportRow[] {
    const list = reports.filter((r) => r && Number.isFinite(Number(r.id)))
    const byId = new Map(list.map((r) => [r.id, r]))

    const mains = list
        .filter((r) => r.placement !== 'sidebar')
        .sort(newestFirst)

    return mains.map((main) => {
        const sideId = main.sidebarId
        const candidate =
            sideId != null && sideId !== main.id && byId.has(sideId) ? byId.get(sideId)! : null
        const side = candidate?.placement === 'sidebar' ? candidate : null
        return { main, side }
    })
}
