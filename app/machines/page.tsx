import { createServerSupabaseClient } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

// Define the type for our machine data based on the actual schema
interface Machine {
  id: string
  name: string
  category: string
  description: string
  location: string
  status: string
}

// Fetch all machines from Supabase
async function getAllMachines(): Promise<Machine[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("machines").select("*").order("name", { ascending: true })

    if (error || !data) {
      console.log("Error fetching machines or no data found")
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching machines:", error)
    return []
  }
}

export default async function MachinesPage() {
  const machines = await getAllMachines()

  // Group machines by category
  const machinesByCategory: Record<string, Machine[]> = {}

  machines.forEach((machine) => {
    if (!machinesByCategory[machine.category]) {
      machinesByCategory[machine.category] = []
    }
    machinesByCategory[machine.category].push(machine)
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Vending Machines</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our range of vending machines designed for different products and environments.
        </p>
      </div>

      {Object.entries(machinesByCategory).map(([category, categoryMachines]) => (
        <div key={category} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 capitalize">{category.replace("-", " ")} Machines</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryMachines.map((machine) => (
              <Link
                key={machine.id}
                href={`/machines/${machine.id}`}
                className="group block overflow-hidden rounded-lg border bg-background hover:shadow-md transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(machine.name)}`}
                    alt={machine.name}
                    width={400}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{machine.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
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
                  <p className="text-sm text-muted-foreground mb-3">Location: {machine.location}</p>
                  <p className="mt-2 text-muted-foreground line-clamp-2">{machine.description}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

