import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Hero Section" description="Edit your homepage hero section" link="/admin/hero" />
        <DashboardCard title="Product Types" description="Manage product types" link="/admin/product-types" />
        <DashboardCard title="Business Goals" description="Manage business goals" link="/admin/business-goals" />
        <DashboardCard title="Machines" description="Manage machine types" link="/admin/machines" />
      </div>
    </div>
  )
}

function DashboardCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link href={link} className="text-primary font-medium hover:underline">
        Manage →
      </Link>
    </div>
  )
}

