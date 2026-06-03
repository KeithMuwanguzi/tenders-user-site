export function renderMarkdownSafe(md: string): string {
  if (!md) return ''
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | null = null
  let inPara = false
  const closeList = () => {
    if (inList) {
      out.push(listType === 'ol' ? '</ol>' : '</ul>')
      inList = false
      listType = null
    }
  }
  const closePara = () => {
    if (inPara) {
      out.push('</p>')
      inPara = false
    }
  }
  const inline = (s: string) => {
    let t = esc(s)
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, url) => {
      const safe = String(url).replace(/&amp;/g, '&').replace(/"/g, '%22')
      return `<a href="${safe}" rel="noopener">${txt}</a>`
    })
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    t = t.replace(/(^|\s)\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>')
    return t
  }
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim()
    if (!l) {
      closeList()
      closePara()
      continue
    }
    const h3 = l.match(/^###\s+(.+)/)
    const h2 = l.match(/^##\s+(.+)/)
    const h1 = l.match(/^#\s+(.+)/)
    if (h3) {
      closeList()
      closePara()
      out.push(`<h3>${inline(h3[1])}</h3>`)
      continue
    }
    if (h2) {
      closeList()
      closePara()
      out.push(`<h2>${inline(h2[1])}</h2>`)
      continue
    }
    if (h1) {
      closeList()
      closePara()
      out.push(`<h2>${inline(h1[1])}</h2>`)
      continue
    }
    if (/^[-*]\s+/.test(l)) {
      closePara()
      if (!inList || listType !== 'ul') {
        closeList()
        out.push('<ul>')
        inList = true
        listType = 'ul'
      }
      out.push(`<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`)
      continue
    }
    if (/^\d+\.\s+/.test(l)) {
      closePara()
      if (!inList || listType !== 'ol') {
        closeList()
        out.push('<ol>')
        inList = true
        listType = 'ol'
      }
      out.push(`<li>${inline(l.replace(/^\d+\.\s+/, ''))}</li>`)
      continue
    }
    if (/^>\s+/.test(l)) {
      closeList()
      closePara()
      out.push(`<blockquote>${inline(l.replace(/^>\s+/, ''))}</blockquote>`)
      continue
    }
    if (!inPara) {
      closeList()
      out.push('<p>')
      inPara = true
    } else {
      out.push(' ')
    }
    out.push(inline(l))
  }
  closeList()
  closePara()
  return out.join('\n')
}
