import { Suspense } from 'react'
import Tutorial from '@/app/components/Dashboard/Tutorial/Tutorial'

export default function TutorialPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#838388] text-sm">Loading docs…</div>}>
      <Tutorial />
    </Suspense>
  )
}
