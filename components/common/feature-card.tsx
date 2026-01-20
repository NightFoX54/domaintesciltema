import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  iconBackground?: boolean
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  iconBackground = true,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            "mb-5 flex h-14 w-14 items-center justify-center rounded-xl",
            iconBackground && "bg-muted/60"
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-[15px] text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
