'use client'

import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { usePathname, useRouter } from 'next/navigation'
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
  const { language, setLanguage, t } = useTranslation()
  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: 'en' | 'tr') => {
    if (newLocale === currentLocale) return
    
    // Remove current locale from pathname
    const pathWithoutLocale = removeLocaleFromPath(pathname)
    // Add new locale to pathname
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale)
    
    // Update language state and navigate
    setLanguage(newLocale)
    router.push(newPath)
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
