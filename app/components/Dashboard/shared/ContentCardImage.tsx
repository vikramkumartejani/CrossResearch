import { media } from '@/lib/media'

export default function ContentCardImage({
  src,
  alt = '',
  className = '',
}: {
  src: string
  alt?: string
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media(src)}
      alt={alt}
      className={`w-full h-full object-cover bg-[#FFFFFF08] ${className}`.trim()}
    />
  )
}
