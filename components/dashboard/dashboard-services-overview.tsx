'use client'

import Link from 'next/link'
import { Globe, Server, Lock, ArrowRight, Calendar } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// WHMCS data types (conceptual)
type ServiceStatus = 'active' | 'expiringSoon' | 'expired' | 'suspended' | 'pending'
type ServiceType = 'domain' | 'hosting' | 'ssl'

interface Service {
  id: string
  name: string
  type: ServiceType
  status: ServiceStatus
  expiresAt?: string // ISO date string
  daysRemaining?: number
}

interface DashboardServicesOverviewProps {
  // WHMCS data: GetClientsProducts, GetClientsDomains
  services?: Service[]
}

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

export function DashboardServicesOverview({ services = [] }: DashboardServicesOverviewProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  // Placeholder data - in real app, this comes from WHMCS
  const placeholderServices: Service[] = services.length > 0 ? services : [
    {
      id: '1',
      name: 'example.com',
      type: 'domain',
      status: 'active',
      daysRemaining: 245,
    },
    {
      id: '2',
      name: 'Business Hosting Plan',
      type: 'hosting',
      status: 'active',
      daysRemaining: 120,
    },
    {
      id: '3',
      name: 'example.com SSL',
      type: 'ssl',
      status: 'expiringSoon',
      daysRemaining: 15,
    },
  ]

  const getStatusLabel = (status: ServiceStatus) => {
    return t(`services.${status}`)
  }

  const getTypeLabel = (type: ServiceType) => {
    return t(`services.${type}`)
  }

  const formatExpiry = (service: Service) => {
    if (service.daysRemaining === undefined) return null
    
    if (service.daysRemaining === 0) {
      return t('services.expiresToday')
    } else if (service.daysRemaining < 0) {
      return t('services.expiredDaysAgo', { days: Math.abs(service.daysRemaining) })
    } else {
      return t('services.daysRemaining', { days: service.daysRemaining })
    }
  }

  if (placeholderServices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('services.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">{t('services.noServices')}</p>
            <p className="text-sm text-muted-foreground">{t('services.noServicesDescription')}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{t('services.title')}</CardTitle>
        <CardAction>
          <Button asChild variant="ghost" size="sm">
            <Link href={getPath('/dashboard/services')}>
              {t('services.viewAll')}
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3" role="list">
          {placeholderServices.slice(0, 5).map((service) => {
            const Icon = serviceIcons[service.type]
            const expiryText = formatExpiry(service)
            const needsRenewal = service.status === 'expiringSoon' || service.status === 'expired'

            return (
              <li key={service.id}>
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{service.name}</p>
                        <Badge variant={statusVariants[service.status]} className="text-xs">
                          {getStatusLabel(service.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{getTypeLabel(service.type)}</span>
                        {expiryText && (
                          <>
                            <span aria-hidden="true">•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" aria-hidden="true" />
                              <span>{expiryText}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {needsRenewal && (
                    <Button asChild size="sm" variant="outline">
                      <Link href={getPath(`/dashboard/services/${service.id}/renew`)}>
                        {t('services.renewNow')}
                      </Link>
                    </Button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
