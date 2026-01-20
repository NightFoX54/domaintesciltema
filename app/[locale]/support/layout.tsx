import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enSupport from '@/locales/en/support.json'
import trSupport from '@/locales/tr/support.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/support' },
    {
      en: {
        title: enSupport.seo.title,
        description: enSupport.seo.description,
      },
      tr: {
        title: trSupport.seo.title,
        description: trSupport.seo.description,
      },
    },
    validLocale
  )
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
