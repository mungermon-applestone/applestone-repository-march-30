import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"

interface PageLayoutProps {
  children: React.ReactNode
  showBreadcrumbs?: boolean
}

export function PageLayout({ children, showBreadcrumbs = true }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {showBreadcrumbs && (
        <div className="container py-4">
          <Breadcrumbs />
        </div>
      )}

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  )
}

