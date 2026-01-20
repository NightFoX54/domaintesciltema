"use client"

import { Button } from "@/components/ui/button"
import { Shield, TrendingUp, Key, Database, Check, Globe } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/common/hero-section"
import { SectionWrapper } from "@/components/common/section-wrapper"
import { SectionHeader } from "@/components/common/section-header"
import { FeatureCard } from "@/components/common/feature-card"
import { FAQAccordion } from "@/components/common/faq-accordion"
import { CTABlock } from "@/components/common/cta-block"
import { DomainFeatureBadges } from "@/components/domain/domain-feature-badges"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { useParams } from "next/navigation"
import { addLocaleToPath } from "@/lib/locale-utils"

export default function DomainsPage() {
  const { t } = useTranslation('domains')
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      <HeroSection
        title={t("overview.hero.title")}
        description={t("overview.hero.description")}
        imageSrc="/person-thinking-about-business-name-writing-in-notebook.jpg"
        imageAlt={t("overview.hero.imageAlt")}
        searchInput={{
          placeholder: t("overview.hero.searchPlaceholder"),
          searchButtonLabel: t("overview.hero.searchButton"),
          searchHref: getPath("/configure/domain?domain=yourdomain.com&tld=.com"),
        }}
        additionalContent={
          <>
            <p className="text-sm text-muted-foreground/80 leading-relaxed px-1">
              {t("overview.hero.additionalInfo")}
            </p>
            <DomainFeatureBadges
              badges={[
                { icon: <Shield className="h-4 w-4 text-muted-foreground" />, label: t("overview.hero.icannAccredited") },
                { icon: <Key className="h-4 w-4 text-muted-foreground" />, label: t("overview.hero.freeWhoisPrivacy") },
                { icon: <Check className="h-4 w-4 text-muted-foreground" />, label: t("overview.hero.transparentRenewal") },
              ]}
            />
          </>
        }
      />

      <SectionWrapper background="muted" padding="lg" border>
        <SectionHeader
          title={t("overview.whyMatters.title")}
          description={t("overview.whyMatters.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 max-w-5xl mx-auto">
          <div className="text-center space-y-5">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/60" aria-hidden="true">
              <Globe className="h-7 w-7 text-foreground/70" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{t("overview.whyMatters.identity.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
              {t("overview.whyMatters.identity.description")}
            </p>
          </div>

          <div className="text-center space-y-5">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/60" aria-hidden="true">
              <Shield className="h-7 w-7 text-foreground/70" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{t("overview.whyMatters.credibility.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
              {t("overview.whyMatters.credibility.description")}
            </p>
          </div>

          <div className="text-center space-y-5">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/60" aria-hidden="true">
              <TrendingUp className="h-7 w-7 text-foreground/70" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">{t("overview.whyMatters.asset.title")}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
              {t("overview.whyMatters.asset.description")}
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper padding="lg">
        <SectionHeader
          title={t("overview.findDomain.title")}
          description={t("overview.findDomain.description")}
          headingLevel={2}
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={getPath("/configure/domain?domain=yourdomain.com&tld=.com")}>
            <Button size="lg" className="px-8 shadow-md hover:shadow-lg transition-shadow">
              Search for a domain
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 border-2 hover:bg-muted/50 bg-transparent">
            Talk to us first
          </Button>
        </div>
        <p className="text-sm text-muted-foreground/70 pt-2 text-center">{t("overview.noPressure")}</p>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg" border>
        <SectionHeader
          title={t("overview.whatYouGet.title")}
          description={t("overview.whatYouGet.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          <FeatureCard
            title={t("overview.whatYouGet.freeWhois.title")}
            description={t("overview.whatYouGet.freeWhois.description")}
            icon={<Shield className="h-6 w-6 text-foreground/70" />}
          />
          <FeatureCard
            title={t("overview.whatYouGet.fullOwnership.title")}
            description={t("overview.whatYouGet.fullOwnership.description")}
            icon={<Key className="h-6 w-6 text-foreground/70" />}
          />
          <FeatureCard
            title={t("overview.whatYouGet.simpleDNS.title")}
            description={t("overview.whatYouGet.simpleDNS.description")}
            icon={<Database className="h-6 w-6 text-foreground/70" />}
          />
          <FeatureCard
            title={t("overview.whatYouGet.clearPricing.title")}
            description={t("overview.whatYouGet.clearPricing.description")}
            icon={<Check className="h-6 w-6 text-foreground/70" />}
          />
        </div>
        <div className="max-w-3xl mx-auto rounded-xl border-2 border-border/50 bg-muted/40 p-6 text-center">
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            {t("overview.whatYouGet.footer")}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper padding="xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative lg:mr-8 lg:-ml-16">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 ring-1 ring-border/50">
              <img
                src="/entrepreneur-at-laptop-with-notebook-planning-domain-strategy.jpg"
                alt={t("overview.whyMatters.imageAlt")}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-10 max-w-xl">
            <div className="space-y-7 text-2xl md:text-3xl font-medium text-foreground leading-relaxed text-balance">
              <p>{t("overview.philosophy.paragraph1")}</p>
              <p className="text-muted-foreground">{t("overview.philosophy.paragraph2")}</p>
              <p>
                {t("overview.philosophy.paragraph3")}
                <span className="block mt-2 text-foreground">{t("overview.philosophy.paragraph4")}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={getPath("/configure/domain?domain=yourdomain.com&tld=.com")}>
                <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  {t("overview.philosophy.findDomain")}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 hover:bg-muted/50 bg-transparent">
                {t("overview.philosophy.talkToHuman")}
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg" border>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title={t("overview.faq.title")}
            description={t("overview.faq.description", "domains")}
            headingLevel={2}
          />
          <FAQAccordion
            items={(t("overview.faq.items") as any[]).map((item: any, index: number) => ({
              id: `faq-${index + 1}`,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </SectionWrapper>

      {/* Contextual Link */}
      <SectionWrapper padding="md">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground">
            {t("overview.contextualLink.text")}{" "}
            <Link href={getPath("/hosting")} className="text-foreground font-medium hover:underline">
              {t("overview.contextualLink.link")}
            </Link>
          </p>
        </div>
      </SectionWrapper>

      </main>

      <SiteFooter />
    </div>
  )
}
