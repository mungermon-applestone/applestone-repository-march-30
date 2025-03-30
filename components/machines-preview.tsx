import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our machine data based on the actual schema
interface Machine {
  id: string
  name: string
  category: string
  description: string
  location: string
  status: string
}

// Fetch machines from Supabase
async function getMachines(): Promise<Machine[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("machines").select("*").order("name", { ascending: true }).limit(4)

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

export async function MachinesPreview() {
  const machines = await getMachines()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Vending Machines</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our range of vending machines designed for different products and environments.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8">
          {machines.map((machine) => (
            <div key={machine.id} className="group relative overflow-hidden rounded-lg border bg-background">
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
                <p className="text-sm text-muted-foreground mb-1">Category: {machine.category}</p>
                <p className="text-sm text-muted-foreground mb-3">Location: {machine.location}</p>
                <p className="mt-2 text-muted-foreground">{machine.description}</p>
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
        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/machines">View All Machines</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

