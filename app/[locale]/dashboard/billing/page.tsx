import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { CreditCard, Download, ExternalLink, ArrowRight } from "lucide-react"
import { format } from "date-fns"
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
    { path: '/dashboard/billing' },
    {
      en: {
        title: 'Billing - Dashboard',
        description: 'View invoices and payment information',
      },
      tr: {
        title: 'Faturalama - Kontrol Paneli',
        description: 'Faturaları ve ödeme bilgilerini görüntüleyin',
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetInvoices
const placeholderInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    amount: 29.99,
    status: 'unpaid' as const,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    amount: 29.99,
    status: 'paid' as const,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
    amount: 29.99,
    status: 'paid' as const,
  },
]

const placeholderBalance = 0
const placeholderNextInvoice = {
  date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  amount: 29.99,
}

export default async function BillingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  const statusConfig = {
    paid: { label: t.billing.paid, variant: 'default' as const },
    unpaid: { label: t.billing.unpaid, variant: 'destructive' as const },
    overdue: { label: t.billing.overdue, variant: 'destructive' as const },
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {t.billingPage.title}
        </h1>
        <p className="text-muted-foreground">
          {t.billingPage.subtitle}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">{t.billingPage.accountBalance}</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            ${placeholderBalance.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{t.billingPage.nextInvoice}</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            ${placeholderNextInvoice.amount.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t.billingPage.due} {format(new Date(placeholderNextInvoice.date), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{t.billingPage.unpaidInvoices}</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">
            {placeholderInvoices.filter(i => i.status === 'unpaid').length}
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">{t.billingPage.invoices}</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.billingPage.downloadAll}
          </Button>
        </div>

        {placeholderInvoices.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <p className="text-lg font-medium text-foreground mb-2">
              {t.billing.noInvoices}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.billingPage.noInvoicesDescription}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {placeholderInvoices.map((invoice) => {
              const config = statusConfig[invoice.status] || statusConfig.unpaid
              const isOverdue = invoice.status === 'unpaid' && 
                new Date(invoice.dueDate) < new Date()
              
              return (
                <div
                  key={invoice.id}
                  className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {invoice.invoiceNumber}
                        </h3>
                        <Badge variant={isOverdue ? statusConfig.overdue.variant : config.variant}>
                          {isOverdue ? statusConfig.overdue.label : config.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">{t.billingPage.date}: </span>
                          <span className="text-foreground">
                            {format(new Date(invoice.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t.billingPage.due}: </span>
                          <span className={isOverdue ? 'text-red-600 dark:text-red-500 font-medium' : 'text-foreground'}>
                            {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t.billingPage.amount}: </span>
                          <span className="font-semibold text-foreground">
                            ${invoice.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                          {t.billingPage.download}
                        </a>
                      </Button>
                      {invoice.status === 'unpaid' && (
                        <Button size="sm">
                          {t.billingPage.payNow}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
