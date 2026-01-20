"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, ArrowRight, Shield, Clock, HeartHandshake, Loader2, AlertCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"
import { useParams } from "next/navigation"
import { addLocaleToPath } from "@/lib/locale-utils"

interface TransferResult {
  domain: string
  eligible: boolean
  status: "available" | "locked" | "recently_registered" | "expired" | "not_found"
  message: string
  transferPrice: string
  currentRegistrar?: string
  expiryDate?: string
  daysUntilExpiry?: number
}

function checkTransferEligibility(domain: string): TransferResult {
  // Normalize domain
  const normalizedDomain = domain.toLowerCase().trim()

  // Dummy results - in real app this would come from API
  const random = Math.random()

  if (random > 0.7) {
    return {
      domain: normalizedDomain,
      eligible: true,
      status: "available",
      message: "", // Message will be translated in component
      transferPrice: "₺299",
      currentRegistrar: "GoDaddy",
      expiryDate: "2025-08-15",
      daysUntilExpiry: 180,
    }
  } else if (random > 0.5) {
    return {
      domain: normalizedDomain,
      eligible: false,
      status: "locked",
      message: "", // Message will be translated in component
      transferPrice: "₺299",
      currentRegistrar: "Namecheap",
      expiryDate: "2025-06-20",
      daysUntilExpiry: 120,
    }
  } else if (random > 0.3) {
    return {
      domain: normalizedDomain,
      eligible: false,
      status: "recently_registered",
      message: "", // Message will be translated in component
      transferPrice: "₺299",
      currentRegistrar: "Unknown",
    }
  } else if (random > 0.1) {
    return {
      domain: normalizedDomain,
      eligible: false,
      status: "expired",
      message: "", // Message will be translated in component
      transferPrice: "₺299",
    }
  } else {
    return {
      domain: normalizedDomain,
      eligible: false,
      status: "not_found",
      message: "", // Message will be translated in component
      transferPrice: "₺299",
    }
  }
}

