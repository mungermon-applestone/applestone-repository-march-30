import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Define the type for our business goal data
interface BusinessGoal {
  id: number
  title: string
  description: string
  image_url: string
  slug: string
}

// Fetch a specific business goal from Supabase
async function getBusinessGoal(slug: string): Promise<BusinessGoal | null> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("business_goals").select("*").eq("slug", slug).single()

    if (error || !data) {
      console.log("Error fetching business goal or no data found")
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching business goal:", error)
    return null
  }
}

export default async function BusinessGoalPage({ params }: { params: { slug: string } }) {
  const businessGoal = await getBusinessGoal(params.slug)

  if (!businessGoal) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/business-goals" className="inline-flex items-center text-sm mb-8 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all business goals
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Image
            src={
              businessGoal.image_url ||
              `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(businessGoal.title)}`
            }
            alt={businessGoal.title}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{businessGoal.title}</h1>

          <div className="mb-8">
            <p className="text-muted-foreground">{businessGoal.description}</p>
          </div>

          <Button size="lg" asChild>
            <Link href="/request-demo">Request a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

