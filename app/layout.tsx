import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SkipToContent } from "@/components/skip-to-content"
import { TranslationProvider } from "@/lib/i18n"
import { HtmlLangUpdater } from "@/components/html-lang-updater"
import { createMetadata } from "@/lib/seo"
import enHomepage from "@/locales/en/homepage.json"
import trHomepage from "@/locales/tr/homepage.json"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _crimsonPro = Crimson_Pro({ subsets: ["latin"] })

// Default metadata for homepage - can be overridden by route-specific layouts
export const metadata: Metadata = createMetadata(
  { path: "/" },
  {
    en: {
      title: enHomepage.seo.title,
      description: enHomepage.seo.description,
    },
    tr: {
      title: trHomepage.seo.title,
      description: trHomepage.seo.description,
    },
  }
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <TranslationProvider>
          <HtmlLangUpdater />
          <SkipToContent />
          {children}
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  )
}
