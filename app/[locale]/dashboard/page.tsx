import type { Metadata } from "next"
import { DashboardHeader, StatusCard, QuickActions, ServiceCard, DomainCard, BillingSummary, TicketsSummary } from "@/components/dashboard"
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
    { path: '/dashboard' },
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
const placeholderData = {
  services: [
    {
      id: '1',
      name: 'WordPress Hosting - Starter',
      domain: 'example.com',
      status: 'active' as const,
      renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      expiresDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'Linux Hosting - Pro',
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
      subject: 'Need help with SSL setup',
      status: 'answered' as const,
      lastReply: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ],
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const t = validLocale === 'en' ? enDashboard : trDashboard

  // Calculate overall status
  const hasExpiringSoon = 
    placeholderData.services.some(s => s.expiresDate && new Date(s.expiresDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) ||
    placeholderData.domains.some(d => d.expiresDate && new Date(d.expiresDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  
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
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">{t.services.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {placeholderData.services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
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
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">{t.domains.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {placeholderData.domains.map((domain) => (
                <DomainCard key={domain.id} {...domain} />
              ))}
            </div>
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
