"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface BusinessGoalData {
  id?: number
  title: string
  description: string
  image_url: string
  slug: string
}

export async function saveBusinessGoal(data: BusinessGoalData) {
  const supabase = createServerSupabaseClient()

  try {
    if (data.id) {
      // Update existing record
      const { error } = await supabase
        .from("business_goals")
        .update({
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          slug: data.slug,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id)

      if (error) throw error
    } else {
      // Insert new record
      const { error } = await supabase.from("business_goals").insert({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        slug: data.slug,
      })

      if (error) throw error
    }

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/business-goals")
    revalidatePath("/admin/business-goals")

    return { success: true }
  } catch (error) {
    console.error("Error saving business goal:", error)
    return { success: false, error }
  }
}

export async function deleteBusinessGoal(id: number) {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("business_goals").delete().eq("id", id)

    if (error) throw error

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/business-goals")
    revalidatePath("/admin/business-goals")

    return { success: true }
  } catch (error) {
    console.error("Error deleting business goal:", error)
    return { success: false, error }
  }
}

