import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enAuth from '@/locales/en/auth.json'
import trAuth from '@/locales/tr/auth.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
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
    },
    validLocale
  )
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
