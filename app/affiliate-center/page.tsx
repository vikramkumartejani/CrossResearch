import AffiliateCenter from '@/app/components/Dashboard/AffiliateCenter/AffiliateCenter'

export const metadata = {
  title: 'Affiliate Center',
}

export default function AffiliateCenterPage() {
  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-16">
      <div className="mx-auto w-full max-w-[1640px]">
        <AffiliateCenter />
      </div>
    </main>
  )
}
