import type { Metadata } from "next"
import { DomainCard } from "@/components/dashboard"
import { createMetadata } from "@/lib/seo"
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
    { path: '/dashboard/domains' },
    {
      en: {
        title: `${enDashboard.navigation.domains} - ${enDashboard.seo.title}`,
        description: enDashboard.domains.subtitle,
      },
      tr: {
        title: `${trDashboard.navigation.domains} - ${trDashboard.seo.title}`,
        description: trDashboard.domains.subtitle,
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
        <div className="rounded-lg border bg-card p-12 text-center">
          <p className="text-lg font-medium text-foreground mb-2">
            {t.domains.empty}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {t.domains.emptyDescription}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {placeholderDomains.map((domain) => (
            <DomainCard key={domain.id} {...domain} />
          ))}
        </div>
      )}
    </>
  )
}
