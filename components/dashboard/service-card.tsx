'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Server, ExternalLink, AlertCircle } from 'lucide-react'
import { formatDate, isExpiringSoon as checkExpiringSoon } from '@/lib/format-utils'

interface ServiceCardProps {
  id: string
  name: string
  domain?: string
  status: 'active' | 'suspended' | 'pending' | 'cancelled' | 'expired'
  renewalDate?: Date
  expiresDate?: Date
  // WHMCS data: service ID, product name, domain, status, next due date, etc.
}

export function ServiceCard({ 
  id, 
  name, 
  domain, 
  status, 
  renewalDate,
  expiresDate 
}: ServiceCardProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const statusConfig = {
    active: { label: t('status.active'), variant: 'default' as const },
    suspended: { label: t('status.suspended'), variant: 'destructive' as const },
    pending: { label: t('status.pending'), variant: 'secondary' as const },
    cancelled: { label: t('status.cancelled'), variant: 'outline' as const },
    expired: { label: t('status.expired'), variant: 'destructive' as const },
  }

  const config = statusConfig[status] || statusConfig.active
  const isExpiringSoon = checkExpiringSoon(expiresDate)

  return (
    <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
            <Server className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 truncate">{name}</h3>
            {domain && (
              <p className="text-sm text-muted-foreground truncate">{domain}</p>
            )}
          </div>
        </div>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>

      {(renewalDate || expiresDate) && (
        <div className="mb-4 space-y-1">
          {renewalDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('services.renewalDate')}:</span>
              <span className="font-medium text-foreground">
                {formatDate(renewalDate, locale)}
              </span>
            </div>
          )}
          {expiresDate && (
            <div className={cn(
              "flex items-center justify-between text-sm",
              isExpiringSoon && "text-amber-600 dark:text-amber-500"
            )}>
              <span className={isExpiringSoon ? "font-medium" : "text-muted-foreground"}>
                {t('services.expires')}:
              </span>
              <span className="font-medium">
                {formatDate(expiresDate, locale)}
                {isExpiringSoon && (
                  <AlertCircle className="inline-block h-4 w-4 ml-1" aria-hidden="true" />
                )}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Link href={getPath(`/dashboard/services/${id}`)} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            {t('services.manage')}
          </Button>
        </Link>
        <Link href={getPath(`/dashboard/services/${id}`)}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-3"
            aria-label={t('services.viewDetails')}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
