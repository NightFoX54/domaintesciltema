"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function SignInPage() {
  const { t } = useTranslation('auth')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left side - Form */}
          <div className="order-2 lg:order-1">
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="space-y-3 mb-10">
                <h1 className="text-4xl md:text-5xl font-semibold text-balance leading-tight">{t("signin.title")}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("signin.description")}
                </p>
              </div>

              <Card className="border-2 border-border rounded-xl shadow-sm">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        {t("signin.email.label")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("signin.email.placeholder")}
                        className="h-12"
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">
                          {t("signin.password.label")}
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {t("signin.password.forgot")}
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("signin.password.placeholder")}
                          className="h-12 pr-10"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? t("signin.hidePassword") : t("signin.showPassword")}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12 text-base shadow-md">
                      {t("signin.submit")}
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground/80 mb-4">
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      <span>{t("signin.dataSafe")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("signin.noAccount")}{" "}
                      <Link href="/register" className="text-foreground font-medium hover:underline">
                        {t("signin.createAccount")}
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-foreground/5 ring-1 ring-border/50">
              <img
                src="/person-confidently-working-at-organized-workspace-calm.jpg"
                alt={t("signin.imageAlt")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
