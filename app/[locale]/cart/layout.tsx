import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enCart from '@/locales/en/cart.json'
import trCart from '@/locales/tr/cart.json'

export const metadata: Metadata = createMetadata(
  { 
    path: '/cart',
    noindex: true, // Cart pages typically shouldn't be indexed
  },
  {
    en: {
      title: enCart.seo.title,
      description: enCart.seo.description,
    },
    tr: {
      title: trCart.seo.title,
      description: trCart.seo.description,
    },
  }
)

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
