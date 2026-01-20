'use client'

import Link from 'next/link'
import { Globe, Server, MessageSquare, CreditCard, Activity } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function DashboardQuickActions() {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const actions = [
    {
      label: t('quickActions.manageDomains'),
      href: getPath('/domains'),
      icon: Globe,
    },
    {
      label: t('quickActions.viewHosting'),
      href: getPath('/hosting'),
      icon: Server,
    },
    {
      label: t('quickActions.openTicket'),
      href: getPath('/support'),
      icon: MessageSquare,
    },
    {
      label: t('quickActions.viewBilling'),
      href: getPath('/dashboard/billing'),
      icon: CreditCard,
    },
    {
      label: t('quickActions.checkStatus'),
      href: getPath('/status'),
      icon: Activity,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('quickActions.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <nav aria-label={t('quickActions.title')}>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <li key={action.href}>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-auto flex-col gap-2 py-4 px-3 hover:bg-accent/50"
                  >
                    <Link href={action.href}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs font-medium text-center leading-tight">
                        {action.label}
                      </span>
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}
