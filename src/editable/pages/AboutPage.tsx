import Link from 'next/link'
import { ArrowRight, Compass, Heart, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const valueIcons = [Compass, Users, ShieldCheck]

export default function AboutPage() {
  const { about } = pagesContent
  // Public exploration centers on collections/resources — never profiles.
  const exploreLinks = [
    ...SITE_CONFIG.tasks
      .filter((task) => task.enabled && task.key !== 'profile')
      .map((task) => ({ key: task.key, label: task.label, description: task.description, href: task.route })),
    { key: 'search', label: 'Search', description: 'Find collections, resources, and topics across the platform.', href: '/search' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_15%_0%,rgba(11,171,91,0.22),transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-[var(--editable-container)] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
            <span data-reveal className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">
              <Sparkles className="h-3.5 w-3.5" /> {about.badge}
            </span>
            <h1 data-reveal data-reveal-delay="80" className="editable-display mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
              About {SITE_CONFIG.name}
            </h1>
            <p data-reveal data-reveal-delay="160" className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{about.description}</p>
          </div>
        </section>

        {/* Story + mission */}
        <section className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-current" /> Our mission
              </span>
              <h2 className="editable-display mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">{about.title}</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-[var(--slot4-muted-text)]">
                {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110">
                  Browse collections <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3.5 text-sm font-semibold transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                  Get in touch
                </Link>
              </div>
            </div>

            <div data-reveal data-reveal-delay="120" className="grid gap-4">
              {about.values.map((value, i) => {
                const Icon = valueIcons[i % valueIcons.length]
                return (
                  <div key={value.title} className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_1px_2px_rgba(13,19,16,0.04)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(13,19,16,0.30)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="editable-display mt-5 text-xl font-bold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-2.5 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Highlights band */}
        <section className="bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div data-reveal className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { icon: Heart, value: 'Hand-picked', label: 'Every pick, curated' },
                { icon: Users, value: 'Community', label: 'Real curators' },
                { icon: Compass, value: 'Connected', label: 'Picks meet people' },
                { icon: ShieldCheck, value: 'Trusted', label: 'Quality over noise' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-surface-bg)] text-[var(--slot4-accent)] shadow-[0_1px_2px_rgba(13,19,16,0.05)]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="editable-display mt-4 text-lg font-bold tracking-[-0.01em]">{item.value}</p>
                  <p className="mt-1 text-sm text-[var(--slot4-muted-text)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore CTA */}
        <section className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div data-reveal className="grid gap-5 sm:grid-cols-2">
            {exploreLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="group flex items-center justify-between gap-4 rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-500 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/50 hover:shadow-[0_24px_50px_-26px_rgba(13,19,16,0.30)]"
              >
                <div>
                  <h3 className="editable-display text-xl font-bold tracking-[-0.01em]">{link.label}</h3>
                  <p className="mt-1.5 text-sm text-[var(--slot4-muted-text)]">{link.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[var(--slot4-accent)] transition duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
