import Link from 'next/link'
import type { BreadcrumbItem } from '@/lib/seo'
import { BreadcrumbJsonLd } from './JsonLd'

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null

  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] leading-5 text-white/45 font-urbanist">
          {items.map((item, i) => {
            const last = i === items.length - 1
            return (
              <li key={`${item.href}-${i}`} className="flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden className="text-white/25">/</span> : null}
                {last ? (
                  <span className="text-white/70" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-white/80 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
