import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatItem {
  value: string
  description: string
  icon?: ReactNode
}

interface StatsSectionProps {
  stats: StatItem[]
  className?: string
  containerClassName?: string
}

export function StatsSection({ stats, className, containerClassName }: StatsSectionProps) {
  return (
    <section className={cn("bg-muted/40 py-20 border-b border-border/40", className)}>
      <div className={cn("container mx-auto px-4 lg:px-6", containerClassName)}>
        <div className="grid md:grid-cols-3 gap-16 text-center max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              {stat.icon && <div className="mb-2" aria-hidden="true">{stat.icon}</div>}
              <div className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground" aria-label={stat.value}>
                {stat.value}
              </div>
              <div className="text-[15px] text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
