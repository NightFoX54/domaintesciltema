import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/dashboard/tickets/[id]' },
    {
      en: {
        title: 'Ticket Details - Dashboard',
        description: 'View ticket details and replies',
      },
      tr: {
        title: 'Talep Detayları - Kontrol Paneli',
        description: 'Talep detaylarını ve yanıtları görüntüleyin',
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetTicket
const placeholderTicket = {
  id: '1',
  ticketNumber: 'TKT-2024-001',
  subject: 'Need help with SSL setup',
  status: 'answered' as const,
  created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  lastReply: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  messages: [
    {
      id: '1',
      author: 'You',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      message: 'I need help setting up SSL for my domain. Can you guide me through the process?',
    },
    {
      id: '2',
      author: 'Support Team',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      message: 'We\'d be happy to help! SSL setup is automatic for most hosting plans. Let me check your account and get back to you with specific instructions.',
    },
  ],
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  const statusConfig = {
    open: { label: t.tickets.open, variant: 'default' as const },
    answered: { label: t.tickets.answered, variant: 'secondary' as const },
    closed: { label: t.tickets.closed, variant: 'outline' as const },
  }

  const config = statusConfig[placeholderTicket.status] || statusConfig.open

  return (
    <>
      <Link 
        href={getPath('/dashboard/tickets')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t.ticketsPage.backToTickets}
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {placeholderTicket.subject}
            </h1>
            <p className="text-muted-foreground">
              {placeholderTicket.ticketNumber}
            </p>
          </div>
          <Badge variant={config.variant} className="text-sm">
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {placeholderTicket.messages.map((message) => (
          <div
            key={message.id}
            className="rounded-lg border bg-card p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {message.author === 'You' ? t.ticketDetail.you : t.ticketDetail.supportTeam}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(message.date), 'MMMM d, yyyy \'at\' h:mm a')}
                </p>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>
        ))}

        {/* Reply Form */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {t.ticketDetail.addReply}
          </h2>
          <div className="space-y-4">
            <textarea
              className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder={t.ticketDetail.typeReplyPlaceholder}
            />
            <Button>{t.ticketDetail.sendReply}</Button>
          </div>
        </div>
      </div>
    </>
  )
}
