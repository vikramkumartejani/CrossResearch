/**
 * Resolve any app image src through Cloudinary.
 *
 * Local paths like `/assets/logo.svg` map to
 * `crossresearch/assets/logo` on the cloud.
 * Remote URLs go through Cloudinary fetch.
 * Data URLs and existing Cloudinary URLs pass through.
 *
 * If NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is unset, the original src is returned
 * so local `/public` assets still work.
 */
const CLOUD = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '').trim()
const FOLDER = (process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'crossresearch').replace(/^\/+|\/+$/g, '')

export function cloudinaryEnabled(): boolean {
  return Boolean(CLOUD)
}

export function media(src: string): string {
  if (!src) return src
  if (src.startsWith('data:') || src.startsWith('blob:')) return src
  if (!CLOUD) return src
  if (src.includes('res.cloudinary.com')) return src

  if (/^https?:\/\//i.test(src)) {
    return `https://res.cloudinary.com/${CLOUD}/image/fetch/f_auto,q_auto/${encodeURIComponent(src)}`
  }

  const path = src.replace(/^\//, '')
  const noExt = path.replace(/\.[a-zA-Z0-9]+$/, '')
  const publicId = FOLDER ? `${FOLDER}/${noExt}` : noExt
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/${publicId}`
}

export function mediaCssUrl(src: string): string {
  return `url("${media(src).replace(/"/g, '%22')}")`
}
