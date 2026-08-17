'use client'

import { useEffect, useState } from 'react'
import ChartLoader from '../shared/ChartLoader'

type Chokepoint = {
    name: string
    risk: number | null
}

function formatRisk(value: number | null): string {
    if (value == null || !Number.isFinite(value)) return '-'
    return value.toFixed(1)
}

export default function StrategicChokepoints() {
    const [title, setTitle] = useState('STRATEGIC CHOKEPOINTS')
    const [rows, setRows] = useState<Chokepoint[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/strategic-chokepoints', { cache: 'no-store' })
                const body = await res.json().catch(() => ({}))
                if (!res.ok) {
                    throw new Error(
                        typeof body.details === 'string'
                            ? body.details
                            : body.error || body.detail || `Failed to load chokepoints (${res.status})`
                    )
                }
                const mapped: Chokepoint[] = (Array.isArray(body.chokepoints) ? body.chokepoints : [])
                    .filter((r: { active?: boolean }) => r.active !== false)
                    .sort(
                        (a: { sort_order?: number; risk?: number }, b: { sort_order?: number; risk?: number }) => {
                            const ao = Number(a.sort_order ?? 0)
                            const bo = Number(b.sort_order ?? 0)
                            if (ao !== bo) return ao - bo
                            return Number(b.risk ?? 0) - Number(a.risk ?? 0)
                        }
                    )
                    .map((r: { name?: string; risk?: number | null }) => ({
                        name: r.name || '-',
                        risk: r.risk == null || !Number.isFinite(Number(r.risk)) ? null : Number(r.risk),
                    }))
                if (!cancelled) {
                    if (typeof body.title === 'string' && body.title.trim()) setTitle(body.title.trim())
                    setRows(mapped)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load chokepoints')
                    setRows([])
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        void load()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="bg-[#16161F] p-3 sm:p-4 flex flex-col h-[360px] sm:h-[380px]">
            <p className="text-[#C5CDD8] text-[12px] sm:text-[13px] leading-4 font-semibold tracking-[0.12em] uppercase shrink-0 mb-3">
                {title}
            </p>

            <div className="grid grid-cols-[1fr_64px] gap-3 px-1 pb-2 border-b border-[#FFFFFF14] shrink-0">
                <span className="text-[#6B7280] text-[10px] font-semibold tracking-[0.12em] uppercase">Chokepoint</span>
                <span className="text-[#6B7280] text-[10px] font-semibold tracking-[0.12em] uppercase text-right">Risk</span>
            </div>

            {loading && <ChartLoader className="min-h-[120px] mt-3" />}
            {error && <p className="text-[#E25C3F] text-[12px] mt-3">{error}</p>}

            <div className="flex-1 overflow-y-auto min-h-0">
                {!loading && !error && rows.length === 0 && (
                    <p className="text-white/40 text-[12px] mt-3">No chokepoints published.</p>
                )}
                {rows.map((row) => (
                    <div
                        key={row.name}
                        className="grid grid-cols-[1fr_64px] gap-3 px-1 py-2.5 border-b border-[#FFFFFF0F] last:border-0 items-center"
                    >
                        <span className="text-[#E8EDF5] text-[12px] sm:text-[13px] leading-[16px] font-medium truncate pr-2">
                            {row.name}
                        </span>
                        <span className="text-[#F59E0B] text-[12px] sm:text-[13px] leading-[16px] font-semibold text-right tabular-nums">
                            {formatRisk(row.risk)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
