import config from '@payload-config'
import { getPayload } from 'payload'

type PublicEntry = { slug: string; title: string; summary: string; updatedAt: string }
function entries(docs: Record<string, unknown>[]): PublicEntry[] {
  return docs.filter((doc) => typeof doc.slug === 'string' && doc.slug.length > 0 && !['.', '..'].includes(doc.slug) && typeof doc.title === 'string' && typeof doc.summary === 'string' && typeof doc.updatedAt === 'string').map((doc) => ({ slug: doc.slug as string, title: doc.title as string, summary: doc.summary as string, updatedAt: doc.updatedAt as string }))
}

// Use anonymous access rules even when a visitor has a CMS session.
export async function publishedDiscovery() {
  const payload = await getPayload({ config })
  const query = { where: { _status: { equals: 'published' } }, overrideAccess: false, depth: 0, pagination: false, limit: 0 } as const
  const [projects, products] = await Promise.all([
    payload.find({ ...query, collection: 'projects', select: { slug: true, title: true, summary: true, updatedAt: true } }),
    payload.find({ ...query, collection: 'products', select: { slug: true, title: true, summary: true, updatedAt: true } }),
  ])
  return { projects: entries(projects.docs), products: entries(products.docs) }
}
