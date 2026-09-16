import type { Metadata } from 'next'
import DashboardShell from '../components/Dashboard/DashboardShell'

/** Dashboard / product app - never index private authenticated surfaces. */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
