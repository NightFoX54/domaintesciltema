import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import enMigration from '@/locales/en/migration.json'
import trMigration from '@/locales/tr/migration.json'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/migration' },
    {
      en: {
        title: enMigration.seo.title,
        description: enMigration.seo.description,
      },
      tr: {
        title: trMigration.seo.title,
        description: trMigration.seo.description,
      },
    },
    validLocale
  )
}

export default function MigrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
