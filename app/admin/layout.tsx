import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Vending Machine CMS</h1>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          <aside className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              <NavLink href="/admin">Dashboard</NavLink>
              <NavLink href="/admin/hero">Hero Section</NavLink>
              <NavLink href="/admin/product-types">Product Types</NavLink>
              <NavLink href="/admin/business-goals">Business Goals</NavLink>
              <NavLink href="/admin/machines">Machines</NavLink>
            </nav>
          </aside>

          <main className="flex-1 bg-background rounded-lg border p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-4 py-2 rounded-md hover:bg-background hover:text-primary transition-colors">
      {children}
    </Link>
  )
}

