import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HostingPlanFeature {
  text: string
}

interface HostingPlanCardProps {
  name: string
  description?: string
  price: string
  pricePeriod?: string
  renewalNote?: string
  features: HostingPlanFeature[]
  actionLabel: string
  actionHref: string
  isPopular?: boolean
  popularLabel?: string
  className?: string
}

export function HostingPlanCard({
  name,
  description,
  price,
  pricePeriod = "/month",
  renewalNote,
  features,
  actionLabel,
  actionHref,
  isPopular = false,
  popularLabel = "Most popular",
  className,
}: HostingPlanCardProps) {
  // TODO: Add analytics tracking for plan selections

  return (
    <div
      className={cn(
        "bg-card border-2 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow",
        isPopular ? "border-primary shadow-lg relative" : "border-border",
        className
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium" aria-label={popularLabel}>
          {popularLabel}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-2xl text-foreground mb-2">{name}</h3>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-foreground">{price}</span>
            {pricePeriod && <span className="text-muted-foreground">{pricePeriod}</span>}
          </div>
          {renewalNote && <p className="text-sm text-muted-foreground mt-2">{renewalNote}</p>}
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>
        <Link href={actionHref}>
          <Button className={cn("w-full h-11", isPopular ? "shadow-md" : "shadow-sm")}>
            {actionLabel}
          </Button>
        </Link>
      </div>
    </div>
  )
}
