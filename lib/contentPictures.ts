/** Default thumbnails from /public/assets/pictures (URL-encoded for spaces). */

function picture(filename: string): string {
  return `/assets/pictures/${encodeURIComponent(filename)}`
}

export const EDUCATION_PICTURES = {
  featured: picture('education featured.png'),
  left: picture('education left.png'),
  grid: picture('education grid all.png'),
  bottom: picture('getting started.png'),
} as const

export const STRATEGY_PICTURES = {
  featured: picture('strategies featured.png'),
  gridRecent: picture('trading strat grid card for recent.png'),
  gridAll: picture('trading strat grid for all.png'),
} as const

export function educationImage(
  article: { image?: string | null; placement?: string; sort_order?: number },
  variant: 'recent-left' | 'featured' | 'bottom' | 'grid' = 'grid',
): string {
  if (article.image?.trim()) return article.image.trim()
  if (variant === 'featured' || article.placement === 'featured') {
    return EDUCATION_PICTURES.featured
  }
  if (variant === 'recent-left' || (article.placement === 'grid' && Number(article.sort_order ?? 0) === 1)) {
    return EDUCATION_PICTURES.left
  }
  if (variant === 'bottom' || article.placement === 'bottom') {
    return EDUCATION_PICTURES.bottom
  }
  return EDUCATION_PICTURES.grid
}

export function strategyImage(
  item: { image?: string | null; placement?: string },
  variant: 'featured' | 'grid-recent' | 'grid' = 'grid',
): string {
  if (item.image?.trim()) return item.image.trim()
  if (variant === 'featured' || item.placement === 'featured') {
    return STRATEGY_PICTURES.featured
  }
  if (variant === 'grid-recent') {
    return STRATEGY_PICTURES.gridRecent
  }
  return STRATEGY_PICTURES.gridAll
}
