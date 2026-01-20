"use client"

import { MessageCircle, CheckCircle, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/common/hero-section"
import { SectionWrapper } from "@/components/common/section-wrapper"
import { ProductCard } from "@/components/common/product-card"
import { StatsSection } from "@/components/common/stats-section"
import { TestimonialCard } from "@/components/common/testimonial-card"
import { FAQAccordion } from "@/components/common/faq-accordion"
import { CTABlock } from "@/components/common/cta-block"
import { SectionHeader } from "@/components/common/section-header"
import { FeatureCard } from "@/components/common/feature-card"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"

export default function HomePage() {
  const { t } = useTranslation('homepage')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      <HeroSection
        title={t("hero.title")}
        description={t("hero.description")}
        imageSrc="/solo-founder-working-at-home-office-with-warm-natu.jpg"
        imageAlt={t("hero.imageAlt")}
        searchInput={{
          placeholder: t("hero.searchPlaceholder"),
          searchButtonLabel: t("hero.searchButton"),
          searchHref: "/configure/domain?domain=yourdomain.com&tld=.com",
        }}
        additionalContent={
          <p className="text-sm text-muted-foreground/80 leading-relaxed px-1">
            {t("hero.searchInfo")}
          </p>
        }
      />

      <SectionWrapper background="muted" padding="md" border>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            {t("intro.text")}
            <span className="block mt-3 text-foreground font-medium text-xl">
              {t("intro.emphasis")}
            </span>
          </p>
        </div>
      </SectionWrapper>

      <StatsSection
        stats={[
          {
            value: "12,000+",
            description: t("stats.founders"),
          },
          {
            value: "2 minutes",
            description: t("stats.responseTime"),
          },
          {
            value: "Since 2018",
            description: t("stats.since"),
          },
        ]}
      />

      <SectionWrapper padding="xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1]">
              {t("story.title")}
            </h2>

            <div className="space-y-6 text-[17px] text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                {t("story.paragraph1")}
              </p>
              <p className="text-pretty">
                {t("story.paragraph2")}
              </p>
              <p className="text-pretty">
                {t("story.paragraph3")}
              </p>
              <p className="text-foreground font-medium text-xl leading-relaxed text-pretty pt-4">
                {t("story.emphasis1")}
              </p>
              <p className="text-foreground text-[17px] text-pretty">
                {t("story.emphasis2")}
              </p>
            </div>
          </div>

          <div className="relative lg:mr-8 lg:-ml-16">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 ring-1 ring-border/50">
              <img
                src="/small-team-of-people-working-together-in-cozy-offi.jpg"
                alt={t("story.imageAlt")}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="gradient" padding="lg">
        <SectionHeader
          title={t("testimonials.title")}
          align="center"
          headingLevel={2}
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TestimonialCard
            name={t("testimonials.sarah.name")}
            role={t("testimonials.sarah.role")}
            imageSrc="/professional-woman-smiling-headshot.png"
            imageAlt={t("testimonials.sarah.name")}
            quote={`"${t("testimonials.sarah.quote")}"`}
            offset="up"
          />
          <TestimonialCard
            name={t("testimonials.marcus.name")}
            role={t("testimonials.marcus.role")}
            imageSrc="/professional-man-glasses-headshot.png"
            imageAlt={t("testimonials.marcus.name")}
            quote={`"${t("testimonials.marcus.quote")}"`}
          />
          <TestimonialCard
            name={t("testimonials.amelia.name")}
            role={t("testimonials.amelia.role")}
            imageSrc="/professional-headshot-woman-entrepreneur.jpg"
            imageAlt={t("testimonials.amelia.name")}
            quote={`"${t("testimonials.amelia.quote")}"`}
            offset="down"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper padding="lg">
        <SectionHeader
          title={t("products.title")}
          description={t("products.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ProductCard
            title={t("products.domains.title")}
            description={t("products.domains.description")}
            features={t("products.domains.features") as string[]}
            footerText={t("products.domains.footer")}
            actionLabel={t("products.domains.action")}
            actionHref="/domains"
          />
          <ProductCard
            title={t("products.hosting.title")}
            description={t("products.hosting.description")}
            features={t("products.hosting.features") as string[]}
            footerText={t("products.hosting.footer")}
            actionLabel={t("products.hosting.action")}
            actionHref="/hosting"
          />
          <ProductCard
            title={t("products.ssl.title")}
            description={t("products.ssl.description")}
            features={t("products.ssl.features") as string[]}
            footerText={t("products.ssl.footer")}
            actionLabel={t("products.ssl.action")}
            actionHref="/ssl"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="lg">
        <SectionHeader
          title={t("outcomes.title")}
          description={t("outcomes.description")}
          headingLevel={2}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-border rounded-xl p-8 space-y-5 hover:border-foreground/30 hover:shadow-sm transition-all">
            <CardContent>
              <h3 className="text-xl md:text-2xl font-semibold text-balance">{t("outcomes.simpleWebsite.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t("outcomes.simpleWebsite.description")}
              </p>
              <div className="pt-3 space-y-3 border-t border-border/50">
                <div className="text-sm font-medium text-foreground/80">{t("outcomes.simpleWebsite.recommendation")}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{t("outcomes.simpleWebsite.solution")}</div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-foreground/5 mt-4">
                  {t("outcomes.simpleWebsite.action")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border rounded-xl p-8 space-y-5 hover:border-foreground/30 hover:shadow-sm transition-all">
            <CardContent>
              <h3 className="text-xl md:text-2xl font-semibold text-balance">{t("outcomes.sellOnline.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t("outcomes.sellOnline.description")}
              </p>
              <div className="pt-3 space-y-3 border-t border-border/50">
                <div className="text-sm font-medium text-foreground/80">{t("outcomes.sellOnline.recommendation")}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{t("outcomes.sellOnline.solution")}</div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-foreground/5 mt-4">
                  {t("outcomes.sellOnline.action")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border rounded-xl p-8 space-y-5 hover:border-foreground/30 hover:shadow-sm transition-all">
            <CardContent>
              <h3 className="text-xl md:text-2xl font-semibold text-balance">{t("outcomes.professional.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t("outcomes.professional.description")}
              </p>
              <div className="pt-3 space-y-3 border-t border-border/50">
                <div className="text-sm font-medium text-foreground/80">{t("outcomes.professional.recommendation")}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{t("outcomes.professional.solution")}</div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-foreground/5 mt-4">
                  {t("outcomes.professional.action")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border rounded-xl p-8 space-y-5 hover:border-foreground/30 hover:shadow-sm transition-all">
            <CardContent>
              <h3 className="text-xl md:text-2xl font-semibold text-balance">{t("outcomes.custom.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t("outcomes.custom.description")}
              </p>
              <div className="pt-3 space-y-3 border-t border-border/50">
                <div className="text-sm font-medium text-foreground/80">{t("outcomes.custom.recommendation")}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{t("outcomes.custom.solution")}</div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-foreground/5 mt-4">
                  {t("outcomes.custom.action")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border rounded-xl p-8 space-y-5 hover:border-foreground/30 hover:shadow-sm transition-all">
            <CardContent>
              <h3 className="text-xl md:text-2xl font-semibold text-balance">{t("outcomes.unsure.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t("outcomes.unsure.description")}
              </p>
              <div className="pt-3 space-y-3 border-t border-border/50">
                <div className="text-sm font-medium text-foreground/80">{t("outcomes.unsure.recommendation")}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{t("outcomes.unsure.solution")}</div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-foreground/5 mt-4">
                  {t("outcomes.unsure.action")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border rounded-xl p-8 space-y-5 hover:border-foreground/30 hover:shadow-sm transition-all">
            <CardContent>
              <h3 className="text-xl md:text-2xl font-semibold text-balance">{t("outcomes.migration.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {t("outcomes.migration.description")}
              </p>
              <div className="pt-3 space-y-3 border-t border-border/50">
                <div className="text-sm font-medium text-foreground/80">{t("outcomes.migration.recommendation")}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{t("outcomes.migration.solution")}</div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-foreground/5 mt-4">
                  {t("outcomes.migration.action")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper padding="md">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title={t("faq.title")}
            description={t("faq.description")}
            headingLevel={2}
          />
          <FAQAccordion
            items={[
              {
                id: "pricing",
                question: t("faq.pricing.question"),
                answer: t("faq.pricing.answer"),
              },
              {
                id: "upgrading",
                question: t("faq.upgrading.question"),
                answer: t("faq.upgrading.answer"),
              },
              {
                id: "support",
                question: t("faq.support.question"),
                answer: t("faq.support.answer"),
              },
              {
                id: "migration",
                question: t("faq.migration.question"),
                answer: t("faq.migration.answer"),
              },
              {
                id: "commitment",
                question: t("faq.commitment.question"),
                answer: t("faq.commitment.answer"),
              },
            ]}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted" padding="md">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative aspect-square rounded-xl overflow-hidden order-2 lg:order-1 shadow-lg">
            <img
              src="/friendly-support-person-at-desk-with-headset-smili.jpg"
              alt="Support team member"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-semibold text-balance leading-tight">{t("support.title")}</h2>

            <div className="space-y-5 text-lg text-muted-foreground/90 leading-relaxed">
              <p className="text-pretty">
                {t("support.paragraph1")}
              </p>
              <p className="text-pretty">
                {t("support.paragraph2")}
              </p>
              <p className="text-foreground font-medium text-pretty">
                {t("support.emphasis")}
              </p>
            </div>

            <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="font-medium text-foreground mb-1">{t("support.responseTime.title")}</div>
                <div className="text-sm text-muted-foreground/80">{t("support.responseTime.description")}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="font-medium text-foreground mb-1">{t("support.humans.title")}</div>
                <div className="text-sm text-muted-foreground/80">{t("support.humans.description")}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="font-medium text-foreground mb-1">{t("support.stay.title")}</div>
                <div className="text-sm text-muted-foreground/80">{t("support.stay.description")}</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <CTABlock
        title={t("cta.title")}
        description={
          <>
            {t("cta.description")}
            <span className="block mt-2">{t("cta.description2")}</span>
          </>
        }
        primaryAction={{
          label: t("cta.primary"),
          href: "/domains/search",
        }}
        secondaryAction={{
          label: t("cta.secondary"),
          href: "/contact",
          icon: <MessageCircle className="h-4 w-4" />,
        }}
        footerText={t("cta.footer")}
      />

      </main>

      <SiteFooter />
    </div>
  )
}
