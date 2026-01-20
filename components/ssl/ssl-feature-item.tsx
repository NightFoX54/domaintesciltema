import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SSLFeatureItemProps {
  title: string
  description: string
  className?: string
}

export function SSLFeatureItem({ title, description, className }: SSLFeatureItemProps) {
  return (
    <div className={cn("flex items-start gap-4 bg-background p-6 rounded-xl border border-border", className)}>
      <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
