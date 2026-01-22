import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enStatus from '@/locales/en/status.json'
import trStatus from '@/locales/tr/status.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/status' },
    {
      en: {
        title: enStatus.seo.title,
        description: enStatus.seo.description,
      },
      tr: {
        title: trStatus.seo.title,
        description: trStatus.seo.description,
      },
    },
    validLocale
  )
}

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
