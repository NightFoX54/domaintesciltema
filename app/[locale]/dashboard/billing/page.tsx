'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, CreditCard, Calendar, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// WHMCS data types (conceptual)
type InvoiceStatus = 'paid' | 'unpaid' | 'overdue' | 'cancelled'

interface Invoice {
  id: string
  number: string
  date: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

interface Payment {
  id: string
  date: string
  amount: number
  method: string
  transactionId: string
  invoiceId?: string
}

export default function BillingPage() {
  const { t } = useTranslation('billing')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments'>('invoices')

  // Placeholder data - in real app, this comes from WHMCS
  // WHMCS API: GetInvoices, GetTransactions
  const placeholderInvoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 49.99,
      status: 'paid',
    },
    {
      id: '2',
      number: 'INV-2024-002',
      date: '2024-02-01',
      dueDate: '2024-03-01',
      amount: 29.99,
      status: 'unpaid',
    },
    {
      id: '3',
      number: 'INV-2024-003',
      date: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 99.99,
      status: 'overdue',
    },
  ]

  const placeholderPayments: Payment[] = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 49.99,
      method: 'Credit Card',
      transactionId: 'TXN-12345',
      invoiceId: '1',
    },
    {
      id: '2',
      date: '2024-01-10',
      amount: 29.99,
      method: 'PayPal',
      transactionId: 'TXN-12344',
      invoiceId: '2',
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: InvoiceStatus) => {
    const variants = {
      paid: { variant: 'default' as const, icon: CheckCircle2, className: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200 dark:border-green-800' },
      unpaid: { variant: 'secondary' as const, icon: AlertCircle, className: '' },
      overdue: { variant: 'destructive' as const, icon: XCircle, className: '' },
      cancelled: { variant: 'outline' as const, icon: XCircle, className: '' },
    }
    const config = variants[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" aria-hidden="true" />
        {t(`invoices.${status}`)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-4"
            >
              <Link href={getPath('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('title')}
              </Link>
            </Button>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {t('title')}
            </h1>
            <p className="text-muted-foreground">
              {t('overview.title')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'invoices'
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('invoices.title')}
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'payments'
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('payments.title')}
            </button>
          </div>

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('invoices.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {placeholderInvoices.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-2">{t('invoices.empty')}</p>
                    <p className="text-sm text-muted-foreground">{t('invoices.emptyDescription')}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('invoices.invoiceNumber', { number: '' }).replace(' #', '')}</TableHead>
                          <TableHead>{t('invoices.date')}</TableHead>
                          <TableHead>{t('invoices.dueDate')}</TableHead>
                          <TableHead className="text-right">{t('invoices.amount')}</TableHead>
                          <TableHead>{t('invoices.status')}</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {placeholderInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              {t('invoices.invoiceNumber', { number: invoice.number })}
                            </TableCell>
                            <TableCell>{formatDate(invoice.date)}</TableCell>
                            <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(invoice.amount)}
                            </TableCell>
                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button asChild variant="ghost" size="sm">
                                  <Link href={getPath(`/dashboard/billing/invoices/${invoice.id}`)}>
                                    {t('invoices.view')}
                                  </Link>
                                </Button>
                                {invoice.status !== 'paid' && (
                                  <Button asChild size="sm">
                                    <Link href={getPath('/dashboard/billing/pay')}>
                                      {t('invoices.payNow')}
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('payments.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {placeholderPayments.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-2">{t('payments.empty')}</p>
                    <p className="text-sm text-muted-foreground">{t('payments.emptyDescription')}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('payments.date')}</TableHead>
                          <TableHead className="text-right">{t('payments.amount')}</TableHead>
                          <TableHead>{t('payments.method')}</TableHead>
                          <TableHead>{t('payments.transactionId')}</TableHead>
                          <TableHead>{t('payments.invoice')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {placeholderPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell className="text-right font-medium">
                              {formatCurrency(payment.amount)}
                            </TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell className="font-mono text-xs">
                              {payment.transactionId}
                            </TableCell>
                            <TableCell>
                              {payment.invoiceId ? (
                                <Button asChild variant="link" size="sm" className="h-auto p-0">
                                  <Link href={getPath(`/dashboard/billing/invoices/${payment.invoiceId}`)}>
                                    {t('payments.viewInvoice')}
                                  </Link>
                                </Button>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
