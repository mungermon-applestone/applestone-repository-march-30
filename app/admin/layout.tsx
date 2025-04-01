import type { ReactNode } from "react"
import Link from "next/link"
import { Database, Home, Package, Target, Truck, Monitor, Users, Settings, LogOut } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <Link href="/admin" className="flex items-center">
            <Database className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-bold text-xl">Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Content</p>
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Home className="h-5 w-5 mr-3 text-gray-500" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/product-types"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Package className="h-5 w-5 mr-3 text-gray-500" />
                Product Types
              </Link>
            </li>
            <li>
              <Link
                href="/admin/business-goals"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Target className="h-5 w-5 mr-3 text-gray-500" />
                Business Goals
              </Link>
            </li>
            <li>
              <Link
                href="/admin/machines"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Truck className="h-5 w-5 mr-3 text-gray-500" />
                Machines
              </Link>
            </li>
            <li>
              <Link
                href="/admin/technology"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Monitor className="h-5 w-5 mr-3 text-gray-500" />
                Technology
              </Link>
            </li>
          </ul>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">System</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin/users"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Users className="h-5 w-5 mr-3 text-gray-500" />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings className="h-5 w-5 mr-3 text-gray-500" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <LogOut className="h-5 w-5 mr-3 text-gray-500" />
            Back to Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

