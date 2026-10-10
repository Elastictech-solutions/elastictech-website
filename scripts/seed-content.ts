import config from '../payload.config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

const services = [
  ['Servers deployment & maintenance', 'Deployment, maintenance and monitoring for server systems that keep everyday operations available.'],
  ['LAN / WAN connectivity', 'Plan and support the wired and wide-area connections that link people, offices and systems.'],
  ['Network monitoring & support', 'Keep networks visible, dependable and easier to troubleshoot with ongoing technical support.'],
  ['Database development', 'Build and maintain databases shaped around the information and workflows your organization relies on.'],
  ['Business analytics', 'Make business data easier to understand and use in planning and day-to-day decisions.'],
  ['Information security', 'Improve protection for business systems, data and the people who use them.'],
  ['Cloud management', 'Manage cloud services and workloads with an eye on reliability, cost and growth.'],
  ['IT consulting', 'Get practical advice for planning, improving and managing your technology environment.'],
  ['SEO & AI', 'Improve search visibility and explore useful AI applications for your organization.'],
  ['Backup & recovery systems', 'Plan dependable backups and recovery so important data can be restored when it is needed.'],
  ['Technical support', 'Get approachable technical support for the devices, applications and systems your team depends on.'],
]

const existingServices = await payload.find({ collection: 'services', limit: 1, overrideAccess: true })
if (existingServices.docs.length === 0) {
  for (const [index, [title, summary]] of services.entries()) {
    await payload.create({ collection: 'services', overrideAccess: true, data: {
      title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), summary,
      featured: true, sortOrder: index, _status: 'published',
    } })
  }
  payload.logger.info(`Created ${services.length} starter services.`)
} else payload.logger.info('Services already exist; leaving them unchanged.')

const existingProjects = await payload.find({ collection: 'projects', limit: 1, overrideAccess: true })
if (existingProjects.docs.length === 0) {
  await payload.create({ collection: 'projects', overrideAccess: true, data: {
    title: 'Multi-project IT infrastructure operations',
    slug: 'multi-project-it-infrastructure-operations',
    category: 'Infrastructure & networks',
    summary: 'ElasticTech manages server deployments and maintenance, LAN / WAN connectivity, and network monitoring across several projects.',
    featured: true, _status: 'published',
  } })
  payload.logger.info('Created the homepage infrastructure spotlight from the project information provided.')
} else payload.logger.info('Projects already exist; leaving them unchanged.')

const existingPage = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, overrideAccess: true })
if (existingPage.docs.length === 0) {
  await payload.create({ collection: 'pages', overrideAccess: true, data: {
    title: 'Home', slug: 'home', eyebrow: 'ICT that works as hard as you do',
    headline: 'Technology that moves your business forward.',
    description: 'From reliable infrastructure to smarter business systems, we help your team work securely and grow with confidence.',
    _status: 'published',
  } })
  payload.logger.info('Created the starter Home page.')
}

process.exit(0)
