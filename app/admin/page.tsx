import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Package, ShoppingBag, FileText, Upload, Home, FolderOpen, Layout } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"

// Function to get counts from database tables
async function getContentCounts() {
  const supabase = createServerSupabaseClient()

  const tables = ["hero_section", "page_headers", "business_goals", "machines", "product_types", "updates"]

  const counts: Record<string, number> = {}

  for (const table of tables) {
    const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true })

    if (!error) {
      counts[table] = count || 0
    } else {
      console.error(`Error getting count for ${table}:`, error)
      counts[table] = 0
    }
  }

  return counts
}

// Function to get storage stats
async function getStorageStats() {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.storage.from("images").list()

    if (error) {
      console.error("Error getting storage stats:", error)
      return { fileCount: 0 }
    }

    return { fileCount: data.length }
  } catch (error) {
    console.error("Error in getStorageStats:", error)
    return { fileCount: 0 }
  }
}

export default async function AdminDashboard() {
  const counts = await getContentCounts()
  const storageStats = await getStorageStats()

  const contentSections = [
    {
      title: "Hero Section",
      description: "Edit the main hero section on the homepage",
      icon: <Home className="h-6 w-6" />,
      link: "/admin/hero",
      count: counts["hero_section"],
    },
    {
      title: "Page Headers",
      description: "Edit headers for all site pages",
      icon: <Layout className="h-6 w-6" />,
      link: "/admin/page-headers",
      count: counts["page_headers"],
    },
    {
      title: "Business Goals",
      description: "Manage business goals content",
      icon: <Target className="h-6 w-6" />,
      link: "/admin/business-goals",
      count: counts["business_goals"],
    },
    {
      title: "Machines",
      description: "Edit vending machine information",
      icon: <Package className="h-6 w-6" />,
      link: "/admin/machines",
      count: counts["machines"],
    },
    {
      title: "Product Types",
      description: "Manage product type content",
      icon: <ShoppingBag className="h-6 w-6" />,
      link: "/admin/product-types",
      count: counts["product_types"],
    },
    {
      title: "Updates & News",
      description: "Manage updates and news content",
      icon: <FileText className="h-6 w-6" />,
      link: "/admin/updates",
      count: counts["updates"],
    },
  ]

  const mediaSections = [
    {
      title: "Media Library",
      description: "Browse and manage all media files",
      icon: <FolderOpen className="h-6 w-6" />,
      link: "/admin/media",
      count: storageStats.fileCount,
    },
    {
      title: "Image Upload",
      description: "Upload and manage images",
      icon: <Upload className="h-6 w-6" />,
      link: "/admin/images",
      count: null,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <h2 className="text-xl font-semibold mb-4">Content Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {contentSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{section.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full text-primary">{section.icon}</div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{section.description}</CardDescription>
              {section.count !== null && (
                <p className="text-sm text-muted-foreground mb-4">
                  {section.count} {section.count === 1 ? "item" : "items"}
                </p>
              )}
              <Button asChild>
                <Link href={section.link}>Manage Content</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Media Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{section.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full text-primary">{section.icon}</div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{section.description}</CardDescription>
              {section.count !== null && (
                <p className="text-sm text-muted-foreground mb-4">
                  {section.count} {section.count === 1 ? "file" : "files"}
                </p>
              )}
              <Button asChild>
                <Link href={section.link}>Manage Media</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

