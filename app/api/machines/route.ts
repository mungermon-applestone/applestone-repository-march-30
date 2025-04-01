import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { Machine } from "@/types/database"

// Fallback machines in case the fetch fails
const fallbackMachines: Machine[] = [
  {
    id: 1,
    name: "Standard Vending Machine",
    description: "Traditional snack and beverage vending machine",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Active",
    features: ["Multiple Trays", "Digital Display", "Card Payment"],
    location: "Main Office - Lobby",
  },
  {
    id: 2,
    name: "Refrigerated Beverage Machine",
    description: "Cold drink vending with energy-efficient cooling",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Active",
    features: ["Temperature Control", "Energy Efficient", "Multiple Sizes"],
    location: "Downtown - Food Court",
  },
  {
    id: 3,
    name: "Frozen Food Vending",
    description: "Frozen food and ice cream vending solution",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "vending-machine",
    status: "Maintenance",
    features: ["Deep Freeze", "Temperature Monitoring", "Energy Efficient"],
    location: "Hospital - 3rd Floor",
  },
  {
    id: 4,
    name: "Smart Locker System",
    description: "Modular locker system for package delivery",
    image_url: "/placeholder.svg?height=300&width=400",
    category: "locker",
    status: "Active",
    features: ["Modular Design", "Digital Access", "Notification System"],
    location: "Apartment Complex - Mail Room",
  },
]

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("machines").select("*").order("id").limit(4)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(fallbackMachines)
    }

    // If we have data, return it; otherwise, return fallback data
    return NextResponse.json(data && data.length > 0 ? data : fallbackMachines)
  } catch (error) {
    console.error("Error fetching machines:", error)
    // Return fallback data on error
    return NextResponse.json(fallbackMachines)
  }
}

