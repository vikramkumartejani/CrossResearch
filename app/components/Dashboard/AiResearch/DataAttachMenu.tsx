'use client'

import { useEffect, useRef, useState } from 'react'

export type AttachKind = 'image' | 'doc' | 'screenshot'

type DataAttachMenuProps = {
  open: boolean
  active?: boolean
  onToggle: () => void
  onClose: () => void
  onPick: (files: File[], kind: AttachKind) => void
}

const IMAGE_ACCEPT = 'image/png,image/jpeg,image/webp,image/gif'
const DOC_ACCEPT = '.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx'

function IconPaperclip() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M9.2 4.1 4.55 8.75a2.2 2.2 0 1 0 3.11 3.11l5.02-5.02a3.5 3.5 0 0 0-4.95-4.95L2.65 6.97"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconDoc() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M4 1.75h4.2L11.5 5v8.25H4V1.75Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8.2 1.75V5h3.3M5.5 8h4M5.5 10.25h2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconCamera() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M2.25 5.25h2.1l1-1.5h4.3l1 1.5h2.1v7H2.25v-7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="8.4" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

async function captureScreenshot(): Promise<File | null> {
  if (!navigator.mediaDevices?.getDisplayMedia) return null
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
  try {
    const video = document.createElement('video')
    video.srcObject = stream
    video.muted = true
    await video.play()
    if (!video.videoWidth) {
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve()
      })
    }
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(video.videoWidth, 1)
    canvas.height = Math.max(video.videoHeight, 1)
    canvas.getContext('2d')?.drawImage(video, 0, 0)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return null
    const stamp = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    return new File([blob], `Screenshot ${stamp}.png`, { type: 'image/png' })
  } finally {
    stream.getTracks().forEach((t) => t.stop())
  }
}

export default function DataAttachMenu({ open, active, onToggle, onClose, onPick }: DataAttachMenuProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const docRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!open) return
    function onPointer(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    function onHotkey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault()
        imageRef.current?.click()
      }
    }
    window.addEventListener('keydown', onHotkey)
    return () => window.removeEventListener('keydown', onHotkey)
  }, [])

  function takeFiles(list: FileList | null, kind: AttachKind) {
    if (!list?.length) return
    onPick(Array.from(list), kind)
    onClose()
  }

  async function onScreenshot() {
    setBusy(true)
    try {
      const file = await captureScreenshot()
      if (file) {
        onPick([file], 'screenshot')
        onClose()
      }
    } catch {
      // cancelled
    } finally {
      setBusy(false)
    }
  }

  const items = [
    {
      id: 'image' as const,
      label: 'Add files or photos',
      hint: 'Ctrl + U',
      icon: <IconPaperclip />,
      onClick: () => imageRef.current?.click(),
    },
    {
      id: 'doc' as const,
      label: 'Add documents',
      hint: '',
      icon: <IconDoc />,
      onClick: () => docRef.current?.click(),
    },
    {
      id: 'screenshot' as const,
      label: busy ? 'Capturing…' : 'Take a screenshot',
      hint: '',
      icon: <IconCamera />,
      onClick: () => void onScreenshot(),
    },
  ]

  return (
    <div ref={wrapRef} className="relative">
      <input
        ref={imageRef}
        type="file"
        accept={IMAGE_ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          takeFiles(e.target.files, 'image')
          e.target.value = ''
        }}
      />
      <input
        ref={docRef}
        type="file"
        accept={DOC_ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          takeFiles(e.target.files, 'doc')
          e.target.value = ''
        }}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1.5 h-8 px-2.5 text-[12px] leading-none transition-colors cursor-pointer ${
          open || active
            ? 'bg-[#88C4FF1A] text-[#88C4FF] border border-[#88C4FF55]'
            : 'text-[#838388] border border-transparent hover:text-white hover:bg-[#FFFFFF08]'
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path d="M6.5 2.5v8M2.5 6.5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span>+ Data</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-[260px] border border-[#FFFFFF0D] bg-[#16161F] shadow-[0_8px_24px_rgba(0,0,0,0.35)] py-1"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={busy && item.id === 'screenshot'}
              onClick={item.onClick}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] text-white/90 hover:bg-[#FFFFFF08] cursor-pointer disabled:opacity-50"
            >
              <span className="text-[#838388]">{item.icon}</span>
              <span className="flex-1 min-w-0">{item.label}</span>
              {item.hint ? <span className="text-[11px] text-[#838388]">{item.hint}</span> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
