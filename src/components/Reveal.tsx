'use client'

import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -34px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`${className} reveal${visible ? ' is-visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}
