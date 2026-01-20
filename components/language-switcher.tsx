'use client'

import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { removeLocaleFromPath, addLocaleToPath } from '@/lib/locale-utils'

export function LanguageSwitcher() {
  const { language, t } = useTranslation()
  const currentLocale = useLocale() // Read from URL params
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // language comes from URL params via TranslationProvider
  // currentLocale is the same, but we use it for comparison

  const switchLocale = (newLocale: 'en' | 'tr') => {
    if (newLocale === currentLocale) return
    
    // Remove current locale from pathname
    const pathWithoutLocale = removeLocaleFromPath(pathname)
    // Add new locale to pathname
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale)
    
    // Preserve query params if present
    const queryString = searchParams.toString()
    const finalPath = queryString ? `${newPath}?${queryString}` : newPath
    
    // Navigate to new URL - locale will be read from URL params
    router.push(finalPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label={t('language.switcher', 'common')}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          {t('language.english', 'common')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('tr')}
          className={language === 'tr' ? 'bg-accent' : ''}
        >
          {t('language.turkish', 'common')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
