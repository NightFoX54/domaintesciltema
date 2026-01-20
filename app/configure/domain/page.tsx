"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Globe, Shield, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const dynamic = "force-dynamic"

export default function ConfigureDomainPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domainName = searchParams.get("domain") || "yourdomain.com"
  const tld = searchParams.get("tld") || ".com"
  const editId = searchParams.get("editId")
  const [registrationPeriod, setRegistrationPeriod] = useState("1")
  const [isAdding, setIsAdding] = useState(false)

  const basePrice = 12.99
  const renewalPrice = 14.99
  const period = Number.parseInt(registrationPeriod)
  const totalPrice = basePrice * period

  const handleAddToCart = () => {
    setIsAdding(true)

    // Get existing cart
    const existingCart = localStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []

    if (editId) {
      const itemIndex = cart.findIndex((item: any) => item.id === editId)
      if (itemIndex !== -1) {
        cart[itemIndex] = {
          ...cart[itemIndex],
          name: domainName,
          tld: tld,
          period: period,
          price: totalPrice,
          renewalPrice: renewalPrice,
        }
      }
    } else {
      // Add new domain to cart
      cart.push({
        id: Date.now().toString(),
        type: "domain",
        name: domainName,
        tld: tld,
        period: period,
        price: totalPrice,
        renewalPrice: renewalPrice,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"))

    // Navigate to cart
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
          Back
        </Button>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  1
                </span>
                Configure
              </span>
              <span className="text-border">→</span>
              <span className="flex items-center gap-2 opacity-50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-border text-xs">
                  2
                </span>
                Review & checkout
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-balance">Configure your domain</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              You're almost there. Just a few simple choices, then your domain is yours.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-border bg-card p-8 md:p-10 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Your domain</h2>
                <p className="text-3xl font-bold text-primary">{domainName}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This domain will be registered in your name. You're the legal owner.
                </p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">How long would you like to register it?</Label>
                <RadioGroup value={registrationPeriod} onValueChange={setRegistrationPeriod} className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="1" id="1year" />
                      <Label htmlFor="1year" className="cursor-pointer font-medium">
                        1 year
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${basePrice.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Renews at ${renewalPrice.toFixed(2)}/year</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="2" id="2year" />
                      <Label htmlFor="2year" className="cursor-pointer font-medium">
                        2 years
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(basePrice * 2).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Renews at ${renewalPrice.toFixed(2)}/year</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border-2 border-border p-5 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="3" id="3year" />
                      <Label htmlFor="3year" className="cursor-pointer font-medium">
                        3 years
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(basePrice * 3).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Renews at ${renewalPrice.toFixed(2)}/year</div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="rounded-xl bg-muted/40 p-6 space-y-3">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  What's included with every domain
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Free WHOIS privacy protection (your info stays private)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Easy DNS management (point your domain anywhere)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Full ownership (transfer anytime, no lock-in)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Auto-renewal reminders (so you never lose your domain)
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">Total today</div>
                  <div className="text-sm text-muted-foreground">
                    For {period} {period === 1 ? "year" : "years"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Renews at ${renewalPrice.toFixed(2)}/year</div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                size="lg"
                className="w-full h-14 text-base shadow-md hover:shadow-lg transition-shadow"
              >
                {isAdding ? "Adding to cart..." : "Add domain to cart"}
              </Button>

              <p className="text-sm text-muted-foreground/80 text-center leading-relaxed">
                You can review everything before checkout. No commitment yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
