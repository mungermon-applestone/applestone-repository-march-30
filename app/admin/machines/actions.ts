"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface MachineData {
  id: string
  name: string
  category: string
  description: string
  location: string
  status: string
}

export async function saveMachine(data: MachineData) {
  const supabase = createServerSupabaseClient()

  try {
    // Check if machine exists
    const { data: existingMachine } = await supabase.from("machines").select("id").eq("id", data.id).single()

    if (existingMachine) {
      // Update existing machine
      const { error } = await supabase
        .from("machines")
        .update({
          name: data.name,
          category: data.category,
          description: data.description,
          location: data.location,
          status: data.status,
          last_updated: new Date().toISOString(),
        })
        .eq("id", data.id)

      if (error) throw error
    } else {
      // Insert new machine
      const { error } = await supabase.from("machines").insert({
        id: data.id,
        name: data.name,
        category: data.category,
        description: data.description,
        location: data.location,
        status: data.status,
        last_updated: new Date().toISOString(),
      })

      if (error) throw error
    }

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/machines")
    revalidatePath("/admin/machines")

    return { success: true }
  } catch (error) {
    console.error("Error saving machine:", error)
    return { success: false, error }
  }
}

export async function deleteMachine(id: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("machines").delete().eq("id", id)

    if (error) throw error

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/machines")
    revalidatePath("/admin/machines")

    return { success: true }
  } catch (error) {
    console.error("Error deleting machine:", error)
    return { success: false, error }
  }
}

