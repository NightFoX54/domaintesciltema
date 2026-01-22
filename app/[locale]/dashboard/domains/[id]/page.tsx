import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { ArrowLeft, Globe, ExternalLink, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/dashboard/domains/[id]' },
    {
      en: {
        title: 'Domain Details',
        description: 'View and manage your domain',
      },
      tr: {
        title: 'Alan Adı Detayları',
        description: 'Alan adınızı görüntüleyin ve yönetin',
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetClientsDomains (single domain)
const placeholderDomain = {
  id: '1',
  domain: 'example.com',
  status: 'active' as const,
  expiresDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  autoRenew: true,
  registrationDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  // Additional WHMCS data would include: domain name, registrar, expiry date, 
  // registration date, nameservers, DNS records, etc.
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  const statusConfig = {
    active: { label: t.status.active, variant: 'default' as const },
    expired: { label: t.status.expired, variant: 'destructive' as const },
    pending: { label: t.status.pending, variant: 'secondary' as const },
  }

  const config = statusConfig[placeholderDomain.status] || statusConfig.active
  const isExpiringSoon = placeholderDomain.expiresDate && 
    new Date(placeholderDomain.expiresDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <>
      <Link 
        href={getPath('/dashboard/domains')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t.domainDetail.backToDomains}
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {placeholderDomain.domain}
            </h1>
            {placeholderDomain.autoRenew && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>{t.domainDetail.autoRenewEnabled}</span>
              </div>
            )}
          </div>
          <Badge variant={config.variant} className="text-sm">
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Domain Details */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t.domainDetail.domainInformation}
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{t.domainDetail.registrationDate}</dt>
                <dd className="font-medium text-foreground">
                  {format(new Date(placeholderDomain.registrationDate), 'MMMM d, yyyy')}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{t.domainDetail.expiryDate}</dt>
                <dd className={`font-medium ${isExpiringSoon ? 'text-amber-600 dark:text-amber-500' : 'text-foreground'}`}>
                  {format(new Date(placeholderDomain.expiresDate), 'MMMM d, yyyy')}
                  {isExpiringSoon && ` (${t.domainDetail.expiringSoon})`}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{t.domains.autoRenew}</dt>
                <dd className="font-medium text-foreground">
                  {placeholderDomain.autoRenew ? t.domainDetail.enabled : t.domainDetail.disabled}
                </dd>
              </div>
            </dl>
          </section>

          {/* Actions */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t.serviceDetail.actions}
            </h2>
            <div className="space-y-3">
              {!placeholderDomain.autoRenew && (
                <Button className="w-full" variant="outline">
                  {t.domainDetail.enableAutoRenew}
                </Button>
              )}
              {isExpiringSoon && (
                <Button className="w-full">
                  {t.domainDetail.renewDomain}
                </Button>
              )}
              <Button className="w-full" variant="outline">
                {t.domainDetail.manageDns}
              </Button>
              <Button className="w-full" variant="outline">
                {t.domainDetail.transferDomain}
              </Button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Quick Links */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t.serviceDetail.quickLinks}
            </h2>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t.domainDetail.dnsManagement}
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={getPath('/dashboard/tickets/new')}>
                  {t.serviceDetail.openSupportTicket}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
