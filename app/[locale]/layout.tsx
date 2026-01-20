import type React from "react"
import type { Metadata } from "next"
import { SkipToContent } from "@/components/skip-to-content"
import { TranslationProvider } from "@/lib/i18n"
import { HtmlLangUpdater } from "@/components/html-lang-updater"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
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
