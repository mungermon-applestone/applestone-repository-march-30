import { createClient } from "@supabase/supabase-js"

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Client-side Supabase client (uses anon key)
let clientSideSupabaseClient: ReturnType<typeof createClient> | null = null

export function createClientSupabaseClient() {
  if (clientSideSupabaseClient) return clientSideSupabaseClient

  clientSideSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return clientSideSupabaseClient
}

// Server-side Supabase client (uses service role key for admin operations)
export function createServerSupabaseClient() {
  // For server components, create a new client each time
  // This is because server components are executed on the server
  // and don't maintain state between requests
  return createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey)
}

// Check if we should use fallback data
export const useFallbackData = process.env.USE_FALLBACK_DATA === "true"

