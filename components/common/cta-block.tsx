import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTAButton {
  label: string
  href: string
  variant?: "default" | "outline"
  icon?: ReactNode
}

interface CTABlockProps {
  title: string
  description: string | ReactNode
  primaryAction: CTAButton
  secondaryAction?: CTAButton
  footerText?: string
  helperText?: string
  className?: string
  containerClassName?: string
}

export function CTABlock({
  title,
  description,
  primaryAction,
  secondaryAction,
  footerText,
  helperText,
  className,
  containerClassName,
}: CTABlockProps) {
  return (
    <section className={cn("container mx-auto px-4 py-16 md:py-24", className)}>
      <div className={cn("max-w-3xl mx-auto text-center space-y-8", containerClassName)}>
        <h2 className="text-4xl md:text-5xl font-semibold text-balance leading-tight">{title}</h2>
        {typeof description === "string" ? (
          <p className="text-xl text-muted-foreground/90 leading-relaxed text-pretty">{description}</p>
        ) : (
          description
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link href={primaryAction.href}>
            <Button size="lg" className="h-14 px-8 text-base">
              {primaryAction.icon && <span className="mr-2" aria-hidden="true">{primaryAction.icon}</span>}
              {primaryAction.label}
            </Button>
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button
                size="lg"
                variant={secondaryAction.variant || "outline"}
                className="h-14 px-8 text-base bg-transparent"
              >
                {secondaryAction.icon && <span className="mr-2" aria-hidden="true">{secondaryAction.icon}</span>}
                {secondaryAction.label}
              </Button>
            </Link>
          )}
        </div>

        {helperText && <p className="text-sm text-muted-foreground/70 pt-2 text-center">{helperText}</p>}
        {footerText && <p className="text-sm text-muted-foreground/70 pt-4">{footerText}</p>}
      </div>
    </section>
  )
}
