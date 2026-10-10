export class BodyTooLarge extends Error {}

export async function boundedJson(request: Request, maxBytes = 16 * 1024): Promise<Record<string, unknown>> {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new BodyTooLarge()
  const reader = request.body?.getReader()
  if (!reader) throw new SyntaxError('Missing body')
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > maxBytes) { await reader.cancel(); throw new BodyTooLarge() }
    chunks.push(value)
  }
  const body = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength }
  const data: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body))
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new SyntaxError('Invalid object')
  return data as Record<string, unknown>
}

export function createLimiter(maxRequests = 5, duration = 10 * 60 * 1000, maxKeys = 10000) {
  const windows = new Map<string, { count: number; started: number }>()
  return (key: string, now = Date.now()) => {
    for (const [ip, window] of windows) if (now - window.started >= duration) windows.delete(ip)
    const current = windows.get(key)
    if (current) {
      if (current.count >= maxRequests) return false
      current.count += 1
      return true
    }
    if (windows.size >= maxKeys) return false
    windows.set(key, { count: 1, started: now })
    return true
  }
}
