"use client"

import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export function SiteFooter() {
  const { t } = useTranslation()
  return (
    <footer className="bg-[hsl(var(--muted))] border-t border-border py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-semibold text-2xl text-foreground tracking-tight">Domain Tescil</h2>
            <p className="text-[15px] text-muted-foreground/90 leading-relaxed max-w-sm text-pretty">
              {t("footer.tagline")}
            </p>
            <div className="pt-2">
              <Link href="/support" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
                {t("footer.needHelp")} →
              </Link>
            </div>
          </div>

          {/* Products Column */}
          <nav className="space-y-5" aria-label={t("footer.products")}>
            <h3 className="font-semibold text-foreground">{t("footer.products")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/domains/search"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.domainSearch")}
                </Link>
              </li>
              <li>
                <Link
                  href="/domains/transfer"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.domainTransfer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting/linux"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.linuxHosting")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting/wordpress"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.wordpressHosting")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting/joomla"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.joomlaHosting")}
                </Link>
              </li>
              <li>
                <Link href="/ssl" className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors">
                  {t("footer.ssl")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Support Column */}
          <nav className="space-y-5" aria-label={t("footer.support")}>
            <h3 className="font-semibold text-foreground">{t("footer.support")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.help")}
                </Link>
              </li>
              <li>
                <Link
                  href="/migration"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.migrationHelp")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.contactSupport")}
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.systemStatus")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company Column */}
          <nav className="space-y-5" aria-label={t("footer.company")}>
            <h3 className="font-semibold text-foreground">{t("footer.company")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground/90 hover:text-foreground transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground/80">{t("footer.copyright")}</p>
            <div className="flex gap-8">
              <Link href="/terms" className="text-sm text-muted-foreground/80 hover:text-foreground transition-colors">
                {t("footer.terms")}
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                {t("footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
