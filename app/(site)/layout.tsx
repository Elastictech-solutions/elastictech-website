import type { Metadata } from 'next'
import '../styles/site.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: { default: 'ElasticTech Solutions | ICT Infrastructure & Digital Services', template: '%s | ElasticTech Solutions' },
  description: 'Dependable ICT infrastructure, cloud, network, security and business technology services from ElasticTech Solutions.',
  icons: { icon: '/favicon.png' },
}

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings()
  const companyName = settings.companyName || 'ElasticTech Solutions'
  return <><SiteHeader companyName={companyName} />{children}<SiteFooter companyName={companyName} tagline={settings.tagline || 'Technology that keeps you moving.'} /></>
}
