/**
 * Image src helper.
 *
 * Static files under `/public/assets` stay on this origin.
 * Admin-uploaded images come back as Cloudinary URLs
 * (`res.cloudinary.com/...`) and are left as-is.
 */
export function media(src: string): string {
  return (src || '').trim()
}

export function mediaCssUrl(src: string): string {
  return `url("${media(src).replace(/"/g, '%22')}")`
}
