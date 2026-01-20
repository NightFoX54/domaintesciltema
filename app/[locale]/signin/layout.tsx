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
    },
    validLocale
  )
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
