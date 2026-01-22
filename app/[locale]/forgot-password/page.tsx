"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Mail, ArrowLeft } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function ForgotPasswordPage() {
  const { t } = useTranslation('auth')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main id="main-content" className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left side - Form */}
          <div className="order-2 lg:order-1">
            <div className="max-w-md mx-auto lg:mx-0">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("forgotPassword.backToSignIn")}
              </Link>

              <div className="space-y-3 mb-10">
                <h1 className="text-4xl md:text-5xl font-semibold text-balance leading-tight">{t("forgotPassword.title")}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("forgotPassword.description")}
                </p>
              </div>

              <Card className="border-2 border-border rounded-xl shadow-sm">
                <CardContent className="p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          {t("forgotPassword.email.label")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("forgotPassword.email.placeholder")}
                          className="h-12"
                          autoComplete="email"
                          required
                          aria-describedby="email-hint"
                        />
                        <p id="email-hint" className="text-xs text-muted-foreground/70">
                          {t("forgotPassword.email.hint")}
                        </p>
                      </div>

                      <Button type="submit" size="lg" className="w-full h-12 text-base shadow-md">
                        {t("forgotPassword.submit")}
                      </Button>

                      <div className="pt-4 space-y-3 text-sm text-muted-foreground/80">
                        <p className="leading-relaxed">
                          {t("forgotPassword.info1")}
                        </p>
                        <p className="leading-relaxed">
                          {t("forgotPassword.info2")}
                        </p>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6 py-4">
                      <div 
                        role="alert" 
                        aria-live="polite"
                        className="bg-muted/30 border border-border/50 rounded-lg p-6 flex items-start gap-4"
                      >
                        <div className="bg-background border border-border rounded-full p-3" aria-hidden="true">
                          <Mail className="h-6 w-6 text-foreground" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <h3 className="font-semibold text-lg">{t("forgotPassword.success.title")}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t("forgotPassword.success.description")}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-muted-foreground/80 pt-2">
                        <p className="leading-relaxed">
                          {t("forgotPassword.success.noEmail")}
                        </p>
                        <p className="leading-relaxed">
                          {t("forgotPassword.success.stillTrouble")}{" "}
                          <Link href="/contact" className="text-foreground font-medium hover:underline">
                            {t("forgotPassword.success.contactSupport")}
                          </Link>{" "}
                          {t("forgotPassword.success.help")}
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full h-12 text-base bg-transparent"
                        onClick={() => setSubmitted(false)}
                      >
                        {t("forgotPassword.success.tryDifferent")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-foreground/5 ring-1 ring-border/50">
              <img
                src="/support-person-smiling-at-desk-helping-customer.jpg"
                alt={t("forgotPassword.imageAlt")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
