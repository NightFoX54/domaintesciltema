import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  pricePeriod?: string
  description: string
  features: string[]
  actionLabel: string
  actionHref: string
  isPopular?: boolean
  popularLabel?: string
  variant?: "default" | "primary"
  className?: string
}

export function PricingCard({
  title,
  price,
  pricePeriod = "/year",
  description,
  features,
  actionLabel,
  actionHref,
  isPopular = false,
  popularLabel,
  variant = "default",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "bg-background p-8 rounded-xl shadow-sm border flex flex-col relative",
        isPopular ? "border-2 border-primary" : "border-border",
        className
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          {popularLabel}
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-semibold text-primary mb-3">
        {price}
        {pricePeriod && <span className="text-base font-normal text-muted-foreground">{pricePeriod}</span>}
      </div>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">{description}</p>

      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-[15px]">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          className={cn("w-full", variant === "primary" ? "" : "bg-transparent")}
          variant={variant === "primary" ? "default" : "outline"}
          asChild
        >
          <Link href={actionHref}>
            {actionLabel}
            <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
