import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Unified premium task surfaces (AWSA-inspired).

  Every task (archive + detail) shares one cohesive identity: a calm light
  canvas, near-black ink, the signature emerald-green accent, hairline borders,
  generous radius and a clean sans-serif. Per-task copy (kicker / note) still
  varies so each section keeps a little voice, but the visual language is
  unified. Tokens are delivered via CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
const BODY_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared premium palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#f6f8f4',
  surface: '#ffffff',
  raised: '#eef1ea',
  text: '#0e1311',
  muted: '#5b625a',
  line: '#e3e7df',
  accent: '#0bab5b',
  accentSoft: '#e4f7ec',
  onAccent: '#ffffff',
  glow: 'rgba(11,171,91,0.10)',
  radius: '1.25rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with trusted businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Collections', note: 'Hand-picked resources and links worth keeping.' },
  pdf: { ...base, kicker: 'Library', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'Members', note: 'Meet the curators, creators and people behind the picks.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
