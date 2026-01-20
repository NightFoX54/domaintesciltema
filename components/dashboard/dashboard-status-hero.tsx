'use client'

import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DashboardStatusHeroProps {
  // WHMCS data: Overall system status
  // This would come from WHMCS API: GetClientStatusSummary or similar
  hasIssues?: boolean
  issueCount?: number
}

export function DashboardStatusHero({ 
  hasIssues = false, 
  issueCount = 0 
}: DashboardStatusHeroProps) {
  const { t } = useTranslation('dashboard')

  return (
    <Card className="border-2 bg-gradient-to-br from-background to-muted/20">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {hasIssues ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" aria-hidden="true" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    {t('status.attentionNeeded')}
                  </h2>
                </div>
                <p className="text-muted-foreground text-base">
                  {issueCount === 1 
                    ? t('status.issue')
                    : `${issueCount} ${t('status.issues')}`
                  }
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" aria-hidden="true" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    {t('status.title')}
                  </h2>
                </div>
                <p className="text-muted-foreground text-base">
                  {t('status.subtitle')}
                </p>
              </>
            )}
          </div>
          
          {!hasIssues && (
            <Badge 
              variant="secondary" 
              className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200 dark:border-green-800"
            >
              {t('status.allGood')}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
