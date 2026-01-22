import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { formatDateTime } from "@/lib/format-utils"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
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
    { path: '/dashboard/tickets/[id]', noindex: true, nofollow: true },
    {
      en: {
        title: `${enDashboard.placeholderData.ticketSubjects.sslSetup} - ${enDashboard.seo.ticketsDetail.title}`,
        description: enDashboard.seo.ticketsDetail.description,
      },
      tr: {
        title: `${trDashboard.placeholderData.ticketSubjects.sslSetup} - ${trDashboard.seo.ticketsDetail.title}`,
        description: trDashboard.seo.ticketsDetail.description,
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetTicket
function getPlaceholderTicket(locale: 'en' | 'tr') {
  const t = locale === 'en' ? enDashboard : trDashboard
  
  return {
    id: '1',
    ticketNumber: 'TKT-2024-001',
    subject: t.placeholderData.ticketSubjects.sslSetup,
    status: 'answered' as const,
    created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastReply: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messages: [
      {
        id: '1',
        author: 'You',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        message: t.placeholderData.ticketMessages.sslRequest,
      },
      {
        id: '2',
        author: 'Support Team',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        message: t.placeholderData.ticketMessages.sslResponse,
      },
    ],
  }
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

  // PLACEHOLDER DATA - Replace with WHMCS API: GetTicket
  const placeholderTicket = getPlaceholderTicket(validLocale)

  const statusConfig = {
    open: { label: t.tickets.open, variant: 'default' as const },
    answered: { label: t.tickets.answered, variant: 'secondary' as const },
    closed: { label: t.tickets.closed, variant: 'outline' as const },
  }

  const config = statusConfig[placeholderTicket.status] || statusConfig.open

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getPath('/dashboard')}>{t.navigation.dashboard}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getPath('/dashboard/tickets')}>{t.navigation.tickets}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{placeholderTicket.subject}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

      <ul className="space-y-6">
        {placeholderTicket.messages.map((message) => (
          <li key={message.id}>
            <article className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {message.author === 'You' ? t.ticketDetail.you : t.ticketDetail.supportTeam}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDateTime(message.date, validLocale)}
                </p>
              </div>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
            </article>
          </li>
        ))}
      </ul>

        {/* Reply Form */}
        <section className="rounded-lg border bg-card p-6" aria-labelledby="reply-heading">
          <h2 id="reply-heading" className="text-lg font-semibold text-foreground mb-4">
            {t.ticketDetail.addReply}
          </h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* TODO: Handle submit */ }}>
            <div>
              <label htmlFor="reply-textarea" className="sr-only">
                {t.ticketDetail.typeReplyPlaceholder}
              </label>
              <textarea
                id="reply-textarea"
                name="reply"
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder={t.ticketDetail.typeReplyPlaceholder}
                required
              />
            </div>
            <Button type="submit">{t.ticketDetail.sendReply}</Button>
          </form>
        </section>
    </>
  )
}
