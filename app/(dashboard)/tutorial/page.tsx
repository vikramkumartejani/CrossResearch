import { Suspense } from 'react'
import Tutorial from '@/app/components/Dashboard/Tutorial/Tutorial'
import ChartLoader from '@/app/components/Dashboard/shared/ChartLoader'

export default function TutorialPage() {
  return (
    <Suspense fallback={<ChartLoader className="min-h-[280px]" />}>
      <Tutorial />
    </Suspense>
  )
}
