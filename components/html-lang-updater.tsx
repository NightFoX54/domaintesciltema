'use client'

import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

/**
 * Updates the HTML lang attribute based on current language from URL
 * This ensures proper language declaration for SEO and accessibility
 * Language is derived from URL params, not client-side state
 */
export function HtmlLangUpdater() {
  const { language } = useTranslation() // Language comes from URL params

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  return null
}
