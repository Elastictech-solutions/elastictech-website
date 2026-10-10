import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Products } from './src/collections/Products'
import { Projects } from './src/collections/Projects'
import { Services } from './src/collections/Services'
import { Testimonials } from './src/collections/Testimonials'
import { Users } from './src/collections/Users'
import { Inquiries } from './src/collections/Inquiries'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— ElasticTech CMS',
    },
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  editor: lexicalEditor(),
  collections: [Users, Pages, Projects, Services, Products, Testimonials, Media, Inquiries],
  globals: [SiteSettings],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || 'postgres://elastictech:elastictech@localhost:5432/elastictech' },
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
