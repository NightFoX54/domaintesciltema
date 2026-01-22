'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  FileText, 
  Globe, 
  RefreshCw, 
  ArrowUp 
} from 'lucide-react'

const actions = [
  { key: 'openTicket', icon: MessageSquare, href: '/dashboard/tickets/new' },
  { key: 'viewInvoices', icon: FileText, href: '/dashboard/billing' },
  { key: 'addDomain', icon: Globe, href: '/domains/search' },
  { key: 'renewService', icon: RefreshCw, href: '/dashboard/services' },
  { key: 'upgradePlan', icon: ArrowUp, href: '/dashboard/services' },
]

export function QuickActions() {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        {t('quickActions.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.key} href={getPath(action.href)}>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 px-4 hover:bg-muted/50"
              >
                <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm font-medium">{t(`quickActions.${action.key}`)}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
