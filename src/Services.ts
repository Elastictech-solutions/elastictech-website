import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthenticated } from '../lib/access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'featured', 'sortOrder', '_status'] },
  versions: { drafts: true },
  access: { read: publishedOrAuthenticated, create: isAuthenticated, update: isAuthenticated, delete: ({ req }) => req.user?.role === 'admin' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'icon', type: 'text', admin: { description: 'Short label or icon name used by the website.' } },
    { name: 'featured', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
