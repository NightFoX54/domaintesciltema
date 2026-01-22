import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"

interface DomainSearchInputProps {
  placeholder?: string
  searchButtonLabel?: string
  searchHref: string
  className?: string
  helperText?: string
  onSearch?: () => void
  value?: string
  onChange?: (value: string) => void
}

export function DomainSearchInput({
  placeholder,
  searchButtonLabel,
  searchHref,
  className,
  helperText,
  onSearch,
  value,
  onChange,
}: DomainSearchInputProps) {
  const { t } = useTranslation('common')
  const { t: tDomains } = useTranslation('domains')
  const domainSearchLabel = t('accessibility.domainNameSearch')
  const defaultPlaceholder = placeholder || tDomains('search.searchPlaceholder')
  const defaultSearchLabel = searchButtonLabel || t('buttons.search')
  
  // TODO: Add analytics tracking for domain searches
  // TODO: Add accessibility improvements (ARIA labels, keyboard navigation)

  const inputId = "domain-search-input"
  const labelId = "domain-search-label"

  return (
    <div className={cn("space-y-5 pt-3", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <label htmlFor={inputId} id={labelId} className="sr-only">
            {domainSearchLabel}
          </label>
          <Input
            id={inputId}
            type="text"
            placeholder={defaultPlaceholder}
            className="pr-10 h-14 text-base shadow-sm"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onSearch) {
                e.preventDefault()
                onSearch()
              }
            }}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </div>
        {onSearch ? (
          <Button size="lg" className="h-14 px-7 shadow-md hover:shadow-lg transition-shadow" onClick={onSearch}>
            {defaultSearchLabel}
          </Button>
        ) : (
          <Link href={searchHref}>
            <Button size="lg" className="h-14 px-7 shadow-md hover:shadow-lg transition-shadow">
              {defaultSearchLabel}
            </Button>
          </Link>
        )}
      </div>
      {helperText && (
        <p id={`${inputId}-helper`} className="text-sm text-muted-foreground/80 leading-relaxed px-1">
          {helperText}
        </p>
      )}
    </div>
  )
}
