'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { 
  LayoutDashboard, 
  Server, 
  Globe, 
  CreditCard, 
  MessageSquare, 
  User,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { key: 'services', icon: Server, href: '/dashboard/services' },
  { key: 'domains', icon: Globe, href: '/dashboard/domains' },
  { key: 'billing', icon: CreditCard, href: '/dashboard/billing' },
  { key: 'tickets', icon: MessageSquare, href: '/dashboard/tickets' },
  { key: 'profile', icon: User, href: '/dashboard/profile' },
]

export function DashboardNav() {
  const { t } = useTranslation('dashboard')
  const locale = useLocale()
  const pathname = usePathname()
  
  const getPath = (path: string) => addLocaleToPath(path, locale)
  
  const isActive = (href: string) => {
    const fullPath = getPath(href)
    return pathname === fullPath || pathname.startsWith(fullPath + '/')
  }

  return (
    <nav className="flex flex-col gap-1" aria-label="Dashboard navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)
        
        return (
          <Link
            key={item.key}
            href={getPath(item.href)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              active 
                ? "bg-muted text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{t(`navigation.${item.key}`)}</span>
          </Link>
        )
      })}
      
      <div className="mt-4 pt-4 border-t border-border">
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => {
            // TODO: Implement logout - this would call WHMCS logout API
            console.log('Logout clicked')
          }}
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span>{t('navigation.logout')}</span>
        </button>
      </div>
    </nav>
  )
}
