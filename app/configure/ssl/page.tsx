"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Shield, ArrowLeft, Lock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"

export const dynamic = "force-dynamic"

export default function ConfigureSSLPage() {
  const { t } = useTranslation('configure')
  const router = useRouter()
  const searchParams = useSearchParams()
  const sslType = searchParams.get("type") || "positive"
  const editId = searchParams.get("editId")

  const [isAdding, setIsAdding] = useState(false)

  const sslDetails: Record<string, { name: string; price: number; description: string }> = {
    positive: {
      name: "Positive SSL",
      price: 9.99,
      description: "Perfect for personal sites and blogs",
    },
    wildcard: {
      name: "Wildcard SSL",
      price: 79.99,
      description: "Protects unlimited subdomains",
    },
    ev: {
      name: "EV SSL Certificate",
      price: 199.99,
      description: "Maximum trust for businesses",
    },
  }

  const ssl = sslDetails[sslType] || sslDetails.positive

  const handleAddToCart = () => {
    setIsAdding(true)

    const existingCart = localStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []

    if (editId) {
      const itemIndex = cart.findIndex((item: any) => item.id === editId)
      if (itemIndex !== -1) {
        cart[itemIndex] = {
          ...cart[itemIndex],
          sslType: sslType,
          name: ssl.name,
          price: ssl.price,
        }
      }
    } else {
      cart.push({
        id: Date.now().toString(),
        type: "ssl",
        sslType: sslType,
        name: ssl.name,
        price: ssl.price,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))

    setTimeout(() => {
      router.push("/cart")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container mx-auto px-4 lg:px-6 py-12 md:py-16 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("ssl.back")}
        </Button>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  1
                </span>
                {t("ssl.steps.configure")}
              </span>
              <span className="text-border">→</span>
              <span className="flex items-center gap-2 opacity-50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border text-xs">
                  2
                </span>
                {t("ssl.steps.reviewCheckout")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-balance">{t("ssl.title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("ssl.description")}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-border bg-card p-8 md:p-10 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{t("ssl.certificate.title")}</h2>
                <p className="text-3xl font-bold text-primary">{ssl.name}</p>
                <p className="text-sm text-muted-foreground mt-2">{ssl.description}</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{t("ssl.protects.title")}</h3>
                <div className="space-y-4 rounded-xl bg-muted/30 p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">{t("ssl.protects.encrypted.title")}</div>
                      <div className="text-sm text-muted-foreground">
                        {t("ssl.protects.encrypted.description")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">{t("ssl.protects.trust.title")}</div>
                      <div className="text-sm text-muted-foreground">
                        {t("ssl.protects.trust.description")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">{t("ssl.protects.seo.title")}</div>
                      <div className="text-sm text-muted-foreground">
                        {t("ssl.protects.seo.description")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{t("ssl.process.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t("ssl.process.description")}
                </p>
                <ol className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0 text-xs">
                      1
                    </span>
                    <span className="text-muted-foreground pt-0.5">
                      {t("ssl.process.step1")}
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0 text-xs">
                      2
                    </span>
                    <span className="text-muted-foreground pt-0.5">{t("ssl.process.step2")}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0 text-xs">
                      3
                    </span>
                    <span className="text-muted-foreground pt-0.5">
                      {t("ssl.process.step3")}
                    </span>
                  </li>
                </ol>
              </div>

              <div className="rounded-xl bg-muted/40 p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("ssl.important.text")}
                </p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{t("ssl.total.title")}</div>
                  <div className="text-sm text-muted-foreground">{t("ssl.total.annual")}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${ssl.price.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">{t("ssl.total.perYear")}</div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                size="lg"
                className="w-full h-14 text-base shadow-md hover:shadow-lg transition-shadow"
              >
                {isAdding ? t("ssl.addToCart.adding") : t("ssl.addToCart.label")}
              </Button>

              <p className="text-sm text-muted-foreground/80 text-center leading-relaxed">
                {t("ssl.note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
