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
    { path: '/dashboard/tickets/new' },
    {
      en: {
        title: 'Create Support Ticket - Dashboard',
        description: 'Create a new support ticket',
      },
      tr: {
        title: 'Destek Talebi Oluştur - Kontrol Paneli',
        description: 'Yeni bir destek talebi oluşturun',
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
            Ticket creation form will be implemented here.
            <br />
            This would integrate with WHMCS OpenTicket API.
          </p>
        </div>
      </div>
    </>
  )
}
