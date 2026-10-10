import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

async function getProject(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ overrideAccess: false, collection: 'projects', where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] }, depth: 2, limit: 1 })
    return result.docs[0] as any
  } catch { return null }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  return project ? { alternates: { canonical: `/projects/${encodeURIComponent(slug)}` }, title: project.title, description: project.seoDescription || project.summary } : { title: 'Project' }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  return <main className="detail-page"><section className="detail-hero"><div className="container"><Link href="/projects" className="back-link">← All projects</Link><p className="eyebrow">{project.category || 'Selected project'}</p><h1>{project.title}</h1><p>{project.summary}</p></div></section><section className="container detail-content">{project.coverImage?.url && <div className="detail-cover"><Image src={project.coverImage.url} alt={project.coverImage.alt || project.title} fill priority sizes="100vw" /></div>}<div className="detail-columns"><div><p className="eyebrow eyebrow-dark">The work</p>{project.description ? <div className="richtext-body"><RichText data={project.description} /></div> : <p>{project.summary}</p>}{project.clientName && <p><strong>Client:</strong> {project.clientName}</p>}</div><div>{Array.isArray(project.outcomes) && project.outcomes.length > 0 && <div className="outcome-list">{project.outcomes.map((outcome: any) => <div key={outcome.id || outcome.label}><strong>{outcome.metric}</strong><span>{outcome.label}</span></div>)}</div>}<Link className="text-link" href="/#contact">Talk to us about a similar project <span>↗</span></Link></div></div></section></main>
}
