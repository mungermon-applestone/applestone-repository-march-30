import type React from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/admin" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">AppleStone Admin</span>
            </Link>
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Link href="/admin/images" className="text-sm font-medium transition-colors hover:text-primary">
                Images
              </Link>
              <Link href="/admin/content" className="text-sm font-medium transition-colors hover:text-primary">
                Content
              </Link>
              <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                View Site
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

