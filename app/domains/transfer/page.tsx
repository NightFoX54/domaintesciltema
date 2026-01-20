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
      message: "This domain is eligible for transfer!",
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
      message:
        "This domain is currently locked. You'll need to unlock it at your current registrar before transferring.",
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
      message: "This domain was registered less than 60 days ago. ICANN rules require a 60-day wait before transfers.",
      transferPrice: "₺299",
      currentRegistrar: "Unknown",
    }
  } else if (random > 0.1) {
    return {
      domain: normalizedDomain,
      eligible: false,
      status: "expired",
      message:
        "This domain appears to be expired or in redemption period. You may need to renew it first with your current registrar.",
      transferPrice: "₺299",
    }
  } else {
    return {
      domain: normalizedDomain,
      eligible: false,
      status: "not_found",
      message: "We couldn't find this domain. Please check the spelling and try again.",
      transferPrice: "₺299",
    }
  }
}

export default function DomainTransferPage() {
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
                  Transfer your domain with confidence
                </h1>
                <p className="text-[17px] md:text-lg text-muted-foreground text-balance leading-relaxed">
                  Moving your domain shouldn't be stressful. We'll handle the technical details and guide you through
                  every step. Most transfers complete within 5-7 days.
                </p>
              </div>

              {/* Transfer Input */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <label htmlFor="domain-transfer-input" className="sr-only">
                    Domain name to transfer
                  </label>
                  <Input
                    id="domain-transfer-input"
                    type="text"
                    placeholder="Enter your domain (e.g., yourdomain.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleCheck()
                      }
                    }}
                    className="h-14 px-4 text-base flex-1"
                    aria-label="Domain name to transfer"
                  />
                  <Button size="lg" className="h-14 px-8" onClick={handleCheck} disabled={isChecking || !domain.trim()}>
                    {isChecking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Checking...
                      </>
                    ) : (
                      "Check Eligibility"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Don't worry—entering your domain here doesn't start anything yet. We'll check eligibility first.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">Free extra year added</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">No downtime</span>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/5 ring-1 ring-border/50">
                <img
                  src="/person-organizing-digital-files-at-calm-workspace.jpg"
                  alt="Person organizing their digital presence"
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
                  <p className="text-lg text-muted-foreground">Checking transfer eligibility for {domain}...</p>
                  <p className="text-sm text-muted-foreground mt-2">This usually takes just a few seconds</p>
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
                            {transferResult.message}
                          </p>
                        </div>
                      </div>

                      {/* Domain Info */}
                      {(transferResult.currentRegistrar || transferResult.expiryDate) && (
                        <div className="mt-6 pt-6 border-t border-current/10 grid sm:grid-cols-3 gap-4">
                          {transferResult.currentRegistrar && (
                            <div>
                              <p className="text-sm text-muted-foreground">Current Registrar</p>
                              <p className="font-medium text-foreground">{transferResult.currentRegistrar}</p>
                            </div>
                          )}
                          {transferResult.expiryDate && (
                            <div>
                              <p className="text-sm text-muted-foreground">Expires On</p>
                              <p className="font-medium text-foreground">{transferResult.expiryDate}</p>
                            </div>
                          )}
                          {transferResult.daysUntilExpiry && (
                            <div>
                              <p className="text-sm text-muted-foreground">Days Until Expiry</p>
                              <p className="font-medium text-foreground">{transferResult.daysUntilExpiry} days</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Transfer Form - Only show if eligible */}
                    {transferResult.eligible && (
                      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Transfer</h3>
                          <p className="text-muted-foreground">
                            Enter your authorization code (EPP code) to begin the transfer process.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="authCode" className="block text-sm font-medium text-foreground mb-2">
                              Authorization Code (EPP Code)
                            </label>
                            <Input
                              id="authCode"
                              type="text"
                              placeholder="Enter your EPP/auth code from your current registrar"
                              value={authCode}
                              onChange={(e) => setAuthCode(e.target.value)}
                              className="h-12"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              You can get this code from your current registrar's control panel or by contacting their
                              support.
                            </p>
                          </div>

                          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transfer Price</span>
                              <span className="font-semibold text-foreground">{transferResult.transferPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Free Year Extension</span>
                              <span className="font-semibold text-green-600">Included</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">WHOIS Privacy</span>
                              <span className="font-semibold text-green-600">Free</span>
                            </div>
                          </div>

                          <Button size="lg" className="w-full h-12" disabled={!authCode.trim()} asChild>
                            <Link href={`/configure/domain?domain=${transferResult.domain}&transfer=true`}>
                              Continue to Transfer
                              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Help section for non-eligible */}
                    {!transferResult.eligible && (
                      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
                        <h3 className="text-xl font-semibold text-foreground">What you can do</h3>

                        {transferResult.status === "locked" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">To unlock your domain:</p>
                            <ol className="list-decimal list-inside space-y-2 text-[15px] text-muted-foreground">
                              <li>Log into your current registrar ({transferResult.currentRegistrar})</li>
                              <li>Find your domain settings or security options</li>
                              <li>Look for "Domain Lock" or "Transfer Lock" and disable it</li>
                              <li>Wait a few minutes, then check eligibility again</li>
                            </ol>
                          </div>
                        )}

                        {transferResult.status === "recently_registered" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              ICANN requires a 60-day waiting period after registration before a domain can be
                              transferred. This is a global policy to prevent fraud.
                            </p>
                            <p className="text-muted-foreground">
                              Set a reminder and come back after the waiting period. We'll be here!
                            </p>
                          </div>
                        )}

                        {transferResult.status === "expired" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              Expired domains can't be transferred until they're renewed. Contact your current registrar
                              to renew the domain first, then try again.
                            </p>
                          </div>
                        )}

                        {transferResult.status === "not_found" && (
                          <div className="space-y-3">
                            <p className="text-muted-foreground">
                              Double-check the domain spelling. If you're sure it's correct, the domain might not be
                              registered yet. Would you like to register it instead?
                            </p>
                            <Button variant="outline" className="bg-transparent" asChild>
                              <Link href={`/domains/search?q=${transferResult.domain}`}>Search for this domain</Link>
                            </Button>
                          </div>
                        )}

                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            Need help?{" "}
                            <Link href="/contact" className="text-primary hover:underline">
                              Contact our support team
                            </Link>{" "}
                            — we're happy to guide you through the process.
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
                Why transfer to us?
              </h2>
              <p className="text-[15px] text-muted-foreground text-balance">
                Beyond just moving your domain, here's what you gain
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Straightforward pricing",
                  desc: "No surprise renewal fees. No hidden charges. Just clear, honest pricing that doesn't change year to year.",
                },
                {
                  title: "Real human support",
                  desc: "If something goes wrong during the transfer, you can talk to an actual person who knows how to help.",
                },
                {
                  title: "Free WHOIS privacy",
                  desc: "Your personal information stays private automatically. No extra fees, no opt-ins—it's just included.",
                },
                {
                  title: "Simple management",
                  desc: "Update DNS, renew, or make changes through a dashboard that actually makes sense. No confusing jargon.",
                },
                {
                  title: "One extra year free",
                  desc: "When you transfer, you get an additional year added to your existing registration at no extra cost.",
                },
                {
                  title: "Keep your email working",
                  desc: "We'll make sure your existing email and website don't go down during the transfer. Nothing breaks.",
                },
              ].map((item, idx) => (
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
                  We've helped thousands move their domains
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>Switching registrars can feel risky. What if something breaks? What if it takes forever?</p>
                  <p>We've streamlined every step. Most founders are surprised how simple it actually is.</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Zero downtime guarantee</h3>
                    <p className="text-[15px] text-muted-foreground">Your site and email keep working throughout</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">5-7 days average</h3>
                    <p className="text-[15px] text-muted-foreground">
                      Fast transfers with status updates along the way
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <HeartHandshake className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">We handle complications</h3>
                    <p className="text-[15px] text-muted-foreground">
                      If your old registrar makes it difficult, we'll help
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8 order-1 lg:order-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 ring-1 ring-border/50">
                <img
                  src="/founder-relaxed-after-completing-domain-transfer.jpg"
                  alt="Founder relaxed after completing domain transfer"
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
                How domain transfer works
              </h2>
              <p className="text-[15px] text-muted-foreground text-balance">Five simple steps from start to finish</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Unlock your domain",
                  desc: "Log into your current registrar and unlock your domain. This is usually in domain settings or security options.",
                },
                {
                  step: "2",
                  title: "Get your authorization code",
                  desc: 'Request an "EPP code" or "auth code" from your current provider. They\'ll email it to you—usually within minutes.',
                },
                {
                  step: "3",
                  title: "Start the transfer with us",
                  desc: "Enter your domain and authorization code in our transfer form. We'll verify everything is ready to move.",
                },
                {
                  step: "4",
                  title: "Approve the transfer",
                  desc: "You'll receive an email asking you to approve the transfer. Click the link to confirm. Your old registrar may also ask for confirmation.",
                },
                {
                  step: "5",
                  title: "Wait for completion",
                  desc: "Most transfers finish within 5-7 days. We'll email you updates along the way, and you can contact us anytime if you have questions.",
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
                Transfer questions answered
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">Will my website go down during transfer?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  No. As long as your DNS settings stay the same, your website and email continue working exactly as
                  they did before. The transfer happens in the background without affecting your live services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">What if I can't find my authorization code?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  Contact your current registrar's support team and ask them to resend it. They're required to provide
                  this code to you. If you run into trouble, reach out to us—we can guide you through the process or
                  contact them on your behalf if needed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">How long does a domain transfer take?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  Most transfers complete within 5-7 days, though some can finish in as little as a few hours if both
                  registrars approve quickly. We'll keep you updated throughout the process so you're never left
                  wondering what's happening.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">Can I transfer a domain that expires soon?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  Yes, but we recommend renewing it with your current registrar first to avoid any complications. If
                  your domain expires during a transfer, things can get messy. Once renewed, you can transfer safely,
                  and you'll still get an extra year added when the transfer completes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">What happens if the transfer fails?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  If something goes wrong, we'll let you know exactly what happened and how to fix it. Common issues
                  include incorrect auth codes, locked domains, or missing approval emails. We'll work with you to
                  resolve it, and you won't be charged if the transfer doesn't complete.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">Ready to transfer?</h2>
            <p className="text-[17px] text-muted-foreground text-balance leading-relaxed mb-8">
              Enter your domain above to get started, or contact us if you'd like to talk through the process first.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="h-12 px-8" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Start your transfer
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent" asChild>
                <Link href="/contact">Talk to someone first</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer replaced with SiteFooter component */}
      <SiteFooter />
    </div>
  )
}
