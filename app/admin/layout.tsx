import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-1">
            <Link href="/admin" className="block p-2 hover:bg-gray-200 rounded">
              Dashboard
            </Link>
            <p className="text-sm font-medium text-gray-500 mt-4 mb-2">Content</p>
            <Link href="/admin/hero" className="block p-2 hover:bg-gray-200 rounded">
              Hero Section
            </Link>
            <Link href="/admin/business-goals" className="block p-2 hover:bg-gray-200 rounded">
              Business Goals
            </Link>
            <Link href="/admin/machines" className="block p-2 hover:bg-gray-200 rounded">
              Machines
            </Link>
            <Link href="/admin/product-types" className="block p-2 hover:bg-gray-200 rounded">
              Product Types
            </Link>
            <Link href="/admin/updates" className="block p-2 hover:bg-gray-200 rounded">
              Updates & News
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-lg font-medium">Content Management</h1>
          <Button variant="outline" asChild>
            <Link href="/">View Site</Link>
          </Button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

