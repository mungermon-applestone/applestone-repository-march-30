"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { LoadingFallback } from "@/components/loading-fallback"
import { AlertMessage } from "@/components/alert-message"
import { OptimizedImage } from "@/components/optimized-image"
import { useFetchData } from "@/hooks/use-fetch-data"

// Define the type for our machine data
interface Machine {
  id: number
  name: string
  description: string
  image_url: string
  category: string
  type?: string
  status?: string
  location?: string
  features?: string[]
}

// Fallback machines in case the database is empty
const fallbackMachines: Machine[] = [
  {
    id: 1,
    name: "Standard Vending Machine",
    description: "Traditional snack and beverage vending machine",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    type: "Ambient",
    status: "Active",
    location: "Main Office",
    features: ["Multiple Trays", "Digital Display", "Card Payment"],
  },
  {
    id: 2,
    name: "Refrigerated Beverage Machine",
    description: "Cold drink vending with energy-efficient cooling",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    type: "Refrigerated",
    status: "Active",
    location: "Downtown Office",
    features: ["Temperature Control", "Energy Efficient", "Multiple Sizes"],
  },
  {
    id: 3,
    name: "Frozen Food Vending",
    description: "Frozen food and ice cream vending solution",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    type: "Frozen",
    status: "Maintenance",
    location: "Shopping Mall",
    features: ["Deep Freeze", "Temperature Monitoring", "Energy Efficient"],
  },
  {
    id: 4,
    name: "Standard Locker System",
    description: "Modular locker system for package delivery",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "locker",
    type: "Ambient",
    status: "Active",
    location: "Apartment Complex",
    features: ["Modular Design", "Digital Access", "Notification System"],
  },
  {
    id: 5,
    name: "Refrigerated Locker",
    description: "Temperature-controlled lockers for food delivery",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "locker",
    type: "Refrigerated",
    status: "Active",
    location: "Office Building",
    features: ["Temperature Control", "Insulated Compartments", "Energy Efficient"],
  },
]

export default function MachinesPage() {
  const {
    data: machines,
    isLoading,
    error,
    retry,
  } = useFetchData<Machine[]>({
    url: "/api/machines",
    fallbackData: fallbackMachines,
  })

  // Group machines by category
  const vendingMachines = machines.filter((machine) => machine.category === "vending-machine")
  const lockers = machines.filter((machine) => machine.category === "locker")

  return (
    <>
      {/* Hero Section */}
      <PageHeader
        pageKey="machines"
        defaultTitle="Machine Form Factors"
        defaultDescription="Explore our range of vending machines and lockers designed for different products and environments."
      />

      {/* Vending Machines Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">Vending Machines</h2>

          {isLoading ? (
            <LoadingFallback minHeight="300px" />
          ) : (
            <>
              {error && <AlertMessage type="warning" message={error} className="mb-6" onRetry={retry} dismissible />}

              {vendingMachines.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendingMachines.map((machine) => (
                    <Link
                      href={`/machines/${machine.id}`}
                      key={machine.id}
                      className="group border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video relative">
                        <OptimizedImage
                          src={machine.image_url || "/placeholder.svg?height=300&width=400"}
                          alt={machine.name}
                          width={400}
                          height={300}
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">{machine.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{machine.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {machine.type && (
                            <Badge variant="outline" className="bg-primary/10">
                              {machine.type}
                            </Badge>
                          )}
                          {machine.status && (
                            <Badge
                              variant="outline"
                              className={`${
                                machine.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : machine.status === "Maintenance"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {machine.status}
                            </Badge>
                          )}
                          {machine.features &&
                            machine.features.slice(0, 1).map((feature, index) => (
                              <Badge key={index} variant="outline">
                                {feature}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">No vending machines found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lockers Section */}
      <section className="w-full py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">Lockers</h2>

          {isLoading ? (
            <LoadingFallback minHeight="300px" />
          ) : (
            <>
              {lockers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lockers.map((machine) => (
                    <Link
                      href={`/machines/${machine.id}`}
                      key={machine.id}
                      className="group border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video relative">
                        <OptimizedImage
                          src={machine.image_url || "/placeholder.svg?height=300&width=400"}
                          alt={machine.name}
                          width={400}
                          height={300}
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">{machine.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{machine.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {machine.type && (
                            <Badge variant="outline" className="bg-primary/10">
                              {machine.type}
                            </Badge>
                          )}
                          {machine.features &&
                            machine.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline">
                                {feature}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">No lockers found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Find the Right Machine</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contact us today to find the perfect vending machine or locker system for your business needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/request-demo">Request Demo</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

