import Image from 'next/image'
import Link from 'next/link'
import { getHomeContent } from '@/lib/content'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

const serviceFallback: [string, string][] = [
  ['Infrastructure', 'Servers, LAN / WAN connectivity, network monitoring and reliable day-to-day support.'],
  ['Cloud management', 'Practical cloud management that keeps your systems available, organized and ready to scale.'],
  ['Information security', 'Clear security guidance and safeguards that help protect systems, data and users.'],
  ['Business analytics', 'Turn business data into useful reporting and better-informed decisions.'],
  ['Database development', 'Well-structured databases designed around the way your organization works.'],
  ['SEO & AI', 'Improve discoverability and explore useful AI capabilities for your digital operations.'],
  ['Backup & recovery', 'Build dependable backup routines and recovery plans for critical business data.'],
  ['IT consulting', 'Experienced technical guidance for planning, improving and maintaining your IT environment.'],
]

const valueCards = [
  { number: '01', title: 'Built around your work', copy: 'Technology choices start with your goals, your team and the way your business operates.' },
  { number: '02', title: 'Support that stays close', copy: 'Practical help for the systems your people rely on every day.' },
  { number: '03', title: 'Ready for what comes next', copy: 'Thoughtful infrastructure and security decisions that can grow with you.' },
]
const trustFallback = ['Infrastructure', 'Cloud', 'Security', 'Business systems']

