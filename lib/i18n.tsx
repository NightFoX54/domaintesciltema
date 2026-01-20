'use client'

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react'
import enCommon from '@/locales/en/common.json'
import trCommon from '@/locales/tr/common.json'
import enHomepage from '@/locales/en/homepage.json'
import trHomepage from '@/locales/tr/homepage.json'
import enDomains from '@/locales/en/domains.json'
import trDomains from '@/locales/tr/domains.json'
import enCart from '@/locales/en/cart.json'
import trCart from '@/locales/tr/cart.json'
import enCheckout from '@/locales/en/checkout.json'
import trCheckout from '@/locales/tr/checkout.json'
import enAuth from '@/locales/en/auth.json'
import trAuth from '@/locales/tr/auth.json'
import enSupport from '@/locales/en/support.json'
import trSupport from '@/locales/tr/support.json'
import enMigration from '@/locales/en/migration.json'
import trMigration from '@/locales/tr/migration.json'
import enContact from '@/locales/en/contact.json'
import trContact from '@/locales/tr/contact.json'
import enStatus from '@/locales/en/status.json'
import trStatus from '@/locales/tr/status.json'
import enHosting from '@/locales/en/hosting.json'
import trHosting from '@/locales/tr/hosting.json'
import enSSL from '@/locales/en/ssl.json'
import trSSL from '@/locales/tr/ssl.json'
import enConfigure from '@/locales/en/configure.json'
import trConfigure from '@/locales/tr/configure.json'

export type Language = 'en' | 'tr'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, namespace?: string, params?: Record<string, string | number>) => any
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Cache for loaded translations
const translationCache: Record<Language, Record<string, any>> = {
  en: { 
    common: enCommon, 
    homepage: enHomepage,
    domains: enDomains,
    cart: enCart,
    checkout: enCheckout,
    auth: enAuth,
    support: enSupport,
    migration: enMigration,
    contact: enContact,
    status: enStatus,
    hosting: enHosting,
    ssl: enSSL,
    configure: enConfigure,
  },
  tr: { 
    common: trCommon, 
    homepage: trHomepage,
    domains: trDomains,
    cart: trCart,
    checkout: trCheckout,
    auth: trAuth,
    support: trSupport,
    migration: trMigration,
    contact: trContact,
    status: trStatus,
    hosting: trHosting,
    ssl: trSSL,
    configure: trConfigure,
  },
}

// Lazy load translation files
async function loadTranslation(lang: Language, namespace: string): Promise<any> {
  if (translationCache[lang][namespace]) {
    return translationCache[lang][namespace]
  }

  try {
    const module = await import(`@/locales/${lang}/${namespace}.json`)
    translationCache[lang][namespace] = module.default
    return module.default
  } catch (error) {
    console.warn(`Translation file not found: locales/${lang}/${namespace}.json`)
    // Try to load English fallback
    try {
      const fallback = await import(`@/locales/en/${namespace}.json`)
      translationCache[lang][namespace] = fallback.default
      return fallback.default
    } catch {
      return {}
    }
  }
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
      setLanguageState(savedLang)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = savedLang
      }
    } else {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = 'en'
      }
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
      document.documentElement.lang = lang
    }
  }, [])

  const t = useCallback(
    (key: string, namespace: string = 'common', params?: Record<string, string | number>): any => {
      // Ensure namespace is loaded
      if (!translationCache[language][namespace]) {
        // Try to load it synchronously if available, otherwise return key
        loadTranslation(language, namespace)
        // For now, use what we have
      }

      const keys = key.split('.')
      let value: any = translationCache[language][namespace] || translationCache.en[namespace] || {}

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          // Fallback to English
          value = translationCache.en[namespace] || {}
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey]
            } else {
              return key // Return key if translation not found
            }
          }
          break
        }
      }

      // Handle parameter interpolation for strings
      if (typeof value === 'string' && params) {
        let interpolated = value
        for (const [paramKey, paramValue] of Object.entries(params)) {
          interpolated = interpolated.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue))
        }
        return interpolated
      }

      // Return the value as-is (could be string, array, object, etc.)
      return value !== undefined && value !== null ? value : key
    },
    [language]
  )

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation(namespace?: string) {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }

  return {
    ...context,
    t: (key: string, ns?: string, params?: Record<string, string | number>) => 
      context.t(key, ns || namespace || 'common', params),
  }
}
