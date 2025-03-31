import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Cloud } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AppleStone Solutions - Vending Machine Software",
  description: "Unified software solutions for vending machines from all manufacturers",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="h-6 w-6 text-primary" />
                  <Link href="/" className="text-xl font-bold">
                    AppleStone Solutions
                  </Link>
                </div>
                <nav className="hidden md:flex gap-6">
                  <Link href="/products-new" className="text-sm font-medium hover:text-primary">
                    Products
                  </Link>
                  <Link href="/business-goals" className="text-sm font-medium hover:text-primary">
                    Business Goals
                  </Link>
                  <Link href="/machines" className="text-sm font-medium hover:text-primary">
                    Machines
                  </Link>
                  <Link href="/technology" className="text-sm font-medium hover:text-primary">
                    Technology
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:text-primary">
                    About
                  </Link>
                  <Link href="/updates" className="text-sm font-medium hover:text-primary">
                    Updates
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex text-sm gap-6">
                    <Link href="/partner" className="hover:text-primary font-medium">
                      Partner Sign-in
                    </Link>
                    <Link href="/customer" className="hover:text-primary font-medium">
                      Customer Sign-in
                    </Link>
                  </div>
                  <Link
                    href="/request-demo"
                    className="inline-flex items-center justify-center rounded-md bg-[#2563EB] px-6 py-2 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="w-full border-t py-6 md:py-12">
              <div className="container px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-6 w-6 text-primary" />
                      <span className="text-lg font-bold">AppleStone Solutions</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unified software solutions for vending machine management.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Solutions</h3>
                    <nav className="flex flex-col gap-2">
                      <Link href="/products-new/grocery" className="text-sm hover:underline">
                        Grocery
                      </Link>
                      <Link href="/products-new/vape" className="text-sm hover:underline">
                        Vape
                      </Link>
                      <Link href="/products-new/cannabis" className="text-sm hover:underline">
                        Cannabis
                      </Link>
                      <Link href="/products-new/fresh-food" className="text-sm hover:underline">
                        Fresh Food
                      </Link>
                    </nav>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Company</h3>
                    <nav className="flex flex-col gap-2">
                      <Link href="/about" className="text-sm hover:underline">
                        About Us
                      </Link>
                      <Link href="/privacy" className="text-sm hover:underline">
                        Privacy Policy
                      </Link>
                      <Link href="/contact" className="text-sm hover:underline">
                        Contact Us
                      </Link>
                    </nav>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-lg font-semibold">Support</h3>
                    <nav className="flex flex-col gap-2">
                      <Link href="/help" className="text-sm hover:underline">
                        Help Center
                      </Link>
                      <Link href="/documentation" className="text-sm hover:underline">
                        Documentation
                      </Link>
                      <Link href="/api" className="text-sm hover:underline">
                        API Reference
                      </Link>
                    </nav>
                  </div>
                </div>
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-muted-foreground">© 2023 AppleStone Solutions. All rights reserved.</p>
                  <div className="flex gap-4">
                    <Link href="/privacy" className="text-xs text-muted-foreground hover:underline">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-xs text-muted-foreground hover:underline">
                      Terms of Service
                    </Link>
                    <Link href="/cookies" className="text-xs text-muted-foreground hover:underline">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'