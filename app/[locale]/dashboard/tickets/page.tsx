import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { MessageSquare, Plus, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/dashboard/tickets' },
    {
      en: {
        title: 'Support Tickets - Dashboard',
        description: 'View and manage your support tickets',
      },
      tr: {
        title: 'Destek Talepleri - Kontrol Paneli',
        description: 'Destek taleplerinizi görüntüleyin ve yönetin',
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetTickets
const placeholderTickets = [
  {
    id: '1',
    ticketNumber: 'TKT-2024-001',
    subject: 'Need help with SSL setup',
    status: 'answered' as const,
    lastReply: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    ticketNumber: 'TKT-2024-002',
    subject: 'Domain transfer question',
    status: 'open' as const,
    lastReply: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    ticketNumber: 'TKT-2024-003',
    subject: 'Hosting plan upgrade',
    status: 'closed' as const,
    lastReply: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    created: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
  },
]

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  const statusConfig = {
    open: { label: t.tickets.open, variant: 'default' as const },
    answered: { label: t.tickets.answered, variant: 'secondary' as const },
    closed: { label: t.tickets.closed, variant: 'outline' as const },
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {t.ticketsPage.title}
            </h1>
            <p className="text-muted-foreground">
              {t.ticketsPage.subtitle}
            </p>
          </div>
          <Link href={getPath('/dashboard/tickets/new')}>
            <Button>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.ticketsPage.createTicket}
            </Button>
          </Link>
        </div>
      </div>

      {placeholderTickets.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
          <p className="text-lg font-medium text-foreground mb-2">
            {t.tickets.noTickets}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {t.ticketsPage.noTicketsDescription}
          </p>
          <Link href={getPath('/dashboard/tickets/new')}>
            <Button>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.ticketsPage.createFirstTicket}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {placeholderTickets.map((ticket) => {
            const config = statusConfig[ticket.status] || statusConfig.open
            return (
              <Link
                key={ticket.id}
                href={getPath(`/dashboard/tickets/${ticket.id}`)}
                className="block rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {ticket.subject}
                      </h3>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{ticket.ticketNumber}</span>
                      <span>{t.ticketsPage.created} {format(new Date(ticket.created), 'MMM d, yyyy')}</span>
                      {ticket.lastReply && (
                        <span>{t.ticketsPage.lastReply} {format(new Date(ticket.lastReply), 'MMM d, yyyy')}</span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
