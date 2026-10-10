import config from '@payload-config'
import { getPayload } from 'payload'

export async function getSiteSettings() {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'site-settings', depth: 1 }) as any
  } catch { return {} }
}

export async function getHomeContent() {
  try {
    const payload = await getPayload({ config })
    const [settings, services, projects, products, testimonials, pages] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 1 }),
      payload.find({ collection: 'services', where: { _status: { equals: 'published' } }, sort: 'sortOrder', limit: 32, depth: 1 }),
      payload.find({ collection: 'projects', where: { _status: { equals: 'published' } }, sort: '-createdAt', limit: 16, depth: 2 }),
      payload.find({ collection: 'products', where: { _status: { equals: 'published' } }, sort: '-createdAt', limit: 16, depth: 1 }),
      payload.find({ collection: 'testimonials', where: { _status: { equals: 'published' } }, limit: 12, depth: 1 }),
      payload.find({ collection: 'pages', where: { _status: { equals: 'published' } }, limit: 24, depth: 1 }),
    ])
    return { settings: settings as any, services: services.docs as any[], projects: projects.docs as any[], products: products.docs as any[], testimonials: testimonials.docs as any[], pages: pages.docs as any[] }
  } catch {
    return { settings: {}, services: [], projects: [], products: [], testimonials: [], pages: [] }
  }
}
