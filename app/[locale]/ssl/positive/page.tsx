"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper } from "@/components/common/section-wrapper"
import { SectionHeader } from "@/components/common/section-header"
import { SSLCertificateHero } from "@/components/ssl/ssl-certificate-hero"
import { SSLPricingCard } from "@/components/ssl/ssl-pricing-card"
import { SSLFeatureItem } from "@/components/ssl/ssl-feature-item"
import { FAQAccordion } from "@/components/common/faq-accordion"
import { CTABlock } from "@/components/common/cta-block"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation } from "@/lib/i18n"

export default function PositiveSSLPage() {
  const { t } = useTranslation('ssl')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      <SSLCertificateHero
        badge={t("positive.hero.badge")}
        title={t("positive.hero.title")}
        description={t("positive.hero.description")}
        imageSrc="/blogger-writing-content-at-home-office-natural-light.jpg?height=600&width=800"
        imageAlt={t("positive.hero.imageAlt")}
        primaryAction={{
          label: t("positive.hero.seePricing"),
          href: "#pricing",
        }}
        secondaryAction={{
          label: t("positive.hero.whatYouGet"),
          href: "#features",
        }}
      />

      <SectionWrapper background="muted" padding="lg" id="pricing">
        <SectionHeader
          title={t("positive.pricing.title")}
          description={t("positive.pricing.description")}
          headingLevel={2}
        />
        <SSLPricingCard
          price={t("positive.pricing.price")}
          pricePeriod={t("positive.pricing.pricePeriod")}
          features={(t("positive.pricing.features") as string[]).map(text => ({ text }))}
          actionLabel={t("positive.pricing.actionLabel")}
          actionHref="/configure/ssl?type=positive"
          renewalNote={t("positive.pricing.renewalNote")}
        />
      </SectionWrapper>

      {/* Who This Is For */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">{t("positive.whoIsFor.title")}</h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              {t("positive.whoIsFor.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("positive.whoIsFor.personal.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("positive.whoIsFor.personal.description")}
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("positive.whoIsFor.smallBusiness.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("positive.whoIsFor.smallBusiness.description")}
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("positive.whoIsFor.information.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("positive.whoIsFor.information.description")}
              </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">{t("positive.whoIsFor.testing.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("positive.whoIsFor.testing.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section id="features" className="py-20 md:py-24 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">{t("positive.whatYouGet.title")}</h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              {t("positive.whatYouGet.description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <SSLFeatureItem
              title={t("positive.whatYouGet.domainValidation.title")}
              description={t("positive.whatYouGet.domainValidation.description")}
            />
            <SSLFeatureItem
              title={t("positive.whatYouGet.encryption.title")}
              description={t("positive.whatYouGet.encryption.description")}
            />
            <SSLFeatureItem
              title={t("positive.whatYouGet.browserCompatibility.title")}
              description={t("positive.whatYouGet.browserCompatibility.description")}
            />
            <SSLFeatureItem
              title={t("positive.whatYouGet.reissues.title")}
              description={t("positive.whatYouGet.reissues.description")}
            />
            <SSLFeatureItem
              title={t("positive.whatYouGet.setupHelp.title")}
              description={t("positive.whatYouGet.setupHelp.description")}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">{t("positive.faq.title")}</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {(t("positive.faq.items") as any[]).map((item: any, index: number) => (
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
              {t("positive.cta.title")}
            </h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              {t("positive.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href="/configure/ssl?type=positive">{t("positive.cta.primary")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href="/contact">{t("positive.cta.secondary")}</Link>
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
              Need hosting?{" "}
              <Link href="/hosting" className="text-foreground font-medium hover:underline">
                Explore our hosting plans
              </Link>
            </p>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </div>
  )
}
