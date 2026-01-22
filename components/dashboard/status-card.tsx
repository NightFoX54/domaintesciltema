'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

interface StatusCardProps {
  status: 'healthy' | 'warning' | 'critical'
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function StatusCard({ status, title, description, icon, action }: StatusCardProps) {
  const statusConfig = {
    healthy: {
      icon: CheckCircle2,
      className: 'text-green-600 dark:text-green-500',
      bgClassName: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900',
    },
    warning: {
      icon: AlertCircle,
      className: 'text-amber-600 dark:text-amber-500',
      bgClassName: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900',
    },
    critical: {
      icon: XCircle,
      className: 'text-red-600 dark:text-red-500',
      bgClassName: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900',
    },
  }

  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <div className={cn(
      "rounded-lg border p-6 transition-colors",
      config.bgClassName
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={cn("flex-shrink-0", config.className)}>
            {icon || <StatusIcon className="h-6 w-6" aria-hidden="true" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
