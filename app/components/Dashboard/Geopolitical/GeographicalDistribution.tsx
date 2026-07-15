'use client'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import FlashpointBrief from './FlashpointBrief'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const HOTSPOTS: { name: string; coordinates: [number, number]; severity: 'high' | 'medium' | 'low' }[] = [
    { name: 'Yemen', coordinates: [48.5, 15.5], severity: 'high' },
    { name: 'Ukraine', coordinates: [31.0, 49.0], severity: 'high' },
    { name: 'Brazil', coordinates: [-51.0, -10.0], severity: 'medium' },
    { name: 'USA', coordinates: [-95.0, 38.0], severity: 'medium' },
    { name: 'India', coordinates: [78.0, 22.0], severity: 'high' },
    { name: 'France', coordinates: [2.3, 46.0], severity: 'medium' },
    { name: 'China', coordinates: [104.0, 35.0], severity: 'medium' },
    { name: 'Russia', coordinates: [60.0, 60.0], severity: 'low' },
]

const COLOR = {
    high: '#E25C3F',
    medium: '#2796FF',
    low: '#918A8E',
}

export default function GeographicalDistribution() {
    return (
        <div className="px-4 lg:px-6 mb-4 sm:mb-5">

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_524px] gap-3 sm:gap-4">
                {/* World Map */}
                <div className='h-full'>
                    <h2 className="text-white text-[18px] leading-[22px] font-medium mb-3 sm:mb-4">Geographical Distribution</h2>
                    <div className="bg-[#16161F] p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-white text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] font-semibold">Global Risk Map</p>
                            <div className="flex items-center gap-2.5 sm:gap-4">
                                {(['High', 'Medium', 'Low'] as const).map((s) => (
                                    <div key={s} className="flex items-center gap-1">
                                        <div
                                            className="w-1 h-1 sm:w-[7px] sm:h-[7px] rounded-full"
                                            style={{ backgroundColor: COLOR[s.toLowerCase() as 'high' | 'medium' | 'low'] }}
                                        />
                                        <span className="text-[13px] sm:text-[14px] leading-4 sm:leading-[17px] font-medium"
                                            style={{ color: COLOR[s.toLowerCase() as 'high' | 'medium' | 'low'] }}>
                                            {s}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{ scale: 80, center: [10, 40] }}
                            style={{ width: '100%', height: 'auto', maxHeight: 500 }}
                            height={354}
                        >
                            <Geographies geography={GEO_URL}>
                                {({ geographies }: { geographies: any[] }) =>
                                    geographies.map((geo: any) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={{
                                                default: { fill: '#838388', stroke: '#16161F', strokeWidth: 0.4, outline: 'none' },
                                                hover: { fill: '#9a9a9e', stroke: '#16161F', strokeWidth: 0.4, outline: 'none' },
                                                pressed: { fill: '#838388', outline: 'none' },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            {/* {HOTSPOTS.map((h) => (
                                <Marker key={h.name} coordinates={h.coordinates}>
                                    <circle r={5} fill={COLOR[h.severity]} fillOpacity={0.25} />
                                    <circle r={3} fill={COLOR[h.severity]} />
                                </Marker>
                            ))} */}
                        </ComposableMap>
                    </div>
                </div>

                {/* Flashpoint Brief */}
                <FlashpointBrief />
            </div>
        </div>
    )
}
