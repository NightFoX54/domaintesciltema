'use client'

import { useTranslation } from '@/lib/i18n'

export function DashboardHeader() {
  const { t } = useTranslation('dashboard')
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t('greeting.goodMorning')
    if (hour < 18) return t('greeting.goodAfternoon')
    return t('greeting.goodEvening')
  }

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold text-foreground mb-2">
        {getGreeting()}
      </h1>
      <p className="text-muted-foreground">
        {t('overview.subtitle')}
      </p>
    </header>
  )
}
