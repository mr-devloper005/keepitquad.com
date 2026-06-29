'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  // Profile/members is treated as a non-public section: it stays reachable by
  // direct URL, but is kept out of the primary nav (and footer).
  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((task) => task.enabled && task.key !== 'profile')
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet on navigation.
  useEffect(() => setOpen(false), [pathname])

  const firstName = session?.name?.trim().split(/\s+/)[0] || 'Account'

  return (
    <header
      className={`sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] transition-[box-shadow,background-color] duration-300 ${
        scrolled ? 'shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]' : ''
      }`}
    >
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)] transition duration-300 group-hover:rotate-[-6deg]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block max-w-[200px] truncate text-lg font-extrabold leading-none tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 hidden max-w-[200px] truncate text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--slot4-dark-muted)] sm:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 lg:flex">
          <NavLink href="/" label="Home" pathname={pathname} exact />
          {navItems.slice(0, 4).map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
          ))}
          <NavLink href="/about" label="About" pathname={pathname} />
          <NavLink href="/contact" label="Contact" pathname={pathname} />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--slot4-dark-border)] text-[var(--editable-nav-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent-bright)]"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--editable-cta-text)] transition duration-300 hover:brightness-110 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <span className="hidden items-center rounded-full border border-[var(--slot4-dark-border)] px-3.5 py-2 text-xs font-semibold text-[var(--editable-nav-text)] sm:inline-flex">
                {firstName}
              </span>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center px-2 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--slot4-dark-muted)] transition hover:text-[var(--editable-nav-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--editable-nav-text)] transition hover:text-[var(--slot4-accent-bright)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--editable-cta-text)] transition duration-300 hover:brightness-110 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--slot4-dark-border)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--slot4-dark-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--slot4-dark-border)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent-bright)]" />
            <input name="q" type="search" placeholder="Search the platform" className="min-w-0 flex-1 bg-transparent text-sm text-[var(--editable-nav-text)] outline-none placeholder:text-[var(--slot4-dark-muted)]" />
          </form>
          <div className="grid gap-1">
            {[
              { label: 'Home', href: '/' },
              ...navItems,
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
              ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }]),
            ].map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]'
                      : 'text-[var(--slot4-dark-muted)] hover:bg-white/5 hover:text-[var(--editable-nav-text)]'
                  }`}
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-dark-muted)] transition hover:bg-white/5 hover:text-[var(--editable-nav-text)]"
              >
                Logout ({firstName})
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}

function NavLink({ href, label, pathname, exact = false }: { href: string; label: string; pathname: string; exact?: boolean }) {
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition duration-300 ${
        active ? 'text-[var(--slot4-accent-bright)]' : 'text-[var(--slot4-dark-muted)] hover:text-[var(--editable-nav-text)]'
      }`}
    >
      {label}
      <span
        className={`absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-[var(--slot4-accent-bright)] transition-transform duration-300 ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </Link>
  )
}
