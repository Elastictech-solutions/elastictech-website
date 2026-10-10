export function siteOrigin() {
  const url = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid public website URL')
  return url.origin
}

export function publicUrl(path: string) {
  return `${siteOrigin()}${path}`
}

export function safeExternalUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined
  } catch { return undefined }
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}
