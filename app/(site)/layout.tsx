import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { jsonLd, siteOrigin, safeExternalUrl } from '@/lib/seo'
import '../styles/site.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: { default: 'ElasticTech Solutions | ICT Infrastructure & Digital Services', template: '%s | ElasticTech Solutions' },
  description: 'Dependable ICT infrastructure, cloud, network, security and business technology services from ElasticTech Solutions.',
  icons: { icon: '/favicon.png' },
  metadataBase: new URL(siteOrigin()),
  openGraph: { type: 'website', siteName: 'ElasticTech Solutions', images: ['/elastictech-logo.png'] },
  twitter: { card: 'summary_large_image', images: ['/elastictech-logo.png'] },
}

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings()
  const companyName = settings.companyName || 'ElasticTech Solutions'
  const nonce = (await headers()).get('x-nonce') || undefined
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${siteOrigin()}/#organization`, name: companyName, url: siteOrigin(), logo: `${siteOrigin()}/elastictech-logo.png`, sameAs: [settings.linkedinUrl, settings.facebookUrl].map(safeExternalUrl).filter(Boolean) },
    { '@type': 'WebSite', '@id': `${siteOrigin()}/#website`, url: siteOrigin(), name: companyName, publisher: { '@id': `${siteOrigin()}/#organization` } },
  ] }
  return <><script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} /><SiteHeader companyName={companyName} />{children}<SiteFooter companyName={companyName} tagline={settings.tagline || 'Technology that keeps you moving.'} /></>
}
