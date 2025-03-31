import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our machine data
interface Machine {
  id: number
  name: string
  description: string
  image_url: string
  features?: string[]
  category?: string
  specifications?: Record<string, string>
}

// Default machines in case the database is empty
const defaultMachines: Machine[] = [
  {
    id: 1,
    name: "Cannabis Dispensing",
    description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Cannabis",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
    specifications: {
      Dimensions: '72" x 39" x 35"',
      Weight: "800 lbs",
      Power: "110V, 5A",
      Capacity: "Up to 500 products",
    },
  },
  {
    id: 2,
    name: "Cold Drink Machine",
    description: "Temperature-controlled beverage vending with energy-efficient cooling.",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Beverages",
    features: ["Temperature Control", "Energy Efficient", "Multiple Sizes"],
    specifications: {
      Dimensions: '72" x 39" x 35"',
      Weight: "650 lbs",
      Power: "110V, 8A",
      Capacity: "Up to 400 beverages",
    },
  },
  {
    id: 3,
    name: "Combo Vending Machine",
    description: "Combined snack and beverage options in a single machine.",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Mixed",
    features: ["Snacks & Drinks", "Space Efficient", "High Capacity"],
    specifications: {
      Dimensions: '72" x 39" x 35"',
      Weight: "700 lbs",
      Power: "110V, 7A",
      Capacity: "Up to 300 snacks and 200 beverages",
    },
  },
  {
    id: 4,
    name: "Fresh Food Kiosk",
    description: "Temperature-controlled fresh food vending with freshness monitoring.",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "Fresh Food",
    features: ["Temperature Control", "Freshness Monitoring", "Touchscreen Interface"],
    specifications: {
      Dimensions: '72" x 39" x 35"',
      Weight: "750 lbs",
      Power: "110V, 9A",
      Capacity: "Up to 200 fresh food items",
    },
  },
]

// Fetch machines from Supabase
async function getMachines(): Promise<Machine[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("machines").select("*").order("id", { ascending: true })

    if (error || !data || data.length === 0) {
      console.log("No machines found, using default")
      return defaultMachines
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image_url: item.image_url || "/placeholder.svg?height=300&width=400",
      features: item.features || [],
      category: item.category,
      specifications: item.specifications || {},
    }))
  } catch (error) {
    console.error("Error fetching machines:", error)
    return defaultMachines
  }
}

export default async function MachinesPage() {
  const machines = await getMachines()

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Our Vending Machines</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our range of vending machines designed for different products and environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Machines Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {machines.map((machine) => (
              <div key={machine.id} className="group relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="aspect-video overflow-hidden rounded-md">
                  <Image
                    src={machine.image_url || "/placeholder.svg"}
                    alt={machine.name}
                    width={400}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{machine.name}</h3>
                    {machine.category && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {machine.category}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{machine.description}</p>
                  {machine.features && machine.features.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {machine.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/machines/${machine.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Find the Right Machine</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contact us today to find the perfect vending machine for your business needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/request-demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

