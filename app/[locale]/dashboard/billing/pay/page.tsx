'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface Invoice {
  id: string
  number: string
  amount: number
  dueDate: string
}

export default function PaymentPage() {
  const { t } = useTranslation('billing')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set())
  const [paymentMethod, setPaymentMethod] = useState<string>('')

  // Placeholder data - in real app, from WHMCS API: GetInvoices
  const unpaidInvoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-002',
      amount: 29.99,
      dueDate: '2024-03-01',
    },
    {
      id: '2',
      number: 'INV-2024-003',
      amount: 99.99,
      dueDate: '2024-02-20',
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

  const toggleInvoice = (invoiceId: string) => {
    const newSelected = new Set(selectedInvoices)
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId)
    } else {
      newSelected.add(invoiceId)
    }
    setSelectedInvoices(newSelected)
  }

  const selectAll = () => {
    if (selectedInvoices.size === unpaidInvoices.length) {
      setSelectedInvoices(new Set())
    } else {
      setSelectedInvoices(new Set(unpaidInvoices.map(inv => inv.id)))
    }
  }

  const selectedInvoicesData = unpaidInvoices.filter(inv => selectedInvoices.has(inv.id))
  const totalAmount = selectedInvoicesData.reduce((sum, inv) => sum + inv.amount, 0)

  const handlePayment = () => {
    // In real app, call WHMCS API to process payment
    // WHMCS API: AddInvoicePayment, CreatePayMethod
    console.log('Processing payment...', {
      invoices: Array.from(selectedInvoices),
      method: paymentMethod,
      amount: totalAmount,
    })
    // Show success/error message
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-4"
            >
              <Link href={getPath('/dashboard/billing')}>
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('title')}
              </Link>
            </Button>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {t('payment.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('payment.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invoice Selection */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{t('payment.selectInvoices')}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={selectAll}>
                      {selectedInvoices.size === unpaidInvoices.length ? 'Deselect All' : t('payment.selectAll')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {unpaidInvoices.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500 mx-auto mb-4" aria-hidden="true" />
                      <p className="text-muted-foreground">{t('overview.noBalance')}</p>
                      <p className="text-sm text-muted-foreground mt-2">{t('overview.noBalanceDescription')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {unpaidInvoices.map((invoice) => {
                        const isSelected = selectedInvoices.has(invoice.id)
                        const isOverdue = new Date(invoice.dueDate) < new Date()

                        return (
                          <div
                            key={invoice.id}
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                              isSelected ? 'bg-accent border-primary' : 'hover:bg-accent/50'
                            }`}
                            onClick={() => toggleInvoice(invoice.id)}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleInvoice(invoice.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{t('invoices.invoiceNumber', { number: invoice.number })}</span>
                                {isOverdue && (
                                  <Badge variant="destructive" className="text-xs">
                                    {t('invoices.overdue')}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{t('invoices.dueDate')}: {formatDate(invoice.dueDate)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold">{formatCurrency(invoice.amount)}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              {selectedInvoices.size > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('payment.paymentMethod')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('payment.selectMethod')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" aria-hidden="true" />
                            {t('payment.card')}
                          </div>
                        </SelectItem>
                        <SelectItem value="bank">{t('payment.bankTransfer')}</SelectItem>
                        <SelectItem value="paypal">{t('payment.paypal')}</SelectItem>
                        <SelectItem value="other">{t('payment.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Summary */}
            {selectedInvoices.size > 0 && (
              <div>
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('payment.amountDue')}</span>
                        <span className="font-medium">{formatCurrency(totalAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('payment.paymentMethod')}</span>
                        <span className="font-medium">
                          {paymentMethod ? t(`payment.${paymentMethod}`) : '—'}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">{t('payment.total')}</span>
                        <span className="text-2xl font-bold">{formatCurrency(totalAmount)}</span>
                      </div>
                      <Button
                        onClick={handlePayment}
                        className="w-full"
                        size="lg"
                        disabled={!paymentMethod}
                      >
                        <CreditCard className="h-4 w-4 mr-2" aria-hidden="true" />
                        {t('payment.payNow')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
