'use client'

import Link from 'next/link'
import { CreditCard, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardBillingOverviewProps {
  // WHMCS data: GetClientsDetails (balance), GetInvoices
  balance?: number
  amountDue?: number
  nextInvoiceDate?: string // ISO date string
  isOverdue?: boolean
}

export function DashboardBillingOverview({
  balance = 0,
  amountDue = 0,
  nextInvoiceDate,
  isOverdue = false,
}: DashboardBillingOverviewProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const hasBalance = amountDue > 0 || balance !== 0

  const formatCurrency = (amount: number) => {
    // In real app, this would use WHMCS currency settings
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    // In real app, this would use locale-aware date formatting
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{t('billing.title')}</CardTitle>
        <CardAction>
          <Button asChild variant="ghost" size="sm">
            <Link href={getPath('/dashboard/billing')}>
              {t('billing.viewInvoices')}
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {!hasBalance && !nextInvoiceDate ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500 mx-auto mb-2" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground mb-1">
              {t('billing.noBalance')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('billing.noBalanceDescription')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {amountDue > 0 && (
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium text-foreground">
                        {t('billing.due')}
                      </p>
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          {t('billing.overdue')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl font-semibold text-foreground">
                      {formatCurrency(amountDue)}
                    </p>
                  </div>
                </div>
                {isOverdue && (
                  <Button asChild size="sm" className="w-full mt-3">
                    <Link href={getPath('/dashboard/billing/pay')}>
                      {t('billing.makePayment')}
                    </Link>
                  </Button>
                )}
              </div>
            )}

            {balance !== 0 && amountDue === 0 && (
              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">
                  {t('billing.balance')}
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {formatCurrency(balance)}
                </p>
              </div>
            )}

            {nextInvoiceDate && (
              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">
                  {t('billing.nextInvoice')}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {t('billing.dueDate', { date: formatDate(nextInvoiceDate) || '' })}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
