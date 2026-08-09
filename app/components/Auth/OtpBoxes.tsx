'use client'

import { useEffect, useRef, type KeyboardEvent, type ClipboardEvent } from 'react'

type OtpBoxesProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  length?: number
}

export default function OtpBoxes({ value, onChange, disabled = false, length = 6 }: OtpBoxesProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, i) => value[i] || '')

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join('').slice(0, length))
  }

  const handleChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, '')
    if (!cleaned) {
      setDigit(index, '')
      return
    }
    if (cleaned.length > 1) {
      // Paste-like multi digit into this field
      const chars = cleaned.slice(0, length - index).split('')
      const next = digits.slice()
      chars.forEach((ch, offset) => {
        next[index + offset] = ch
      })
      onChange(next.join('').slice(0, length))
      const focusAt = Math.min(index + chars.length, length - 1)
      refs.current[focusAt]?.focus()
      return
    }
    setDigit(index, cleaned)
    if (index < length - 1) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[index]) {
        setDigit(index, '')
        return
      }
      if (index > 0) {
        setDigit(index - 1, '')
        refs.current[index - 1]?.focus()
      }
      return
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      refs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      refs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    onChange(pasted)
    refs.current[Math.min(pasted.length, length) - 1]?.focus()
  }

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full" role="group" aria-label="Verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="w-10 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-[#151B29] border border-[#FFFFFF0D] text-white text-[18px] sm:text-[20px] font-medium text-center outline-none focus:border-[#88C4FF] transition-colors disabled:opacity-50"
        />
      ))}
    </div>
  )
}
