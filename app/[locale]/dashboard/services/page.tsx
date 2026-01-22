import type { Metadata } from "next"
import Link from "next/link"
import { ServiceCard } from "@/components/dashboard"
import { createMetadata } from "@/lib/seo"
import { addLocaleToPath } from "@/lib/locale-utils"
import { Button } from "@/components/ui/button"
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
    { path: '/dashboard/services', noindex: true, nofollow: true },
    {
      en: {
        title: enDashboard.seo.services.title,
        description: enDashboard.seo.services.description,
      },
      tr: {
        title: trDashboard.seo.services.title,
        description: trDashboard.seo.services.description,
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetClientProducts
function getPlaceholderServices(locale: 'en' | 'tr') {
  const t = locale === 'en' ? enDashboard : trDashboard
  
  return [
    {
      id: '1',
      name: t.placeholderData.serviceNames.wordpressStarter,
      domain: 'example.com',
      status: 'active' as const,
      renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      expiresDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: t.placeholderData.serviceNames.linuxPro,
      domain: 'mysite.com',
      status: 'active' as const,
      renewalDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      expiresDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: t.placeholderData.serviceNames.joomlaBasic,
      domain: 'test.com',
      status: 'suspended' as const,
      renewalDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      expiresDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    },
  ]
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const t = validLocale === 'en' ? enDashboard : trDashboard

  // PLACEHOLDER DATA - Replace with WHMCS API: GetClientProducts
  const placeholderServices = getPlaceholderServices(validLocale)

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {t.servicesPage.title}
        </h1>
        <p className="text-muted-foreground">
          {t.servicesPage.subtitle}
        </p>
      </div>

      {placeholderServices.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              {t.services.empty}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.services.emptyDescription}
            </p>
          </div>
          <Link href={getPath('/hosting')}>
            <Button variant="outline">
              {t.services.emptyAction}
            </Button>
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {placeholderServices.map((service) => (
            <li key={service.id}>
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
