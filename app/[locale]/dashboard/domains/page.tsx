import type { Metadata } from "next"
import Link from "next/link"
import { DomainCard } from "@/components/dashboard"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { Button } from "@/components/ui/button"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/dashboard/domains', noindex: true, nofollow: true },
    {
      en: {
        title: enDashboard.seo.domains.title,
        description: enDashboard.seo.domains.description,
      },
      tr: {
        title: trDashboard.seo.domains.title,
        description: trDashboard.seo.domains.description,
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetClientsDomains
const placeholderDomains = [
  {
    id: '1',
    domain: 'example.com',
    status: 'active' as const,
    expiresDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    autoRenew: true,
  },
  {
    id: '2',
    domain: 'mysite.com',
    status: 'active' as const,
    expiresDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    autoRenew: false,
  },
  {
    id: '3',
    domain: 'test.com',
    status: 'expired' as const,
    expiresDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    autoRenew: false,
  },
]

export default async function DomainsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {t.domainsPage.title}
        </h1>
        <p className="text-muted-foreground">
          {t.domainsPage.subtitle}
        </p>
      </div>

      {placeholderDomains.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              {t.domains.empty}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.domains.emptyDescription}
            </p>
          </div>
          <Link href={getPath('/domains/search')}>
            <Button variant="outline">
              {t.domains.emptyAction}
            </Button>
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {placeholderDomains.map((domain) => (
            <li key={domain.id}>
              <DomainCard {...domain} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
