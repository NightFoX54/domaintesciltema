import type { Metadata } from "next"
import Link from "next/link"
import { DashboardHeader, StatusCard, QuickActions, ServiceCard, DomainCard, BillingSummary, TicketsSummary } from "@/components/dashboard"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { isExpiringSoon } from "@/lib/format-utils"
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
    { path: '/dashboard', noindex: true, nofollow: true },
    {
      en: {
        title: enDashboard.seo.title,
        description: enDashboard.seo.description,
      },
      tr: {
        title: trDashboard.seo.title,
        description: trDashboard.seo.description,
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API calls
// This data structure represents what WHMCS would return
function getPlaceholderData(locale: 'en' | 'tr') {
  const t = locale === 'en' ? enDashboard : trDashboard
  
  return {
    services: [
      {
        id: '1',
        name: t.placeholderData.serviceNames.wordpressStarter,
        domain: 'example.com',
        status: 'active' as const,
        renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        expiresDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        name: t.placeholderData.serviceNames.linuxPro,
        domain: 'mysite.com',
        status: 'active' as const,
        renewalDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        expiresDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
    ],
    domains: [
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
    ],
    billing: {
      balance: 0,
      nextInvoiceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      nextInvoiceAmount: 29.99,
      overdueInvoices: 0,
    },
    tickets: [
      {
        id: '1',
        subject: t.placeholderData.ticketSubjects.sslSetup,
        status: 'answered' as const,
        lastReply: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  }
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  // PLACEHOLDER DATA - Replace with WHMCS API calls
  const placeholderData = getPlaceholderData(validLocale)

  // Calculate overall status
  const hasExpiringSoon = 
    placeholderData.services.some(s => isExpiringSoon(s.expiresDate)) ||
    placeholderData.domains.some(d => isExpiringSoon(d.expiresDate))
  
  const hasOverdue = placeholderData.billing.overdueInvoices > 0
  const hasSuspended = placeholderData.services.some(s => (s.status as string) === 'suspended')
  
  const overallStatus = hasSuspended || hasOverdue 
    ? 'critical' 
    : hasExpiringSoon 
    ? 'warning' 
    : 'healthy'

  return (
    <>
      <DashboardHeader />
      
      {/* Overall Status */}
      <div className="mb-8">
        <StatusCard
          status={overallStatus}
          title={
            overallStatus === 'healthy' 
              ? t.overviewStatus.allGood
              : overallStatus === 'warning'
              ? t.overviewStatus.attentionNeeded
              : t.overviewStatus.actionRequired
          }
          description={
            overallStatus === 'healthy'
              ? t.overviewStatus.allGoodDescription
              : overallStatus === 'warning'
              ? t.overviewStatus.attentionNeededDescription
              : t.overviewStatus.actionRequiredDescription
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Services & Domains Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Services */}
        <section aria-labelledby="services-heading">
          <div className="mb-4">
            <h2 id="services-heading" className="text-lg font-semibold text-foreground mb-1">
              {t.services.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.services.subtitle}
            </p>
          </div>
          {placeholderData.services.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center space-y-4">
              <p className="text-sm text-muted-foreground">{t.services.empty}</p>
              <p className="text-xs text-muted-foreground">{t.services.emptyDescription}</p>
              <Link href={getPath('/hosting')}>
                <Button variant="outline" size="sm">
                  {t.services.emptyAction}
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {placeholderData.services.map((service) => (
                <li key={service.id}>
                  <ServiceCard {...service} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Domains */}
        <section aria-labelledby="domains-heading">
          <div className="mb-4">
            <h2 id="domains-heading" className="text-lg font-semibold text-foreground mb-1">
              {t.domains.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.domains.subtitle}
            </p>
          </div>
          {placeholderData.domains.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center space-y-4">
              <p className="text-sm text-muted-foreground">{t.domains.empty}</p>
              <p className="text-xs text-muted-foreground">{t.domains.emptyDescription}</p>
              <Link href={getPath('/domains/search')}>
                <Button variant="outline" size="sm">
                  {t.domains.emptyAction}
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {placeholderData.domains.map((domain) => (
                <li key={domain.id}>
                  <DomainCard {...domain} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Billing & Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BillingSummary {...placeholderData.billing} />
        <TicketsSummary tickets={placeholderData.tickets} />
      </div>
    </>
  )
}
