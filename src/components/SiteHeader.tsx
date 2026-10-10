'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  ['Services', '/#services'],
  ['Projects', '/#projects'],
  ['Products', '/#products'],
]

export function SiteHeader({ companyName = 'ElasticTech Solutions' }: { companyName?: string }) {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <div className="container header-inner">
      <Link className="brand" href="/" aria-label={`${companyName} home`}><Image src="/elastictech-logo.png" alt={companyName} width={206} height={60} priority /></Link>
      <nav className={`main-nav${open ? ' nav-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-mobile-cta" href="/#contact" onClick={() => setOpen(false)}>Let’s talk <span>↗</span></a>
      </nav>
      <a className="header-cta" href="/#contact">Let’s talk <span>↗</span></a>
      <button className={`menu-toggle${open ? ' menu-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><span /><span /></button>
    </div>
  </header>
}
