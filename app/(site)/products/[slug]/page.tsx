import type { Metadata } from 'next'
import { safeExternalUrl } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getProduct(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ overrideAccess: false, collection: 'products', where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] }, depth: 1, limit: 1 })
    return result.docs[0] as any
  } catch { return null }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  return product ? { alternates: { canonical: `/products/${encodeURIComponent(slug)}` }, title: product.title, description: product.summary } : { title: 'Product' }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  const externalUrl = safeExternalUrl(product.externalUrl)
  return <main className="detail-page"><section className="detail-hero"><div className="container"><Link href="/products" className="back-link">← All products</Link><p className="eyebrow">Products & solutions</p><h1>{product.title}</h1><p>{product.summary}</p></div></section><section className="container detail-content">{product.image?.url && <div className="detail-cover"><Image src={product.image.url} alt={product.image.alt || product.title} fill priority sizes="100vw" /></div>}<div className="detail-columns"><div><p className="eyebrow eyebrow-dark">About this solution</p>{product.description ? <div className="richtext-body"><RichText data={product.description} /></div> : <p>{product.summary}</p>}</div><div><p>Want to know if this fits your setup? Talk with our team about your requirements.</p>{externalUrl && <p><a className="text-link" href={externalUrl} target="_blank" rel="noreferrer">Visit product site <span>↗</span></a></p>}<Link className="text-link" href="/#contact">Ask us about this solution <span>↗</span></Link></div></div></section></main>
}
