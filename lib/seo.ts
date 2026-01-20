import type { Metadata } from 'next'

export interface SEOConfig {
  path: string
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Gets the base URL for the site
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  return 'https://domaintescil.com'
}

/**
 * Creates metadata with SEO best practices
 * Uses English as default, but includes hreflang for both languages
 */
export function createMetadata(
  config: SEOConfig,
  translations: {
    en: { title: string; description: string }
    tr: { title: string; description: string }
  }
): Metadata {
  const baseUrl = getBaseUrl()
  const canonicalUrl = `${baseUrl}${config.path}`
  
  // Use English as default for metadata
  const title = translations.en.title
  const description = translations.en.description
  
  // Create hreflang alternates - pointing to same URL since language is client-side
  // In a production setup with URL-based routing, these would point to /en/path and /tr/path
  const alternates: Metadata['alternates'] = {
    canonical: canonicalUrl,
    languages: {
      'en': canonicalUrl,
      'tr': canonicalUrl,
      'x-default': canonicalUrl,
    },
  }
  
  const metadata: Metadata = {
    title: `${title} | Domain Tescil`,
    description,
    alternates,
    robots: {
      index: !config.noindex,
      follow: !config.nofollow,
      googleBot: {
        index: !config.noindex,
        follow: !config.nofollow,
      },
    },
    openGraph: {
      title: `${title} | Domain Tescil`,
      description,
      url: canonicalUrl,
      siteName: 'Domain Tescil',
      locale: 'en_US',
      alternateLocale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Domain Tescil`,
      description,
    },
  }
  
  return metadata
}
