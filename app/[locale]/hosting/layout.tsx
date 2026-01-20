import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enHosting from '@/locales/en/hosting.json'
import trHosting from '@/locales/tr/hosting.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/hosting' },
    {
      en: {
        title: enHosting.seo.title,
        description: enHosting.seo.description,
      },
      tr: {
        title: trHosting.seo.title,
        description: trHosting.seo.description,
      },
    },
    validLocale
  )
}

export default function HostingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
