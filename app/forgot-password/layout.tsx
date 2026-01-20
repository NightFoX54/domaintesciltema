import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enAuth from '@/locales/en/auth.json'
import trAuth from '@/locales/tr/auth.json'

export const metadata: Metadata = createMetadata(
  { 
    path: '/forgot-password',
    noindex: true, // Auth pages should not be indexed
  },
  {
    en: {
      title: enAuth.seo.forgotPassword.title,
      description: enAuth.seo.forgotPassword.description,
    },
    tr: {
      title: trAuth.seo.forgotPassword.title,
      description: trAuth.seo.forgotPassword.description,
    },
  }
)

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
