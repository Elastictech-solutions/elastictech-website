import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthenticated } from '../lib/access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'featured', '_status', 'updatedAt'] },
  versions: { drafts: true },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'description', type: 'richText' },
    { name: 'category', type: 'text' },
    { name: 'clientName', type: 'text', label: 'Client name (optional)' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }, { name: 'caption', type: 'text' }] },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'outcomes', type: 'array', fields: [{ name: 'metric', type: 'text', required: true }, { name: 'label', type: 'text', required: true }] },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'completionDate', type: 'date' },
    { name: 'seoDescription', type: 'textarea' },
  ],
}
