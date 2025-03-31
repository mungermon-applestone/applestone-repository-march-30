import { createServerSupabaseClient } from "@/lib/supabase"

/**
 * Generic function to fetch all records from a table
 */
export async function fetchAllRecords<T>(tableName: string, orderBy = "id"): Promise<T[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from(tableName).select("*").order(orderBy, { ascending: true })

    if (error) {
      console.error(`Error fetching ${tableName}:`, error)
      return []
    }

    return data as T[]
  } catch (error) {
    console.error(`Error in fetchAllRecords for ${tableName}:`, error)
    return []
  }
}

/**
 * Generic function to fetch a single record by ID
 */
export async function fetchRecordById<T>(tableName: string, id: number): Promise<T | null> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single()

    if (error) {
      console.error(`Error fetching ${tableName} with id ${id}:`, error)
      return null
    }

    return data as T
  } catch (error) {
    console.error(`Error in fetchRecordById for ${tableName}:`, error)
    return null
  }
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
}

/**
 * Format a date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

