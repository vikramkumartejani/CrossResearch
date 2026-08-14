import NextImage, { type ImageProps } from 'next/image'
import { media } from '@/lib/media'

export default function CldImage({ src, ...rest }: ImageProps) {
  const resolved = typeof src === 'string' ? media(src) : src
  return <NextImage src={resolved} {...rest} />
}
