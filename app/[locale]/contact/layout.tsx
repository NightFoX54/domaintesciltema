import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enContact from '@/locales/en/contact.json'
import trContact from '@/locales/tr/contact.json'

export const metadata: Metadata = createMetadata(
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
  }
)

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
