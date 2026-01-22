'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Globe, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react'
import { formatDate, isExpiringSoon as checkExpiringSoon } from '@/lib/format-utils'

interface DomainCardProps {
  id: string
  domain: string
  status: 'active' | 'expired' | 'pending'
  expiresDate?: Date
  autoRenew?: boolean
  // WHMCS data: domain ID, domain name, expiry date, auto-renew status, etc.
}

export function DomainCard({ 
  id, 
  domain, 
  status, 
  expiresDate,
  autoRenew = false
}: DomainCardProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const statusConfig = {
    active: { label: t('status.active'), variant: 'default' as const },
    expired: { label: t('status.expired'), variant: 'destructive' as const },
    pending: { label: t('status.pending'), variant: 'secondary' as const },
  }

  const config = statusConfig[status] || statusConfig.active
  const isExpiringSoon = checkExpiringSoon(expiresDate)

  return (
    <div className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
            <Globe className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 truncate">{domain}</h3>
            {autoRenew && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t('domains.autoRenew')}</span>
              </div>
            )}
          </div>
        </div>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>

      {expiresDate && (
        <div className={cn(
          "mb-4 flex items-center justify-between text-sm",
          isExpiringSoon && "text-amber-600 dark:text-amber-500"
        )}>
          <span className={isExpiringSoon ? "font-medium" : "text-muted-foreground"}>
            {t('domains.expires')}:
          </span>
          <span className="font-medium">
            {formatDate(expiresDate, locale)}
            {isExpiringSoon && (
              <AlertCircle className="inline-block h-4 w-4 ml-1" aria-hidden="true" />
            )}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Link href={getPath(`/dashboard/domains/${id}`)} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            {t('domains.manage')}
          </Button>
        </Link>
        {isExpiringSoon && !autoRenew && (
          <Link href={getPath(`/dashboard/domains/${id}/renew`)}>
            <Button size="sm" className="px-3">
              {t('domains.renewNow')}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
