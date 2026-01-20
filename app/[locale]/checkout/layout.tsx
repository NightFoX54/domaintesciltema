import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enCheckout from '@/locales/en/checkout.json'
import trCheckout from '@/locales/tr/checkout.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
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
    },
    validLocale
  )
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
