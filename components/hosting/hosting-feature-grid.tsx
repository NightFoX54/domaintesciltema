import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HostingFeature {
  title: string
  description: string
  icon: ReactNode
}

interface HostingFeatureGridProps {
  features: HostingFeature[]
  className?: string
  columns?: 2 | 3
}

export function HostingFeatureGrid({
  features,
  className,
  columns = 3,
}: HostingFeatureGridProps) {
  // TODO: Add accessibility improvements

  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"

  return (
    <div className={cn("grid gap-8 max-w-6xl mx-auto", gridCols, className)}>
      {features.map((feature, index) => (
        <div key={index} className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
