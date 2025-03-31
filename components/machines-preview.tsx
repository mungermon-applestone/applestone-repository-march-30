import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchData } from "@/lib/supabase-client"
import type { Machine } from "@/types/database"

// Default machines in case the database is empty
const defaultMachines: Machine[] = [
  {
    id: 1,
    name: "Cannabis Dispensing Unit",
    description: "Secure cannabis product dispensing with age verification",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Maintenance",
    location: "Dispensary - Main Room",
    features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
  },
  {
    id: 2,
    name: "Cold Drink Machine",
    description: "Refrigerated beverage machine with 20 selections",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Active",
    location: "Main Office - Cafeteria",
    features: ["Temperature Control", "Energy Efficient", "Multiple Sizes"],
  },
  {
    id: 3,
    name: "Combo Vending Machine",
    description: "Combined snack and beverage machine",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Active",
    location: "Downtown - Lobby",
    features: ["Snacks & Drinks", "Space Efficient", "High Capacity"],
  },
  {
    id: 4,
    name: "Fresh Food Kiosk",
    description: "Refrigerated fresh food vending machine",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Active",
    location: "Hospital - 2nd Floor",
    features: ["Temperature Control", "Freshness Monitoring", "Touchscreen Interface"],
  },
]

// Fetch machines from Supabase
async function getMachines(): Promise<Machine[]> {
  const data = await fetchData<Machine[]>("machines", {
    order: { column: "id", ascending: true },
    limit: 4,
  })

  if (!data || data.length === 0) {
    console.log("No machines found, using default")
    return defaultMachines
  }

  return data.map((item) => ({
    ...item,
    image_url: item.image_url || "/placeholder.svg?height=300&width=400",
    features: item.features || [],
    category: item.category || "vending-machine",
    status: item.status || "Active",
    location: item.location || "Main Office",
  }))
}

export async function MachinesPreview() {
  const machines = await getMachines()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Vending Machines</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our range of vending machines designed for different products and environments.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {machines.map((machine) => (
            <div key={machine.id} className="group relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="aspect-video overflow-hidden rounded-md">
                <Image
                  src={machine.image_url || "/placeholder.svg"}
                  alt={machine.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{machine.name}</h3>
                  {machine.status && (
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        machine.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : machine.status === "Maintenance"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {machine.status}
                    </span>
                  )}
                </div>
                <div className="space-y-1 mb-2">
                  <p className="text-sm text-gray-600">Category: {machine.category || "vending-machine"}</p>
                  <p className="text-sm text-gray-600">Location: {machine.location || "Main Office"}</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{machine.description}</p>
                <Link
                  href={`/machines/${machine.id}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/machines">View All Machines</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

