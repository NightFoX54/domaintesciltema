import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enCheckout from '@/locales/en/checkout.json'
import trCheckout from '@/locales/tr/checkout.json'

export const metadata: Metadata = createMetadata(
  { 
    path: '/checkout',
    noindex: true, // Checkout pages should not be indexed
  },
  {
    en: {
      title: enCheckout.seo.title,
      description: enCheckout.seo.description,
    },
    tr: {
      title: trCheckout.seo.title,
      description: trCheckout.seo.description,
    },
  }
)

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
