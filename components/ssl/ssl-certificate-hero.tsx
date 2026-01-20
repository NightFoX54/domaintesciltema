import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SSLCertificateHeroProps {
  badge: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
  className?: string
}

export function SSLCertificateHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryAction,
  secondaryAction,
  className,
}: SSLCertificateHeroProps) {
  // TODO: Add analytics tracking

  return (
    <section className={cn("pt-16 pb-20 md:pb-24 lg:pb-28", className)}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              {badge}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-balance">
              {title}
            </h1>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base" asChild>
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img src={imageSrc} alt={imageAlt} className="w-full h-auto rounded-2xl shadow-2xl" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
