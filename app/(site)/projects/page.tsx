import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHomeContent } from '@/lib/content'

export const metadata: Metadata = { title: 'Projects', description: 'Selected ICT infrastructure, security, network and digital solutions work by ElasticTech Solutions.' }
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const { settings, projects } = await getHomeContent()
  return <main className="listing-page"><section className="listing-hero"><div className="container"><p className="eyebrow">Our work</p><h1>{settings.projectsPageHeading || 'Projects built around real needs.'}</h1><p>{settings.projectsPageIntro || 'Explore selected work across infrastructure, business systems and technology support.'}</p></div></section>
    <section className="container listing-content"><div className="listing-top"><span>{projects.length ? `${projects.length} project${projects.length === 1 ? '' : 's'}` : 'Project showcase'}</span><Link href="/#contact">Have a project in mind? ↗</Link></div>
      {projects.length ? <div className="listing-grid">{projects.map((project: any) => <Link className="listing-card" key={project.id} href={`/projects/${project.slug}`}><div className="listing-image">{project.coverImage?.url ? <Image src={project.coverImage.url} alt={project.coverImage.alt || project.title} fill sizes="(max-width: 700px) 100vw, 50vw" /> : <div className="listing-placeholder"><span>ET</span></div>}</div><div className="listing-card-copy"><span>{project.category || 'Technology project'}</span><h2>{project.title}</h2><p>{project.summary}</p><b>View project ↗</b></div></Link>)}</div> : <div className="empty-showcase"><div className="empty-icon">✳</div><p className="eyebrow eyebrow-dark">Featured capability</p><h2>Keeping multiple projects connected.</h2><p>ElasticTech manages server deployments and maintenance, LAN / WAN connectivity, and network monitoring across several projects.</p><p className="empty-note">Our team can add project case studies here as they’re ready to share.</p><Link className="text-link" href="/#contact">Discuss your infrastructure needs <span>↗</span></Link></div>}
    </section></main>
}
