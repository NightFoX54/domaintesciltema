"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, Sparkles, Globe, X, ShoppingCart, Loader2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"

interface DomainResult {
  domain: string
  available: boolean
  price: string
  renewalPrice: string
  popular?: boolean
}

function generateDomainResults(query: string): DomainResult[] {
  // Remove any existing extension from the query
  const baseName = query
    .replace(/\.[a-z]+$/i, "")
    .toLowerCase()
    .trim()

  if (!baseName) return []

  // Dummy results - in real app this would come from API
  return [
    {
      domain: `${baseName}.com`,
      available: Math.random() > 0.3,
      price: "₺299",
      renewalPrice: "₺399/yıl",
      popular: true,
    },
    {
      domain: `${baseName}.com.tr`,
      available: Math.random() > 0.2,
      price: "₺149",
      renewalPrice: "₺199/yıl",
      popular: true,
    },
    { domain: `${baseName}.net`, available: Math.random() > 0.4, price: "₺349", renewalPrice: "₺449/yıl" },
    { domain: `${baseName}.org`, available: Math.random() > 0.5, price: "₺349", renewalPrice: "₺449/yıl" },
    { domain: `${baseName}.co`, available: Math.random() > 0.4, price: "₺699", renewalPrice: "₺799/yıl" },
    { domain: `${baseName}.io`, available: Math.random() > 0.6, price: "₺899", renewalPrice: "₺999/yıl" },
    { domain: `${baseName}.app`, available: Math.random() > 0.5, price: "₺499", renewalPrice: "₺599/yıl" },
    { domain: `${baseName}.dev`, available: Math.random() > 0.5, price: "₺399", renewalPrice: "₺499/yıl" },
    { domain: `get${baseName}.com`, available: true, price: "₺299", renewalPrice: "₺399/yıl" },
    { domain: `${baseName}app.com`, available: true, price: "₺299", renewalPrice: "₺399/yıl" },
    { domain: `try${baseName}.com`, available: true, price: "₺299", renewalPrice: "₺399/yıl" },
    { domain: `${baseName}.online`, available: true, price: "₺199", renewalPrice: "₺299/yıl" },
  ]
}

