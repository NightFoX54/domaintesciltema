'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, Server, Lock, Calendar, CheckCircle2, XCircle, RefreshCw, X, ArrowRightLeft } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { addLocaleToPath } from '@/lib/locale-utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// WHMCS data types (conceptual)
type ServiceStatus = 'active' | 'expiringSoon' | 'expired' | 'suspended' | 'pending'
type ServiceType = 'domain' | 'hosting' | 'ssl'

interface Service {
  id: string
  name: string
  type: ServiceType
  status: ServiceStatus
  registrationDate?: string
  expiryDate?: string
  renewalDate?: string
  autoRenew: boolean
  nameservers?: string[]
}

export function ServiceDetailClient({ serviceId, locale }: { serviceId: string; locale: string }) {
  const { t } = useTranslation('services')
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')

  // In real app, fetch service by ID from WHMCS API
  // WHMCS API: GetClientsProducts, GetClientsDomains
  const service: Service = {
    id: serviceId,
    name: 'example.com',
    type: 'domain',
    status: 'active',
    registrationDate: '2023-01-15',
    expiryDate: '2025-01-15',
    renewalDate: '2025-01-15',
    autoRenew: true,
    nameservers: ['ns1.example.com', 'ns2.example.com'],
  }

  const serviceIcons = {
    domain: Globe,
    hosting: Server,
    ssl: Lock,
  }

  const statusVariants = {
    active: { variant: 'default' as const, icon: CheckCircle2, className: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200 dark:border-green-800' },
    expiringSoon: { variant: 'secondary' as const, icon: RefreshCw, className: '' },
    expired: { variant: 'destructive' as const, icon: XCircle, className: '' },
    suspended: { variant: 'outline' as const, icon: XCircle, className: '' },
    pending: { variant: 'outline' as const, icon: RefreshCw, className: '' },
  }

  const Icon = serviceIcons[service.type]
  const statusConfig = statusVariants[service.status]
  const StatusIcon = statusConfig.icon

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
              <Link href={getPath('/dashboard/services')}>
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('detail.back')}
              </Link>
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  {t('detail.title')}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <span className="text-lg font-medium">{service.name}</span>
                  </div>
                  <Badge variant={statusConfig.variant} className={statusConfig.className}>
                    <StatusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    {t(`service.${service.status}`)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('service.' + service.type)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('detail.status')}</p>
                      <Badge variant={statusConfig.variant} className={statusConfig.className}>
                        {t(`service.${service.status}`)}
                      </Badge>
                    </div>
                    {service.registrationDate && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('detail.registrationDate')}</p>
                        <p className="font-medium">{formatDate(service.registrationDate)}</p>
                      </div>
                    )}
                    {service.expiryDate && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('detail.expiryDate')}</p>
                        <p className="font-medium">{formatDate(service.expiryDate)}</p>
                      </div>
                    )}
                    {service.renewalDate && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t('detail.renewalDate')}</p>
                        <p className="font-medium">{formatDate(service.renewalDate)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('detail.autoRenew')}</p>
                      <p className="font-medium">
                        {service.autoRenew ? t('detail.enabled') : t('detail.disabled')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nameservers (for domains) */}
              {service.type === 'domain' && service.nameservers && service.nameservers.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('detail.nameservers')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.nameservers.map((ns, index) => (
                        <li key={index} className="font-mono text-sm">
                          {ns}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('detail.actions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(service.status === 'expiringSoon' || service.status === 'expired') && (
                    <Button asChild className="w-full" size="lg">
                      <Link href={getPath(`/dashboard/services/${service.id}/renew`)}>
                        <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                        {t('detail.renew')}
                      </Link>
                    </Button>
                  )}
                  {service.type === 'domain' && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href={getPath(`/dashboard/services/${service.id}/transfer`)}>
                        <ArrowRightLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                        {t('detail.transfer')}
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="w-full">
                    <Link href={getPath(`/dashboard/services/${service.id}/manage`)}>
                      {t('detail.manage')}
                    </Link>
                  </Button>
                  <Separator />
                  <Button asChild variant="ghost" className="w-full text-destructive hover:text-destructive">
                    <Link href={getPath(`/dashboard/services/${service.id}/cancel`)}>
                      <X className="h-4 w-4 mr-2" aria-hidden="true" />
                      {t('detail.cancel')}
                    </Link>
                  </Button>
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
