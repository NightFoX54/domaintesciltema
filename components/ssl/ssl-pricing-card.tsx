import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SSLPricingFeature {
  text: string
}

interface SSLPricingCardProps {
  price: string
  pricePeriod?: string
  features: SSLPricingFeature[]
  actionLabel: string
  actionHref: string
  renewalNote?: string
  className?: string
}

export function SSLPricingCard({
  price,
  pricePeriod = "/year",
  features,
  actionLabel,
  actionHref,
  renewalNote,
  className,
}: SSLPricingCardProps) {
  // TODO: Add analytics tracking

  return (
    <div className={cn("max-w-md mx-auto bg-background p-10 rounded-2xl shadow-sm border border-border", className)}>
      <div className="text-center mb-8">
        <div className="text-5xl font-semibold mb-2">{price}</div>
        {pricePeriod && <div className="text-muted-foreground">{pricePeriod}</div>}
      </div>

      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
            <span className="text-[15px]">{feature.text}</span>
          </div>
        ))}
      </div>

      <Button size="lg" className="w-full text-base" asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>

      {renewalNote && (
        <p className="text-[13px] text-muted-foreground text-center mt-6">{renewalNote}</p>
      )}
    </div>
  )
}
