import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SkipToContent } from "@/components/skip-to-content"
import { TranslationProvider } from "@/lib/i18n"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _crimsonPro = Crimson_Pro({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Domain Tescil - Built for Founders Who Bet on Themselves",
  description:
    "Domain registration and hosting for first-time founders. No jargon. No hidden fees. Just real humans helping you start something meaningful.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <TranslationProvider>
          <SkipToContent />
          {children}
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  )
}