export default async function HomePage() {
  const { settings, services, projects, products, testimonials, pages } = await getHomeContent()
  const homePage = pages.find((page: any) => page.slug === 'home') || {}
  const activeServices: [string, string][] = services.length ? services.map((item: any) => [item.title, item.summary] as [string, string]) : serviceFallback
  const activeApproachCards: { number: string; title: string; copy: string }[] = settings.approachCards?.length
    ? settings.approachCards.map((card: any, index: number) => ({ number: String(index + 1).padStart(2, '0'), title: card.title, copy: card.description }))
    : valueCards
  const featured = projects.find((project: any) => project.featured) ?? projects[0]
  const email = settings.email || ''

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow"><span className="status-dot" /> {homePage.eyebrow || settings.heroEyebrow || 'ICT that works as hard as you do'}</p>
            <h1>{homePage.headline || settings.heroHeadline || 'Technology that moves your business forward.'}</h1>
            <p className="hero-description">{homePage.description || settings.heroDescription || 'From reliable infrastructure to smarter business systems, we help your team work securely and grow with confidence.'}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
              <a className="button button-quiet" href="#projects">Explore our work <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-proof"><span className="proof-line" /><span>Infrastructure · Security · Support</span></div>
          </div>
          <div className="hero-visual" aria-label="ElasticTech Solutions cloud technology illustration">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <div className="visual-card">
              <div className="terminal-bar"><span /><span /><span /><small>elastictech / systems</small></div>
              <div className="terminal-body">
                <p><b>01</b> <span className="term-blue">const</span> business = <span className="term-green">"connected"</span>;</p>
                <p><b>02</b> <span className="term-blue">await</span> systems.<span className="term-lilac">secure</span>();</p>
                <p><b>03</b> networks.<span className="term-lilac">monitor</span>();</p>
                <p><b>04</b> <span className="term-blue">return</span> <span className="term-green">growth</span>;</p>
                <div className="terminal-cursor" />
              </div>
              <div className="terminal-foot"><span className="live-indicator" /> Systems thinking, made practical</div>
            </div>
            <div className="float-chip chip-cloud"><span>☁</span> Cloud ready</div>
            <div className="float-chip chip-shield"><span>✳</span> Security first</div>
            <div className="visual-caption"><span>ICT infrastructure</span><span>01 — 03</span></div>
          </div>
        </div>
        <a href="#approach" className="scroll-cue" aria-label="Scroll to discover"><span /> Scroll to discover</a>
      </section>

      <section className="trust-strip" aria-label="Our capabilities">
        <div className="container trust-inner"><span>{settings.trustLabel || 'Technology for the whole picture'}</span><div className="trust-items">{(settings.trustItems?.length ? settings.trustItems.map((item: any) => item.label) : trustFallback).map((label: string, index: number) => <span key={label}>{index > 0 && <i>✳</i>}{label}</span>)}</div></div>
      </section>

      <section className="approach section-pad" id="approach">
        <div className="container approach-layout">
          <Reveal className="approach-intro">
            <p className="eyebrow eyebrow-dark">A better way to work with technology</p>
            <h2>{settings.approachHeading || 'Reliable systems. Room to grow.'}</h2>
            <p>{settings.approachDescription || 'Good technology should make work feel simpler. ElasticTech Solutions brings infrastructure, security and business systems together so your team can focus on what matters.'}</p>
            <a href="#services" className="text-link">See how we can help <span>↗</span></a>
          </Reveal>
          <div className="approach-cards">
            {activeApproachCards.map((card, index) => <Reveal key={card.number} className="approach-card" delay={index * 100}>
              <span className="card-number">{card.number}</span><div><h3>{card.title}</h3><p>{card.copy}</p></div><span className="card-arrow">↗</span>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="morph-section" aria-label="ElasticTech technology that adapts as you grow">
        <div className="morph-sticky container">
          <div className="morph-heading"><p className="eyebrow">Designed to adapt</p><h2>Technology should<br /><em>move with you.</em></h2><p>Every connection supports something bigger. As your work changes, your systems can keep pace.</p><a className="text-link" href="#services">Find your starting point <span>↗</span></a></div>
          <div className="morph-stage" aria-hidden="true"><div className="morph-grid" /><div className="morph-ring ring-one" /><div className="morph-ring ring-two" /><div className="morph-shape"><div className="morph-logo-wrap"><Image src="/elastictech-icon.png" alt="" width={168} height={168} /></div><span className="morph-caption">CONNECTED BY DESIGN</span><span className="morph-label morph-label-one">NETWORKS</span><span className="morph-label morph-label-two">SECURITY</span><span className="morph-label morph-label-three">CLOUD</span><span className="morph-label morph-label-four">INSIGHT</span></div><div className="morph-scroll-indicator"><span /> SCROLL TO TRANSFORM</div></div>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="container">
          <Reveal className="section-heading">
            <div><p className="eyebrow">What we do</p><h2>{settings.servicesHeading || 'One partner. Many possibilities.'}</h2></div>
            <p>{settings.servicesIntro || 'From a dependable network to better business insight, get the expertise you need to build a stronger technology foundation.'}</p>
          </Reveal>
          <div className="services-grid">
            {activeServices.map(([title, summary]: [string, string], index: number) => <Reveal className="service-card" delay={(index % 4) * 70} key={title}>
              <div className="service-icon">{['⌘', '◌', '⌬', '▥', '⌗', '✳', '↻', '↗'][index % 8]}</div>
              <span className="service-index">0{index + 1}</span><h3>{title}</h3><p>{summary}</p><a href="#contact" aria-label={`Ask about ${title}`}>↗</a>
            </Reveal>)}
          </div>
          {products.length > 0 && <div className="product-teaser"><div><p className="eyebrow">Products</p><h3>Tools for a smarter setup.</h3></div><Link href="/products" className="text-link">Explore products <span>↗</span></Link></div>}
        </div>
      </section>

      <section className="project-section section-pad" id="projects">
        <div className="container project-wrap">
          <Reveal className="project-heading"><div><p className="eyebrow eyebrow-dark">Selected work</p><h2>{settings.projectsHeading || 'Good work speaks for itself.'}</h2></div><p>{settings.projectsIntro || 'Practical technology, thoughtfully delivered. Here’s a closer look at the work behind more connected operations.'}</p></Reveal>
          <Reveal className="featured-project" delay={120}>
            <div className="project-art">
              <div className="project-art-grid" />
              <div className="network-map" aria-hidden="true"><div className="map-line map-line-a" /><div className="map-line map-line-b" /><div className="map-line map-line-c" /><div className="map-node node-a">01<span>CORE</span></div><div className="map-node node-b">02<span>LAN</span></div><div className="map-node node-c">03<span>WAN</span></div><div className="map-node node-d">04<span>CLOUD</span></div><div className="map-node node-e">05<span>DATA</span></div><div className="map-pulse" /></div>
              <div className="art-label"><span className="live-indicator" /> Connected infrastructure</div>
              {featured?.coverImage?.url && <Image className="project-cover" src={featured.coverImage.url} alt={featured.coverImage.alt || featured.title} fill sizes="(max-width: 800px) 100vw, 55vw" />}
            </div>
            <div className="project-copy"><div className="project-meta"><span>{featured?.category || 'Infrastructure & networks'}</span><span>Featured project <b>↗</b></span></div>
              <h3>{featured?.title || 'Keeping multiple projects connected'}</h3>
              <p>{featured?.summary || settings.featuredProjectIntro || 'ElasticTech manages server deployments and maintenance, LAN / WAN connectivity, and network monitoring across several projects—helping keep essential systems connected and supported.'}</p>
              <div className="project-tags"><span>Servers</span><span>LAN / WAN</span><span>Monitoring</span></div>
              {featured ? <Link className="text-link" href={`/projects/${featured.slug}`}>View project <span>↗</span></Link> : <a className="text-link" href="#contact">Talk about a similar project <span>↗</span></a>}
            </div>
          </Reveal>
          <div className="project-bottom"><span>Designed around real operational needs</span><Link href="/projects">View all projects <span>↗</span></Link></div>
        </div>
      </section>

      {testimonials.length > 0 && <section className="testimonials-section section-pad"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">Client perspective</p><h2>Built on trust.<br /><em>Proven in practice.</em></h2></div><p>Thoughtful technology is a team effort. Here’s what clients have shared about working with us.</p></Reveal><div className="testimonial-grid">{testimonials.slice(0, 3).map((item: any) => <Reveal className="testimonial-card" key={item.id}><span className="quote-mark">“</span><blockquote>{item.quote}</blockquote><div className="testimonial-person"><strong>{item.person}</strong><span>{[item.role, item.organization].filter(Boolean).join(' · ')}</span></div></Reveal>)}</div></div></section>}

      <section className="products-section section-pad" id="products">
        <div className="container product-layout">
          <Reveal className="product-intro"><p className="eyebrow">Products</p><h2>{settings.productsHeading || 'Useful tools. Thoughtful choices.'}</h2><p>{settings.productsIntro || 'Explore solutions selected to make technology simpler, more secure and easier to manage.'}</p></Reveal>
          <Reveal className="product-card" delay={100}>
            <span className="product-card-kicker">PRODUCTS & SOLUTIONS</span><div className="product-mark">E<span>+</span></div>
            <h3>{products.length ? products[0].title : 'The right solution for your setup'}</h3><p>{products.length ? products[0].summary : 'Tell us what you need to achieve. We’ll help you find a practical product or solution for the way you work.'}</p>
            <Link href="/products" className="product-link">{products.length ? 'See all products' : 'Talk to a specialist'} <span>↗</span></Link>
            <div className="product-lines" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          </Reveal>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="container contact-layout">
          <Reveal className="contact-copy"><p className="eyebrow">Start a conversation</p><h2>{settings.contactHeading || 'Let’s make your next move clear.'}</h2><p>{settings.contactIntro || 'Tell us what your team needs. We’ll help you find the right next step.'}</p>{email && <a href={`mailto:${email}`} className="contact-email">{email} <span>↗</span></a>}{settings.phone && <a href={`tel:${settings.phone}`} className="contact-email">{settings.phone} <span>↗</span></a>}{settings.whatsapp && <a href={`https://wa.me/${String(settings.whatsapp).replace(/\D/g, '')}`} className="contact-email">WhatsApp <span>↗</span></a>}<div className="contact-location"><span className="location-pin">⌖</span>{settings.location || 'Support for connected teams'}</div></Reveal>
          <Reveal className="contact-form-wrap" delay={100}><ContactForm /></Reveal>
        </div>
      </section>

      <section className="last-word"><div className="container last-word-inner"><Image src="/elastictech-logo.png" alt="ElasticTech Solutions" width={280} height={81} /><p>{settings.tagline || 'Technology that keeps you moving.'}</p><a href="#top" aria-label="Back to top">↑</a></div></section>
    </main>
  )
}
