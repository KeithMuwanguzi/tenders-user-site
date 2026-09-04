import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const runtime = 'nodejs'

type ReportPayload = { title?: string; resultLabel?: string; status?: string; score?: number | null; summary?: string; strengths?: string[]; actions?: string[]; calculations?: Array<[string, string]>; answers?: Array<{ question: string; answer: string }> }

function clean(value: unknown, limit = 4000) { return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit) }

export async function POST(request: NextRequest) {
  let body: ReportPayload
  try { body = await request.json() as ReportPayload } catch { return NextResponse.json({ error: 'Invalid report request.' }, { status: 400 }) }
  const title = clean(body.title, 180)
  if (!title) return NextResponse.json({ error: 'Report title is required.' }, { status: 400 })

  const pdf = await PDFDocument.create(); pdf.setTitle(`${title} | TenderLab`); pdf.setAuthor('TenderLab Ltd'); pdf.setSubject('TenderLab resource result'); pdf.setCreator('TenderLab Resource Centre')
  const serif = await pdf.embedFont(StandardFonts.TimesRoman); const serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold); const sans = await pdf.embedFont(StandardFonts.Helvetica); const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const navy = rgb(16/255,47/255,73/255); const coral = rgb(231/255,72/255,57/255); const paper = rgb(248/255,243/255,234/255); const grey = rgb(.38,.42,.45)
  const size: [number, number] = [595.28,841.89]; const margin = 52; let page = pdf.addPage(size); let y = 790

  const newPage = () => { page = pdf.addPage(size); y = 790; footer() }
  const footer = () => { page.drawText(`TenderLab resource report · Generated ${new Date().toLocaleDateString('en-GB')} · Version 1.0`, { x: margin, y: 25, size: 8, font: sans, color: grey }) }
  const line = (text: string, font = sans, fontSize = 10.5, color = navy, indent = 0, gap = 4) => {
    const maxWidth = size[0] - margin * 2 - indent; const words = clean(text).split(/\s+/); let row = ''
    for (const word of words) { const candidate = row ? `${row} ${word}` : word; if (font.widthOfTextAtSize(candidate, fontSize) > maxWidth && row) { if (y < 66) newPage(); page.drawText(row, { x: margin + indent, y, size: fontSize, font, color }); y -= fontSize * 1.45; row = word } else row = candidate }
    if (row) { if (y < 66) newPage(); page.drawText(row, { x: margin + indent, y, size: fontSize, font, color }); y -= fontSize * 1.45 }
    y -= gap
  }
  const heading = (text: string) => { y -= 8; line(text, serifBold, 18, navy, 0, 8) }
  const bullet = (text: string, index?: number) => { line(`${index === undefined ? '•' : `${index + 1}.`} ${text}`, sans, 10.5, navy, 12, 3) }

  page.drawRectangle({ x: 0, y: 0, width: size[0], height: size[1], color: paper }); page.drawRectangle({ x: 0, y: 670, width: size[0], height: 172, color: navy }); page.drawText('TENDERLAB', { x: margin, y: 798, size: 10, font: sansBold, color: coral }); y = 755; line(title, serifBold, 30, rgb(1,1,1), 0, 2); page.drawText(clean(body.resultLabel || 'Resource result'), { x: margin, y: 640, size: 9, font: sansBold, color: coral }); page.drawText(clean(body.score === null || body.score === undefined ? body.status : `${body.score}%`), { x: margin, y: 585, size: 39, font: serifBold, color: navy }); y = 548; line(clean(body.status), sansBold, 13, navy); line(clean(body.summary), sans, 11, navy); footer()

  if (body.calculations?.length) { heading('Key calculations'); body.calculations.slice(0, 12).forEach(([label,value]) => line(`${clean(label)}: ${clean(value)}`, sansBold, 11, navy)) }
  heading('Useful foundations'); (body.strengths || []).slice(0, 12).forEach((item) => bullet(clean(item)))
  heading('Priority actions'); (body.actions || []).slice(0, 16).forEach((item,index) => bullet(clean(item), index))
  if (body.answers?.length) { heading('Assessment record'); body.answers.slice(0, 60).forEach((item) => { line(clean(item.question), sansBold, 10.5, navy, 0, 1); line(clean(item.answer), sans, 10, grey, 10, 6) }) }
  heading('What this result means'); line('This is a TenderLab self-service diagnostic based on the information supplied. It is not a buyer score, legal opinion or confirmation that every participation condition in a live procurement has been satisfied. Verify tender-specific conclusions against the current notice, procurement pack, clarifications and relevant professional advice.');
  const bytes = await pdf.save()
  return new NextResponse(Buffer.from(bytes), { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="tenderlab-resource-report.pdf"', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } })
}
