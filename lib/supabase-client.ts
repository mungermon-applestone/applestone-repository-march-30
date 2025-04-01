import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Error messages
const MISSING_ENV_VARS = "Missing Supabase environment variables"
const SERVER_INIT_ERROR = "Failed to initialize Supabase server client"
const CLIENT_INIT_ERROR = "Failed to initialize Supabase browser client"

/**
 * Singleton pattern for client-side Supabase client
 */
let browserClient: SupabaseClient | null = null

/**
 * Creates a Supabase client for server components with admin privileges
 * @returns Supabase client instance
 * @throws Error if environment variables are missing
 */
export function createServerClient(): SupabaseClient {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(MISSING_ENV_VARS)
    }

    return createClient(supabaseUrl, supabaseServiceKey)
  } catch (error) {
    console.error("Supabase server client initialization error:", error)
    throw new Error(SERVER_INIT_ERROR)
  }
}

/**
 * Creates or returns a singleton Supabase client for client components
 * @returns Supabase client instance
 * @throws Error if environment variables are missing
 */
export function createBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(MISSING_ENV_VARS)
    }

    browserClient = createClient(supabaseUrl, supabaseAnonKey)
    return browserClient
  } catch (error) {
    console.error("Supabase browser client initialization error:", error)
    throw new Error(CLIENT_INIT_ERROR)
  }
}

/**
 * Generic function to safely fetch data from Supabase
 * @param tableName The table to query
 * @param options Query options
 * @param fetchOptions Options for Next.js fetch caching
 * @returns The fetched data or null if an error occurred
 */
export async function fetchData<T>(
  tableName: keyof Database,
  options: {
    columns?: string
    eq?: { column: string; value: any }
    order?: { column: string; ascending?: boolean }
    limit?: number
    single?: boolean
  } = {},
  fetchOptions?: { cache: "force-cache" | "no-store" } | { next: { revalidate: number } },
): Promise<T | null> {
  try {
    const supabase = createServerClient()

    let query = supabase.from(tableName).select(options.columns || "*")

    if (options.eq) {
      query = query.eq(options.eq.column, options.eq.value)
    }

    if (options.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending ?? true })
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = options.single ? await query.single() : await query

    if (error) {
      console.error(`Error fetching from ${String(tableName)}:`, error)
      return null
    }

    return data as unknown as T
  } catch (error) {
    console.error(`Error in fetchData for ${String(tableName)}:`, error)
    return null
  }
}

