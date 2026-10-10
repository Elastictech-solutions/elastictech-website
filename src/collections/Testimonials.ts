import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthenticated } from '../lib/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'person', defaultColumns: ['person', 'organization', '_status'] },
  versions: { drafts: true },
  access: { read: publishedOrAuthenticated, create: isAuthenticated, update: isAuthenticated, delete: ({ req }) => req.user?.role === 'admin' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'person', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'organization', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
