import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  description: string
  features: string[]
  footerText?: string
  actionLabel: string
  actionHref: string
  icon?: ReactNode
  className?: string
}

export function ProductCard({
  title,
  description,
  features,
  footerText,
  actionLabel,
  actionHref,
  icon,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "border-2 border-border rounded-2xl p-8 space-y-6 hover:border-foreground/30 hover:shadow-lg hover:bg-card transition-all",
        className
      )}
    >
      <CardContent>
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-2xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">{description}</p>

        <ul className="space-y-3 text-[15px]">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-foreground/70 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {footerText && (
          <p className="text-sm text-muted-foreground/80 leading-relaxed pt-2 border-t border-border/50">
            {footerText}
          </p>
        )}

        <Link href={actionHref}>
          <Button variant="outline" className="w-full bg-background hover:bg-muted/50 group shadow-sm mt-4">
            {actionLabel}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
