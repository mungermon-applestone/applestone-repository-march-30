import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock } from "lucide-react"

// Define the type for our machine data based on the actual schema
interface Machine {
  id: string
  name: string
  category: string
  description: string
  location: string
  status: string
  last_updated: string
}

// Fetch a specific machine from Supabase
async function getMachine(id: string): Promise<Machine | null> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("machines").select("*").eq("id", id).single()

    if (error || !data) {
      console.log("Error fetching machine or no data found")
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching machine:", error)
    return null
  }
}

export default async function MachinePage({ params }: { params: { id: string } }) {
  const machine = await getMachine(params.id)

  if (!machine) {
    notFound()
  }

  // Format the last updated date
  const lastUpdated = new Date(machine.last_updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/machines" className="inline-flex items-center text-sm mb-8 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all machines
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Image
            src={`/placeholder.svg?height=600&width=800&text=${encodeURIComponent(machine.name)}`}
            alt={machine.name}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{machine.name}</h1>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                machine.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : machine.status === "Maintenance"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {machine.status}
            </span>
          </div>

          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="mr-2 h-4 w-4" />
            {machine.location}
          </div>

          <div className="flex items-center text-muted-foreground mb-6">
            <Clock className="mr-2 h-4 w-4" />
            Last updated: {lastUpdated}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{machine.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <div className="inline-block bg-muted px-3 py-1 rounded-md">{machine.category}</div>
          </div>

          <Button size="lg" asChild>
            <Link href="/request-demo">Request a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

