/**
 * Image src helper.
 *
 * Static files under `/public/assets` stay on this origin.
 * Admin-uploaded images already come back as full Cloudinary URLs
 * (`res.cloudinary.com/...`) and are left as-is.
 */
export function media(src: string): string {
  return src || ''
}

export function mediaCssUrl(src: string): string {
  return `url("${(src || '').replace(/"/g, '%22')}")`
}
