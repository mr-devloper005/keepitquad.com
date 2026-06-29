'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  // Profile/members stays out of the public footer links (reachable by URL).
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const contact = globalContent.footer?.contact
  const socials = globalContent.footer?.socials || []

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* CTA band */}
      <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8">
        <div className="relative -mb-px overflow-hidden rounded-t-[2rem] border border-b-0 border-[var(--slot4-dark-border)] bg-[var(--slot4-dark-panel)] px-7 py-12 sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--slot4-accent-fill)] opacity-20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent-bright)]">{globalContent.footer?.ctaEyebrow}</p>
              <h2 className="editable-display mt-3 max-w-xl text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{globalContent.footer?.ctaTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={session ? '/create' : '/signup'} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110">
                {session ? 'Share a pick' : 'Join free'} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] px-6 py-3 text-sm font-semibold text-[var(--editable-footer-text)] transition duration-300 hover:border-[var(--slot4-accent-bright)] hover:text-[var(--slot4-accent-bright)]">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--slot4-dark-border)]">
        <div className="mx-auto grid w-full max-w-[var(--editable-container)] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
              </span>
              <span className="editable-display text-lg font-extrabold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--slot4-dark-muted)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            {socials.length ? (
              <div className="mt-6 flex gap-2.5">
                
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent-bright)]">Explore</h3>
            <div className="mt-5 grid gap-3">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-dark-muted)] transition hover:text-[var(--editable-footer-text)]">
                  {task.label}
                </Link>
              ))}
              <Link href="/search" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-dark-muted)] transition hover:text-[var(--editable-footer-text)]">Search</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent-bright)]">Company</h3>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ...(session ? [['Create', '/create']] : [['Sign in', '/login'], ['Sign up', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-dark-muted)] transition hover:text-[var(--editable-footer-text)]">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-dark-muted)] transition hover:text-[var(--editable-footer-text)]">Logout</button> : null}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent-bright)]">Get in touch</h3>
            <div className="mt-5 grid gap-3 text-sm text-[var(--slot4-dark-muted)]">
            
              {contact?.location ? (
                <span className="inline-flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[var(--slot4-accent-bright)]" /> {contact.location}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--slot4-dark-border)]">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-[var(--slot4-dark-muted)] sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {SITE_CONFIG.name}. {globalContent.footer?.bottomNote}</span>
          <span>{SITE_CONFIG.domain}</span>
        </div>
      </div>
    </footer>
  )
}
