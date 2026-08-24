import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { CONSULTATION_BY_ID } from '@/lib/consultations'

export const runtime = 'nodejs'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
]

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = JSON.parse(clientPayload || '{}') as { consultationId?: string; bookingReference?: string }
        if (!payload.consultationId || !CONSULTATION_BY_ID.has(payload.consultationId)) throw new Error('Invalid consultation.')
        if (!payload.bookingReference || !/^[0-9a-f-]{36}$/i.test(payload.bookingReference)) throw new Error('Invalid booking reference.')
        if (!pathname.startsWith(`consultations/${payload.bookingReference}/`)) throw new Error('Invalid upload path.')

        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 10 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify(payload),
        }
      },
      onUploadCompleted: async () => {
        // The final booking endpoint records the uploaded paths with the enquiry.
      },
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error('[consultation upload]', error)
    return NextResponse.json({ error: 'The secure upload could not be started.' }, { status: 400 })
  }
}
