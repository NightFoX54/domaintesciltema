import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enSSL from '@/locales/en/ssl.json'
import trSSL from '@/locales/tr/ssl.json'

export const metadata: Metadata = createMetadata(
  { path: '/ssl' },
  {
    en: {
      title: enSSL.seo.title,
      description: enSSL.seo.description,
    },
    tr: {
      title: trSSL.seo.title,
      description: trSSL.seo.description,
    },
  }
)

export default function SSLLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
