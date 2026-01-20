'use client'

import { useTranslation } from '@/lib/i18n'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  DashboardStatusHero,
  DashboardQuickActions,
  DashboardServicesOverview,
  DashboardRecentActivity,
  DashboardBillingOverview,
  DashboardSupportSection,
} from '@/components/dashboard'

export default function DashboardPage() {
  const { t } = useTranslation('dashboard')

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t('greeting.morning')
    if (hour < 18) return t('greeting.afternoon')
    return t('greeting.evening')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {getGreeting()}
            </h1>
            <p className="text-muted-foreground">
              {t('title')}
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Hero - Most Important */}
              <DashboardStatusHero />

              {/* Quick Actions */}
              <DashboardQuickActions />

              {/* Services Overview */}
              <DashboardServicesOverview />

              {/* Recent Activity */}
              <DashboardRecentActivity />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Billing Overview */}
              <DashboardBillingOverview />

              {/* Support Section */}
              <DashboardSupportSection />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
