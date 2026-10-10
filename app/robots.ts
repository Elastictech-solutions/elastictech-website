import type { MetadataRoute } from 'next'
import { publicUrl, siteOrigin } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  const rules = { allow: '/', disallow: ['/admin', '/api/', '/.env', '/backups/', '/media/'] }
  return {
    rules: [{ userAgent: '*', ...rules }, { userAgent: ['OAI-SearchBot', 'ChatGPT-User'], ...rules }],
    sitemap: publicUrl('/sitemap.xml'),
    host: siteOrigin(),
  }
}
