import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DomainFeatureBadge {
  icon: ReactNode
  label: string
}

interface DomainFeatureBadgesProps {
  badges: DomainFeatureBadge[]
  className?: string
}

export function DomainFeatureBadges({ badges, className }: DomainFeatureBadgesProps) {
  // TODO: Add accessibility improvements (ARIA labels)

  return (
    <div className={cn("flex flex-wrap gap-6 pt-4 border-t border-border/40", className)}>
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          {badge.icon}
          <span className="text-sm text-muted-foreground">{badge.label}</span>
        </div>
      ))}
    </div>
  )
}
