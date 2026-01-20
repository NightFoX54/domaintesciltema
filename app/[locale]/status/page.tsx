'use client'

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function StatusPage() {
  const { t } = useTranslation('status')
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-tight">{t("hero.title")}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* CURRENT STATUS */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Overall Status */}
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-green-900 dark:text-green-100">
                    {t("overallStatus.title")}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-1">{t("overallStatus.lastChecked")}</div>
                </div>
              </div>
            </div>

            {/* Service Status */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold mb-8">{t("serviceStatus.title")}</h2>

              <div className="flex items-center justify-between p-6 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-semibold">{t("serviceStatus.webHosting.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("serviceStatus.webHosting.description")}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">{t("serviceStatus.operational")}</div>
              </div>

              <div className="flex items-center justify-between p-6 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-semibold">{t("serviceStatus.domainServices.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("serviceStatus.domainServices.description")}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">{t("serviceStatus.operational")}</div>
              </div>

              <div className="flex items-center justify-between p-6 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-semibold">{t("serviceStatus.emailServices.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("serviceStatus.emailServices.description")}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">{t("serviceStatus.operational")}</div>
              </div>

              <div className="flex items-center justify-between p-6 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-semibold">{t("serviceStatus.sslCertificates.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("serviceStatus.sslCertificates.description")}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">{t("serviceStatus.operational")}</div>
              </div>

              <div className="flex items-center justify-between p-6 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-semibold">{t("serviceStatus.supportSystems.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("serviceStatus.supportSystems.description")}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">{t("serviceStatus.operational")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPTIME STATS */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">{t("uptimeStats.title")}</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background rounded-xl p-8 border border-border text-center">
                <div className="text-4xl font-semibold mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">{t("uptimeStats.last30Days")}</div>
              </div>

              <div className="bg-background rounded-xl p-8 border border-border text-center">
                <div className="text-4xl font-semibold mb-2">99.95%</div>
                <div className="text-sm text-muted-foreground">{t("uptimeStats.last90Days")}</div>
              </div>

              <div className="bg-background rounded-xl p-8 border border-border text-center">
                <div className="text-4xl font-semibold mb-2">99.98%</div>
                <div className="text-sm text-muted-foreground">{t("uptimeStats.last12Months")}</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                {t("uptimeStats.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INCIDENT HISTORY */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12">{t("incidentHistory.title")}</h2>

            <div className="space-y-6">
              <div className="p-6 bg-muted/20 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="font-semibold">{t("incidentHistory.noIncidents.title")}</div>
                      <div className="text-sm text-muted-foreground">{t("incidentHistory.noIncidents.period")}</div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("incidentHistory.noIncidents.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">{t("incidentHistory.commitment.title")}</strong> {t("incidentHistory.commitment.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
