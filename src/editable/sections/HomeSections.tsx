import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, BookmarkCheck, Compass,
  Layers, Minus, Plus, Quote, Share2, Sparkles, Star, TrendingUp, Users,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const categoryIcons = [Layers, Compass, TrendingUp, Bookmark, Sparkles, Users]

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] ${dark ? 'text-[var(--slot4-accent-bright)]' : 'text-[var(--slot4-accent)]'}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

function SectionHead({ eyebrow, title, sub, href, linkLabel = 'See all', dark = false, center = false }: { eyebrow: string; title: string; sub?: string; href?: string; linkLabel?: string; dark?: boolean; center?: boolean }) {
  return (
    <div data-reveal className={`flex flex-col gap-4 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-xl'}>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className={`editable-display mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-[var(--slot4-dark-text)]' : ''}`}>{title}</h2>
        {sub ? <p className={`mt-3 ${dark ? 'text-white/70' : 'text-[var(--slot4-muted-text)]'}`}>{sub}</p> : null}
      </div>
      {href ? (
        <Link href={href} className={`inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5 ${dark ? 'text-[var(--slot4-accent-bright)]' : 'text-[var(--slot4-accent)]'}`}>
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  )
}

/* ------------------------------- Hero -------------------------------- */
export function EditableHomeHero({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const titleLines = pagesContent.home.hero.title?.length ? pagesContent.home.hero.title : [`Discover the best of ${SITE_CONFIG.name}`]
  const chips = CATEGORY_OPTIONS.slice(0, 6)
  const topics = CATEGORY_OPTIONS.slice(0, 7)

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.16]"><EditableHeroCollage images={heroImages} /></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,12,0.84),rgba(10,15,12,0.97))]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(11,171,91,0.28),transparent_60%)]" />
      </div>

      <div className={`relative ${container} py-24 sm:py-32 lg:py-40`}>
        <div className="mx-auto max-w-4xl text-center">
          <span data-reveal className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> {pagesContent.home.hero.badge}
          </span>
          <h1 data-reveal data-reveal-delay="80" className="editable-display mt-7 text-balance text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[5rem]">
            {titleLines.map((line, i) => (
              <span key={line} className={i === titleLines.length - 1 ? 'block text-[var(--slot4-accent-bright)]' : 'block'}>{line}</span>
            ))}
          </h1>
          <p data-reveal data-reveal-delay="160" className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {pagesContent.home.hero.description}
          </p>
          <div data-reveal data-reveal-delay="220" className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-8 py-4 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110 hover:shadow-[0_18px_40px_-14px_var(--slot4-accent-fill)]">
              {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-[var(--slot4-accent-bright)] hover:text-[var(--slot4-accent-bright)]">
              {pagesContent.home.hero.secondaryCta.label}
            </Link>
          </div>
          <div data-reveal data-reveal-delay="300" className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            {chips.map((category) => (
              <Link
                key={category.slug}
                href={`${primaryRoute}?category=${category.slug}`}
                className="rounded-full border border-[var(--slot4-dark-border)] bg-white/5 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm transition duration-300 hover:border-[var(--slot4-accent-bright)] hover:text-[var(--slot4-accent-bright)]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-t border-[var(--slot4-dark-border)] bg-black/20">
        <div className={`flex flex-col items-center gap-5 py-8 ${container}`}>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">Covering the topics that matter</p>
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
            {topics.map((topic) => (
              <span key={topic.slug} className="editable-display text-base font-bold tracking-[-0.01em] text-white/55 transition hover:text-white/80">{topic.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Featured collections (showcase) ------------------ */
function FeatureCard({ post, href, large = false }: { post: SitePost; href: string; large?: boolean }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link
      href={href}
      data-reveal
      className={`group relative flex flex-col justify-end overflow-hidden rounded-[var(--editable-radius)] bg-[var(--slot4-dark-bg)] p-7 text-[var(--slot4-dark-text)] ${large ? 'min-h-[440px] lg:min-h-[560px] sm:p-9' : 'min-h-[260px]'}`}
    >
      <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-70" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,12,0.1),rgba(10,15,12,0.92))]" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-on-accent)]">
          <BookmarkCheck className="h-3 w-3" /> {category || 'Featured'}
        </span>
        <h3 className={`editable-display mt-4 font-bold leading-[1.08] tracking-[-0.02em] ${large ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{post.title}</h3>
        {large ? <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{getExcerpt(post, 180)}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent-bright)]">
          Open pick <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const all = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!all.length) return null
  const [featured, ...rest] = all
  const side = rest.slice(0, 2)

  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`py-16 sm:py-20 lg:py-28 ${container}`}>
        <SectionHead
          eyebrow="Featured collections"
          title="The picks worth your attention"
          sub={`Standout collections and resources, freshly surfaced from across ${SITE_CONFIG.name}.`}
          href={primaryRoute}
          linkLabel="See all collections"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <FeatureCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} large />
          <div className="grid gap-6">
            {side.map((post) => (
              <FeatureCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------- Browse by category -------------------------- */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = CATEGORY_OPTIONS.slice(0, 8)
  if (!categories.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 lg:py-28 ${container}`}>
        <SectionHead
          eyebrow="Start here"
          title="Browse by category"
          sub="Jump straight to the collections and resources that match what you came for."
          href={primaryRoute}
          linkLabel="See all collections"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, i) => {
            const Icon = categoryIcons[i % categoryIcons.length]
            return (
              <Link
                key={category.slug}
                href={`${primaryRoute}?category=${category.slug}`}
                data-reveal
                data-reveal-delay={(i % 4) * 70}
                className="group relative flex items-center gap-4 overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/50 hover:shadow-[0_28px_60px_-24px_rgba(13,19,16,0.35)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition duration-500 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="editable-display truncate text-base font-bold tracking-[-0.01em]">{category.name}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--slot4-accent)]">
                    Explore <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Why us / stats --------------------------- */
export function EditableHomeStats({ count, primaryRoute }: { count?: number; primaryRoute: string }) {
  const stats = [
    { value: count && count > 0 ? `${count}+` : '500+', label: 'Curated picks' },
    { value: `${CATEGORY_OPTIONS.length}`, label: 'Categories' },
    { value: 'Daily', label: 'Fresh drops' },
    { value: '100%', label: 'Quality-first' },
  ]
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`py-16 sm:py-20 lg:py-24 ${container}`}>
        <div className="grid items-center gap-10 rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_24px_60px_-36px_rgba(13,19,16,0.3)] sm:p-12 lg:grid-cols-[1fr_1.3fr]">
          <div data-reveal>
            <Eyebrow>Why {SITE_CONFIG.name}</Eyebrow>
            <h2 className="editable-display mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">A sharper way to find what is worth keeping.</h2>
            <p className="mt-4 text-[var(--slot4-muted-text)]">No endless feeds or noise — just hand-checked collections and resources, organized so you find the good stuff fast.</p>
            <Link href={primaryRoute} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110">
              Start exploring <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal data-reveal-delay="120" className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--editable-border)] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--slot4-surface-bg)] p-6 text-center">
                <p className="editable-display text-4xl font-extrabold tracking-[-0.03em] text-[var(--slot4-accent)]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-[var(--slot4-muted-text)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ How it works ---------------------------- */
const steps = [
  { icon: Compass, title: 'Discover', text: 'Browse hand-picked collections across every topic that matters to you.' },
  { icon: Bookmark, title: 'Save', text: 'Keep the resources you love and build collections worth coming back to.' },
  { icon: Share2, title: 'Share', text: 'Publish your picks and help the community find the good stuff faster.' },
]

export function EditableHowItWorks() {
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 lg:py-28 ${container}`}>
        <SectionHead eyebrow="How it works" title="Three steps to better discovery" center />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              data-reveal
              data-reveal-delay={i * 90}
              className="group relative overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-26px_rgba(13,19,16,0.32)]"
            >
              <span className="editable-display absolute right-6 top-4 text-6xl font-extrabold leading-none text-[var(--slot4-accent-soft)]">{String(i + 1).padStart(2, '0')}</span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="editable-display relative mt-6 text-xl font-bold tracking-[-0.01em]">{step.title}</h3>
              <p className="relative mt-2.5 text-sm leading-7 text-[var(--slot4-muted-text)]">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */
function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      data-reveal
      data-reveal-delay={(index % 4) * 70}
      className="group flex flex-col overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(13,19,16,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[var(--slot4-page-text)] shadow-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="editable-display line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, idx) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={idx % 2 === 0 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-[var(--slot4-page-bg)]'}>
            <div className={`py-16 sm:py-20 ${container}`}>
              <SectionHead eyebrow={copy.eyebrow} title={copy.title} href={section.href || primaryRoute} />
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, i) => (
                  <CompactCard key={post.id || post.slug} post={post} index={i} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ------------------------------ Testimonials ---------------------------- */
const testimonials = [
  { quote: 'It is the first place I check when I need a genuinely good resource. No noise, just the good stuff.', name: 'Aria L.', role: 'Product designer' },
  { quote: 'The collections save me hours every week. Everything feels hand-picked and actually worth opening.', name: 'Daniel R.', role: 'Founder' },
  { quote: 'Finally a place that treats curation seriously. Clean, fast, and I always leave with something useful.', name: 'Priya S.', role: 'Marketer' },
]

export function EditableTestimonials() {
  return (
    <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,rgba(11,171,91,0.18),transparent_55%)]" />
      <div className={`relative py-16 sm:py-20 lg:py-28 ${container}`}>
        <SectionHead eyebrow="Loved by curators" title="What the community says" dark center />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              data-reveal
              data-reveal-delay={i * 90}
              className="flex flex-col rounded-[var(--editable-radius)] border border-[var(--slot4-dark-border)] bg-white/5 p-7 backdrop-blur"
            >
              <Quote className="h-7 w-7 text-[var(--slot4-accent-bright)]" />
              <div className="mt-4 flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4 fill-[var(--slot4-accent-bright)] text-[var(--slot4-accent-bright)]" />)}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-7 text-white/85">“{item.quote}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--slot4-dark-border)] pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-sm font-bold text-[var(--slot4-on-accent)]">{item.name[0]}</span>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-white/55">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- FAQ ---------------------------------- */
const faqs = [
  { q: `What is ${SITE_CONFIG.name}?`, a: 'A premium home for hand-picked collections and resources — discover, save, and share the web worth keeping, all in one calm, easy-to-browse place.' },
  { q: 'Is it free to use?', a: 'Yes. Browsing collections and resources is free, and creating an account to save and publish your own picks is free too.' },
  { q: 'How are collections curated?', a: 'Every pick is reviewed for quality and organized by category, so you spend less time wading through noise and more time finding genuinely useful things.' },
  { q: 'Can I contribute my own picks?', a: 'Absolutely. Create a free account, open the publishing workspace, and add your own collections and resources for the community.' },
]

export function EditableHomeFaq() {
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 lg:py-28 ${container}`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="editable-display mt-4 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">Questions, answered</h2>
            <p className="mt-3 text-[var(--slot4-muted-text)]">Everything you need to know before you start exploring.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5">
              Still curious? Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal data-reveal-delay="120" className="grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-300 open:shadow-[0_18px_40px_-28px_rgba(13,19,16,0.3)] sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--slot4-page-text)] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <Plus className="h-4 w-4 group-open:hidden" />
                    <Minus className="hidden h-4 w-4 group-open:block" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 bg-[var(--slot4-page-bg)]">
      <div className={`pb-16 pt-4 sm:pb-24 ${container}`}>
        <div data-reveal className="relative overflow-hidden rounded-[2.25rem] bg-[var(--slot4-dark-bg)] px-7 py-16 text-center text-[var(--slot4-dark-text)] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_120%_at_50%_0%,rgba(11,171,91,0.3),transparent_60%)]" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">
              <Sparkles className="h-3.5 w-3.5" /> {pagesContent.home.cta.badge}
            </span>
            <h2 className="editable-display text-3xl font-extrabold tracking-[-0.025em] sm:text-5xl">{pagesContent.home.cta.title}</h2>
            <p className="max-w-xl text-base text-white/75 sm:text-lg">{pagesContent.home.cta.description}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-8 py-4 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110">
                {pagesContent.home.cta.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-[var(--slot4-accent-bright)] hover:text-[var(--slot4-accent-bright)]">
                {pagesContent.home.cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
