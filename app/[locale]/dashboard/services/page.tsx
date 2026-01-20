'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Globe, Server, Lock, Search, Filter, Calendar } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// WHMCS data types (conceptual)
type ServiceStatus = 'active' | 'expiringSoon' | 'expired' | 'suspended' | 'pending'
type ServiceType = 'domain' | 'hosting' | 'ssl'

interface Service {
  id: string
  name: string
  type: ServiceType
  status: ServiceStatus
  expiresAt?: string
  daysRemaining?: number
}

export default function ServicesPage() {
  const { t } = useTranslation('services')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Placeholder data - in real app, this comes from WHMCS
  // WHMCS API: GetClientsProducts, GetClientsDomains
  const placeholderServices: Service[] = [
    {
      id: '1',
      name: 'example.com',
      type: 'domain',
      status: 'active',
      daysRemaining: 245,
    },
    {
      id: '2',
      name: 'another-domain.com',
      type: 'domain',
      status: 'expiringSoon',
      daysRemaining: 15,
    },
    {
      id: '3',
      name: 'Business Hosting Plan',
      type: 'hosting',
      status: 'active',
      daysRemaining: 120,
    },
    {
      id: '4',
      name: 'example.com SSL',
      type: 'ssl',
      status: 'expiringSoon',
      daysRemaining: 20,
    },
    {
      id: '5',
      name: 'old-domain.com',
      type: 'domain',
      status: 'expired',
      daysRemaining: -5,
    },
  ]

  const serviceIcons = {
    domain: Globe,
    hosting: Server,
    ssl: Lock,
  }

  const statusVariants = {
    active: 'default',
    expiringSoon: 'secondary',
    expired: 'destructive',
    suspended: 'outline',
    pending: 'outline',
  } as const

  const filteredServices = placeholderServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || service.type === typeFilter
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusLabel = (status: ServiceStatus) => {
    return t(`service.${status}`)
  }

  const getTypeLabel = (type: ServiceType) => {
    return t(`service.${type}`)
  }

  const formatExpiry = (service: Service) => {
    if (service.daysRemaining === undefined) return null
    
    if (service.daysRemaining === 0) {
      return t('service.expiresToday')
    } else if (service.daysRemaining < 0) {
      return t('service.expiredDaysAgo', { days: Math.abs(service.daysRemaining) })
    } else {
      return t('service.daysRemaining', { days: service.daysRemaining })
    }
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
              {t('overview.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('title')}
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    placeholder={t('overview.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                    <SelectValue placeholder={t('overview.filter')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('overview.filterAll')}</SelectItem>
                    <SelectItem value="domain">{t('overview.filterDomains')}</SelectItem>
                    <SelectItem value="hosting">{t('overview.filterHosting')}</SelectItem>
                    <SelectItem value="ssl">{t('overview.filterSSL')}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder={t('overview.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('overview.statusAll')}</SelectItem>
                    <SelectItem value="active">{t('overview.statusActive')}</SelectItem>
                    <SelectItem value="expiringSoon">{t('overview.statusExpiring')}</SelectItem>
                    <SelectItem value="expired">{t('overview.statusExpired')}</SelectItem>
                    <SelectItem value="suspended">{t('overview.statusSuspended')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Services List */}
          {filteredServices.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">{t('overview.empty')}</p>
                  <p className="text-sm text-muted-foreground">{t('overview.emptyDescription')}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredServices.map((service) => {
                const Icon = serviceIcons[service.type]
                const expiryText = formatExpiry(service)
                const needsRenewal = service.status === 'expiringSoon' || service.status === 'expired'

                return (
                  <Card key={service.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            <div className="rounded-lg bg-muted p-3">
                              <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{service.name}</h3>
                              <Badge variant={statusVariants[service.status]}>
                                {getStatusLabel(service.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{getTypeLabel(service.type)}</span>
                              {expiryText && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" aria-hidden="true" />
                                  <span>{expiryText}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {needsRenewal && (
                            <Button asChild size="sm">
                              <Link href={getPath(`/dashboard/services/${service.id}/renew`)}>
                                {t('service.renewNow')}
                              </Link>
                            </Button>
                          )}
                          <Button asChild variant="outline" size="sm">
                            <Link href={getPath(`/dashboard/services/${service.id}`)}>
                              {t('service.viewDetails')}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
