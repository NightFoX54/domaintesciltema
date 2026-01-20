'use client'

import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

/**
 * Updates the HTML lang attribute based on current language
 * This ensures proper language declaration for SEO and accessibility
 */
export function HtmlLangUpdater() {
  const { language } = useTranslation()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  return null
}
