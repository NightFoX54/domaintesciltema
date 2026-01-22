import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <div className="flex-1 container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <DashboardNav />
          </aside>
          <main id="main-content" className="min-w-0">
            <ErrorBoundaryWrapper>
              {children}
            </ErrorBoundaryWrapper>
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
