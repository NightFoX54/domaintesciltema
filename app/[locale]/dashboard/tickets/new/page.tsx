import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { ArrowLeft } from "lucide-react"
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
    { path: '/dashboard/tickets/new', noindex: true, nofollow: true },
    {
      en: {
        title: enDashboard.seo.ticketsNew.title,
        description: enDashboard.seo.ticketsNew.description,
      },
      tr: {
        title: trDashboard.seo.ticketsNew.title,
        description: trDashboard.seo.ticketsNew.description,
      },
    },
    validLocale
  )
}

export default async function NewTicketPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  return (
    <>
      <Link 
        href={getPath('/dashboard/tickets')}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t.newTicket.backToTickets}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {t.newTicket.title}
        </h1>
        <p className="text-muted-foreground">
          {t.newTicket.subtitle}
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="rounded-lg border bg-card p-8">
          <p className="text-muted-foreground text-center">
            {t.ticketForm.placeholder}
            <br />
            {t.ticketForm.apiNote}
          </p>
        </div>
      </div>
    </>
  )
}
