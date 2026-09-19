'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Option<T extends string> = { id: T; label: string }

/**
 * Custom select that never uses native <select> (Windows paints those white).
 * Menu is portaled to document.body with a solid dark fill.
 */
export default function DarkSelect<T extends string>({
  value,
  options,
  onChange,
  className = '',
  menuClassName = '',
  align = 'right',
  minMenuWidth = 140,
}: {
  value: T
  options: Option<T>[]
  onChange: (next: T) => void
  className?: string
  menuClassName?: string
  align?: 'left' | 'right'
  minMenuWidth?: number
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const active = options.find((o) => o.id === value) || options[0]

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuMinW = minMenuWidth

  useLayoutEffect(() => {
    if (!open || !btnRef.current) {
      setMenuPos(null)
      return
    }
    const place = () => {
      const r = btnRef.current!.getBoundingClientRect()
      const menuW = Math.max(r.width, menuMinW)
      const left =
        align === 'right'
          ? Math.max(8, r.right - menuW)
          : Math.min(r.left, window.innerWidth - menuW - 8)
      setMenuPos({ top: r.bottom + 6, left, width: menuW })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, align, options.length, menuMinW])

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (ref.current?.contains(t)) return
      if (menuRef.current?.contains(t)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const menu =
    open && mounted && menuPos
      ? createPortal(
          <div
            ref={menuRef}
            role="listbox"
            className={`fixed z-[9999] max-h-56 overflow-y-auto rounded border border-[#2A2A36] dashboard-scroll ${menuClassName}`}
            style={{
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width,
              backgroundColor: '#16161F',
              color: '#FFFFFF',
              boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
            }}
          >
            {options.map((o) => {
              const isActive = o.id === value
              return (
                <button
                  key={o.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(o.id)
                    setOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 text-[12px] leading-[16px] cursor-pointer transition-colors"
                  style={
                    isActive
                      ? { backgroundColor: '#88C4FF', color: '#0B0E14' }
                      : { backgroundColor: '#16161F', color: 'rgba(255,255,255,0.88)' }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#22222E'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#16161F'
                  }}
                >
                  {o.label}
                </button>
              )
            })}
          </div>,
          document.body
        )
      : null

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[12px] border px-2.5 py-1.5 outline-none cursor-pointer transition-colors max-w-[160px]"
        style={{
          backgroundColor: '#1C1C26',
          color: '#FFFFFF',
          borderColor: '#2A2A36',
        }}
      >
        <span className="truncate">{active?.label || value}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 11 7"
          fill="none"
          className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path
            d="M4.47619 6.21084C4.87182 6.6369 5.54615 6.6369 5.94178 6.21084L10.1486 1.68045C10.7427 1.0406 10.2889 0 9.41577 0H1.0022C0.129033 0 -0.324743 1.0406 0.269403 1.68045L4.47619 6.21084Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {menu}
    </div>
  )
}
