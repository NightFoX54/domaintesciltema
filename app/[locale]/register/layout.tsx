import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enAuth from '@/locales/en/auth.json'
import trAuth from '@/locales/tr/auth.json'

export const metadata: Metadata = createMetadata(
  { 
    path: '/register',
    noindex: true, // Auth pages should not be indexed
  },
  {
    en: {
      title: enAuth.seo.register.title,
      description: enAuth.seo.register.description,
    },
    tr: {
      title: trAuth.seo.register.title,
      description: trAuth.seo.register.description,
    },
  }
)

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
