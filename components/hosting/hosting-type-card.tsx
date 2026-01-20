import { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HostingTypeCardProps {
  title: string
  description: string
  details?: string
  icon: ReactNode
  href: string
  className?: string
}

export function HostingTypeCard({
  title,
  description,
  details,
  icon,
  href,
  className,
}: HostingTypeCardProps) {
  // TODO: Add analytics tracking for hosting type clicks
  // TODO: Add accessibility improvements

  return (
    <Link
      href={href}
      className={cn(
        "group bg-card border-2 border-border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300",
        className
      )}
    >
      <div className="space-y-6">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">{description}</p>
          {details && (
            <p className="text-sm text-muted-foreground leading-relaxed">{details}</p>
          )}
        </div>
        <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
          Learn more <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}
