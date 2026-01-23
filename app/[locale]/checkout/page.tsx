"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Globe, Server, Lock, CreditCard, ShieldCheck, ArrowLeft, Info, Building2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { formatCurrency } from "@/lib/format-utils"
import { trackEvent } from "@/lib/analytics"
import { AnalyticsEventName } from "@/lib/analytics-events"
import { useParams } from "next/navigation"

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

export default function CheckoutPage() {
  const { t, language } = useTranslation('checkout')
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  const hasTrackedRef = useRef(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      const items = JSON.parse(cart)
      if (items.length === 0) {
        router.push("/cart")
      } else {
        setCartItems(items)
        
        // Track checkout_started once when page loads with items
        if (!hasTrackedRef.current && items.length > 0) {
          const currency = locale === 'tr' ? 'TRY' : 'USD'
          const totalPrice = items.reduce((sum: number, item: CartItem) => sum + item.price, 0)
          
          // Get billing cycle from first item (or default)
          const firstItem = items[0]
          let billingCycle: string | undefined
          if (firstItem.type === 'hosting' && firstItem.billingCycle) {
            billingCycle = `${firstItem.billingCycle}month`
          } else if (firstItem.type === 'domain' && firstItem.period) {
            billingCycle = `${firstItem.period}year`
          } else if (firstItem.type === 'ssl') {
            billingCycle = '1year'
          }

          trackEvent(AnalyticsEventName.CHECKOUT_STARTED, {
            product_type: firstItem.type,
            billing_cycle: billingCycle,
            price: totalPrice,
            currency: currency,
            locale: locale,
            cart_total: totalPrice,
            cart_items_count: items.length,
          })
          
          hasTrackedRef.current = true
        }
      }
    } else {
      router.push("/cart")
    }
    setIsLoading(false)
  }, [router, locale])

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  const getItemIcon = (type: string) => {
    switch (type) {
      case "domain":
        return <Globe className="h-4 w-4 text-primary" />
      case "hosting":
        return <Server className="h-4 w-4 text-primary" />
      case "ssl":
        return <Lock className="h-4 w-4 text-primary" />
      default:
        return null
    }
  }

  const getItemTitle = (item: CartItem) => {
    switch (item.type) {
      case "domain":
        return item.name || "Domain"
      case "hosting":
        return `${item.hostingType || "Linux"} Hosting - ${item.planName || "Starter"}`
      case "ssl":
        return item.name || "SSL Certificate"
      default:
        return "Item"
    }
  }

  const getItemPeriod = (item: CartItem) => {
    switch (item.type) {
      case "domain":
        return `${item.period} ${item.period === 1 ? "year" : "years"}`
      case "hosting":
        return `${item.billingCycle} ${item.billingCycle === 1 ? "month" : "months"}`
      case "ssl":
        return "1 year"
      default:
        return ""
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setIsProcessing(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    // Simple validation
    const newErrors: Record<string, string> = {}

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
      newErrors.email = t("errors.email")
    }
    if (!data.firstName || (data.firstName as string).trim().length < 2) {
      newErrors.firstName = t("errors.firstName")
    }
    if (!data.lastName || (data.lastName as string).trim().length < 2) {
      newErrors.lastName = t("errors.lastName")
    }

    if (paymentMethod === "card") {
      if (!data.cardNumber || (data.cardNumber as string).replace(/\s/g, "").length < 13) {
        newErrors.cardNumber = t("errors.cardNumber")
      }
      if (!data.expiry || !/^\d{2}\/\d{2}$/.test(data.expiry as string)) {
        newErrors.expiry = t("errors.expiry")
      }
      if (!data.cvv || (data.cvv as string).length < 3) {
        newErrors.cvv = t("errors.cvv")
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsProcessing(false)
      // Focus first error field
      const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement
      if (firstErrorField) {
        firstErrorField.focus()
      }
      return
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Clear cart and redirect to confirmation
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cartUpdated"))
    router.push("/checkout/confirmation")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">{t("loading.loading", "common")}</p>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {Object.keys(errors).length > 0 && (
            <span>{t("errors.formHasErrors", "common")}</span>
          )}
        </div>
      <section className="container mx-auto px-4 lg:px-6 py-12 md:py-16" aria-labelledby="checkout-heading">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("backToCart")}
            </Link>
            <h1 id="checkout-heading" className="text-4xl md:text-5xl font-semibold mb-3">{t("title")}</h1>
            <p className="text-xl text-muted-foreground">{t("description")}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left column - Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Customer details */}
                <section className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 space-y-6" aria-labelledby="your-details-heading">
                  <div>
                    <h2 id="your-details-heading" className="text-2xl font-semibold mb-2">{t("yourDetails.title")}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t("yourDetails.description")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        {t("yourDetails.email.label")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("yourDetails.email.placeholder")}
                        className={`mt-1.5 h-12 ${errors.email ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : "email-hint"}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive mt-1.5" role="alert">
                          {errors.email}
                        </p>
                      )}
                      <p id="email-hint" className="text-xs text-muted-foreground mt-1.5">
                        {t("yourDetails.email.hint")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          {t("yourDetails.firstName.label")}
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder={t("yourDetails.firstName.placeholder")}
                          className={`mt-1.5 h-12 ${errors.firstName ? "border-destructive" : ""}`}
                          aria-invalid={!!errors.firstName}
                          aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        />
                        {errors.firstName && (
                          <p id="firstName-error" className="text-sm text-destructive mt-1.5" role="alert">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          {t("yourDetails.lastName.label")}
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder={t("yourDetails.lastName.placeholder")}
                          className={`mt-1.5 h-12 ${errors.lastName ? "border-destructive" : ""}`}
                          aria-invalid={!!errors.lastName}
                          aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        />
                        {errors.lastName && (
                          <p id="lastName-error" className="text-sm text-destructive mt-1.5" role="alert">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payment method */}
                <section className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 space-y-6" aria-labelledby="payment-method-heading">
                  <div>
                    <h2 id="payment-method-heading" className="text-2xl font-semibold mb-2">{t("paymentMethod.title")}</h2>
                    <p className="text-sm text-muted-foreground">{t("paymentMethod.description")}</p>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div
                      className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-colors ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/60"
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 flex-1">
                        <CreditCard className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{t("paymentMethod.card")}</span>
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-colors ${
                        paymentMethod === "bank"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/60"
                      }`}
                    >
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 flex-1">
                        <Building2 className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{t("paymentMethod.bank")}</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium">
                          {t("paymentMethod.cardNumber.label")}
                        </Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          placeholder={t("paymentMethod.cardNumber.placeholder")}
                          className={`mt-1.5 h-12 ${errors.cardNumber ? "border-destructive" : ""}`}
                          aria-invalid={!!errors.cardNumber}
                          aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                        />
                        {errors.cardNumber && (
                          <p id="cardNumber-error" className="text-sm text-destructive mt-1.5" role="alert">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-sm font-medium">
                            {t("paymentMethod.expiry.label")}
                          </Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            type="text"
                            placeholder={t("paymentMethod.expiry.placeholder")}
                            className={`mt-1.5 h-12 ${errors.expiry ? "border-destructive" : ""}`}
                            aria-invalid={!!errors.expiry}
                            aria-describedby={errors.expiry ? "expiry-error" : undefined}
                          />
                          {errors.expiry && (
                            <p id="expiry-error" className="text-sm text-destructive mt-1.5" role="alert">
                              {errors.expiry}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm font-medium">
                            {t("paymentMethod.cvv.label")}
                          </Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="text"
                            placeholder={t("paymentMethod.cvv.placeholder")}
                            className={`mt-1.5 h-12 ${errors.cvv ? "border-destructive" : ""}`}
                            aria-invalid={!!errors.cvv}
                            aria-describedby={errors.cvv ? "cvv-error" : undefined}
                          />
                          {errors.cvv && (
                            <p id="cvv-error" className="text-sm text-destructive mt-1.5" role="alert">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                        <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{t("paymentMethod.securePayment")}</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
                      <p className="font-medium text-foreground">
                        {t("paymentMethod.bankTransfer.title")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("paymentMethod.bankTransfer.description")}
                      </p>
                      <div className="flex items-start gap-2 text-muted-foreground bg-background/50 rounded p-2 mt-2">
                        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-xs">{t("paymentMethod.bankTransfer.noFees")}</span>
                      </div>
                    </div>
                  )}
                </section>

                {/* Legal */}
                <div className="text-sm text-muted-foreground space-y-3 px-1">
                  <p>
                    {t("legal.agree")}{" "}
                    <Link href="/terms" className="text-foreground underline hover:no-underline">
                      {t("legal.terms")}
                    </Link>{" "}
                    {t("legal.and")}{" "}
                    <Link href="/privacy" className="text-foreground underline hover:no-underline">
                      {t("legal.privacy")}
                    </Link>
                    .
                  </p>
                  <p>{t("legal.dataProtection")}</p>
                </div>
              </div>

              {/* Right column - Order summary */}
              <aside className="lg:col-span-1" aria-labelledby="order-summary-heading">
                <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8 space-y-6 lg:sticky lg:top-24">
                  <h2 id="order-summary-heading" className="text-2xl font-semibold">{t("orderSummary")}</h2>

                  <ul className="space-y-4" role="list">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0" aria-hidden="true">
                          {getItemIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold leading-tight mb-1">{getItemTitle(item)}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{getItemPeriod(item)}</p>
                          <p className="text-sm font-semibold">{formatCurrency(item.price, language)}</p>
                          {item.renewalPrice && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {t("renewsAt", "checkout", { 
                                price: formatCurrency(item.renewalPrice, language),
                                period: item.type === "domain" ? "year" : item.type === "hosting" ? "month" : "year"
                              })}
                            </p>
                          )}
                        </div>
                        </li>
                      ))}
                    </ul>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("subtotal")}</span>
                      <span className="font-medium">{formatCurrency(totalPrice, language)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("setupFees")}</span>
                      <span className="font-medium text-primary">$0.00</span>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{t("totalToday")}</span>
                      <span className="text-2xl font-bold">{formatCurrency(totalPrice, language)}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                    <div className="flex gap-2">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="space-y-1 text-xs text-blue-900 dark:text-blue-100">
                        <p className="font-medium">{t("whatsIncluded.title")}</p>
                        <ul className="space-y-1 ml-1" role="list">
                          <li>{t("whatsIncluded.whoisPrivacy")}</li>
                          <li>{t("whatsIncluded.support")}</li>
                          <li>{t("whatsIncluded.guarantee")}</li>
                          <li>{t("whatsIncluded.cancellation")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div aria-live="polite" aria-atomic="true" className="sr-only">
                    {isProcessing && <span>{t("loading.processing", "common")}</span>}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base shadow-md hover:shadow-lg transition-shadow"
                    disabled={isProcessing}
                    aria-busy={isProcessing}
                  >
                    {isProcessing ? t("loading.processing", "common") : `${t("buttons.submit", "common")} • ${formatCurrency(totalPrice, language)}`}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {t("legal.dataProtection")}
                  </p>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
