import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enCart from '@/locales/en/cart.json'
import trCart from '@/locales/tr/cart.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
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
    },
    validLocale
  )
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
