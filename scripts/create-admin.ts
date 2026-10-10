import config from '../payload.config'
import { getPayload } from 'payload'

const email = process.env.ADMIN_EMAIL?.trim()
const password = process.env.ADMIN_PASSWORD
const name = process.env.ADMIN_NAME?.trim() || 'ElasticTech Administrator'

if (!email || !password || password.length < 14) {
  throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 14 characters) before creating the first administrator.')
}

const payload = await getPayload({ config })
const existing = await payload.find({ collection: 'users', limit: 1, overrideAccess: true })

if (existing.docs.length) {
  throw new Error('A CMS user already exists. Sign in at /admin and add users there instead.')
}

await payload.create({
  collection: 'users',
  overrideAccess: true,
  data: { name, email, password, role: 'admin' },
})

payload.logger.info(`Administrator created for ${email}. Sign in at /admin.`)
process.exit(0)
