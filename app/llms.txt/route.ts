import { publishedDiscovery } from '@/lib/discovery'
import { publicUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'
const plain = (value: string) => value.replace(/[\r\n\[\]<>]/g, ' ').trim()

export async function GET() {
  const { projects, products } = await publishedDiscovery()
  const content = [
    '# ElasticTech Solutions',
    '> ICT infrastructure, cloud management, network support, information security, database development, business analytics, IT consulting, SEO and AI, backup and recovery, and technical support.',
    '', '## Public website',
    `- [Home and services](${publicUrl('/')}): Company overview, ICT services and contact form.`,
    `- [Projects](${publicUrl('/projects')}): Published project case studies.`,
    `- [Products](${publicUrl('/products')}): Published technology products and solutions.`,
    `- [Sitemap](${publicUrl('/sitemap.xml')}): Canonical public page URLs.`,
    '', '## Published projects',
    ...projects.map((item) => `- [${plain(item.title)}](${publicUrl(`/projects/${encodeURIComponent(item.slug)}`)}): ${plain(item.summary)}`),
    '', '## Published products',
    ...products.map((item) => `- [${plain(item.title)}](${publicUrl(`/products/${encodeURIComponent(item.slug)}`)}): ${plain(item.summary)}`),
  ].join('\n')
  return new Response(`${content}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' } })
}
