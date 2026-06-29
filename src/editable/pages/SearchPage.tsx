import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Filter, Search, SearchX } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { getPostTaskKey, fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { Ads } from '@/lib/ads'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  // Profiles are kept out of the public UI — never surface them in search.
  if (derivedTask === 'profile') return false
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  // Route from the task config (e.g. /listing/<slug>); buildPostUrl can fall
  // back to /posts for tasks missing from the enabled taskViews map, which 404s.
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'

  return (
    <Link
      href={href}
      data-reveal
      data-reveal-delay={(index % 3) * 70}
      className="group flex flex-col overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(13,19,16,0.35)]"
    >
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[var(--slot4-page-text)] shadow-sm backdrop-blur">{taskLabel}</span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!image ? <span className="w-fit rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{taskLabel}</span> : null}
        <h2 className="editable-display mt-3 line-clamp-2 text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{stripHtml(summary)}</p> : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">Open result <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled && item.key !== 'profile')

  // Pull from the same proven per-task feed the archive pages use (safe limit ≤100;
  // a high master-feed limit comes back empty on this backend). Category is filtered
  // server-side here, so `matches` only re-applies the keyword + type filters. Falls
  // back to local mock posts only when the visitor explicitly opts out of the feed.
  const taskFeeds = await Promise.all(
    enabledTasks.map((item) =>
      fetchPaginatedTaskPosts(item.key, { limit: 100, category: category || undefined, fresh: true })
        .then((result) => result.posts)
        .catch(() => [] as SitePost[])
    )
  )
  let posts: SitePost[] = taskFeeds.flat()
  if (!posts.length && !useMaster) {
    posts = enabledTasks.flatMap((item) => getMockPostsForTask(item.key))
  }

  const results = posts.filter((post) => matches(post, normalized, '', task)).slice(0, normalized ? 80 : 36)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Search hero */}
        <section className="relative overflow-hidden bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_0%,rgba(11,171,91,0.22),transparent_55%)]" />
          <div className="relative mx-auto w-full max-w-[var(--editable-container)] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">
                <Search className="h-3.5 w-3.5" /> {pagesContent.search.hero.badge}
              </span>
              <h1 className="editable-display mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{pagesContent.search.hero.title}</h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/75">{pagesContent.search.hero.description}</p>
            </div>

            <form data-reveal data-reveal-delay="120" action="/search" className="mx-auto mt-9 max-w-3xl rounded-[var(--editable-radius)] border border-[var(--slot4-dark-border)] bg-white/5 p-4 backdrop-blur sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-xl bg-[var(--slot4-surface-bg)] px-4 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <label className="flex items-center gap-2 rounded-xl bg-[var(--slot4-surface-bg)] px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="rounded-xl bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-7 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110" type="submit">Search</button>
              </div>
            </form>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 pt-12 sm:px-6 lg:px-8">
          <Ads slot="header" showLabel eager className="mx-auto w-full" />
        </div>

        <section className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-[var(--editable-radius)] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><SearchX className="h-6 w-6" /></div>
              <p className="editable-display mt-5 text-2xl font-bold tracking-[-0.02em]">No matching posts found.</p>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, content type, or category.</p>
            </div>
          )}

         
        </section>
      </main>
    </EditableSiteShell>
  )
}
