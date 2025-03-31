import { fetchData } from "@/lib/supabase-client"

/**
 * Generic function to fetch all records from a table
 */
export async function fetchAllRecords<T>(tableName: string, orderBy = "id"): Promise<T[]> {
  const data = await fetchData<T[]>(tableName as any, {
    order: { column: orderBy, ascending: true },
  })

  return data || []
}

/**
 * Generic function to fetch a single record by ID
 */
export async function fetchRecordById<T>(tableName: string, id: number): Promise<T | null> {
  return await fetchData<T>(tableName as any, {
    eq: { column: "id", value: id },
    single: true,
  })
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

