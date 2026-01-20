import { ReactNode } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureItem {
  text: string
  icon?: ReactNode
}

interface FeatureListProps {
  features: FeatureItem[]
  className?: string
  iconClassName?: string
  textClassName?: string
  useCheckIcon?: boolean
}

export function FeatureList({
  features,
  className,
  iconClassName,
  textClassName,
  useCheckIcon = true,
}: FeatureListProps) {
  return (
    <ul className={cn("space-y-3 text-[15px]", className)}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          {useCheckIcon ? (
            <Check className={cn("h-5 w-5 text-foreground/70 mt-0.5 flex-shrink-0", iconClassName)} aria-hidden="true" />
          ) : (
            feature.icon ? (
              <span aria-hidden="true">{feature.icon}</span>
            ) : (
              <span className="text-foreground/70 mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
            )
          )}
          <span className={cn("text-muted-foreground", textClassName)}>{feature.text}</span>
        </li>
      ))}
    </ul>
  )
}
