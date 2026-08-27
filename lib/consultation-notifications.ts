import nodemailer from 'nodemailer'

const clean = (value: unknown, max = 500) => String(value || '').trim().slice(0, max)
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[character] || character)

export async function notifyPaidConsultation(record: Record<string, unknown>) {
  const user = process.env.SMTP_USER || ''
  const pass = process.env.SMTP_PASS || ''
  if (!user || !pass) return
  const rows = [
    ['Payment', 'Paid'], ['Reference', clean(record.bookingReference)], ['Service', clean(record.serviceTitle)], ['Preferred date', clean(record.date)], ['Preferred time', clean(record.time)], ['Attendees', clean(record.attendees)], ['Name', clean(record.contactName)], ['Organisation', clean(record.organisation)], ['Email', clean(record.email)], ['Telephone', clean(record.phone)],
  ]
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.gmail.com', port: Number(process.env.SMTP_PORT || 465), secure: Number(process.env.SMTP_PORT || 465) === 465, auth: { user, pass } })
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || 'TenderLab Website'}" <${user}>`,
    to: process.env.INQUIRY_TO || 'info@tenderlab.co.uk',
    replyTo: clean(record.email, 254),
    subject: `Paid consultation: ${clean(record.serviceTitle)} · ${clean(record.organisation)}`,
    text: rows.map(([label,value]) => `${label}: ${value}`).join('\n'),
    html: `<h1>Paid consultation booking</h1><table>${rows.map(([label,value]) => `<tr><th align="left" style="padding:8px 12px">${escapeHtml(label)}</th><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`).join('')}</table>`,
  })
}
