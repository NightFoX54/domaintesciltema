import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enHosting from '@/locales/en/hosting.json'
import trHosting from '@/locales/tr/hosting.json'

export const metadata: Metadata = createMetadata(
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
  }
)

export default function HostingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
