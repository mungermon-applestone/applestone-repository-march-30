import type React from "react"
import Link from "next/link"
import { Package, Target, Truck, Monitor, FileText, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContentCard
            title="Product Types"
            count={4}
            icon={<Package className="h-8 w-8 text-blue-600" />}
            href="/admin/product-types"
          />
          <ContentCard
            title="Business Goals"
            count={4}
            icon={<Target className="h-8 w-8 text-blue-600" />}
            href="/admin/business-goals"
          />
          <ContentCard
            title="Machines"
            count={4}
            icon={<Truck className="h-8 w-8 text-blue-600" />}
            href="/admin/machines"
          />
          <ContentCard
            title="Technology"
            count={3}
            icon={<Monitor className="h-8 w-8 text-blue-600" />}
            href="/admin/technology"
          />
          <ContentCard
            title="Updates"
            count={4}
            icon={<FileText className="h-8 w-8 text-blue-600" />}
            href="/admin/updates"
          />
          <ContentCard title="Users" count={4} icon={<Users className="h-8 w-8 text-blue-600" />} href="/admin/users" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <ActivityItem action="Updated" item="Grocery Product Type" user="Admin" time="2 hours ago" />
            <ActivityItem action="Created" item="New Machine: Smart Locker System" user="Admin" time="1 day ago" />
            <ActivityItem action="Updated" item="Technology Page Content" user="Admin" time="2 days ago" />
            <ActivityItem action="Deleted" item="Outdated Update Post" user="Admin" time="3 days ago" />
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-4">
            <StatusItem label="Database Connection" status="Connected" isOk={true} />
            <StatusItem label="Content Cache" status="Up to date" isOk={true} />
            <StatusItem label="API Status" status="Operational" isOk={true} />
            <StatusItem label="Last Backup" status="Today at 3:00 AM" isOk={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentCard({
  title,
  count,
  icon,
  href,
}: { title: string; count: number; icon: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-50 p-3 rounded-full">{icon}</div>
        <span className="text-2xl font-bold text-gray-700">{count}</span>
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">Manage {title.toLowerCase()}</p>
    </Link>
  )
}

function ActivityItem({ action, item, user, time }: { action: string; item: string; user: string; time: string }) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <span
          className={`font-medium ${
            action === "Created" ? "text-green-600" : action === "Updated" ? "text-blue-600" : "text-red-600"
          }`}
        >
          {action}
        </span>
        <span className="text-gray-600"> {item}</span>
      </div>
      <div className="text-sm text-gray-500">
        <span>
          {user} • {time}
        </span>
      </div>
    </li>
  )
}

function StatusItem({ label, status, isOk }: { label: string; status: string; isOk: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isOk ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {status}
      </span>
    </div>
  )
}

