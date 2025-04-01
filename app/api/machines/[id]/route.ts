import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First try to get the machine from the database
    const { data, error } = await supabase.from("machines").select("*").eq("id", id)

    // If there's an error that's not just "no rows returned"
    if (error && error.code !== "PGRST116") {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch machine" }, { status: 500 })
    }

    // If we found a machine in the database, return it
    if (data && data.length === 1) {
      return NextResponse.json(data[0])
    }

    // If no machine was found, return a fallback machine based on the ID
    const fallbackMachine = getFallbackMachine(id)
    if (fallbackMachine) {
      return NextResponse.json(fallbackMachine)
    }

    // If no fallback is available, return 404
    return NextResponse.json({ error: "Machine not found" }, { status: 404 })
  } catch (err) {
    console.error("Server error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Function to provide fallback data for machines
function getFallbackMachine(id: string) {
  const fallbackMachines = [
    {
      id: 1,
      name: "Standard Vending Machine",
      description: "Traditional snack and beverage vending machine with multiple trays and digital display.",
      image_url: "/placeholder.svg?height=600&width=800",
      category: "vending-machine",
      type: "Ambient",
      features: ["Multiple Trays", "Digital Display", "Card Payment", "Remote Monitoring"],
      specifications: {
        dimensions: '72" H x 39" W x 36" D',
        weight: "800 lbs",
        power: "110-120V, 60Hz, 3.6 Amps",
        capacity: "Up to 45 selections",
        cost: "Contact for pricing",
      },
      manufacturer: "Various manufacturers supported",
      status: "Active",
      location: "Main Office",
    },
    {
      id: 2,
      name: "Refrigerated Beverage Machine",
      description: "Cold drink vending with energy-efficient cooling system and digital interface.",
      image_url: "/placeholder.svg?height=600&width=800",
      category: "vending-machine",
      type: "Refrigerated",
      features: ["Temperature Control", "Energy Efficient", "Multiple Sizes", "Digital Interface"],
      specifications: {
        dimensions: '72" H x 52" W x 36" D',
        weight: "900 lbs",
        power: "110-120V, 60Hz, 9.8 Amps",
        capacity: "Up to 10 selections, 45 items per selection",
        cost: "Contact for pricing",
      },
      manufacturer: "Various manufacturers supported",
      status: "Active",
      location: "Downtown Office",
    },
    {
      id: 3,
      name: "Frozen Food Vending",
      description: "Frozen food and ice cream vending solution with temperature monitoring.",
      image_url: "/placeholder.svg?height=600&width=800",
      category: "vending-machine",
      type: "Frozen",
      features: ["Deep Freeze", "Temperature Monitoring", "Energy Efficient", "Digital Display"],
      specifications: {
        dimensions: '72" H x 41" W x 36" D',
        weight: "950 lbs",
        power: "110-120V, 60Hz, 12 Amps",
        capacity: "Up to 8 selections, 30 items per selection",
        cost: "Contact for pricing",
      },
      manufacturer: "Various manufacturers supported",
      status: "Maintenance",
      location: "Shopping Mall",
    },
    {
      id: 4,
      name: "Standard Locker System",
      description: "Modular locker system for package delivery with digital access control.",
      image_url: "/placeholder.svg?height=600&width=800",
      category: "locker",
      type: "Ambient",
      features: ["Modular Design", "Digital Access", "Notification System", "Camera Security"],
      specifications: {
        dimensions: '72" H x 72" W x 20" D (modular)',
        weight: "Varies by configuration",
        power: "110-120V, 60Hz, 2 Amps",
        capacity: "Configurable from 6 to 30+ compartments",
        cost: "Contact for pricing",
      },
      manufacturer: "Various manufacturers supported",
      status: "Active",
      location: "Apartment Complex",
    },
    {
      id: 5,
      name: "Refrigerated Locker",
      description: "Temperature-controlled lockers for food delivery with insulated compartments.",
      image_url: "/placeholder.svg?height=600&width=800",
      category: "locker",
      type: "Refrigerated",
      features: ["Temperature Control", "Insulated Compartments", "Energy Efficient", "Digital Access"],
      specifications: {
        dimensions: '72" H x 72" W x 30" D (modular)',
        weight: "Varies by configuration",
        power: "110-120V, 60Hz, 8 Amps",
        capacity: "Configurable from 4 to 16 compartments",
        cost: "Contact for pricing",
      },
      manufacturer: "Various manufacturers supported",
      status: "Active",
      location: "Office Building",
    },
  ]

  const numericId = Number.parseInt(id, 10)
  return fallbackMachines.find((machine) => machine.id === numericId)
}

