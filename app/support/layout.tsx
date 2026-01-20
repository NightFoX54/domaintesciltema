import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enSupport from '@/locales/en/support.json'
import trSupport from '@/locales/tr/support.json'

export const metadata: Metadata = createMetadata(
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
  }
)

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
