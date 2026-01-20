"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, MessageCircle, FileText, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export default function ConfirmationPage() {
  const { t } = useTranslation('checkout')
  
  useEffect(() => {
    // Clear any remaining cart data
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cartUpdated"))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Success message */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950" aria-hidden="true">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-semibold">{t("confirmation.title")}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("confirmation.description")}
              </p>
            </div>
          </div>

          {/* What happens next */}
          <div className="rounded-2xl border-2 border-border bg-card p-8 space-y-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">{t("confirmation.whatHappensNext.title")}</h2>
              <p className="text-muted-foreground">{t("confirmation.whatHappensNext.description")}</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  1
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">{t("confirmation.whatHappensNext.step1.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("confirmation.whatHappensNext.step1.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  2
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">{t("confirmation.whatHappensNext.step2.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("confirmation.whatHappensNext.step2.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  3
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">{t("confirmation.whatHappensNext.step3.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("confirmation.whatHappensNext.step3.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  4
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">{t("confirmation.whatHappensNext.step4.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("confirmation.whatHappensNext.step4.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support options */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/contact"
              className="rounded-xl border-2 border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <MessageCircle className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-semibold mb-1.5">{t("confirmation.support.talkToSupport.title")}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t("confirmation.support.talkToSupport.description")}</p>
              <span className="text-sm text-primary font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                {t("confirmation.support.talkToSupport.action")} <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/support"
              className="rounded-xl border-2 border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <FileText className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-semibold mb-1.5">{t("confirmation.support.gettingStarted.title")}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t("confirmation.support.gettingStarted.description")}</p>
              <span className="text-sm text-primary font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                {t("confirmation.support.gettingStarted.action")} <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-muted-foreground">{t("confirmation.cta.description")}</p>
            <Button size="lg" asChild className="shadow-md">
              <Link href="/signin">{t("confirmation.cta.button")}</Link>
            </Button>
          </div>

          {/* Contact info */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{t("confirmation.contact.email")}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("confirmation.contact.responseTime")}</p>
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
