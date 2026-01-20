'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Server, Lock, X, ShoppingCart, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/lib/i18n"

interface CartItem {
  id: string
  type: "domain" | "hosting" | "ssl"
  name?: string
  tld?: string
  period?: number
  renewalPrice?: number
  hostingType?: string
  plan?: string
  planName?: string
  billingCycle?: number
  monthlyPrice?: number
  addons?: {
    backups?: boolean
    priority?: boolean
  }
  sslType?: string
  price: number
}

export default function CartPage() {
  const { t } = useTranslation('cart')
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [couponError, setCouponError] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCartItems(JSON.parse(cart))
    }
    setIsLoading(false)
  }

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError(t("errors.enterCoupon"))
      return
    }

    setIsApplyingCoupon(true)
    setCouponError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock coupon validation
    const validCoupons: Record<string, number> = {
      WELCOME10: 10,
      SAVE20: 20,
      FIRSTORDER: 15,
    }

    const discount = validCoupons[couponCode.toUpperCase()]

    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      setCouponError("")
    } else {
      setCouponError(t("errors.invalidCoupon"))
      setAppliedCoupon(null)
    }

    setIsApplyingCoupon(false)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  const editItem = (item: CartItem) => {
    let configureUrl = ""
    switch (item.type) {
      case "domain":
        configureUrl = `/configure/domain?name=${item.name}&period=${item.period}&edit=${item.id}`
        break
      case "hosting":
        configureUrl = `/configure/hosting?type=${item.hostingType}&plan=${item.plan}&billing=${item.billingCycle}&edit=${item.id}`
        break
      case "ssl":
        configureUrl = `/configure/ssl?type=${item.sslType}&edit=${item.id}`
        break
    }
    router.push(configureUrl)
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "domain":
        return <Globe className="h-5 w-5 text-primary" />
      case "hosting":
        return <Server className="h-5 w-5 text-primary" />
      case "ssl":
        return <Lock className="h-5 w-5 text-primary" />
      default:
        return null
    }
  }

  const getItemTitle = (item: CartItem) => {
    switch (item.type) {
      case "domain":
        return item.name || t("itemTypes.domain")
      case "hosting":
        return `${item.hostingType || "Linux"} Hosting - ${item.planName || "Starter"}`
      case "ssl":
        return item.name || t("itemTypes.ssl")
      default:
        return t("itemTypes.item")
    }
  }

  const getItemDescription = (item: CartItem) => {
    switch (item.type) {
      case "domain":
        const periodText = item.period === 1 ? t("periods.year") : t("periods.years")
        return t("descriptions.domain", "cart", {
          period: `${item.period} ${periodText}`,
          price: `$${item.renewalPrice?.toFixed(2)}`
        })
      case "hosting":
        const addons = []
        if (item.addons?.backups) addons.push(t("addons.dailyBackups"))
        if (item.addons?.priority) addons.push(t("addons.prioritySupport"))
        const addonText = addons.length > 0 ? ` • ${addons.join(", ")}` : ""
        const billingPeriodText = item.billingCycle === 1 ? t("periods.month") : t("periods.months")
        return t("descriptions.hosting", "cart", {
          period: `${item.billingCycle} ${billingPeriodText}`,
          addons: addonText
        })
      case "ssl":
        return t("descriptions.ssl")
      default:
        return ""
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const totalPrice = subtotal - discountAmount

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main id="main-content">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t("loading.loading", "common")}</p>
        </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main id="main-content">
        <section className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold">{t("empty.title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("empty.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => router.push("/domains")} className="shadow-md">
                {t("empty.browseButton")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/hosting")} className="border-2">
                {t("empty.browseButton")}
              </Button>
            </div>
          </div>
        </section>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">
      <section className="container mx-auto px-4 lg:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 space-y-3">
            <h1 className="text-4xl md:text-5xl font-semibold">{t("title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border-2 border-border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0" aria-hidden="true">
                      {getItemIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold">{getItemTitle(item)}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
                          aria-label={t("removeItem")}
                        >
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{getItemDescription(item)}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{t("price")}</span>
                          <button
                            onClick={() => editItem(item)}
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            {t("edit")}
                          </button>
                        </div>
                        <span className="text-xl font-semibold">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button variant="outline" onClick={() => router.push("/")} className="w-full border-2">
                  {t("keepBrowsing")}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-2xl border-2 border-border bg-card p-8 space-y-6 sticky top-24">
                <h2 className="text-2xl font-semibold">{t("orderSummary")}</h2>

                <div className="space-y-3">
                  <Label htmlFor="coupon" className="text-sm font-medium">
                    {t("coupon.label")}
                  </Label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-primary">{appliedCoupon.code}</span>
                        <span className="text-xs text-muted-foreground">({t("coupon.discount", "cart", { discount: appliedCoupon.discount })})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {t("coupon.remove")}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Input
                          id="coupon"
                          placeholder={t("coupon.placeholder")}
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value)
                            setCouponError("")
                          }}
                          className={`h-11 ${couponError ? "border-destructive" : ""}`}
                          disabled={isApplyingCoupon}
                        />
                        <Button
                          onClick={applyCoupon}
                          variant="outline"
                          className="border-2 px-6 bg-transparent"
                          disabled={isApplyingCoupon}
                        >
                          {isApplyingCoupon ? t("coupon.applying") : t("coupon.apply")}
                        </Button>
                      </div>
                      {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                    </>
                  )}
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span className={`font-medium ${appliedCoupon ? "line-through text-muted-foreground" : ""}`}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary">{t("discount", "cart", { discount: appliedCoupon.discount })}</span>
                      <span className="font-medium text-primary">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("setupFees")}</span>
                    <span className="font-medium text-primary">$0.00</span>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{t("totalToday")}</span>
                    <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full h-14 text-base shadow-md hover:shadow-lg transition-shadow group">
                    {t("continueToCheckout")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </Link>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold" aria-hidden="true">✓</span>
                    <span>{t("guarantees.changeCancel")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold" aria-hidden="true">✓</span>
                    <span>{t("guarantees.noSurprises")}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-semibold" aria-hidden="true">✓</span>
                    <span>{t("guarantees.secureCheckout")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
