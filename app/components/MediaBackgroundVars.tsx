import { media } from '@/lib/media'

/** CSS variables so Tailwind-less background images also hit Cloudinary. */
export default function MediaBackgroundVars() {
  const dots = media('/assets/dots.svg')
  const cardDots = media('/assets/card-dot-img.svg')
  const priceBg = media('/assets/price-card-bg.svg')
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root{--cr-dots:url("${dots}");--cr-card-dots:url("${cardDots}");--cr-price-bg:url("${priceBg}");}`,
      }}
    />
  )
}
