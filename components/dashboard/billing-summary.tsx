'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

interface BillingSummaryProps {
  balance?: number
  nextInvoiceDate?: Date
  nextInvoiceAmount?: number
  overdueInvoices?: number
  // WHMCS data: account balance, next invoice date/amount, overdue count, etc.
}

export function BillingSummary({ 
  balance = 0, 
  nextInvoiceDate, 
  nextInvoiceAmount = 0,
  overdueInvoices = 0
}: BillingSummaryProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {t('billing.title')}
        </h2>
        <Link href={getPath('/dashboard/billing')}>
          <Button variant="ghost" size="sm" className="gap-2">
            {t('billing.viewAll')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        {overdueInvoices > 0 && (
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">
                  {t('billing.overdue')}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {overdueInvoices} {overdueInvoices === 1 ? 'invoice' : 'invoices'} {t('billing.overdue')}
                </p>
              </div>
              <Link href={getPath('/dashboard/billing')}>
                <Button variant="destructive" size="sm">
                  {t('billing.viewAll')}
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{t('billing.balance')}</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              ${balance.toFixed(2)}
            </p>
          </div>

          {nextInvoiceDate && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{t('billing.nextInvoice')}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-foreground">
                  ${nextInvoiceAmount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('billing.due')} {format(new Date(nextInvoiceDate), 'MMM d')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
