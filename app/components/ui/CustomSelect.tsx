'use client'

import { useState, useRef, useEffect } from 'react'

interface Option {
    value: string
    label: string
}

interface CustomSelectProps {
    options: Option[]
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export default function CustomSelect({
    options,
    placeholder = 'Select...',
    value,
    onChange,
    className = '',
}: CustomSelectProps) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Option | null>(
        value ? (options.find((o) => o.value === value) ?? null) : null
    )
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    function handleSelect(option: Option) {
        setSelected(option)
        onChange?.(option.value)
        setOpen(false)
    }

    return (
        <div ref={ref} className={`relative ${className}`} style={{ zIndex: open ? 9999 : 'auto' }}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-[16px] px-5 h-[48px] sm:h-[61px] text-[16px] transition-colors cursor-pointer outline-none ${open ? '' : ''
                    } ${selected ? 'text-white' : 'text-white/50'}`}
            >
                <span className="truncate">{selected ? selected.label : placeholder}</span>
                <svg className={`flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 right-0 py-1 top-[calc(100%+6px)] z-[9999] bg-[#070711]/98 backdrop-blur-lg border border-[#FFFFFF14] rounded-[12px] overflow-hidden shadow-[0px_8px_32px_rgba(0,0,0,0.4)]">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`w-full text-left px-4 py-3 text-[14px] sm:text-[15px] transition-colors hover:bg-[#FFFFFF0D] cursor-pointer ${selected?.value === option.value
                                    ? 'text-[#88C4FF] bg-[#88C4FF0F]'
                                    : 'text-white/70'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
