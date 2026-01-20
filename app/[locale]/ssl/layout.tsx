import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enSSL from '@/locales/en/ssl.json'
import trSSL from '@/locales/tr/ssl.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
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
    },
    validLocale
  )
}

export default function SSLLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
