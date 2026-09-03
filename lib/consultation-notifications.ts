import nodemailer from 'nodemailer'

const clean = (value: unknown, max = 500) => String(value || '').trim().slice(0, max)
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[character] || character)

async function sendConsultationNotification(record: Record<string, unknown>, kind: 'request' | 'paid') {
  const user = process.env.SMTP_USER || ''
  const pass = process.env.SMTP_PASS || ''
  if (!user || !pass) return
  const rows = [['Status', kind === 'paid' ? 'Paid — awaiting calendar selection' : 'Free booking — awaiting calendar selection'], ['Reference', clean(record.bookingReference)], ['Service', clean(record.serviceTitle)], ['Duration', clean(record.duration)], ['Attendees', clean(record.attendees)], ['Name', clean(record.contactName || `${clean((record.details as Record<string, unknown> | undefined)?.firstName)} ${clean((record.details as Record<string, unknown> | undefined)?.lastName)}`)], ['Organisation', clean(record.organisation || (record.details as Record<string, unknown> | undefined)?.organisation)], ['Email', clean(record.email || (record.details as Record<string, unknown> | undefined)?.email)], ['Telephone', clean(record.phone || (record.details as Record<string, unknown> | undefined)?.phone)]]
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.gmail.com', port: Number(process.env.SMTP_PORT || 465), secure: Number(process.env.SMTP_PORT || 465) === 465, auth: { user, pass } })
  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || 'TenderLab Website'}" <${user}>`,
    to: process.env.INQUIRY_TO || 'info@tenderlab.co.uk',
    replyTo: clean(record.email, 254),
    subject: `${kind === 'paid' ? 'Paid consultation' : 'Free consultation'}: ${clean(record.serviceTitle)} · ${clean(record.organisation || (record.details as Record<string, unknown> | undefined)?.organisation)}`,
    text: rows.map(([label,value]) => `${label}: ${value}`).join('\n'),
    html: `<h1>${kind === 'paid' ? 'Paid consultation' : 'Free consultation'}</h1><table>${rows.map(([label,value]) => `<tr><th align="left" style="padding:8px 12px">${escapeHtml(label)}</th><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`).join('')}</table>`,
  })
}

export const notifyConsultationRequest = (record: Record<string, unknown>) => sendConsultationNotification(record, 'request')
export const notifyPaidConsultation = (record: Record<string, unknown>) => sendConsultationNotification(record, 'paid')
