"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFetchData } from "@/hooks/use-fetch-data"
import { LoadingFallback } from "@/components/loading-fallback"
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

export function MachinesPreviewWithFetch() {
  const [showError, setShowError] = useState(true)
  const {
    data: machines,
    isLoading,
    error,
    retry,
  } = useFetchData<Machine[]>({
    url: "/api/machines",
    fallbackData: defaultMachines,
  })

  if (isLoading) {
    return <LoadingFallback />
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        {error && showError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-yellow-700">{error}</p>
                <div className="mt-2 flex">
                  <button
                    type="button"
                    onClick={() => retry()}
                    className="mr-3 text-sm font-medium text-yellow-800 hover:text-yellow-900"
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowError(false)}
                    className="text-sm font-medium text-yellow-800 hover:text-yellow-900"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

