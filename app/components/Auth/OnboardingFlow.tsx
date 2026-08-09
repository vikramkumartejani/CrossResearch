'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authErrorMessage } from '@/lib/authUi'

type Option = { id: string; label: string }
type Question = { id: string; prompt: string; options: Option[] }
type Questionnaire = {
  title?: string
  subtitle?: string
  questions: Question[]
}
type Persona = {
  id?: string
  title?: string
  headline?: string
  body?: string
  cta?: string
}

export default function OnboardingFlow() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = useState<Questionnaire | null>(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [persona, setPersona] = useState<Persona | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/auth/onboarding', { cache: 'no-store' })
        const body = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(authErrorMessage(body, 'Could not load onboarding'))
        if (cancelled) return
        setData({
          title: typeof body.title === 'string' ? body.title : 'Welcome to CrossResearch',
          subtitle:
            typeof body.subtitle === 'string'
              ? body.subtitle
              : 'Answer four quick questions so we can personalize your experience.',
          questions: Array.isArray(body.questions) ? body.questions : [],
        })
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Could not load onboarding')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const questions = data?.questions ?? []
  const total = questions.length
  const current = questions[step]
  const progress = useMemo(() => {
    if (persona) return 100
    if (!total) return 0
    return Math.round(((step + 1) / total) * 100)
  }, [persona, step, total])

  const selectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const goNext = () => {
    if (!current) return
    if (!answers[current.id]) {
      toast.error('Please select an option to continue.')
      return
    }
    if (step < total - 1) {
      setStep((s) => s + 1)
      return
    }
    void submit()
  }

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const submit = async () => {
    try {
      setSubmitting(true)
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(authErrorMessage(body, 'Could not save answers'))
      const p = (body.persona || body.user?.onboarding_persona || null) as Persona | null
      setPersona(p)
      toast.success(typeof body.message === 'string' ? body.message : 'Profile ready.')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save answers')
    } finally {
      setSubmitting(false)
    }
  }

  const enterDashboard = () => {
    router.replace('/analysis')
    router.refresh()
  }

  return (
    <div
      className="flex flex-col justify-center h-full w-full py-8 sm:py-10"
      style={{ fontFamily: 'var(--font-dm-sans), Arial, sans-serif' }}
    >
      <div className="mb-6 sm:mb-8">
        <Image src="/assets/logo.svg" alt="CrossResearch" width={52} height={44} priority />
      </div>

      {loading ? (
        <p className="text-white/50 text-sm">Preparing your setup…</p>
      ) : persona ? (
        <div className="flex flex-col gap-6 max-w-[520px]">
          <div>
            <p className="text-[#6EA8FF] text-[13px] tracking-[0.04em] uppercase mb-3">
              {persona.title || 'Welcome'}
            </p>
            <h1 className="text-white text-[28px] sm:text-[34px] leading-[1.15] font-medium mb-4">
              {persona.headline || 'You made it.'}
            </h1>
            <p className="text-[#A8A8B3] text-[15px] sm:text-[16px] leading-[1.55]">
              {persona.body}
            </p>
          </div>
          <button
            type="button"
            onClick={enterDashboard}
            className="self-start inline-flex items-center justify-center px-5 py-3 bg-[#227ED9] hover:bg-[#1c6cba] text-white text-[14px] font-medium transition-colors"
          >
            {persona.cta || 'Enter dashboard'}
          </button>
        </div>
      ) : !current ? (
        <p className="text-white/50 text-sm">No onboarding questions available.</p>
      ) : (
        <div className="flex flex-col gap-6 max-w-[560px]">
          <div>
            <h1 className="text-white text-[26px] sm:text-[32px] leading-[1.15] font-medium mb-2">
              {data?.title}
            </h1>
            <p className="text-[#A8A8B3] text-[14px] sm:text-[15px] leading-[1.5]">
              {data?.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-[3px] bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#227ED9] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white/40 text-[12px] tabular-nums shrink-0">
              {step + 1}/{total}
            </span>
          </div>

          <div>
            <h2 className="text-white text-[17px] sm:text-[18px] leading-[1.35] font-medium mb-4">
              {current.prompt}
            </h2>
            <div className="flex flex-col gap-2.5">
              {current.options.map((opt) => {
                const selected = answers[current.id] === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectOption(current.id, opt.id)}
                    className={`text-left px-4 py-3.5 border transition-colors ${
                      selected
                        ? 'border-[#227ED9] bg-[#227ED9]/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-[#C8C8D0] hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-[14px] sm:text-[15px] leading-[1.4]">{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            {step > 0 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={submitting}
                className="px-4 py-3 text-[#A8A8B3] text-[14px] hover:text-white transition-colors disabled:opacity-50"
              >
                Back
              </button>
            ) : (
              <span className="w-0" />
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={submitting || !answers[current.id]}
              className="ml-auto inline-flex items-center justify-center px-5 py-3 bg-[#227ED9] hover:bg-[#1c6cba] disabled:opacity-40 disabled:hover:bg-[#227ED9] text-white text-[14px] font-medium transition-colors"
            >
              {submitting ? 'Saving…' : step === total - 1 ? 'Finish' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
