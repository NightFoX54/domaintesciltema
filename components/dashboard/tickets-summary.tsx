'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Plus, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

interface Ticket {
  id: string
  subject: string
  status: 'open' | 'answered' | 'closed'
  lastReply?: Date
  // WHMCS data: ticket ID, subject, status, last reply date, etc.
}

interface TicketsSummaryProps {
  tickets: Ticket[]
}

export function TicketsSummary({ tickets }: TicketsSummaryProps) {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const statusConfig = {
    open: { label: t('tickets.open'), variant: 'default' as const },
    answered: { label: t('tickets.answered'), variant: 'secondary' as const },
    closed: { label: t('tickets.closed'), variant: 'outline' as const },
  }

  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'answered')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {t('tickets.title')}
        </h2>
        <div className="flex items-center gap-2">
          <Link href={getPath('/dashboard/tickets/new')}>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t('tickets.createTicket')}
            </Button>
          </Link>
          {tickets.length > 0 && (
            <Link href={getPath('/dashboard/tickets')}>
              <Button variant="ghost" size="sm" className="gap-2">
                {t('tickets.viewAll')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
          <p className="font-medium text-foreground mb-2">{t('tickets.noTickets')}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {t('tickets.subtitle')}
          </p>
          <Link href={getPath('/dashboard/tickets/new')}>
            <Button>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              {t('tickets.createTicket')}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.slice(0, 3).map((ticket) => {
            const config = statusConfig[ticket.status] || statusConfig.open
            return (
              <Link
                key={ticket.id}
                href={getPath(`/dashboard/tickets/${ticket.id}`)}
                className="block rounded-lg border bg-card p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-1 truncate">
                      {ticket.subject}
                    </h3>
                    {ticket.lastReply && (
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(ticket.lastReply), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>
              </Link>
            )
          })}
          {tickets.length > 3 && (
            <Link href={getPath('/dashboard/tickets')}>
              <Button variant="outline" className="w-full" size="sm">
                {t('tickets.viewAll')} ({tickets.length})
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
