'use client'

import { useParams } from 'next/navigation'
import { Locale, defaultLocale } from '@/lib/locale-utils'

export function useLocale(): Locale {
  const params = useParams()
  const locale = params?.locale as string
  
  if (locale === 'en' || locale === 'tr') {
    return locale
  }
  
  return defaultLocale
}
