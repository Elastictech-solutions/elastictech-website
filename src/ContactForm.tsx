'use client'

import { FormEvent, useState } from 'react'

export function ContactForm() {
  const [state, setState] = useState<'ready' | 'sending' | 'sent' | 'error'>('ready')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/public-inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!response.ok) throw new Error('Could not send')
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><span>Send us a message</span><small>We’ll get back to you as soon as we can.</small></div>
    <label>Your name<input name="name" autoComplete="name" required maxLength={120} placeholder="How should we address you?" /></label>
    <div className="form-row"><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@company.com" /></label><label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+254 …" /></label></div>
    <label>What can we help with?<input name="subject" required maxLength={160} placeholder="A few words about your project" /></label>
    <label>Your message<textarea name="message" required rows={4} maxLength={4000} placeholder="Tell us a little about what you need…" /></label>
    <label className="website-field" aria-hidden="true">Website<input tabIndex={-1} name="website" autoComplete="off" /></label>
    <button className="button button-primary form-submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send your message'} <span>↗</span></button>
    {state === 'sent' && <p className="form-status form-success" role="status">Thanks for reaching out. Your message is with our team.</p>}
    {state === 'error' && <p className="form-status form-error" role="alert">We couldn’t send that just now. Please try again in a little while.</p>}
  </form>
}
