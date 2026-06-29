import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brand = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated collections and the curators behind them',
      description: 'Discover hand-picked resources, standout collections, and the members who keep them sharp — all in one premium, easy-to-browse home.',
      openGraphTitle: 'Curated collections and the curators behind them',
      openGraphDescription: 'Discover hand-picked resources, standout collections, and the members who keep them sharp.',
      keywords: ['curated resources', 'collections', 'bookmarks', 'discovery platform', 'creator profiles'],
    },
    hero: {
      badge: 'Curated discovery',
      title: ['The web worth keeping,', 'curated by people you trust.'],
      description: 'Explore hand-picked collections, save the resources that matter, and follow the curators behind them — a calmer, sharper way to discover what is actually good.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Search resources', href: '/search' },
      searchPlaceholder: 'Search collections, resources, and topics',
      focusLabel: 'Focus',
      featureCardBadge: 'fresh from the community',
      featureCardTitle: 'The latest picks shape the look of the home page.',
      featureCardDescription: 'Recent collections and members stay at the center of the experience, without changing any core platform behavior.',
    },
    intro: {
      badge: 'Why it works',
      title: 'Built for discovering the good stuff — and the people who find it.',
      paragraphs: [
        `${brand} brings together curated collections, saved resources, and member profiles so you can move naturally between what was shared and who shared it.`,
        'Instead of scattering links across disconnected pages, the platform keeps every pick connected to its curator with consistent navigation and effortless exploration.',
        'Whether you start with a collection, a single resource, or a member you admire, you can keep discovering related picks without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A discovery-first home with stronger emphasis on collections and people.',
        'Connected surfaces for resources, collections, and member profiles.',
        'A cleaner browsing rhythm that makes exploration feel premium.',
        'Lightweight interactions that keep everything fast and readable.',
      ],
      primaryLink: { label: 'Browse collections', href: '/sbm' },
      secondaryLink: { label: 'Search resources', href: '/search' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Discover, save, and share the web worth keeping.',
      description: 'Move between collections, resources, and the people behind them through one clear, connected experience.',
      primaryCta: { label: 'Browse collections', href: '/sbm' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest picks in this section.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer, sharper way to discover what is good.',
    description: `${brand} exists to make curated discovery feel effortless — connecting hand-picked resources and collections to the curators who keep them worth following.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, we keep related picks easy to move through and easy to understand.',
      'Whether someone arrives for a collection, a single resource, or a member profile, they can keep exploring without losing context.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can browse, save, and discover without noise.',
      },
      {
        title: 'Connected surfaces',
        description: 'Collections, resources, and member profiles stay linked, so discovery feels natural across the whole platform.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear hierarchy to help people find genuinely useful picks faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${brand}`,
    title: 'Tell us what you want to share, fix, or launch.',
    description: 'Whether you are submitting a collection, exploring a partnership, or need a hand with your profile, we will route your message to the right place instead of a generic inbox.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search collections, resources, members, and content across the platform.',
    },
    hero: {
      badge: 'Search everything',
      title: 'Find collections, resources, and members faster.',
      description: 'Use keywords, categories, and content types to surface picks from every active part of the platform.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest across the platform',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit a new pick for the platform.',
    },
    locked: {
      badge: 'Member access',
      title: 'Sign in to share your next pick.',
      description: 'Use your account to open the publishing workspace and add collections, resources, and profiles to the active sections of the platform.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Add something worth keeping.',
      description: 'Choose the type, add the details, and prepare a clean post with images, links, a summary, and full content.',
    },
    formTitle: 'Post details',
    submitLabel: 'Submit post',
    successTitle: 'Your post was submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your account.',
      badge: 'Member access',
      title: 'Welcome back.',
      description: 'Sign in to keep browsing, manage your submissions, and share new picks from your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Join the community',
      title: 'Create your account and start curating.',
      description: 'Create an account to open the publishing workspace, save your details, and share picks across the platform.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested members',
      fallbackDescription: 'Member details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
