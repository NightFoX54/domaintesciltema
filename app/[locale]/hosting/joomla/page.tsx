"use client"

import Link from "next/link"
import { Users, Check, Shield, Database, Gauge, Zap, MessageCircle, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"
import { useParams } from "next/navigation"
import { addLocaleToPath } from "@/lib/locale-utils"

export default function JoomlaHostingPage() {
  const { t } = useTranslation('hosting')
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-[1.05] tracking-tight">
                {t("joomla.hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-lg">
                {t("joomla.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-base shadow-md" asChild>
                  <Link href="#pricing">{t("joomla.hero.viewPlans")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent" asChild>
                  <Link href="/contact">{t("joomla.hero.talkToUs")}</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground/70 pt-2">{t("joomla.hero.helperText")}</p>
            </div>
            <div className="relative">
              <img
                src="/web-developer-working-on-joomla-site-professional-setup.jpg?height=600&width=800"
                alt={t("joomla.hero.imageAlt")}
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("joomla.whoIsFor.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("joomla.whoIsFor.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t("joomla.whoIsFor.agencies.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("joomla.whoIsFor.agencies.description")}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t("joomla.whoIsFor.organizations.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("joomla.whoIsFor.organizations.description")}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t("joomla.whoIsFor.frustrated.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("joomla.whoIsFor.frustrated.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("joomla.pricing.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("joomla.pricing.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-2xl text-foreground mb-2">{t("joomla.pricing.plans.starter.name")}</h3>
                  <p className="text-muted-foreground text-sm">{t("joomla.pricing.plans.starter.description")}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{t("joomla.pricing.plans.starter.price")}</span>
                    <span className="text-muted-foreground">{t("joomla.pricing.plans.starter.pricePeriod")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{t("joomla.pricing.plans.starter.renewalNote")}</p>
                </div>
                <ul className="space-y-3">
                  {(t("joomla.pricing.features.starter") as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-11 shadow-sm" asChild>
                  <Link href="/configure/hosting?plan=starter&type=joomla">{t("joomla.pricing.plans.starter.actionLabel")}</Link>
                </Button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                {t("joomla.pricing.mostPopular")}
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-2xl text-foreground mb-2">{t("joomla.pricing.plans.professional.name")}</h3>
                  <p className="text-muted-foreground text-sm">{t("joomla.pricing.plans.professional.description")}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{t("joomla.pricing.plans.professional.price")}</span>
                    <span className="text-muted-foreground">{t("joomla.pricing.plans.professional.pricePeriod")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{t("joomla.pricing.plans.professional.renewalNote")}</p>
                </div>
                <ul className="space-y-3">
                  {(t("joomla.pricing.features.professional") as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-11 shadow-md" asChild>
                  <Link href="/configure/hosting?plan=professional&type=joomla">{t("joomla.pricing.plans.professional.actionLabel")}</Link>
                </Button>
              </div>
            </div>

            {/* Business Plan */}
            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-2xl text-foreground mb-2">{t("joomla.pricing.plans.business.name")}</h3>
                  <p className="text-muted-foreground text-sm">{t("joomla.pricing.plans.business.description")}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{t("joomla.pricing.plans.business.price")}</span>
                    <span className="text-muted-foreground">{t("joomla.pricing.plans.business.pricePeriod")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{t("joomla.pricing.plans.business.renewalNote")}</p>
                </div>
                <ul className="space-y-3">
                  {(t("joomla.pricing.features.business") as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full h-11 shadow-sm" asChild>
                  <Link href="/configure/hosting?plan=business&type=joomla">{t("joomla.pricing.plans.business.actionLabel")}</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto leading-relaxed">
            {t("joomla.pricing.note")}
          </p>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-balance">{t("joomla.whatYouGet.title")}</h2>
            <p className="text-xl text-muted-foreground/90 leading-relaxed">
              {t("joomla.whatYouGet.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{t("joomla.whatYouGet.preConfigured.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("joomla.whatYouGet.preConfigured.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{t("joomla.whatYouGet.oneClick.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("joomla.whatYouGet.oneClick.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{t("joomla.whatYouGet.security.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("joomla.whatYouGet.security.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Gauge className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{t("joomla.whatYouGet.performance.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("joomla.whatYouGet.performance.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{t("joomla.whatYouGet.backups.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("joomla.whatYouGet.backups.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{t("joomla.whatYouGet.migration.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("joomla.whatYouGet.migration.description")}
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
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                {t("joomla.faq.title")}
              </h2>
              <p className="text-lg text-muted-foreground">{t("joomla.faq.description")}</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {(t("joomla.faq.items") as any[]).map((item: any, index: number) => (
                <AccordionItem
                  key={`item-${index + 1}`}
                  value={`item-${index + 1}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium text-foreground pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
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
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight">
              {t("joomla.cta.title")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-2xl mx-auto">
              {t("joomla.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-base shadow-md" asChild>
                <Link href="#pricing">{t("joomla.cta.choosePlan")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent" asChild>
                <Link href="/contact">{t("joomla.cta.talkToSupport")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contextual Link */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">
              {t("overview.contextualLink.text")}{" "}
              <Link href={getPath("/ssl")} className="text-foreground font-medium hover:underline">
                {t("overview.contextualLink.link")}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
