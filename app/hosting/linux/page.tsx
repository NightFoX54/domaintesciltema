"use client"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Server, Zap, Shield } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper } from "@/components/common/section-wrapper"
import { SectionHeader } from "@/components/common/section-header"
import { HostingPlanCard } from "@/components/hosting/hosting-plan-card"
import { HostingFeatureGrid } from "@/components/hosting/hosting-feature-grid"
import { FAQAccordion } from "@/components/common/faq-accordion"
import { CTABlock } from "@/components/common/cta-block"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export default function LinuxHostingPage() {
  const { t } = useTranslation('hosting')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-[1.05] tracking-tight">
                {t("linux.hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-lg">
                {t("linux.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/configure/hosting?plan=starter&type=linux">
                  <Button size="lg" className="h-12 px-8 text-base shadow-md">
                    {t("linux.hero.configurePlan")}
                  </Button>
                </Link>
                <Link href="/configure/hosting?plan=starter&type=linux">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent">
                    {t("linux.hero.talkToUs")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/technical-founder-coding-at-modern-workspace.jpg?height=600&width=800"
                alt={t("linux.hero.imageAlt")}
                className="w-full rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("linux.whoIsFor.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("linux.whoIsFor.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6" aria-hidden="true">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t("linux.whoIsFor.customBuilds.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("linux.whoIsFor.customBuilds.description")}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6" aria-hidden="true">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t("linux.whoIsFor.fullControl.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("linux.whoIsFor.fullControl.description")}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6" aria-hidden="true">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t("linux.whoIsFor.reliableBasics.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("linux.whoIsFor.reliableBasics.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("linux.pricing.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("linux.pricing.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <HostingPlanCard
              name={t("linux.pricing.plans.starter.name")}
              description={t("linux.pricing.plans.starter.description")}
              price={t("linux.pricing.plans.starter.price")}
              pricePeriod={t("linux.pricing.plans.starter.pricePeriod")}
              renewalNote={t("linux.pricing.plans.starter.renewalNote")}
              features={(t("linux.pricing.features.starter") as string[]).map(text => ({ text }))}
              actionLabel={t("linux.pricing.plans.starter.actionLabel")}
              actionHref="/configure/hosting?plan=starter&type=linux"
            />
            <HostingPlanCard
              name={t("linux.pricing.plans.professional.name")}
              description={t("linux.pricing.plans.professional.description")}
              price={t("linux.pricing.plans.professional.price")}
              pricePeriod={t("linux.pricing.plans.professional.pricePeriod")}
              renewalNote={t("linux.pricing.plans.professional.renewalNote")}
              features={(t("linux.pricing.features.professional") as string[]).map(text => ({ text }))}
              actionLabel={t("linux.pricing.plans.professional.actionLabel")}
              actionHref="/configure/hosting?plan=professional&type=linux"
              isPopular
            />
            <HostingPlanCard
              name={t("linux.pricing.plans.business.name")}
              description={t("linux.pricing.plans.business.description")}
              price={t("linux.pricing.plans.business.price")}
              pricePeriod={t("linux.pricing.plans.business.pricePeriod")}
              renewalNote={t("linux.pricing.plans.business.renewalNote")}
              features={(t("linux.pricing.features.business") as string[]).map(text => ({ text }))}
              actionLabel={t("linux.pricing.plans.business.actionLabel")}
              actionHref="/configure/hosting?plan=business&type=linux"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            {t("linux.pricing.note")}
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("linux.whatYouGet.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("linux.whatYouGet.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("linux.whatYouGet.nvmeStorage.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("linux.whatYouGet.nvmeStorage.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("linux.whatYouGet.freeSSL.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("linux.whatYouGet.freeSSL.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("linux.whatYouGet.dailyBackups.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("linux.whatYouGet.dailyBackups.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("linux.whatYouGet.securityMonitoring.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("linux.whatYouGet.securityMonitoring.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("linux.whatYouGet.uptime.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("linux.whatYouGet.uptime.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("linux.whatYouGet.controlPanel.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("linux.whatYouGet.controlPanel.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
                {t("linux.faq.title")}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {(t("linux.faq.items") as any[]).map((item: any, index: number) => (
                <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`} className="bg-card border border-border rounded-xl px-6 shadow-sm">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-lg pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-muted-foreground/90 leading-relaxed pb-6 pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("linux.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("linux.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/configure/hosting?plan=starter&type=linux">
                <Button size="lg" className="h-12 px-8 text-base shadow-md">
                  {t("linux.cta.choosePlan")}
                </Button>
              </Link>
              <Link href="/configure/hosting?plan=starter&type=linux">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent">
                  {t("linux.cta.talkToSupport")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </div>
  )
}
