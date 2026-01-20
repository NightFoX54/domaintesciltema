"use client"

import { Button } from "@/components/ui/button"
import { Server, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionWrapper } from "@/components/common/section-wrapper"
import { SectionHeader } from "@/components/common/section-header"
import { FAQAccordion } from "@/components/common/faq-accordion"
import { CTABlock } from "@/components/common/cta-block"
import { HostingTypeCard } from "@/components/hosting/hosting-type-card"
import { useTranslation } from "@/lib/i18n"

export default function HostingOverviewPage() {
  const { t } = useTranslation('hosting')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-[1.05] tracking-tight">
                {t("overview.hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed text-pretty max-w-lg">
                {t("overview.hero.description1")}
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("overview.hero.description2")}
              </p>
            </div>
            <div className="relative">
              <img
                src="/developer-at-desk-with-multiple-monitors-calm-workspace.jpg?height=600&width=800"
                alt={t("overview.hero.imageAlt")}
                className="w-full rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper background="muted" padding="md">
        <SectionHeader
          title={t("overview.whatHostingDoes.title")}
          description={t("overview.whatHostingDoes.description")}
          headingLevel={2}
        />
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-foreground mb-2">{t("overview.whatHostingDoes.storesFiles.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("overview.whatHostingDoes.storesFiles.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-foreground mb-2">{t("overview.whatHostingDoes.deliversSite.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("overview.whatHostingDoes.deliversSite.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-foreground mb-2">{t("overview.whatHostingDoes.keepsSecure.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("overview.whatHostingDoes.keepsSecure.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper padding="lg">
        <SectionHeader
          title={t("overview.whichHosting.title")}
          description={t("overview.whichHosting.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HostingTypeCard
            title={t("overview.whichHosting.linux.title")}
            description={t("overview.whichHosting.linux.description")}
            details={t("overview.whichHosting.linux.details")}
            icon={<Server className="w-7 h-7 text-primary" />}
            href="/hosting/linux"
          />
          <HostingTypeCard
            title={t("overview.whichHosting.wordpress.title")}
            description={t("overview.whichHosting.wordpress.description")}
            details={t("overview.whichHosting.wordpress.details")}
            icon={<Zap className="w-7 h-7 text-primary" />}
            href="/hosting/wordpress"
          />
          <HostingTypeCard
            title={t("overview.whichHosting.joomla.title")}
            description={t("overview.whichHosting.joomla.description")}
            details={t("overview.whichHosting.joomla.details")}
            icon={<Users className="w-7 h-7 text-primary" />}
            href="/hosting/joomla"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="md">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title={t("overview.faq.title")}
            description={t("overview.faq.description")}
            headingLevel={2}
          />
          <FAQAccordion
            items={(t("overview.faq.items") as any[]).map((item: any, index: number) => ({
              id: `item-${index + 1}`,
              question: item.question,
              answer: item.answer,
            }))}
            itemClassName="bg-card border border-border rounded-xl px-6 shadow-sm"
            questionClassName="text-left font-medium text-foreground hover:no-underline py-5"
            answerClassName="text-muted-foreground leading-relaxed pb-5"
          />
        </div>
      </SectionWrapper>

      <CTABlock
        title={t("overview.cta.title")}
        description={t("overview.cta.description")}
        primaryAction={{
          label: t("overview.cta.primary"),
          href: "/contact",
        }}
        secondaryAction={{
          label: t("overview.cta.secondary"),
          href: "/hosting",
          variant: "outline",
        }}
      />

      </main>

      <SiteFooter />
    </div>
  )
}
