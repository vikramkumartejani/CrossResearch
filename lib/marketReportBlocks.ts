/** Ordered article sections for Market Reports (text + image). */

export type TextBlock = { id: string; type: 'text'; html: string }
export type ImageBlock = { id: string; type: 'image'; url: string; alt?: string }
export type ContentBlock = TextBlock | ImageBlock

function newBlockId(prefix = 'b'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function blankTextBlock(html = '<p></p>'): TextBlock {
  return { id: newBlockId('t'), type: 'text', html }
}

function blankImageBlock(url = ''): ImageBlock {
  return { id: newBlockId('i'), type: 'image', url, alt: '' }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isImageOnlyParagraph(el: Element): string | null {
  if (el.tagName !== 'P') return null
  const imgs = el.querySelectorAll('img')
  if (imgs.length !== 1) return null
  const text = (el.textContent || '').replace(/\u00a0/g, ' ').trim()
  if (text) return null
  return (imgs[0].getAttribute('src') || '').trim() || null
}

export function sanitizeBlocks(raw: unknown): ContentBlock[] {
  if (!Array.isArray(raw) || raw.length === 0) return []
  const out: ContentBlock[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const row = item as Record<string, unknown>
    const id = typeof row.id === 'string' && row.id ? row.id : newBlockId()
    if (row.type === 'image') {
      out.push({
        id,
        type: 'image',
        url: typeof row.url === 'string' ? row.url : '',
        alt: typeof row.alt === 'string' ? row.alt : '',
      })
    } else if (row.type === 'text') {
      out.push({
        id,
        type: 'text',
        html: typeof row.html === 'string' ? row.html : '<p></p>',
      })
    }
  }
  return out
}

export function htmlToBlocks(html: string): ContentBlock[] {
  const raw = (html || '').trim()
  if (!raw || raw === '<p></p>') return [blankTextBlock()]

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return [blankTextBlock(raw)]
  }

  const doc = new DOMParser().parseFromString(raw, 'text/html')
  const blocks: ContentBlock[] = []
  let textBuf: string[] = []

  const flushText = () => {
    if (!textBuf.length) return
    const joined = textBuf.join('\n').trim()
    textBuf = []
    if (joined) blocks.push(blankTextBlock(joined))
  }

  Array.from(doc.body.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || '').trim()
      if (t) textBuf.push(`<p>${escapeHtml(t)}</p>`)
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return
    const el = node as Element
    if (el.tagName === 'IMG') {
      flushText()
      const src = (el.getAttribute('src') || '').trim()
      if (src) blocks.push(blankImageBlock(src))
      return
    }
    const imgSrc = isImageOnlyParagraph(el)
    if (imgSrc) {
      flushText()
      blocks.push(blankImageBlock(imgSrc))
      return
    }
    textBuf.push(el.outerHTML)
  })
  flushText()

  return blocks.length ? blocks : [blankTextBlock()]
}

export function resolveContentBlocks(report: {
  contentBlocks?: ContentBlock[] | null
  contentHtml?: string | null
  body?: string | null
}): ContentBlock[] {
  const existing = sanitizeBlocks(report.contentBlocks)
  if (existing.length) return existing
  const html =
    (report.contentHtml || '').trim() ||
    (report.body ? `<p>${escapeHtml(report.body)}</p>` : '<p></p>')
  return htmlToBlocks(html)
}
