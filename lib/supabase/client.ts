import { createClient } from "@supabase/supabase-js"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchFromSupabase(
  table: string,
  options: {
    column?: string
    value?: string
    select?: string
    isSingle?: boolean
    order?: { column: string; ascending?: boolean }
    limit?: number
  },
) {
  try {
    const { column, value, select = "*", isSingle = false, order, limit } = options

    let query = supabase.from(table).select(select)

    if (column && value !== undefined) {
      query = query.eq(column, value)
    }

    if (order) {
      query = query.order(order.column, { ascending: order.ascending ?? true })
    }

    if (limit) {
      query = query.limit(limit)
    }

    // Use maybeSingle() instead of single() to handle cases where no rows are found
    const { data, error } = isSingle ? await query.maybeSingle() : await query

    if (error) throw new Error(`Error fetching from ${table}: ${error.message}`)

    return { data, error: null }
  } catch (error: any) {
    console.error(`Error in fetchFromSupabase:`, error)
    return { data: null, error: error.message }
  }
}

// Function to get table schema
export async function getTableColumns(tableName: string) {
  try {
    const { data, error } = await supabase.from("_metadata").select("columns").eq("table", tableName).single()

    if (error) {
      console.error(`Error fetching schema for ${tableName}:`, error)
      return null
    }

    return data?.columns || null
  } catch (error) {
    console.error(`Error in getTableColumns:`, error)
    return null
  }
}