export default function DomainSearchPage() {
  const { t } = useTranslation('domains')
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    // Simulate API delay
    setTimeout(() => {
      const results = generateDomainResults(searchQuery)
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <SiteHeader />

      <main id="main-content">
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance">
                  {t("search.title")}
                </h1>
                <p className="text-[17px] md:text-lg text-muted-foreground text-balance leading-relaxed">
                  {t("search.description")}
                </p>
              </div>

              {/* Search Box */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <label htmlFor="domain-search" className="sr-only">
                      {t("search.searchPlaceholder")}
                    </label>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="domain-search"
                      type="text"
                      placeholder={t("search.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleSearch()
                        }
                      }}
                      className="h-14 pl-12 pr-4 text-base"
                      aria-label={t("search.searchPlaceholder")}
                    />
                  </div>
                  <Button
                    size="lg"
                    className="h-14 px-8"
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("search.searching")}
                      </>
                    ) : (
                      t("search.searchButton")
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("search.searchHint")}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">{t("search.instantCheck")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">{t("search.freeWhois")}</span>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-8">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/5 ring-1 ring-border/50">
                <img
                  src="/founder-brainstorming-domain-names-at-desk.jpg"
                  alt={t("search.imageAlt")}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasSearched && (
        <section className="py-16 md:py-20 border-b border-border/40">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-5xl mx-auto">
              {isSearching ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Checking availability across all extensions...</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                      {t("search.resultsTitle", "domains", { query: searchQuery })}
                    </h2>
                    <p className="text-muted-foreground">
                      {t("search.resultsDescription", "domains", { 
                        available: searchResults.filter((r) => r.available).length,
                        total: searchResults.length 
                      })}
                    </p>
                  </div>

                  {/* Available domains */}
                  <div className="space-y-3 mb-12">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      {t("search.availableDomains")}
                    </h3>
                    {searchResults.filter((r) => r.available).length === 0 ? (
                      <div className="bg-muted/30 border border-border rounded-xl p-8 text-center">
                        <p className="text-muted-foreground">
                          {t("search.noMatches")}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {searchResults
                          .filter((r) => r.available)
                          .map((result) => (
                            <div
                              key={result.domain}
                              className="flex items-center justify-between bg-card border border-border rounded-xl p-4 md:p-6 hover:border-green-500/50 hover:shadow-md transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <Check className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg md:text-xl font-semibold text-foreground">
                                      {result.domain}
                                    </span>
                                    {result.popular && (
                                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                        {t("search.popular")}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{t("search.renewsAt", "domains", { price: result.renewalPrice })}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-xl md:text-2xl font-semibold text-foreground">
                                    {result.price}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{t("search.firstYear")}</div>
                                </div>
                                <Button asChild>
                                  <Link href={`/configure/domain?domain=${result.domain}`}>
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {t("search.addToCart")}
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Unavailable domains */}
                  {searchResults.filter((r) => !r.available).length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500" />
                        {t("search.unavailable")}
                      </h3>
                      <div className="space-y-3">
                        {searchResults
                          .filter((r) => !r.available)
                          .map((result) => (
                            <div
                              key={result.domain}
                              className="flex items-center justify-between bg-muted/30 border border-border rounded-xl p-4 md:p-6 opacity-60"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                  <X className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                  <span className="text-lg md:text-xl font-semibold text-foreground line-through">
                                    {result.domain}
                                  </span>
                                  <p className="text-sm text-muted-foreground">{t("search.alreadyRegistered")}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" disabled className="bg-transparent">
                                {t("search.notAvailable")}
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Popular Extensions */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance mb-4">
                Popular domain extensions
              </h2>
              <p className="text-[15px] text-muted-foreground text-balance">
                Start with the most trusted extensions that customers recognize
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { ext: ".com", price: "₺299", renewal: "₺399/year", desc: "The most trusted extension worldwide" },
                { ext: ".net", price: "₺349", renewal: "₺449/year", desc: "Great for tech and network projects" },
                { ext: ".org", price: "₺349", renewal: "₺449/year", desc: "Perfect for organizations" },
                { ext: ".com.tr", price: "₺149", renewal: "₺199/year", desc: "Turkish presence, local trust" },
                { ext: ".info", price: "₺299", renewal: "₺399/year", desc: "Share information and resources" },
                { ext: ".co", price: "₺699", renewal: "₺799/year", desc: "Modern alternative to .com" },
              ].map((item) => (
                <div
                  key={item.ext}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-foreground/20 transition-all"
                >
                  <div className="font-semibold text-3xl text-foreground mb-2">{item.ext}</div>
                  <div className="text-2xl font-semibold text-foreground mb-1">{item.price}</div>
                  <div className="text-xs text-muted-foreground mb-4">{t("search.renewsAt", "domains", { price: item.renewal })}</div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full mt-6 bg-transparent"
                    onClick={() => {
                      setSearchQuery(item.ext.replace(".", ""))
                      handleSearch()
                    }}
                  >
                    {t("search.popularExtensions.searchExtension", "domains", { ext: item.ext })}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The right name changes everything */}
      <section className="py-20 md:py-24 lg:py-28 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
            <div className="relative lg:-ml-8">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 ring-1 ring-border/50">
                <img
                  src="/person-excited-about-finding-perfect-domain-name.jpg"
                  alt={t("search.rightName.imageAlt")}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-8 max-w-xl">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
                  {t("search.rightName.title")}
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    {t("search.rightName.paragraph1")}
                  </p>
                  <p>
                    {t("search.rightName.paragraph2")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("search.rightName.smartSuggestions.title")}</h3>
                    <p className="text-[15px] text-muted-foreground">
                      {t("search.rightName.smartSuggestions.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t("search.rightName.multipleExtensions.title")}</h3>
                    <p className="text-[15px] text-muted-foreground">{t("search.rightName.multipleExtensions.description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Choosing */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance mb-4">
                Tips for choosing a domain
              </h2>
              <p className="text-[15px] text-muted-foreground text-balance">
                A few simple guidelines to help you find the right fit
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Keep it short and memorable",
                  desc: "Shorter domains are easier to remember, type, and share. Aim for 2-3 words maximum if possible.",
                },
                {
                  title: "Make it easy to spell",
                  desc: "Avoid complex spellings or numbers that could confuse people. If you have to explain how to spell it, consider another option.",
                },
                {
                  title: "Choose .com when possible",
                  desc: "People naturally assume .com first. If your ideal .com is taken, consider a different name rather than settling for an unusual extension.",
                },
                {
                  title: "Think long-term",
                  desc: "Your domain might outlive your first product idea. Choose something that gives you room to grow and evolve.",
                },
                {
                  title: "Say it out loud",
                  desc: "Will people understand it when you say it? Does it sound natural in conversation? This matters more than you think.",
                },
                {
                  title: "Check social media too",
                  desc: "See if matching social handles are available. Consistency across platforms helps people find and remember you.",
                },
              ].map((tip, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </div>
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
                Common questions about domain search
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">What if my ideal domain is taken?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  This happens more often than you'd think. Try adding a descriptive word (like "get", "try", or "app"),
                  consider a different extension like .co or .io, or rethink the name entirely. Sometimes a taken domain
                  leads you to an even better name you wouldn't have considered otherwise.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">Should I buy multiple domain extensions?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  It depends on your goals. If you're a Turkish business, securing both .com and .com.tr makes sense.
                  But you don't need to buy every possible extension—focus on protecting the ones that matter most to
                  your customers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">Can I change my domain later?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  Yes, you can always register a new domain and redirect your old one. But changing domains can affect
                  SEO and confuse existing customers, so it's worth taking time to choose carefully now rather than
                  rushing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="text-base font-medium">How long does domain registration take?</span>
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  Registration is instant for most extensions. As soon as your payment goes through, the domain is
                  yours. Some country-specific extensions might require verification, but we'll guide you through that
                  if needed.
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
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
              Ready to find your domain?
            </h2>
            <p className="text-[17px] text-muted-foreground text-balance leading-relaxed mb-8">
              Search above to check availability, or explore our domain transfer options if you already own one.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="h-12 px-8" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Start searching
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent" asChild>
                <Link href="/domains/transfer">Transfer a domain</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
