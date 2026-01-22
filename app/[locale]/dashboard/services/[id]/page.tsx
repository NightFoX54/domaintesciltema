'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { addLocaleToPath } from "@/lib/locale-utils"
import { ExternalLink } from "lucide-react"
import { formatDate, formatCurrency } from "@/lib/format-utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useParams } from "next/navigation"
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

// PLACEHOLDER DATA - Replace with WHMCS API: GetClientsProducts (single product)
function getPlaceholderService(locale: 'en' | 'tr') {
  const t = locale === 'en' ? enDashboard : trDashboard
  
  return {
    id: '1',
    name: t.placeholderData.serviceNames.wordpressStarter,
    domain: 'example.com',
    status: 'active' as const,
    renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    expiresDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    price: 29.99,
    billingCycle: t.placeholderData.billingCycles.monthly,
    // Additional WHMCS data would include: product name, domain, status, next due date, 
    // amount, billing cycle, username, password, notes, etc.
  }
}

export default function ServiceDetailPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const getPath = (path: string) => addLocaleToPath(path, validLocale)
  const tDashboard = validLocale === 'en' ? enDashboard : trDashboard

  // PLACEHOLDER DATA - Replace with WHMCS API: GetClientsProducts (single product)
  const placeholderService = getPlaceholderService(validLocale)

  const statusConfig = {
    active: { label: tDashboard.status.active, variant: 'default' as const },
    suspended: { label: tDashboard.status.suspended, variant: 'destructive' as const },
    pending: { label: tDashboard.status.pending, variant: 'secondary' as const },
    cancelled: { label: tDashboard.status.cancelled, variant: 'outline' as const },
    expired: { label: tDashboard.status.expired, variant: 'destructive' as const },
  }

  const config = statusConfig[placeholderService.status] || statusConfig.active

  const handleCancellation = () => {
    // TODO: Implement cancellation request - this would call WHMCS API
    // This would typically show a success/error message via toast or aria-live region
  }

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getPath('/dashboard')}>{tDashboard.navigation.dashboard}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={getPath('/dashboard/services')}>{tDashboard.navigation.services}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{placeholderService.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {placeholderService.name}
            </h1>
            {placeholderService.domain && (
              <p className="text-muted-foreground">{placeholderService.domain}</p>
            )}
          </div>
          <Badge variant={config.variant} className="text-sm">
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Service Details */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {tDashboard.serviceDetail.serviceDetails}
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{tDashboard.serviceDetail.serviceId}</dt>
                <dd className="font-medium text-foreground">{placeholderService.id}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{tDashboard.serviceDetail.billingCycle}</dt>
                <dd className="font-medium text-foreground">{placeholderService.billingCycle}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{tDashboard.serviceDetail.nextDueDate}</dt>
                <dd className="font-medium text-foreground">
                  {formatDate(placeholderService.renewalDate, validLocale, { month: 'long', day: 'numeric', year: 'numeric' })}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground mb-1">{tDashboard.serviceDetail.amount}</dt>
                <dd className="font-medium text-foreground">
                  {formatCurrency(placeholderService.price, validLocale)} / {placeholderService.billingCycle.toLowerCase()}
                </dd>
              </div>
            </dl>
          </section>

          {/* Actions */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {tDashboard.serviceDetail.actions}
            </h2>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                {tDashboard.serviceDetail.renewService}
              </Button>
              <Button className="w-full" variant="outline">
                {tDashboard.serviceDetail.upgradePlan}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    {tDashboard.serviceDetail.requestCancellation}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{tDashboard.serviceDetail.cancellationConfirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {tDashboard.serviceDetail.cancellationConfirmDescription}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{tDashboard.serviceDetail.cancellationCancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancellation}>
                      {tDashboard.serviceDetail.cancellationConfirmAction}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Quick Links */}
          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {tDashboard.serviceDetail.quickLinks}
            </h2>
            <div className="space-y-2">
              {/* TODO: Replace with WHMCS control panel URL when available */}
              <Button variant="ghost" className="w-full justify-start opacity-50 cursor-not-allowed" asChild>
                <a 
                  aria-disabled="true" 
                  onClick={(e) => e.preventDefault()}
                  aria-label={tDashboard.serviceDetail.controlPanel}
                >
                  <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                  {tDashboard.serviceDetail.controlPanel}
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={getPath('/dashboard/tickets/new')}>
                  {tDashboard.serviceDetail.openSupportTicket}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
