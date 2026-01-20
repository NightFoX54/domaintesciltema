"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Server, Shield, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"

export const dynamic = "force-dynamic"

export default function ConfigureHostingPage() {
  const { t } = useTranslation('configure')
  const router = useRouter()
  const searchParams = useSearchParams()
  const planType = searchParams.get("plan") || "starter"
  const hostingType = searchParams.get("type") || "linux"
  const editId = searchParams.get("editId")

  const [billingCycle, setBillingCycle] = useState("12")
  const [addBackups, setAddBackups] = useState(false)
  const [addPriority, setAddPriority] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const planNames: Record<string, string> = {
    starter: "Starter",
    professional: "Professional",
    business: "Business",
  }

  const planPrices: Record<string, number> = {
    starter: 5.99,
    professional: 12.99,
    business: 24.99,
  }

  const monthlyPrice = planPrices[planType] || 5.99
  const months = Number.parseInt(billingCycle)
  const basePrice = monthlyPrice * months
  const backupPrice = addBackups ? 2.99 * months : 0
  const priorityPrice = addPriority ? 4.99 * months : 0
  const totalPrice = basePrice + backupPrice + priorityPrice

  const handleAddToCart = () => {
    setIsAdding(true)

    const existingCart = localStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []

    if (editId) {
      const itemIndex = cart.findIndex((item: any) => item.id === editId)
      if (itemIndex !== -1) {
        cart[itemIndex] = {
          ...cart[itemIndex],
          hostingType: hostingType,
          plan: planType,
          planName: planNames[planType],
          billingCycle: months,
          addons: {
            backups: addBackups,
            priority: addPriority,
          },
          price: totalPrice,
          monthlyPrice: monthlyPrice,
        }
      }
    } else {
      cart.push({
        id: Date.now().toString(),
        type: "hosting",
        hostingType: hostingType,
        plan: planType,
        planName: planNames[planType],
        billingCycle: months,
        addons: {
          backups: addBackups,
          priority: addPriority,
        },
        price: totalPrice,
        monthlyPrice: monthlyPrice,
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
          {t("hosting.back")}
        </Button>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  1
                </span>
                {t("hosting.steps.configure")}
              </span>
              <span className="text-border">→</span>
              <span className="flex items-center gap-2 opacity-50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border text-xs">
                  2
                </span>
                {t("hosting.steps.reviewCheckout")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-balance">{t("hosting.title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("hosting.description")}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-border bg-card p-8 md:p-10 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{t("hosting.selectedPlan.title")}</h2>
                <p className="text-3xl font-bold text-primary capitalize">
                  {hostingType} Hosting - {planNames[planType]}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("hosting.selectedPlan.description")}
                </p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">{t("hosting.billingCycle.title")}</Label>
                <p className="text-sm text-muted-foreground mb-4">{t("hosting.billingCycle.description")}</p>
                <RadioGroup value={billingCycle} onValueChange={setBillingCycle} className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="1" id="1month" />
                      <Label htmlFor="1month" className="cursor-pointer font-medium">
                        {t("hosting.billingCycle.oneMonth")}
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${monthlyPrice.toFixed(2)}{t("hosting.billingCycle.perMonth")}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="12" id="12month" />
                      <Label htmlFor="12month" className="cursor-pointer font-medium">
                        {t("hosting.billingCycle.twelveMonths")}
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(monthlyPrice * 12).toFixed(2)}</div>
                      <div className="text-xs text-primary">{t("hosting.billingCycle.save", { months: 2 })}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="24" id="24month" />
                      <Label htmlFor="24month" className="cursor-pointer font-medium">
                        {t("hosting.billingCycle.twentyFourMonths")}
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(monthlyPrice * 24).toFixed(2)}</div>
                      <div className="text-xs text-primary">{t("hosting.billingCycle.save", { months: 4 })}</div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold block">{t("hosting.addons.title")}</Label>
                <p className="text-sm text-muted-foreground -mt-2">
                  {t("hosting.addons.description")}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-4 rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="backups"
                      checked={addBackups}
                      onCheckedChange={(checked) => setAddBackups(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="backups" className="cursor-pointer font-medium flex items-center justify-between">
                        <span>{t("hosting.addons.backups.label")}</span>
                        <span className="text-sm text-muted-foreground">+${(2.99 * months).toFixed(2)}</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("hosting.addons.backups.description")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors">
                    <Checkbox
                      id="priority"
                      checked={addPriority}
                      onCheckedChange={(checked) => setAddPriority(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="priority"
                        className="cursor-pointer font-medium flex items-center justify-between"
                      >
                        <span>{t("hosting.addons.priority.label")}</span>
                        <span className="text-sm text-muted-foreground">+${(4.99 * months).toFixed(2)}</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("hosting.addons.priority.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-6 space-y-3">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("hosting.included.title")}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {t("hosting.included.storage")}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {t("hosting.included.ssl")}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {t("hosting.included.support")}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {t("hosting.included.uptime")}
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{t("hosting.total.title")}</div>
                  <div className="text-sm text-muted-foreground">
                    {t("hosting.total.forMonths", { 
                      months, 
                      monthLabel: months === 1 ? t("hosting.total.month") : t("hosting.total.months") 
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">${(totalPrice / months).toFixed(2)}{t("hosting.total.perMonth")}</div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                size="lg"
                className="w-full h-14 text-base shadow-md hover:shadow-lg transition-shadow"
              >
                {isAdding ? t("hosting.addToCart.adding") : t("hosting.addToCart.label")}
              </Button>

              <p className="text-sm text-muted-foreground/80 text-center leading-relaxed">
                {t("hosting.note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
