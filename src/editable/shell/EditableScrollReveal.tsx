'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/*
  Lightweight, dependency-free scroll reveal (progressive enhancement).

  Elements opt in with `data-reveal` (and optional `data-reveal-delay` in ms).
  They stay fully visible if JavaScript never runs — this component only hides
  them (via `.reveal-init`) once it mounts, then reveals each as it scrolls into
  view with an IntersectionObserver. Re-runs on every route change so freshly
  rendered content animates too. Honors prefers-reduced-motion.
*/
export function EditableScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal-init', 'is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.revealDelay || 0)
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.add('is-visible')
          obs.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    targets.forEach((el) => {
      // Reveal immediately if already in view on load (prevents a flash of hidden
      // above-the-fold content while still animating it in).
      el.classList.add('reveal-init')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
