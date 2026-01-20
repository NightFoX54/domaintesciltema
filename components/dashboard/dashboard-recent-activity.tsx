'use client'

import { Clock, Globe, Server, Lock, MessageSquare, CreditCard, FileText } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// WHMCS data types (conceptual)
type ActivityType = 
  | 'domainRenewed' 
  | 'domainRegistered' 
  | 'hostingActivated' 
  | 'sslInstalled' 
  | 'ticketOpened' 
  | 'ticketReplied' 
  | 'paymentReceived' 
  | 'invoiceGenerated'

interface Activity {
  id: string
  type: ActivityType
  description: string
  timestamp: string // ISO date string
  relativeTime: string // e.g., "2 hours ago"
}

interface DashboardRecentActivityProps {
  // WHMCS data: GetActivityLog or similar
  activities?: Activity[]
}

const activityIcons = {
  domainRenewed: Globe,
  domainRegistered: Globe,
  hostingActivated: Server,
  sslInstalled: Lock,
  ticketOpened: MessageSquare,
  ticketReplied: MessageSquare,
  paymentReceived: CreditCard,
  invoiceGenerated: FileText,
}

export function DashboardRecentActivity({ activities = [] }: DashboardRecentActivityProps) {
  const { t } = useTranslation('dashboard')

  // Placeholder data - in real app, this comes from WHMCS
  const placeholderActivities: Activity[] = activities.length > 0 ? activities : [
    {
      id: '1',
      type: 'domainRenewed',
      description: 'example.com',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      relativeTime: t('recentActivity.ago', { time: '2 hours' }),
    },
    {
      id: '2',
      type: 'paymentReceived',
      description: '$49.99',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      relativeTime: t('recentActivity.ago', { time: '5 hours' }),
    },
    {
      id: '3',
      type: 'ticketReplied',
      description: '#12345',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      relativeTime: t('recentActivity.ago', { time: '1 day' }),
    },
  ]

  if (placeholderActivities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('recentActivity.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">{t('recentActivity.empty')}</p>
            <p className="text-sm text-muted-foreground">{t('recentActivity.emptyDescription')}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('recentActivity.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3" role="list">
          {placeholderActivities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const activityLabel = t(`recentActivity.${activity.type}`)

            return (
              <li key={activity.id}>
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="rounded-full bg-muted p-2">
                      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activityLabel}
                    </p>
                    {activity.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <time dateTime={activity.timestamp}>
                      {activity.relativeTime}
                    </time>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
