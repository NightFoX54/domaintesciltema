"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLocale } from "@/hooks/use-locale"
import { addLocaleToPath } from "@/lib/locale-utils"

export function SiteHeader() {
  const { t } = useTranslation()
  const locale = useLocale()
  
  const getPath = (path: string) => addLocaleToPath(path, locale)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart")
      if (cart) {
        const cartData = JSON.parse(cart)
        setCartItemCount(cartData.length || 0)
      }
    }

    updateCartCount()
    window.addEventListener("storage", updateCartCount)
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeDropdown) {
        setActiveDropdown(null)
        buttonRefs.current[activeDropdown]?.focus()
      }
    }

    if (activeDropdown) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [activeDropdown])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeDropdown) {
        const dropdown = dropdownRefs.current[activeDropdown]
        const button = buttonRefs.current[activeDropdown]
        if (
          dropdown &&
          button &&
          !dropdown.contains(e.target as Node) &&
          !button.contains(e.target as Node)
        ) {
          setActiveDropdown(null)
        }
      }
    }

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  const handleMouseEnter = (dropdown: string) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      setHideTimeout(null)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
    setHideTimeout(timeout)
  }

  const handleKeyDown = (e: React.KeyboardEvent, dropdown: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    } else if (e.key === "ArrowDown" && !activeDropdown) {
      e.preventDefault()
      setActiveDropdown(dropdown)
      // Focus first link in dropdown
      setTimeout(() => {
        const firstLink = dropdownRefs.current[dropdown]?.querySelector("a")
        firstLink?.focus()
      }, 0)
    }
  }

  const dropdownMenuId = (name: string) => `dropdown-menu-${name}`
  const dropdownButtonId = (name: string) => `dropdown-button-${name}`

  return (
    <header>
      <nav
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/60 shadow-sm"
        aria-label={t("accessibility.mainNavigation", "common")}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              href={getPath("/")}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label={t("nav.homeLabel")}
            >
              <Image
                src="/logo.png"
                alt={t("brand.logoAlt", "common")}
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {/* Domains Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("domains")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id={dropdownButtonId("domains")}
                  ref={(el) => { buttonRefs.current["domains"] = el }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                  aria-expanded={activeDropdown === "domains"}
                  aria-controls={dropdownMenuId("domains")}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDown(e, "domains")}
                  onClick={() => setActiveDropdown(activeDropdown === "domains" ? null : "domains")}
                >
                  {t("nav.domains")}
                </button>
                {activeDropdown === "domains" && (
                  <div
                    id={dropdownMenuId("domains")}
                    ref={(el) => { dropdownRefs.current["domains"] = el }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    role="menu"
                    aria-labelledby={dropdownButtonId("domains")}
                  >
                    <ul className="w-64 bg-background border border-border rounded-lg shadow-lg p-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                      <li>
                        <Link
                          href={getPath("/domains/search")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.domains.search.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.domains.search.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={getPath("/domains/transfer")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.domains.transfer.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.domains.transfer.description")}</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Hosting Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("hosting")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id={dropdownButtonId("hosting")}
                  ref={(el) => { buttonRefs.current["hosting"] = el }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                  aria-expanded={activeDropdown === "hosting"}
                  aria-controls={dropdownMenuId("hosting")}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDown(e, "hosting")}
                  onClick={() => setActiveDropdown(activeDropdown === "hosting" ? null : "hosting")}
                >
                  {t("nav.hosting")}
                </button>
                {activeDropdown === "hosting" && (
                  <div
                    id={dropdownMenuId("hosting")}
                    ref={(el) => { dropdownRefs.current["hosting"] = el }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    role="menu"
                    aria-labelledby={dropdownButtonId("hosting")}
                  >
                    <ul className="w-64 bg-background border border-border rounded-lg shadow-lg p-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                      <li>
                        <Link
                          href={getPath("/hosting/linux")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.hosting.linux.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.hosting.linux.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={getPath("/hosting/wordpress")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.hosting.wordpress.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.hosting.wordpress.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={getPath("/hosting/joomla")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.hosting.joomla.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.hosting.joomla.description")}</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* SSL Certificates Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("ssl")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id={dropdownButtonId("ssl")}
                  ref={(el) => { buttonRefs.current["ssl"] = el }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                  aria-expanded={activeDropdown === "ssl"}
                  aria-controls={dropdownMenuId("ssl")}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDown(e, "ssl")}
                  onClick={() => setActiveDropdown(activeDropdown === "ssl" ? null : "ssl")}
                >
                  {t("nav.ssl")}
                </button>
                {activeDropdown === "ssl" && (
                  <div
                    id={dropdownMenuId("ssl")}
                    ref={(el) => { dropdownRefs.current["ssl"] = el }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    role="menu"
                    aria-labelledby={dropdownButtonId("ssl")}
                  >
                    <ul className="w-64 bg-background border border-border rounded-lg shadow-lg p-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                      <li>
                        <Link href={getPath("/ssl")} className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" role="menuitem">
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.ssl.overview.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.ssl.overview.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={getPath("/ssl/positive")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.ssl.positive.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.ssl.positive.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={getPath("/ssl/wildcard")}
                          className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          role="menuitem"
                        >
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.ssl.wildcard.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.ssl.wildcard.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link href={getPath("/ssl/ev")} className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" role="menuitem">
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.ssl.ev.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.ssl.ev.description")}</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Support Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("support")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  id={dropdownButtonId("support")}
                  ref={(el) => { buttonRefs.current["support"] = el }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                  aria-expanded={activeDropdown === "support"}
                  aria-controls={dropdownMenuId("support")}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDown(e, "support")}
                  onClick={() => setActiveDropdown(activeDropdown === "support" ? null : "support")}
                >
                  {t("nav.support")}
                </button>
                {activeDropdown === "support" && (
                  <div
                    id={dropdownMenuId("support")}
                    ref={(el) => { dropdownRefs.current["support"] = el }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    role="menu"
                    aria-labelledby={dropdownButtonId("support")}
                  >
                    <ul className="w-64 bg-background border border-border rounded-lg shadow-lg p-2 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                      <li>
                        <Link href={getPath("/support")} className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" role="menuitem">
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.support.help.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.support.help.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link href={getPath("/contact")} className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" role="menuitem">
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.support.contact.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.support.contact.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link href={getPath("/migration")} className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" role="menuitem">
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.support.migration.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.support.migration.description")}</div>
                        </Link>
                      </li>
                      <li>
                        <Link href={getPath("/status")} className="block px-4 py-3 rounded-md hover:bg-muted/50 transition-colors focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" role="menuitem">
                          <div className="font-medium text-sm text-foreground">{t("nav.dropdowns.support.status.title")}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{t("nav.dropdowns.support.status.description")}</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href={getPath("/cart")}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`${t("nav.cart")}${cartItemCount > 0 ? `, ${cartItemCount} ${cartItemCount === 1 ? t("ui.item", "common") : t("ui.items", "common")}` : ""}`}
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center" aria-live="polite" aria-atomic="true">
                    <span className="sr-only">{cartItemCount} {t("nav.cartItems")}</span>
                    <span aria-hidden="true">{cartItemCount}</span>
                  </span>
                )}
              </Link>
              <Link
                href={getPath("/signin")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2"
              >
                {t("nav.signIn")}
              </Link>
              <Link href={getPath("/register")}>
                <Button size="sm" className="h-9 px-5 shadow-sm">
                  {t("nav.getStarted")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
