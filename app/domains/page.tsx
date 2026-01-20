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

export default function DomainsPage() {
  const { t } = useTranslation('domains')
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
          searchHref: "/configure/domain?domain=yourdomain.com&tld=.com",
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
          <Link href="/configure/domain?domain=yourdomain.com&tld=.com">
            <Button size="lg" className="px-8 shadow-md hover:shadow-lg transition-shadow">
              Search for a domain
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 border-2 hover:bg-muted/50 bg-transparent">
            Talk to us first
          </Button>
        </div>
        <p className="text-sm text-muted-foreground/70 pt-2 text-center">No pressure. No tricks. We'll help either way.</p>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg" border>
        <SectionHeader
          title="What you get with every domain"
          description="No tiers. No upsells. These are included with every domain you register."
          headingLevel={2}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          <FeatureCard
            title="Free WHOIS privacy"
            description="Your personal information stays private. No spam, no public records."
            icon={<Shield className="h-6 w-6 text-foreground/70" />}
          />
          <FeatureCard
            title="Full ownership, no lock-in"
            description="Transfer your domain anytime. No hidden fees, no permission needed."
            icon={<Key className="h-6 w-6 text-foreground/70" />}
          />
          <FeatureCard
            title="Simple DNS management"
            description="Point your domain anywhere. Clear interface, no technical jargon."
            icon={<Database className="h-6 w-6 text-foreground/70" />}
          />
          <FeatureCard
            title="Clear renewal pricing"
            description="You'll know the renewal price before you buy. No surprises next year."
            icon={<Check className="h-6 w-6 text-foreground/70" />}
          />
        </div>
        <div className="max-w-3xl mx-auto rounded-xl border-2 border-border/50 bg-muted/40 p-6 text-center">
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Everything listed here is included. Not "for the first year". Not "with premium plans".
            <span className="font-medium text-foreground"> This is what you get, always.</span>
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
              <p>Most founders don't fail because of ideas.</p>
              <p className="text-muted-foreground">They fail because the tools around them are confusing.</p>
              <p>
                We built domains the way they should've always been:
                <span className="block mt-2 text-foreground">clear, honest, and fully yours.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/configure/domain?domain=yourdomain.com&tld=.com">
                <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  Find your domain
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 hover:bg-muted/50 bg-transparent">
                Talk to a human
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg" border>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Common questions"
            description="Clear answers. No legal language."
            headingLevel={2}
          />
          <FAQAccordion
            items={[
              {
                id: "ownership",
                question: "Do I actually own the domain?",
                answer:
                  "Yes. Completely. When you register a domain with us, you're the legal owner. You can transfer it to another registrar anytime, point it anywhere, or sell it. We're just the registrar—you're the owner.",
              },
              {
                id: "renewal",
                question: "Will the renewal price suddenly increase?",
                answer:
                  "No. We show you the renewal price before you buy. That's the price you'll pay next year. Registry prices can change (they're set by organizations like Verisign, not us), but we'll always notify you in advance and honor what we promised.",
              },
              {
                id: "transfer",
                question: "Can I transfer my domain anytime?",
                answer:
                  "Yes. After 60 days from registration (an ICANN rule, not ours), you can transfer your domain to any registrar. We don't lock you in. We don't make it complicated. If you want to leave, we'll help you do it smoothly.",
              },
              {
                id: "taken",
                question: "What if my perfect domain is taken?",
                answer:
                  "It happens. We'll help you find alternatives—different TLDs, creative variations, or brandable options. Sometimes what feels like a setback leads to a better name. If you want help brainstorming, just ask. We're good at this.",
              },
              {
                id: "help",
                question: "Can you help me choose a domain?",
                answer:
                  "Absolutely. Choosing a domain can feel overwhelming. Talk to us—we'll ask about your business, help you think through options, and guide you toward something that feels right. No pressure, no upselling. Just honest advice.",
              },
            ]}
          />
        </div>
      </SectionWrapper>

      </main>

      <SiteFooter />
    </div>
  )
}
