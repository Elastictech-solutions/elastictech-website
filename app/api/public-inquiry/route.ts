import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

const windows = new Map<string, { count: number; started: number }>()

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const current = windows.get(forwardedFor)
  if (current && now - current.started < 10 * 60 * 1000 && current.count >= 5) {
    return NextResponse.json({ error: 'Please wait before sending another message.' }, { status: 429 })
  }
  if (!current || now - current.started >= 10 * 60 * 1000) windows.set(forwardedFor, { count: 1, started: now })
  else current.count += 1

  try {
    const data = await request.json()
    if (typeof data.website === 'string' && data.website.trim()) return NextResponse.json({ success: true })
    const name = String(data.name || '').trim()
    const email = String(data.email || '').trim()
    const subject = String(data.subject || '').trim()
    const message = String(data.message || '').trim()
    const phone = String(data.phone || '').trim()
    if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }
    if (name.length > 120 || email.length > 180 || subject.length > 160 || message.length > 4000 || phone.length > 40) {
      return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 })
    }
    const payload = await getPayload({ config })
    await payload.create({ collection: 'inquiries', overrideAccess: true, data: { name, email, phone, subject, message, status: 'new' } })
    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unable to save your message right now.' }, { status: 500 })
  }
}
