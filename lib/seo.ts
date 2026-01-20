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
 * Creates locale-aware metadata with SEO best practices
 * Canonical URLs include locale prefix, hreflang tags reference both locales
 */
export function createMetadata(
  config: SEOConfig,
  translations: {
    en: { title: string; description: string }
    tr: { title: string; description: string }
  },
  locale: 'en' | 'tr' = 'tr'
): Metadata {
  const baseUrl = getBaseUrl()
  
  // Ensure path starts with /
  const cleanPath = config.path.startsWith('/') ? config.path : `/${config.path}`
  
  // Remove any existing locale prefix from path
  const pathWithoutLocale = cleanPath.replace(/^\/(en|tr)/, '') || '/'
  
  // Build locale-specific URLs
  const enUrl = `${baseUrl}/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
  const trUrl = `${baseUrl}/tr${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
  const canonicalUrl = locale === 'en' ? enUrl : trUrl
  
  // Use locale-specific translations
  const title = locale === 'en' ? translations.en.title : translations.tr.title
  const description = locale === 'en' ? translations.en.description : translations.tr.description
  
  // Create hreflang alternates with locale-specific URLs
  const alternates: Metadata['alternates'] = {
    canonical: canonicalUrl,
    languages: {
      'en': enUrl,
      'tr': trUrl,
      'x-default': trUrl, // Default to Turkish
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
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      alternateLocale: locale === 'en' ? 'tr_TR' : 'en_US',
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
