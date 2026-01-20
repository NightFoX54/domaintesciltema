'use client'

import Link from 'next/link'
import { MessageSquare, HelpCircle, Mail, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DashboardSupportSectionProps {
  // WHMCS data: GetSupportStatus, GetTickets
  activeTicketCount?: number
}

export function DashboardSupportSection({ activeTicketCount = 0 }: DashboardSupportSectionProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const supportActions = [
    {
      label: t('support.openTicket'),
      href: getPath('/support'),
      icon: MessageSquare,
      primary: true,
    },
    {
      label: t('support.viewTickets'),
      href: getPath('/dashboard/tickets'),
      icon: MessageSquare,
      primary: false,
    },
    {
      label: t('support.knowledgeBase'),
      href: getPath('/support'),
      icon: HelpCircle,
      primary: false,
    },
    {
      label: t('support.contactUs'),
      href: getPath('/contact'),
      icon: Mail,
      primary: false,
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-muted/30 to-muted/10">
      <CardHeader>
        <CardTitle className="text-lg">{t('support.title')}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {t('support.description')}
        </p>
      </CardHeader>
      <CardContent>
        {activeTicketCount > 0 && (
          <div className="mb-4 p-3 rounded-lg border bg-background">
            <p className="text-sm font-medium text-foreground mb-1">
              {t('support.activeTickets')}: {activeTicketCount}
            </p>
            <Button asChild variant="outline" size="sm" className="w-full mt-2">
              <Link href={getPath('/dashboard/tickets')}>
                {t('support.viewTickets')}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {supportActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.href}
                asChild
                variant={action.primary ? 'default' : 'outline'}
                size="sm"
                className="h-auto flex-col gap-2 py-3"
              >
                <Link href={action.href}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs text-center leading-tight">
                    {action.label}
                  </span>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
