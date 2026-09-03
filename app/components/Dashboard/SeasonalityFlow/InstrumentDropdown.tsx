'use client'

import { useEffect, useRef, useState } from 'react'

export const SEASONALITY_INSTRUMENTS = [
    { value: 'EURUSD', label: 'EURUSD' },
    { value: 'GBPUSD', label: 'GBPUSD' },
    { value: 'USDJPY', label: 'USDJPY' },
    { value: 'XAUUSD', label: 'XAUUSD' },
    { value: 'XAGUSD', label: 'XAGUSD' },
    { value: 'USOIL', label: 'USOIL' },
    { value: 'NAS100', label: 'NAS100' },
    { value: 'US30', label: 'US30' },
    { value: 'SP500', label: 'SP500' },
    { value: 'BTCUSD', label: 'Bitcoin' },
] as const

export type SeasonalityInstrument = (typeof SEASONALITY_INSTRUMENTS)[number]['value']

interface InstrumentDropdownProps {
    value: string
    onChange: (value: SeasonalityInstrument) => void
    className?: string
}

export default function InstrumentDropdown({ value, onChange, className = '' }: InstrumentDropdownProps) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    const selected =
        SEASONALITY_INSTRUMENTS.find((item) => item.value === value) || SEASONALITY_INSTRUMENTS[0]

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1.5 cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="text-white text-[16px] leading-[19px] font-semibold">{selected.label}</span>
                <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z"
                        fill="#FAFAF9"
                    />
                </svg>
            </button>

            {open && (
                <div
                    role="listbox"
                    className="absolute top-[calc(100%+8px)] left-0 z-50 min-w-[140px] bg-[#1E1E2A] border border-[#FFFFFF14] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)] max-h-72 overflow-y-auto"
                >
                    {SEASONALITY_INSTRUMENTS.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            role="option"
                            aria-selected={item.value === selected.value}
                            onClick={() => {
                                onChange(item.value)
                                setOpen(false)
                            }}
                            className={`w-full text-left px-3.5 py-2.5 text-[13px] leading-[16px] font-semibold transition-colors cursor-pointer ${
                                item.value === selected.value
                                    ? 'bg-[#FFFFFF0A] text-white'
                                    : 'text-white/80 hover:bg-[#FFFFFF08] hover:text-white'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
