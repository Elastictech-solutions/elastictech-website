import type { MetadataRoute } from 'next'
import { publishedDiscovery } from '@/lib/discovery'
import { publicUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, products } = await publishedDiscovery()
  return [
    { url: publicUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: publicUrl('/projects'), changeFrequency: 'weekly', priority: 0.8 },
    { url: publicUrl('/products'), changeFrequency: 'weekly', priority: 0.8 },
    ...projects.map((item) => ({ url: publicUrl(`/projects/${encodeURIComponent(item.slug)}`), lastModified: new Date(item.updatedAt) })),
    ...products.map((item) => ({ url: publicUrl(`/products/${encodeURIComponent(item.slug)}`), lastModified: new Date(item.updatedAt) })),
  ]
}
