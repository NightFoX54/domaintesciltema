'use client'

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, ArrowRight, Clock, Users } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export default function SupportPage() {
  const { t } = useTranslation('support')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      {/* HERO */}
      <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-tight">
                  {t("hero.title")}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-base shadow-md">
                  <Link href="/contact">
                    {t("hero.talkToHuman")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                  <Link href="/migration">{t("hero.getMigrationHelp")}</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/support-person-smiling-at-desk-helping-customer.jpg"
                alt={t("hero.imageAlt")}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-balance">{t("howWeHelp.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("howWeHelp.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-muted/20 rounded-xl p-8 space-y-4 border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center" aria-hidden="true">
                <MessageCircle className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">{t("howWeHelp.listen.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("howWeHelp.listen.description")}
              </p>
            </div>

            <div className="bg-muted/20 rounded-xl p-8 space-y-4 border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center" aria-hidden="true">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">{t("howWeHelp.guide.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("howWeHelp.guide.description")}
              </p>
            </div>

            <div className="bg-muted/20 rounded-xl p-8 space-y-4 border border-border/50">
              <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center" aria-hidden="true">
                <Clock className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">{t("howWeHelp.stay.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("howWeHelp.stay.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT CHANNELS */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-balance">{t("channels.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("channels.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link
              href="/contact"
              className="group bg-background rounded-xl p-8 space-y-6 border border-border hover:shadow-lg transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-xl bg-foreground text-background flex items-center justify-center group-hover:scale-105 transition-transform" aria-hidden="true">
                <MessageCircle className="h-7 w-7" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{t("channels.liveChat.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("channels.liveChat.description")}
                </p>
              </div>
              <div className="text-sm font-medium text-foreground group-hover:gap-2 flex items-center gap-1 transition-all">
                {t("channels.liveChat.action")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </Link>

            <Link
              href="/contact"
              className="group bg-background rounded-xl p-8 space-y-6 border border-border hover:shadow-lg transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-xl bg-foreground text-background flex items-center justify-center group-hover:scale-105 transition-transform" aria-hidden="true">
                <Mail className="h-7 w-7" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{t("channels.email.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("channels.email.description")}
                </p>
              </div>
              <div className="text-sm font-medium text-foreground group-hover:gap-2 flex items-center gap-1 transition-all">
                {t("channels.email.action")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </Link>

            <Link
              href="/migration"
              className="group bg-background rounded-xl p-8 space-y-6 border border-border hover:shadow-lg transition-all duration-200"
            >
              <div className="h-14 w-14 rounded-xl bg-foreground text-background flex items-center justify-center group-hover:scale-105 transition-transform" aria-hidden="true">
                <ArrowRight className="h-7 w-7" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{t("channels.migration.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("channels.migration.description")}
                </p>
              </div>
              <div className="text-sm font-medium text-foreground group-hover:gap-2 flex items-center gap-1 transition-all">
                {t("channels.migration.action")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* RESPONSE TIMES */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-balance">
                {t("responseTimes.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {t("responseTimes.description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6 bg-muted/20 rounded-xl p-6 border border-border/50">
                <div className="h-12 w-12 rounded-lg bg-foreground text-background flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">{t("responseTimes.liveChat.title")}</h3>
                    <div className="text-sm font-medium text-foreground">{t("responseTimes.liveChat.time")}</div>
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {t("responseTimes.liveChat.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-muted/20 rounded-xl p-6 border border-border/50">
                <div className="h-12 w-12 rounded-lg bg-foreground text-background flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">{t("responseTimes.email.title")}</h3>
                    <div className="text-sm font-medium text-foreground">{t("responseTimes.email.time")}</div>
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {t("responseTimes.email.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-muted/20 rounded-xl p-6 border border-border/50">
                <div className="h-12 w-12 rounded-lg bg-foreground text-background flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">{t("responseTimes.urgent.title")}</h3>
                    <div className="text-sm font-medium text-foreground">{t("responseTimes.urgent.time")}</div>
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {t("responseTimes.urgent.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-[15px] text-muted-foreground leading-relaxed text-center">
                {t("responseTimes.note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold text-balance leading-tight">{t("cta.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base shadow-md">
                <Link href="/contact">
                  {t("cta.contactSupport")} <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-balance">Browse our products</h2>
            <p className="text-muted-foreground">Looking for domains, hosting, or SSL certificates?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/domains">Domains</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/hosting">Hosting</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/ssl">SSL Certificates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
