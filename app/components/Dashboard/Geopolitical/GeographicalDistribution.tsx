'use client'

import { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import FlashpointBrief, { type FlashpointItem } from './FlashpointBrief'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type SeverityKey = 'high' | 'medium' | 'low'

interface Hotspot {
    name: string
    coordinates: [number, number]
    severity: SeverityKey
    story_count?: number
}

const COLOR: Record<SeverityKey, string> = {
    high: '#E25C3F',
    medium: '#2796FF',
    low: '#6E686C',
}

const HOVER: Record<SeverityKey, string> = {
    high: '#F07A62',
    medium: '#4AABFF',
    low: '#8A8388',
}

const BASE_FILL = '#3F3F48'
const BASE_HOVER = '#52525C'

/** Hotspot region name → ISO 3166-1 numeric country id(s) in world-atlas */
const REGION_ISO_IDS: Record<string, string[]> = {
    Yemen: ['887'],
    Gaza: ['275'],
    'West Bank': ['275'],
    Israel: ['376'],
    Iran: ['364'],
    Lebanon: ['422'],
    Syria: ['760'],
    Iraq: ['368'],
    Ukraine: ['804'],
    Russia: ['643'],
    Taiwan: ['158'],
    'South China Sea': ['156'],
    China: ['156'],
    'North Korea': ['408'],
    'Korean Peninsula': ['408', '410'],
    India: ['356'],
    Pakistan: ['586'],
    Afghanistan: ['4'],
    Sudan: ['729'],
    Nigeria: ['566'],
    Ethiopia: ['231'],
    Somalia: ['706'],
    Libya: ['434'],
    Egypt: ['818'],
    Turkey: ['792'],
    France: ['250'],
    Germany: ['276'],
    'United Kingdom': ['826'],
    'United States': ['840'],
    Brazil: ['76'],
    Venezuela: ['862'],
    Mexico: ['484'],
    Japan: ['392'],
    Australia: ['36'],
    'Saudi Arabia': ['682'],
    Canada: ['124'],
    Italy: ['380'],
    Spain: ['724'],
    'South Korea': ['410'],
    Netherlands: ['528'],
    Poland: ['616'],
    Singapore: ['702'],
    Indonesia: ['360'],
    Philippines: ['608'],
    Vietnam: ['704'],
    Thailand: ['764'],
    'South Africa': ['710'],
    Argentina: ['32'],
    Chile: ['152'],
    Colombia: ['170'],
    Europe: ['276', '250', '380', '724', '616'],
}

function normalizeIsoId(id: unknown): string {
    const raw = String(id ?? '').trim()
    if (!raw) return ''
    const asNum = Number(raw)
    if (Number.isFinite(asNum)) return String(asNum)
    return raw
}

export default function GeographicalDistribution() {
    const [hotspots, setHotspots] = useState<Hotspot[]>([])
    const [flashpoints, setFlashpoints] = useState<FlashpointItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/api/geopolitical-news')
                if (!res.ok) throw new Error('Failed to load geopolitical news')
                const data = await res.json()
                if (cancelled) return

                const mappedHotspots: Hotspot[] = (data.geographical_distribution || [])
                    .map((h: any) => {
                        const coords = h.coordinates
                        if (!Array.isArray(coords) || coords.length < 2) return null
                        const severity = String(h.severity || 'medium').toLowerCase() as SeverityKey
                        return {
                            name: String(h.name || 'Unknown'),
                            coordinates: [Number(coords[0]), Number(coords[1])] as [number, number],
                            severity: (['high', 'medium', 'low'].includes(severity)
                                ? severity
                                : 'medium') as SeverityKey,
                            story_count: Number(h.story_count || 0),
                        }
                    })
                    .filter(Boolean) as Hotspot[]

                const mappedFlashpoints: FlashpointItem[] = (data.flashpoint_brief || []).map((fp: any) => ({
                    region: String(fp.region || 'Global'),
                    date: String(fp.date || '—'),
                    title: String(fp.title || ''),
                    severity: String(fp.severity || 'Medium'),
                    url: fp.url ? String(fp.url) : undefined,
                }))

                setHotspots(mappedHotspots)
                setFlashpoints(mappedFlashpoints)
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    const { severityByIso, metaByIso } = useMemo(() => {
        const severityByIso = new Map<string, SeverityKey>()
        const metaByIso = new Map<string, { name: string; story_count: number }>()
        const rank: Record<SeverityKey, number> = { high: 3, medium: 2, low: 1 }

        hotspots.forEach((h) => {
            const ids = REGION_ISO_IDS[h.name] || []
            ids.forEach((id) => {
                const key = normalizeIsoId(id)
                if (!key) return
                const prev = severityByIso.get(key)
                if (!prev || rank[h.severity] > rank[prev]) {
                    severityByIso.set(key, h.severity)
                }
                const prevMeta = metaByIso.get(key)
                metaByIso.set(key, {
                    name: h.name,
                    story_count: (prevMeta?.story_count || 0) + (h.story_count || 0),
                })
            })
        })

        return { severityByIso, metaByIso }
    }, [hotspots])

    return (
        <div className="px-4 lg:px-6 mb-4 sm:mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_524px] gap-3 sm:gap-4">
                <div className="h-full">
                    <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">
                        Geographical Distribution
                    </h2>
                    <div className="bg-[#16161F] p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-white text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] font-semibold">
                                Global Risk Map
                            </p>
                            <div className="flex items-center gap-2.5 sm:gap-4">
                                {(['High', 'Medium', 'Low'] as const).map((s) => (
                                    <div key={s} className="flex items-center gap-1">
                                        <div
                                            className="w-1 h-1 sm:w-[7px] sm:h-[7px] rounded-full"
                                            style={{
                                                backgroundColor: COLOR[s.toLowerCase() as SeverityKey],
                                            }}
                                        />
                                        <span
                                            className="text-[13px] sm:text-[14px] leading-4 sm:leading-[17px] font-medium"
                                            style={{ color: COLOR[s.toLowerCase() as SeverityKey] }}
                                        >
                                            {s}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {loading && (
                            <div className="py-20 text-center text-[#838388] text-[13px]">Loading risk map...</div>
                        )}
                        {error && !loading && (
                            <div className="py-20 text-center text-[#E25C3F] text-[13px]">{error}</div>
                        )}

                        {!loading && !error && (
                            <ComposableMap
                                projection="geoMercator"
                                projectionConfig={{ scale: 80, center: [10, 40] }}
                                style={{ width: '100%', height: 'auto', maxHeight: 500 }}
                                height={354}
                            >
                                <Geographies geography={GEO_URL}>
                                    {({ geographies }: { geographies: any[] }) =>
                                        geographies.map((geo: any) => {
                                            const iso = normalizeIsoId(geo.id)
                                            const severity = severityByIso.get(iso)
                                            const meta = metaByIso.get(iso)
                                            const fill = severity ? COLOR[severity] : BASE_FILL
                                            const hover = severity ? HOVER[severity] : BASE_HOVER
                                            const label = meta
                                                ? `${meta.name} · ${severity}${
                                                      meta.story_count ? ` · ${meta.story_count} stories` : ''
                                                  }`
                                                : geo.properties?.name || iso

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    style={{
                                                        default: {
                                                            fill,
                                                            stroke: '#16161F',
                                                            strokeWidth: 0.45,
                                                            outline: 'none',
                                                            cursor: severity ? 'pointer' : 'default',
                                                        },
                                                        hover: {
                                                            fill: hover,
                                                            stroke: '#16161F',
                                                            strokeWidth: 0.45,
                                                            outline: 'none',
                                                        },
                                                        pressed: {
                                                            fill,
                                                            outline: 'none',
                                                        },
                                                    }}
                                                >
                                                    <title>{label}</title>
                                                </Geography>
                                            )
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                        )}
                    </div>
                </div>

                <FlashpointBrief items={flashpoints} loading={loading} error={error} />
            </div>
        </div>
    )
}
