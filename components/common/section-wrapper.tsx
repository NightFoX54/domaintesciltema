import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  background?: "default" | "muted" | "gradient"
  containerClassName?: string
  padding?: "sm" | "md" | "lg" | "xl"
  border?: boolean
}

export function SectionWrapper({
  children,
  className,
  background = "default",
  containerClassName,
  padding = "lg",
  border = false,
}: SectionWrapperProps) {
  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/20",
    gradient: "bg-gradient-to-b from-muted/30 to-muted/50",
  }

  const paddingClasses = {
    sm: "py-8 md:py-12",
    md: "py-14 md:py-16",
    lg: "py-16 md:py-20 lg:py-24",
    xl: "py-24 md:py-32 lg:py-40",
  }

  return (
    <section
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        border && "border-y border-border/40",
        className
      )}
    >
      <div className={cn("container mx-auto px-4 lg:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  )
}
