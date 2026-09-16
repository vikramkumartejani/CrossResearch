import type { Metadata } from 'next'

/** Auth flows - utility pages, not research content. */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
