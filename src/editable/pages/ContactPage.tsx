'use client'

import Link from 'next/link'
import { Building2, FileText, Image as ImageIcon, Mail, MapPin, MessageSquare, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: MessageSquare, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

const faqs = [
  { q: 'How fast will I hear back?', a: 'Most messages get a reply within one to two business days. Time-sensitive partnership requests are prioritized.' },
  { q: 'Can I suggest a collection or resource?', a: 'Absolutely — that is what we are here for. Use the form and tell us what you would like to see added.' },
  { q: 'Do you offer partnerships?', a: 'Yes. Share a little context about your goals and we will route you to the right person.' },
]

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-current" /> {pagesContent.contact.eyebrow}
              </span>
              <h1 className="editable-display mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>

              

              <div className="mt-8 grid gap-3">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
                    <div className="flex items-center gap-3">
                      <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                      <h2 className="editable-display text-base font-bold">{lane.title}</h2>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-reveal-delay="120" className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_24px_60px_-30px_rgba(13,19,16,0.3)] sm:p-9">
              <h2 className="editable-display text-2xl font-bold tracking-[-0.01em]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">We read every message — tell us what you need and we will point it the right way.</p>
              <EditableContactLeadForm />
            </div>
          </div>

          {/* FAQ */}
          <div data-reveal className="mt-16 border-t border-[var(--editable-border)] pt-12">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Frequently asked</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
                  <h3 className="text-base font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-[var(--slot4-muted-text)]">
              Prefer to explore first? <Link href="/sbm" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">Browse {SITE_CONFIG.name}</Link>.
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
