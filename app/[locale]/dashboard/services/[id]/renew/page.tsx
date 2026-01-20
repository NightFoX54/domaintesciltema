'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Calendar, CreditCard } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

// WHMCS data types (conceptual)
interface RenewalPeriod {
  period: number // months
  price: number
  label: string
}

export default async function ServiceRenewPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale: localeParam } = await params
  const validLocale = (localeParam === 'en' || localeParam === 'tr') ? localeParam : 'tr'
  
  return <ServiceRenewClient serviceId={id} locale={validLocale} />
}

function ServiceRenewClient({ serviceId, locale }: { serviceId: string; locale: string }) {
  const { t } = useTranslation('services')
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('12')

  // In real app, fetch service and renewal options from WHMCS API
  // WHMCS API: GetClientsProducts, GetClientsDomains
  const service = {
    id: '1',
    name: 'example.com',
    currentExpiry: '2025-01-15',
  }

  // Placeholder renewal periods - in real app, from WHMCS pricing
  const renewalPeriods: RenewalPeriod[] = [
    { period: 1, price: 9.99, label: '1 month' },
    { period: 12, price: 99.99, label: '1 year' },
    { period: 24, price: 189.99, label: '2 years' },
  ]

  const selectedPeriodData = renewalPeriods.find(p => p.period.toString() === selectedPeriod) || renewalPeriods[1]

  const calculateNewExpiry = (currentExpiry: string, months: number) => {
    const date = new Date(currentExpiry)
    date.setMonth(date.getMonth() + months)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const handleRenew = () => {
    // In real app, call WHMCS API to renew service
    // WHMCS API: AddOrder, ModuleRenew
    console.log('Renewing service...', { serviceId: service.id, period: selectedPeriod })
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
              <Link href={getPath(`/dashboard/services/${service.id}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('detail.back')}
              </Link>
            </Button>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {t('renew.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('renew.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('renew.service')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{service.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="text-muted-foreground">{t('renew.currentExpiry')}:</span>
                      <span className="font-medium">
                        {new Date(service.currentExpiry).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Renewal Period Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('renew.selectPeriod')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <div className="space-y-3">
                      {renewalPeriods.map((period) => (
                        <div key={period.period} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={period.period.toString()} id={`period-${period.period}`} />
                          <Label htmlFor={`period-${period.period}`} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{period.label}</span>
                              <span className="text-lg font-semibold">{formatCurrency(period.price)}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Summary */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('renew.service')}</span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('renew.newExpiry')}</span>
                      <span className="font-medium">
                        {calculateNewExpiry(service.currentExpiry, selectedPeriodData.period)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('renew.price')}</span>
                      <span className="font-medium">{formatCurrency(selectedPeriodData.price)}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">{t('renew.price')}</span>
                      <span className="text-2xl font-bold">{formatCurrency(selectedPeriodData.price)}</span>
                    </div>
                    <Button onClick={handleRenew} className="w-full" size="lg">
                      <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                      {t('renew.renewNow')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
