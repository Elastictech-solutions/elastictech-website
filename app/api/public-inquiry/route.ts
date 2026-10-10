import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import { boundedJson, BodyTooLarge, createLimiter } from '@/lib/request-security'
import { siteOrigin } from '@/lib/seo'

const allowRequest = createLimiter()
const reply = (data: object, status: number, extra: Record<string, string> = {}) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extra } })

export async function POST(request: Request) {
  if (request.headers.get('origin') !== siteOrigin()) return reply({ error: 'Request origin is not allowed.' }, 403)
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({ error: 'Send a JSON request.' }, 415)
  // Caddy overwrites this header with the actual peer IP. The app has no public port.
  const key = request.headers.get('x-client-ip')?.slice(0, 64) || 'unknown'
  if (!allowRequest(key)) return reply({ error: 'Please wait before sending another message.' }, 429, { 'Retry-After': '600' })

  let data: Record<string, unknown>
  try { data = await boundedJson(request) }
  catch (error) { return reply({ error: error instanceof BodyTooLarge ? 'Message is too large.' : 'Invalid message.' }, error instanceof BodyTooLarge ? 413 : 400) }
  if (typeof data.website === 'string' && data.website.trim()) return reply({ success: true }, 200)
  const limits = { name: 120, email: 180, subject: 160, message: 4000, phone: 40 }
  const clean: Record<string, string> = {}
  for (const [field, limit] of Object.entries(limits)) {
    const value = data[field]
    if (value !== undefined && typeof value !== 'string') return reply({ error: 'Invalid field value.' }, 400)
    clean[field] = typeof value === 'string' ? value.trim() : ''
    if (clean[field].length > limit) return reply({ error: 'One or more fields are too long.' }, 400)
  }
  const { name, email, subject, message, phone } = clean
  if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({ error: 'Please complete the required fields.' }, 400)
  try {
    const payload = await getPayload({ config })
    await payload.create({ collection: 'inquiries', overrideAccess: true, data: { name, email, phone, subject, message, status: 'new' } })
    return reply({ success: true }, 201)
  } catch { return reply({ error: 'Unable to save your message right now.' }, 500) }
}
