export const locales = ['en', 'tr'] as const
export const defaultLocale = 'tr' as const
export type Locale = typeof locales[number]

/**
 * Get the current locale from the URL pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return segments[0] as Locale
  }
  return defaultLocale
}

/**
 * Add locale prefix to a path
 */
export function addLocaleToPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Don't add locale if path already starts with a locale
  if (locales.some(loc => cleanPath.startsWith(`${loc}/`) || cleanPath === loc)) {
    return `/${cleanPath}`
  }
  
  return `/${locale}/${cleanPath}`
}

/**
 * Remove locale prefix from a path
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean)
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return '/' + segments.slice(1).join('/')
  }
  return path
}
