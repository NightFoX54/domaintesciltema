import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  name: string
  role: string
  imageSrc: string
  imageAlt: string
  quote: string
  className?: string
  offset?: "up" | "down" | "none"
}

export function TestimonialCard({
  name,
  role,
  imageSrc,
  imageAlt,
  quote,
  className,
  offset = "none",
}: TestimonialCardProps) {
  const offsetClasses = {
    up: "md:-mt-8",
    down: "md:mt-8",
    none: "",
  }

  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-8 space-y-6 shadow-lg shadow-foreground/5 border border-border/50 hover:shadow-xl transition-shadow",
        offsetClasses[offset],
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0 ring-2 ring-background shadow-md">
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="min-w-0 pt-1">
          <div className="font-semibold text-lg text-foreground">{name}</div>
          <div className="text-sm text-muted-foreground/80 leading-relaxed mt-1">{role}</div>
        </div>
      </div>
      <blockquote className="text-[15px] text-muted-foreground/90 leading-relaxed">
        <p>{quote}</p>
      </blockquote>
    </div>
  )
}
