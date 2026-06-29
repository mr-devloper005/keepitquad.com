import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const perks = ['Curate and publish your own collections', 'Build a profile the community can follow', 'Save resources and pick up anywhere']

export default function SignupPage() {
  const { signup } = pagesContent.auth
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[var(--editable-container)] items-center gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Form */}
          <div data-reveal className="order-2 mx-auto w-full max-w-md lg:order-1">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
              <ArrowLeft className="h-4 w-4" /> Back to {SITE_CONFIG.name}
            </Link>
            <div className="mt-6 rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_24px_60px_-30px_rgba(13,19,16,0.3)] sm:p-9">
              <h2 className="editable-display text-2xl font-bold tracking-[-0.01em]">{signup.formTitle}</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Free to join — start curating in minutes.</p>
              <EditableLocalSignupForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{signup.loginCta}</Link>
              </p>
            </div>
          </div>

          {/* Brand panel */}
          <div data-reveal data-reveal-delay="120" className="relative order-1 hidden overflow-hidden rounded-[2rem] bg-[var(--slot4-dark-bg)] p-10 text-[var(--slot4-dark-text)] lg:order-2 lg:flex lg:min-h-[560px] lg:flex-col lg:justify-between">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_80%_0%,rgba(11,171,91,0.26),transparent_55%)]" />
            <div className="relative">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">{signup.badge}</span>
              <h1 className="editable-display mt-5 max-w-md text-4xl font-extrabold leading-[1.05] tracking-[-0.02em]">{signup.title}</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-white/75">{signup.description}</p>
            </div>
            <ul className="relative mt-10 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]"><Check className="h-3.5 w-3.5" /></span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
