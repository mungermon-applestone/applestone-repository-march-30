"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface HeroData {
  id?: number
  title: string
  description: string
  image_url: string
  button_text: string
  button_link: string
}

export async function saveHeroSection(data: HeroData) {
  const supabase = createServerSupabaseClient()

  try {
    if (data.id) {
      // Update existing record
      const { error } = await supabase
        .from("hero_section")
        .update({
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          button_text: data.button_text,
          button_link: data.button_link,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id)

      if (error) throw error
    } else {
      // Insert new record
      const { error } = await supabase.from("hero_section").insert({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        button_text: data.button_text,
        button_link: data.button_link,
      })

      if (error) throw error
    }

    // Revalidate the homepage to show updated content
    revalidatePath("/")
    revalidatePath("/admin/hero")

    return { success: true }
  } catch (error) {
    console.error("Error saving hero section:", error)
    return { success: false, error }
  }
}