export default function DomainTransferPage() {
  const { t } = useTranslation('domains')
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')
  
  const [domain, setDomain] = useState("")
  const [transferResult, setTransferResult] = useState<TransferResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [authCode, setAuthCode] = useState("")

  const handleCheck = () => {
    if (!domain.trim()) return

    setIsChecking(true)
    setHasChecked(true)

    // Simulate API delay
    setTimeout(() => {
      const result = checkTransferEligibility(domain)
      setTransferResult(result)
      setIsChecking(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheck()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation replaced with SiteHeader component */}
      <SiteHeader />

      <main id="main-content">
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance">
                  {t("transfer.hero.title")}
                </h1>
                <p className="text-[17px] md:text-lg text-muted-foreground text-balance leading-relaxed">
                  {t("transfer.hero.description")}
                </p>
              </div>

              {/* Transfer Input */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <label htmlFor="domain-transfer-input" className="sr-only">
                    {t("transfer.hero.inputLabel")}
                  </label>
                  <Input
                    id="domain-transfer-input"
                    type="text"
                    placeholder={t("transfer.hero.placeholder")}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleCheck()
                      }
                    }}
                    className="h-14 px-4 text-base flex-1"
                    aria-label={t("transfer.hero.inputLabel")}
                  />
                  <Button size="lg" className="h-14 px-8" onClick={handleCheck} disabled={isChecking || !domain.trim()}>
                    {isChecking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        {t("transfer.hero.checking")}
                      </>
                    ) : (
                      t("transfer.hero.checkButton")
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("transfer.hero.hint")}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">{t("transfer.hero.freeYear")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">{t("transfer.hero.noDowntime")}</span>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/5 ring-1 ring-border/50">
                <img
                  src="/person-organizing-digital-files-at-calm-workspace.jpg"
                  alt={t("transfer.hero.imageAlt")}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasChecked && (
        <section className="py-16 md:py-20 border-b border-border/40">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-3xl mx-auto">
              {isChecking ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" aria-hidden="true" />
                  <p className="text-lg text-muted-foreground">{t("transfer.status.checking")}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t("transfer.status.checking")}</p>
                </div>
              ) : (
                transferResult && (
                  <div className="space-y-6">
                    {/* Result Header */}
                    <div
                      className={`rounded-2xl p-6 md:p-8 ${
                        transferResult.eligible
                          ? "bg-green-50 border-2 border-green-200"
                          : "bg-amber-50 border-2 border-amber-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            transferResult.eligible ? "bg-green-100" : "bg-amber-100"
                          }`}
                        >
                          {transferResult.eligible ? (
                            <Check className="h-6 w-6 text-green-600" aria-hidden="true" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-amber-600" aria-hidden="true" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-semibold text-foreground mb-2">{transferResult.domain}</h2>
                          <p className={`text-lg ${transferResult.eligible ? "text-green-700" : "text-amber-700"}`}>
                            {transferResult.eligible 
                              ? t("transfer.status.eligible.title")
                              : transferResult.status === "locked" 
                                ? t("transfer.status.notEligible.locked")
                                : transferResult.status === "recently_registered"
                                  ? t("transfer.status.notEligible.recentlyRegistered")
                                  : transferResult.status === "expired"
                                    ? t("transfer.status.notEligible.expired")
                                    : t("transfer.status.notEligible.notFound")
                            }
                          </p>
                        </div>
                      </div>

                      {/* Domain Info */}
                      {(transferResult.currentRegistrar || transferResult.expiryDate) && (
                        <div className="mt-6 pt-6 border-t border-current/10 grid sm:grid-cols-3 gap-4">
                          {transferResult.currentRegistrar && (
                            <div>
                              <p className="text-sm text-muted-foreground">{t("transfer.status.eligible.currentRegistrar")}</p>
                              <p className="font-medium text-foreground">{transferResult.currentRegistrar}</p>
                            </div>
                          )}
                          {transferResult.expiryDate && (
                            <div>
                              <p className="text-sm text-muted-foreground">{t("transfer.status.eligible.expiryDate")}</p>
                              <p className="font-medium text-foreground">{transferResult.expiryDate}</p>
                            </div>
                          )}
                          {transferResult.daysUntilExpiry && (
                            <div>
                              <p className="text-sm text-muted-foreground">{t("transfer.status.eligible.daysUntilExpiry")}</p>
                              <p className="font-medium text-foreground">{transferResult.daysUntilExpiry} {t("periods.days", "common")}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Transfer Form - Only show if eligible */}
                    {transferResult.eligible && (
                      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{t("transfer.status.eligible.startTransfer")}</h3>
                          <p className="text-muted-foreground">
                            {t("transfer.status.eligible.description")}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="authCode" className="block text-sm font-medium text-foreground mb-2">
                              {t("transfer.authCode.label")}
                            </label>
                            <Input
                              id="authCode"
                              type="text"
                              placeholder={t("transfer.authCode.placeholder")}
                              value={authCode}
                              onChange={(e) => setAuthCode(e.target.value)}
                              className="h-12"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              {t("transfer.authCode.hint")}
                            </p>
                          </div>

                          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("transfer.status.eligible.transferPrice")}</span>
                              <span className="font-semibold text-foreground">{transferResult.transferPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("transfer.status.eligible.freeYearExtension")}</span>
                              <span className="font-semibold text-green-600">{t("included", "common")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("transfer.status.eligible.whoisPrivacy")}</span>
                              <span className="font-semibold text-green-600">{t("common.free", "common")}</span>
                            </div>
                          </div>

                          <Button size="lg" className="w-full h-12" disabled={!authCode.trim()} asChild>
                            <Link href={getPath(`/configure/domain?domain=${transferResult.domain}&transfer=true`)}>
{t("transfer.status.eligible.startTransfer")}
                              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Help section for non-eligible */}
                    {!transferResult.eligible && (
                      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
                        <h3 className="text-xl font-semibold text-foreground">{t("transfer.helpSection.title")}</h3>

                        {transferResult.status === "locked" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">{t("transfer.helpSection.locked.title")}</p>
                            <ol className="list-decimal list-inside space-y-2 text-[15px] text-muted-foreground">
                              {(t("transfer.helpSection.locked.steps") as any[]).map((step: string, idx: number) => (
                                <li key={idx}>{step.replace("{{registrar}}", transferResult.currentRegistrar || "")}</li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {transferResult.status === "recently_registered" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              {t("transfer.status.notEligible.icannRule")}
                            </p>
                            <p className="text-muted-foreground">
                              {t("transfer.status.notEligible.reminderMessage")}
                            </p>
                          </div>
                        )}

                        {transferResult.status === "expired" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              {t("transfer.helpSection.expired.message")}
                            </p>
                          </div>
                        )}

                        {transferResult.status === "not_found" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              {t("transfer.helpSection.notFound.message")}
                            </p>
                            <Button variant="outline" className="bg-transparent" asChild>
                              <Link href={getPath(`/domains/search?q=${transferResult.domain}`)}>{t("transfer.helpSection.notFound.searchButton")}</Link>
                            </Button>
                          </div>
                        )}

                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            {t("transfer.helpSection.contactSupport.text")}{" "}
                            <Link href={getPath("/contact")} className="text-primary hover:underline">
                              {t("transfer.helpSection.contactSupport.link")}
                            </Link>{" "}
                            {t("transfer.helpSection.contactSupport.suffix")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Transfer */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance mb-4">
                {t("transfer.reassurance.whyTransfer")}
              </h2>
              <p className="text-[15px] text-muted-foreground text-balance">
                {t("transfer.reassurance.gainTitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {(t("transfer.reassurance.benefits") as any[]).map((item: any, idx: number) => (
                <div key={idx} className="bg-card border border-border rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 lg:py-28 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
            <div className="space-y-8 max-w-xl order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
                  {t("transfer.reassurance.title")}
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>{t("transfer.reassurance.description1")}</p>
                  <p>{t("transfer.reassurance.description2")}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("transfer.guarantees.zeroDowntime.title")}</h3>
                    <p className="text-[15px] text-muted-foreground">{t("transfer.guarantees.zeroDowntime.description")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("transfer.guarantees.averageTime.title")}</h3>
                    <p className="text-[15px] text-muted-foreground">
                      {t("transfer.guarantees.averageTime.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <HeartHandshake className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("transfer.guarantees.handleComplications.title")}</h3>
                    <p className="text-[15px] text-muted-foreground">
                      {t("transfer.guarantees.handleComplications.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8 order-1 lg:order-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 ring-1 ring-border/50">
                <img
                  src="/founder-relaxed-after-completing-domain-transfer.jpg"
                  alt={t("transfer.guarantees.imageAlt")}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Process */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance mb-4">
                {t("transfer.process.title")}
              </h2>
              <p className="text-[15px] text-muted-foreground text-balance">{t("transfer.process.subtitle")}</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: t("transfer.process.steps.step1.title"),
                  desc: t("transfer.process.steps.step1.description"),
                },
                {
                  step: "2",
                  title: t("transfer.process.steps.step2.title"),
                  desc: t("transfer.process.steps.step2.description"),
                },
                {
                  step: "3",
                  title: t("transfer.process.steps.step3.title"),
                  desc: t("transfer.process.steps.step3.description"),
                },
                {
                  step: "4",
                  title: t("transfer.process.steps.step4.title"),
                  desc: t("transfer.process.steps.step4.description"),
                },
                {
                  step: "5",
                  title: t("transfer.process.steps.step5.title"),
                  desc: t("transfer.process.steps.step5.description"),
                },
              ].map((item, idx) => (
                <div key={item.step} className="flex gap-6 items-start bg-card border border-border rounded-xl p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  {idx < 4 && (
                    <div className="hidden md:flex items-center" aria-hidden="true">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
                {t("transfer.faq.title")}
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {(t("transfer.faq.items") as any[]).map((item: any, index: number) => (
                <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`} className="border border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-base font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">{t("transfer.cta.title")}</h2>
            <p className="text-[17px] text-muted-foreground text-balance leading-relaxed mb-8">
              {t("transfer.cta.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="h-12 px-8" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                {t("transfer.cta.startTransfer")}
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent" asChild>
                <Link href={getPath("/contact")}>{t("transfer.cta.talkFirst")}</Link>
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
              {t("transfer.contextualLink.text")}{" "}
              <Link href={getPath("/hosting")} className="text-foreground font-medium hover:underline">
                {t("transfer.contextualLink.link")}
              </Link>
            </p>
          </div>
        </div>
      </section>
      </main>

      {/* Footer replaced with SiteFooter component */}
      <SiteFooter />
    </div>
  )
}
