"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, MessageCircle, FileText, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export default function ConfirmationPage() {
  useEffect(() => {
    // Clear any remaining cart data
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cartUpdated"))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Success message */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950" aria-hidden="true">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-semibold">You're all set!</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your order is confirmed. We've sent the details to your email.
              </p>
            </div>
          </div>

          {/* What happens next */}
          <div className="rounded-2xl border-2 border-border bg-card p-8 space-y-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">What happens next</h2>
              <p className="text-muted-foreground">We're setting everything up for you. Here's what to expect:</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  1
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">Check your email (now)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You'll receive a confirmation email with your order details and next steps. If you don't see it in a
                    few minutes, check your spam folder.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  2
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">We set up your services (within 10 minutes)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your domain, hosting, and SSL will be configured and ready to use. Most services activate instantly,
                    some may take a few minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  3
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">Access your account</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your account credentials will be in the email. You can log in anytime to manage your services, view
                    invoices, or make changes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 text-sm font-semibold text-primary">
                  4
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold mb-1.5">Need help? We're here</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you have questions or need guidance getting started, our support team is available 24/7. Just
                    reach out—no question is too small.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support options */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/contact"
              className="rounded-xl border-2 border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <MessageCircle className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-semibold mb-1.5">Talk to support</h3>
              <p className="text-sm text-muted-foreground mb-3">Get help from a real person anytime</p>
              <span className="text-sm text-primary font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Contact us <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/support"
              className="rounded-xl border-2 border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <FileText className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-semibold mb-1.5">Getting started guides</h3>
              <p className="text-sm text-muted-foreground mb-3">Step-by-step help for common tasks</p>
              <span className="text-sm text-primary font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                View guides <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-muted-foreground">Want to add more services or manage your account?</p>
            <Button size="lg" asChild className="shadow-md">
              <Link href="/signin">Go to your account</Link>
            </Button>
          </div>

          {/* Contact info */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>Questions? Email us at support@domaintescil.com</span>
            </div>
            <p className="text-xs text-muted-foreground">We typically respond within an hour, often much faster.</p>
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
