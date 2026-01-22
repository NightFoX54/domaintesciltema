"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Mail, ArrowRight, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { useParams } from "next/navigation"
import { addLocaleToPath } from "@/lib/locale-utils"

export default function ContactPage() {
  const { t } = useTranslation('contact')
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  
  const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">

      {/* HERO */}
      <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-tight">{t("hero.title")}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-semibold">{t("form.title")}</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {t("form.description")}
                </p>
              </div>

              <form className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t("form.name.label")}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("form.name.placeholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("form.email.label")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("form.email.placeholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    {t("form.subject.label")} <span className="text-muted-foreground font-normal">{t("form.subject.optional")}</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder={t("form.subject.placeholder")}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t("form.message.label")}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t("form.message.placeholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={8}
                    className="resize-none"
                    aria-required="true"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-12 text-base shadow-md">
                  {t("form.submit")} <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>

                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {t("form.afterSubmit")}
                </p>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {t("form.responseTime")}
                </p>
              </form>
            </div>

            {/* Quick Help */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">{t("quickHelp.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("quickHelp.description")}
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/support"
                  className="block p-4 bg-muted/20 rounded-lg border border-border hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div className="space-y-1">
                      <div className="font-medium text-sm group-hover:text-foreground/80 transition-colors">
                        {t("quickHelp.helpCenter.title")}
                      </div>
                      <div className="text-xs text-muted-foreground">{t("quickHelp.helpCenter.description")}</div>
                    </div>
                  </div>
                </Link>

                <Link
                  href={getPath("/migration")}
                  className="block p-4 bg-muted/20 rounded-lg border border-border hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div className="space-y-1">
                      <div className="font-medium text-sm group-hover:text-foreground/80 transition-colors">
                        {t("quickHelp.migration.title")}
                      </div>
                      <div className="text-xs text-muted-foreground">{t("quickHelp.migration.description")}</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-foreground mt-1 flex-shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{t("quickHelp.liveChat.title")}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {t("quickHelp.liveChat.description")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-foreground mt-1 flex-shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{t("quickHelp.directEmail.title")}</div>
                    <div className="text-xs text-muted-foreground">{t("quickHelp.directEmail.email")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-balance">{t("reassurance.title")}</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed text-pretty">
              {t("reassurance.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Browse Products */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-balance">{t("browseProducts.title")}</h2>
            <p className="text-muted-foreground">{t("browseProducts.description")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href={getPath("/domains")}>{t("browseProducts.domains")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={getPath("/hosting")}>{t("browseProducts.hosting")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={getPath("/ssl")}>{t("browseProducts.ssl")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </div>
  )
}
