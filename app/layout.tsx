import type React from "react"
import { Inter, Crimson_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _crimsonPro = Crimson_Pro({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Root layout - middleware handles locale routing
  // HTML structure is here, locale-specific logic is in [locale]/layout.tsx
  // lang attribute is set dynamically by HtmlLangUpdater component in [locale]/layout.tsx
  return (
    <html suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
