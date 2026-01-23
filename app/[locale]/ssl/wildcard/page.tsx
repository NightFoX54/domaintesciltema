"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation } from "@/lib/i18n"
import { useParams } from "next/navigation"
import { addLocaleToPath } from "@/lib/locale-utils"
import { trackEvent } from "@/lib/analytics"
import { AnalyticsEventName } from "@/lib/analytics-events"

export default function WildcardSSLPage() {
  const { t } = useTranslation('ssl')
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  const hasTrackedRef = useRef(false)
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')

  useEffect(() => {
    if (!hasTrackedRef.current) {
      trackEvent(AnalyticsEventName.PRODUCT_VIEW, {
        product_type: 'ssl',
        product_id: 'wildcard',
        locale: locale,
      })
      hasTrackedRef.current = true
    }
  }, [locale])
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pb-24 lg:pb-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {t("wildcard.hero.badge")}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-balance">
                {t("wildcard.hero.title")}
              </h1>
              <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
                {t("wildcard.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base" asChild>
                  <Link href="#pricing">{t("wildcard.hero.seePricing")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                  <Link href="#features">{t("wildcard.hero.whatYouGet")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/team-planning-website-architecture-whiteboard-calm-workspace.jpg?height=600&width=800"
                alt={t("wildcard.hero.imageAlt")}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-24 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              {t("wildcard.pricing.title")}
            </h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              {t("wildcard.pricing.description")}
            </p>
          </div>

          <div className="max-w-md mx-auto bg-background p-10 rounded-2xl shadow-sm border-2 border-primary">
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("wildcard.pricing.mostPopular")}
              </div>
              <div className="text-5xl font-semibold mb-2">{t("wildcard.pricing.price")}</div>
              <div className="text-muted-foreground">{t("wildcard.pricing.pricePeriod")}</div>
            </div>

            <div className="space-y-3 mb-8">
              {(t("wildcard.pricing.features") as string[]).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-[15px]">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full text-base" asChild>
              <Link 
                href="/configure/ssl?type=wildcard"
                onClick={() => {
                  trackEvent(AnalyticsEventName.CONFIGURATOR_STARTED, {
                    product_type: 'ssl',
                    product_id: 'wildcard',
                    configurator_type: 'ssl',
                    locale: locale,
                  })
                }}
              >
                {t("wildcard.pricing.actionLabel")}
              </Link>
            </Button>

            <p className="text-[13px] text-muted-foreground text-center mt-6">
              {t("wildcard.pricing.renewalNote")}
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">{t("wildcard.whoIsFor.title")}</h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              {t("wildcard.whoIsFor.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("wildcard.whoIsFor.saas.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("wildcard.whoIsFor.saas.description")}
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("wildcard.whoIsFor.agencies.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("wildcard.whoIsFor.agencies.description")}
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("wildcard.whoIsFor.ecommerce.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("wildcard.whoIsFor.ecommerce.description")}
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("wildcard.whoIsFor.development.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("wildcard.whoIsFor.development.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section id="features" className="py-20 md:py-24 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">{t("wildcard.whatYouGet.title")}</h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              {t("wildcard.whatYouGet.description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-4 bg-background p-6 rounded-xl border border-border">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t("wildcard.whatYouGet.unlimitedSubdomains.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("wildcard.whatYouGet.unlimitedSubdomains.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-background p-6 rounded-xl border border-border">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t("wildcard.whatYouGet.domainValidation.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("wildcard.whatYouGet.domainValidation.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-background p-6 rounded-xl border border-border">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t("wildcard.whatYouGet.encryption.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("wildcard.whatYouGet.encryption.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-background p-6 rounded-xl border border-border">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t("wildcard.whatYouGet.costEffective.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("wildcard.whatYouGet.costEffective.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-background p-6 rounded-xl border border-border">
              <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{t("wildcard.whatYouGet.reissues.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("wildcard.whatYouGet.reissues.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">{t("wildcard.faq.title")}</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {(t("wildcard.faq.items") as any[]).map((item: any, index: number) => (
                <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`} className="bg-muted/30 px-6 rounded-lg border border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              {t("wildcard.cta.title")}
            </h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              {t("wildcard.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link 
                  href="/configure/ssl?type=wildcard"
                  onClick={() => {
                    trackEvent(AnalyticsEventName.CONFIGURATOR_STARTED, {
                      product_type: 'ssl',
                      product_id: 'wildcard',
                      configurator_type: 'ssl',
                      locale: locale,
                    })
                  }}
                >
                  {t("wildcard.cta.primary")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href="/contact">{t("wildcard.cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contextual Link */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">
              {t("overview.contextualLink.text")}{" "}
              <Link href={getPath("/hosting")} className="text-foreground font-medium hover:underline">
                {t("overview.contextualLink.link")}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
