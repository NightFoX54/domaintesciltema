import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { ExternalLink, RefreshCw } from "lucide-react"
import { formatDate, isExpiringSoon as checkExpiringSoon } from "@/lib/format-utils"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  // PLACEHOLDER: In production, fetch domain name from WHMCS API
  const domainName = 'example.com'
  
  return createMetadata(
    { path: '/dashboard/domains/[id]', noindex: true, nofollow: true },
    {
      en: {
        title: `${domainName} - ${enDashboard.seo.domainsDetail.title}`,
        description: enDashboard.seo.domainsDetail.description,
      },
      tr: {
        title: `${domainName} - ${trDashboard.seo.domainsDetail.title}`,
        description: trDashboard.seo.domainsDetail.description,
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
  const isExpiringSoon = checkExpiringSoon(placeholderDomain.expiresDate)

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getPath('/dashboard')}>{t.navigation.dashboard}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getPath('/dashboard/domains')}>{t.navigation.domains}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{placeholderDomain.domain}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
                  {formatDate(placeholderDomain.registrationDate, validLocale, { month: 'long', day: 'numeric', year: 'numeric' })}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{t.domainDetail.expiryDate}</dt>
                <dd className={`font-medium ${isExpiringSoon ? 'text-amber-600 dark:text-amber-500' : 'text-foreground'}`}>
                  {formatDate(placeholderDomain.expiresDate, validLocale, { month: 'long', day: 'numeric', year: 'numeric' })}
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
              {t.domainDetail.actions}
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
              {/* TODO: Replace with WHMCS DNS management URL when available */}
              <Button variant="ghost" className="w-full justify-start opacity-50 cursor-not-allowed" asChild>
                <a 
                  aria-disabled="true" 
                  onClick={(e) => e.preventDefault()}
                  aria-label={t.domainDetail.dnsManagement}
                >
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
