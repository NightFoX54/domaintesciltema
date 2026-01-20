import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export default function MigrationPage() {
  const { t } = useTranslation('migration')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

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
                    {t("hero.requestHelp")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/person-confidently-working-at-organized-workspace-calm.jpg"
                alt={t("hero.imageAlt")}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS MIGRATION */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-balance">{t("whatIs.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {t("whatIs.description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/20 rounded-xl p-8 border border-border/50">
                <h3 className="text-2xl font-semibold mb-4">{t("whatIs.anotherHost.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
                  {t("whatIs.anotherHost.description1")}
                </p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("whatIs.anotherHost.description2")}
                </p>
              </div>

              <div className="bg-muted/20 rounded-xl p-8 border border-border/50">
                <h3 className="text-2xl font-semibold mb-4">{t("whatIs.local.title")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
                  {t("whatIs.local.description1")}
                </p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("whatIs.local.description2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WE HANDLE IT */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-balance">{t("weHandle.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t("weHandle.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background rounded-xl p-8 space-y-4 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-foreground text-background flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">{t("weHandle.zeroDowntime.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("weHandle.zeroDowntime.description")}
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 space-y-4 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-foreground text-background flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">{t("weHandle.everythingIncluded.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("weHandle.everythingIncluded.description")}
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 space-y-4 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-foreground text-background flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">{t("weHandle.fastTurnaround.title")}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {t("weHandle.fastTurnaround.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE NEED FROM YOU */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-balance">{t("whatWeNeed.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {t("whatWeNeed.description")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-muted/20 rounded-xl p-6 border border-border/50">
                <CheckCircle className="h-6 w-6 text-foreground mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <div className="font-semibold text-lg">{t("whatWeNeed.loginDetails.title")}</div>
                  <div className="text-[15px] text-muted-foreground leading-relaxed">
                    {t("whatWeNeed.loginDetails.description")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-muted/20 rounded-xl p-6 border border-border/50">
                <CheckCircle className="h-6 w-6 text-foreground mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <div className="font-semibold text-lg">{t("whatWeNeed.domainAccess.title")}</div>
                  <div className="text-[15px] text-muted-foreground leading-relaxed">
                    {t("whatWeNeed.domainAccess.description")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-muted/20 rounded-xl p-6 border border-border/50">
                <CheckCircle className="h-6 w-6 text-foreground mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <div className="font-semibold text-lg">{t("whatWeNeed.specialConfig.title")}</div>
                  <div className="text-[15px] text-muted-foreground leading-relaxed">
                    {t("whatWeNeed.specialConfig.description")}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-accent/10 rounded-xl border border-accent/20">
              <p className="text-[15px] text-muted-foreground leading-relaxed text-center">
                {t("whatWeNeed.note")}
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
                  {t("cta.requestFree")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
