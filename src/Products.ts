import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthenticated } from '../lib/access'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'featured', '_status', 'updatedAt'] },
  versions: { drafts: true },
  access: { read: publishedOrAuthenticated, create: isAuthenticated, update: isAuthenticated, delete: ({ req }) => req.user?.role === 'admin' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'externalUrl', type: 'text', label: 'Product link' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
