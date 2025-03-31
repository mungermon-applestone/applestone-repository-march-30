"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, HomeIcon, TargetIcon, CuboidIcon as CubeIcon, NewspaperIcon } from "lucide-react"

export default function ContentManagementPage() {
  const [loading, setLoading] = useState(true)
  const [contentSections, setContentSections] = useState<{ [key: string]: number }>({})

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function fetchContentSections() {
      setLoading(true)

      try {
        // Check which content tables exist
        const tables = [
          { name: "hero_section", label: "Hero Section" },
          { name: "business_goals", label: "Business Goals" },
          { name: "machines", label: "Machines" },
          { name: "product_types", label: "Product Types" },
          { name: "updates", label: "Updates" },
        ]

        const counts: { [key: string]: number } = {}

        for (const table of tables) {
          const { count, error } = await supabase.from(table.name).select("*", { count: "exact", head: true })

          if (!error) {
            counts[table.name] = count || 0
          }
        }

        setContentSections(counts)
      } catch (error) {
        console.error("Error fetching content sections:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContentSections()
  }, [])

  const contentCards = [
    {
      title: "Hero Section",
      description: "Edit the main hero section on the homepage",
      icon: <HomeIcon className="h-5 w-5" />,
      link: "/admin/content/hero",
      count: contentSections["hero_section"] || 0,
    },
    {
      title: "Business Goals",
      description: "Manage business goals content",
      icon: <TargetIcon className="h-5 w-5" />,
      link: "/admin/content/business-goals",
      count: contentSections["business_goals"] || 0,
    },
    {
      title: "Machines",
      description: "Edit machine types and details",
      icon: <CubeIcon className="h-5 w-5" />,
      link: "/admin/content/machines",
      count: contentSections["machines"] || 0,
    },
    {
      title: "Product Types",
      description: "Manage product type content",
      icon: <FileTextIcon className="h-5 w-5" />,
      link: "/admin/content/product-types",
      count: contentSections["product_types"] || 0,
    },
    {
      title: "Updates & News",
      description: "Manage updates and news content",
      icon: <NewspaperIcon className="h-5 w-5" />,
      link: "/admin/content/updates",
      count: contentSections["updates"] || 0,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contentCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {card.icon}
                {card.title}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {loading ? "Loading content..." : `${card.count} item${card.count !== 1 ? "s" : ""} in this section`}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={card.link}>Manage Content</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

