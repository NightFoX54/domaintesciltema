import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enContact from '@/locales/en/contact.json'
import trContact from '@/locales/tr/contact.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/contact' },
    {
      en: {
        title: enContact.seo.title,
        description: enContact.seo.description,
      },
      tr: {
        title: trContact.seo.title,
        description: trContact.seo.description,
      },
    },
    validLocale
  )
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
