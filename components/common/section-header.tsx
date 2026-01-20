import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string | ReactNode
  description?: string | ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: "left" | "center"
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

export function SectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  align = "center",
  headingLevel = 2,
}: SectionHeaderProps) {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements
  const headingClasses = cn(
    "text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]",
    titleClassName
  )

  return (
    <div
      className={cn(
        "mb-16 lg:mb-20 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {typeof title === "string" ? (
        <HeadingTag className={headingClasses}>{title}</HeadingTag>
      ) : (
        <HeadingTag className={headingClasses}>{title}</HeadingTag>
      )}
      {description && (
        <div className={cn("text-xl text-muted-foreground leading-relaxed text-pretty mt-5", descriptionClassName)}>
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      )}
    </div>
  )
}
