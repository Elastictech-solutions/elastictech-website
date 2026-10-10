import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHomeContent } from '@/lib/content'

export const metadata: Metadata = { alternates: { canonical: '/products' }, title: 'Products', description: 'Technology products and solutions selected by ElasticTech Solutions.' }
export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const { settings, products } = await getHomeContent()
  return <main className="listing-page"><section className="listing-hero"><div className="container"><p className="eyebrow">Products & solutions</p><h1>{settings.productsPageHeading || 'Tools for a smarter setup.'}</h1><p>{settings.productsPageIntro || 'Useful technology selected with your goals, infrastructure and team in mind.'}</p></div></section><section className="container listing-content">
    {products.length ? <div className="listing-grid">{products.map((product: any) => <article className="listing-card product-listing-card" key={product.id}><Link href={`/products/${product.slug}`} className="listing-image" aria-label={`View ${product.title}`}>{product.image?.url ? <Image src={product.image.url} alt={product.image.alt || product.title} fill sizes="(max-width: 700px) 100vw, 50vw" /> : <div className="listing-placeholder"><span>ET<span>+</span></span></div>}</Link><div className="listing-card-copy"><span>Product / solution</span><h2><Link href={`/products/${product.slug}`}>{product.title}</Link></h2><p>{product.summary}</p>{product.externalUrl ? <a href={product.externalUrl} target="_blank" rel="noreferrer">Learn more ↗</a> : <Link href={`/products/${product.slug}`}>View details ↗</Link>}</div></article>)}</div> : <div className="empty-showcase product-empty"><div className="empty-icon">✳</div><p className="eyebrow eyebrow-dark">Solutions that fit</p><h2>Tell us what you need to do.</h2><p>We’ll help you explore practical products and solutions for your infrastructure, security and business systems.</p><Link className="text-link" href="/#contact">Talk to a specialist <span>↗</span></Link></div>}
  </section></main>
}
