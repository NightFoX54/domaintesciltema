"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

interface HeroSectionProps {
  title: string
  description: string | ReactNode
  imageSrc: string
  imageAlt: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  searchInput?: {
    placeholder: string
    searchButtonLabel: string
    searchHref: string
  }
  badge?: string
  additionalContent?: ReactNode
  imagePosition?: "left" | "right"
}

export function HeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  primaryAction,
  secondaryAction,
  searchInput,
  badge,
  additionalContent,
  imagePosition = "right",
}: HeroSectionProps) {
  const { t } = useTranslation()
  const imageSection = (
    <div className={`relative ${imagePosition === "left" ? "lg:mr-8 lg:-ml-16" : "lg:ml-8"}`}>
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/5 ring-1 ring-border/50">
        <img src={imageSrc} alt={imageAlt} className="object-cover w-full h-full" loading="lazy" />
      </div>
    </div>
  )

  return (
    <section className="container mx-auto px-4 lg:px-6 py-16 md:py-20 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {imagePosition === "left" && imageSection}
        
        <div className="space-y-10 max-w-xl">
          {badge && (
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              {badge}
            </div>
          )}
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-[1.05] tracking-tight">
              {title}
            </h1>
            {typeof description === "string" ? (
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-lg">
                {description}
              </p>
            ) : (
              <div className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-lg">
                {description}
              </div>
            )}
          </div>

          {searchInput && (
            <div className="space-y-5 pt-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <label htmlFor="domain-search-input" className="sr-only">
                    {t("domains.search.inputLabel")}
                  </label>
                  <Input
                    id="domain-search-input"
                    type="text"
                    placeholder={searchInput.placeholder}
                    className="pr-10 h-14 text-base shadow-sm"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Link href={searchInput.searchHref}>
                  <Button size="lg" className="h-14 px-7 shadow-md hover:shadow-lg transition-shadow">
                    {searchInput.searchButtonLabel}
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {!searchInput && (primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              {primaryAction && (
                <Link href={primaryAction.href}>
                  <Button size="lg" className="text-base shadow-md hover:shadow-lg transition-shadow">
                    {primaryAction.label}
                  </Button>
                </Link>
              )}
              {secondaryAction && (
                <Link href={secondaryAction.href}>
                  <Button size="lg" variant="outline" className="text-base bg-transparent">
                    {secondaryAction.label}
                  </Button>
                </Link>
              )}
            </div>
          )}

          {additionalContent}
        </div>

        {imagePosition === "right" && imageSection}
      </div>
    </section>
  )
}
