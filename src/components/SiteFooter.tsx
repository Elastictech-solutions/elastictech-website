import Image from 'next/image'
import Link from 'next/link'

export function SiteFooter({ companyName = 'ElasticTech Solutions', tagline = 'Technology that keeps you moving.' }: { companyName?: string; tagline?: string }) {
  return <footer className="site-footer"><div className="container footer-top">
    <div className="footer-brand"><Image src="/elastictech-logo.png" alt={companyName} width={210} height={61} /><p>{tagline}</p></div>
    <div className="footer-column"><span>Explore</span><Link href="/#services">Services</Link><Link href="/projects">Projects</Link><Link href="/products">Products</Link></div>
    <div className="footer-column"><span>Get in touch</span><Link href="/#contact">Tell us what you need ↗</Link><Link href="/admin">Team login ↗</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {companyName}</span><span>Thoughtful technology. Reliable support.</span><Link href="/#top">Back to top ↑</Link></div></footer>
}
