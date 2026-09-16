import SeoHubPage from '@/app/components/seo/SeoHubPage'
import { MODELS_HUB, hubMetadata } from '@/lib/seo-hubs'

export const metadata = hubMetadata(MODELS_HUB)

export default function ModelsHubPage() {
  const hub = MODELS_HUB
  return (
    <SeoHubPage
      path={hub.path}
      title={hub.title}
      description={hub.description}
      breadcrumbs={hub.breadcrumbs}
      clusters={hub.clusters}
    >
      <section className="mb-12 space-y-4 max-w-3xl">
        {hub.intro?.map((p) => (
          <p key={p.slice(0, 40)} className="text-white/55 text-[15px] leading-7">
            {p}
          </p>
        ))}
      </section>
    </SeoHubPage>
  )
}
