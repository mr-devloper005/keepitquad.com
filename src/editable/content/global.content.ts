import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated discovery platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated discovery',
    primaryLinks: [
      { label: 'Collections', href: '/sbm' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Submit', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Curated collections and the people behind them',
    description:
      'A premium home for hand-picked resources, collections, and the curators who keep them sharp — discover, save, and share the web worth keeping.',
    ctaEyebrow: 'Join the community',
    ctaTitle: 'Discover sharper picks and the people who make them.',
    contact: {
      email: `hello@${slot4BrandConfig.domain}`,
      location: 'Available worldwide · Remote-first',
    },
    socials: [
      { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' as const },
      { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' as const },
      { label: 'GitHub', href: 'https://github.com', icon: 'github' as const },
    ],
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Collections', href: '/sbm' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and connected curation.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
