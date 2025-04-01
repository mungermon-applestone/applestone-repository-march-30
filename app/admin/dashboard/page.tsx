"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Database, Edit, FileText, Grid, Image, MessageSquare, Settings } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AlertMessage } from "@/components/alert-message"

interface ContentStats {
  productTypes: number
  businessGoals: number
  machines: number
  updates: number
  pageContent: number
  testimonials: number
  faqs: number
  media: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<ContentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        // In a real implementation, this would fetch actual stats from the API
        // For now, we'll use mock data
        const mockStats: ContentStats = {
          productTypes: 4,
          businessGoals: 4,
          machines: 4,
          updates: 4,
          pageContent: 2,
          testimonials: 4,
          faqs: 5,
          media: 20,
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setStats(mockStats)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching content stats:", err)
        setError("Failed to load content statistics. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return <AlertMessage type="error" message={error} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats
                ? stats.productTypes + stats.businessGoals + stats.machines + stats.updates + stats.pageContent
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Total content items in the database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.media || 0}</div>
            <p className="text-xs text-muted-foreground">Images and other media files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.testimonials || 0}</div>
            <p className="text-xs text-muted-foreground">Customer testimonials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.faqs || 0}</div>
            <p className="text-xs text-muted-foreground">Frequently asked questions</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Content Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Types</CardTitle>
            <CardDescription>Manage product types that can be sold in vending machines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Grid className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.productTypes || 0} product types in the database</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/product-types">
                <Edit className="mr-2 h-4 w-4" /> Manage Product Types
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Goals</CardTitle>
            <CardDescription>Manage business goals content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.businessGoals || 0} business goals in the database</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/business-goals">
                <Edit className="mr-2 h-4 w-4" /> Manage Business Goals
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Machines</CardTitle>
            <CardDescription>Manage vending machine products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-4">
              <Database className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.machines || 0} machines in the database</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/machines">
                <Edit className="mr-2 h-4 w-4" /> Manage Machines
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Updates</CardTitle>
            <CardDescription>Manage news and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.updates || 0} updates in the database</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/updates">
                <Edit className="mr-2 h-4 w-4" /> Manage Updates
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
            <CardDescription>Manage content for specific pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">
              {stats?.pageContent || 0} page content items in the database
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/page-content">
                <Edit className="mr-2 h-4 w-4" /> Manage Page Content
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Manage images and other media files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <Image className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.media || 0} media files in the library</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/media">
                <Edit className="mr-2 h-4 w-4" /> Manage Media
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
            <CardDescription>Manage customer testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 text-cyan-600 mb-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.testimonials || 0} testimonials in the database</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/testimonials">
                <Edit className="mr-2 h-4 w-4" /> Manage Testimonials
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
            <CardDescription>Manage frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">{stats?.faqs || 0} FAQs in the database</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/faqs">
                <Edit className="mr-2 h-4 w-4" /> Manage FAQs
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>Manage global site settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-gray-600 mb-4">
              <Settings className="h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">Configure global site settings</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/settings">
                <Edit className="mr-2 h-4 w-4" /> Manage Settings
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

