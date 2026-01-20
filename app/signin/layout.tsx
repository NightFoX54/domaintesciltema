import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enAuth from '@/locales/en/auth.json'
import trAuth from '@/locales/tr/auth.json'

export const metadata: Metadata = createMetadata(
  { 
    path: '/signin',
    noindex: true, // Auth pages should not be indexed
  },
  {
    en: {
      title: enAuth.seo.signin.title,
      description: enAuth.seo.signin.description,
    },
    tr: {
      title: trAuth.seo.signin.title,
      description: trAuth.seo.signin.description,
    },
  }
)

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
