import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enDomains from '@/locales/en/domains.json'
import trDomains from '@/locales/tr/domains.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/domains' },
    {
      en: {
        title: enDomains.seo.title,
        description: enDomains.seo.description,
      },
      tr: {
        title: trDomains.seo.title,
        description: trDomains.seo.description,
      },
    },
    validLocale
  )
}

export default function DomainsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
