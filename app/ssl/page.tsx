"use client"

import Link from "next/link"
import { Check, Shield, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/common/hero-section"
import { SectionWrapper } from "@/components/common/section-wrapper"
import { SectionHeader } from "@/components/common/section-header"
import { PricingCard } from "@/components/common/pricing-card"
import { FeatureCard } from "@/components/common/feature-card"
import { FAQAccordion } from "@/components/common/faq-accordion"
import { CTABlock } from "@/components/common/cta-block"
import { useTranslation } from "@/lib/i18n"

export default function SSLPage() {
  const { t } = useTranslation('ssl')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      <section className="pt-16 pb-20 md:pb-24 lg:pb-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-balance">
                {t("overview.hero.title")}
              </h1>
              <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
                {t("overview.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base" asChild>
                  <Link href="#types">{t("overview.hero.seeOptions")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                  <Link href="#help">{t("overview.hero.notSure")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/person-working-confidently-at-organized-desk.jpg?height=600&width=800"
                alt={t("overview.hero.imageAlt")}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper padding="lg" id="types">
        <SectionHeader
          title={t("overview.types.title")}
          description={t("overview.types.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            title={t("overview.types.positive.title")}
            price={t("overview.types.positive.price")}
            pricePeriod={t("overview.types.positive.pricePeriod")}
            description={t("overview.types.positive.description")}
            features={t("overview.types.positive.features") as string[]}
            actionLabel={t("overview.types.positive.actionLabel")}
            actionHref="/ssl/positive"
            variant="default"
          />
          <PricingCard
            title={t("overview.types.wildcard.title")}
            price={t("overview.types.wildcard.price")}
            pricePeriod={t("overview.types.wildcard.pricePeriod")}
            description={t("overview.types.wildcard.description")}
            features={t("overview.types.wildcard.features") as string[]}
            actionLabel={t("overview.types.wildcard.actionLabel")}
            actionHref="/ssl/wildcard"
            isPopular
            variant="primary"
          />
          <PricingCard
            title={t("overview.types.ev.title")}
            price={t("overview.types.ev.price")}
            pricePeriod={t("overview.types.ev.pricePeriod")}
            description={t("overview.types.ev.description")}
            features={t("overview.types.ev.features") as string[]}
            actionLabel={t("overview.types.ev.actionLabel")}
            actionHref="/ssl/ev"
            variant="default"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg">
        <SectionHeader
          title={t("overview.whatSSLDoes.title")}
          description={t("overview.whatSSLDoes.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title={t("overview.whatSSLDoes.encrypts.title")}
            description={t("overview.whatSSLDoes.encrypts.description")}
            icon={<Lock className="w-6 h-6 text-primary" />}
            iconBackground={false}
            className="bg-background p-8 rounded-xl shadow-sm border border-border"
          />
          <FeatureCard
            title={t("overview.whatSSLDoes.verified.title")}
            description={t("overview.whatSSLDoes.verified.description")}
            icon={<Shield className="w-6 h-6 text-primary" />}
            iconBackground={false}
            className="bg-background p-8 rounded-xl shadow-sm border border-border"
          />
          <FeatureCard
            title={t("overview.whatSSLDoes.seo.title")}
            description={t("overview.whatSSLDoes.seo.description")}
            icon={<Globe className="w-6 h-6 text-primary" />}
            iconBackground={false}
            className="bg-background p-8 rounded-xl shadow-sm border border-border"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg">
        <SectionHeader
          title={t("overview.whenYouNeed.title")}
          description={t("overview.whenYouNeed.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-muted/30 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">{t("overview.whenYouNeed.contactForm.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {t("overview.whenYouNeed.contactForm.description")}
            </p>
          </div>

          <div className="bg-muted/30 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">{t("overview.whenYouNeed.sellOnline.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {t("overview.whenYouNeed.sellOnline.description")}
            </p>
          </div>

          <div className="bg-muted/30 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">{t("overview.whenYouNeed.userLogins.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {t("overview.whenYouNeed.userLogins.description")}
            </p>
          </div>

          <div className="bg-muted/30 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">{t("overview.whenYouNeed.professional.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {t("overview.whenYouNeed.professional.description")}
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper padding="lg" id="help">
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted/30 p-12 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              {t("overview.notSure.title")}
            </h2>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              {t("overview.notSure.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href="#contact">{t("overview.notSure.talkToSupport")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
                <Link href="#faq">{t("overview.notSure.readFAQ")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg" id="faq">
        <SectionHeader
          title={t("overview.faq.title")}
          description={t("overview.faq.description")}
          headingLevel={2}
        />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion
            items={(t("overview.faq.items") as any[]).map((item: any, index: number) => ({
              id: `item-${index + 1}`,
              question: item.question,
              answer: item.answer,
            }))}
            itemClassName="bg-background px-6 rounded-lg border border-border"
            questionClassName="text-left text-lg font-semibold hover:no-underline py-5"
            answerClassName="text-[15px] text-muted-foreground leading-relaxed pb-5"
          />
        </div>
      </SectionWrapper>

      <CTABlock
        title={t("overview.cta.title")}
        description={t("overview.cta.description")}
        primaryAction={{
          label: t("overview.cta.primary"),
          href: "/ssl/positive",
        }}
        secondaryAction={{
          label: t("overview.cta.secondary"),
          href: "#contact",
          variant: "outline",
        }}
      />

      </main>

      <SiteFooter />
    </div>
  )
}
