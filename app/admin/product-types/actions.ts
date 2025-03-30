"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface ProductTypeData {
  id?: number
  title: string
  description: string
  image_url: string
  slug: string
}

export async function saveProductType(data: ProductTypeData) {
  const supabase = createServerSupabaseClient()

  try {
    if (data.id) {
      // Update existing record
      const { error } = await supabase
        .from("product_types")
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
      const { error } = await supabase.from("product_types").insert({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        slug: data.slug,
      })

      if (error) throw error
    }

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin/product-types")

    return { success: true }
  } catch (error) {
    console.error("Error saving product type:", error)
    return { success: false, error }
  }
}

export async function deleteProductType(id: number) {
  const supabase = createServerSupabaseClient()

  try {
    const { error } = await supabase.from("product_types").delete().eq("id", id)

    if (error) throw error

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin/product-types")

    return { success: true }
  } catch (error) {
    console.error("Error deleting product type:", error)
    return { success: false, error }
  }
}

