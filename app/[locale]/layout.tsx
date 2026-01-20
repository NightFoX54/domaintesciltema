import type React from "react"
import type { Metadata } from "next"
import { SkipToContent } from "@/components/skip-to-content"
import { TranslationProvider } from "@/lib/i18n"
import { HtmlLangUpdater } from "@/components/html-lang-updater"
import { createMetadata } from "@/lib/seo"
import enHomepage from "@/locales/en/homepage.json"
import trHomepage from "@/locales/tr/homepage.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/' },
    {
      en: {
        title: enHomepage.seo.title,
        description: enHomepage.seo.description,
      },
      tr: {
        title: trHomepage.seo.title,
        description: trHomepage.seo.description,
      },
    },
    validLocale
  )
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return (
    <>
      <TranslationProvider initialLocale={validLocale}>
        <HtmlLangUpdater />
        <SkipToContent />
        {children}
      </TranslationProvider>
    </>
  )
}
