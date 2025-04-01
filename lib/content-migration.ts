/**
 * Content Migration Utility
 *
 * This utility helps migrate static content to the database.
 * It provides functions to check if content exists in the database,
 * and to migrate static content if it doesn't.
 */

import { createServerSupabaseClient } from "@/lib/supabase"
import type { Database } from "@/types/database"

/**
 * Check if content exists in a specific table
 */
export async function contentExists(table: keyof Database, identifier: Record<string, any>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Build query based on identifier
    let query = supabase.from(table).select("id")

    // Add filters for each identifier key
    Object.entries(identifier).forEach(([key, value]) => {
      query = query.eq(key, value)
    })

    const { data, error } = await query.limit(1)

    if (error) {
      console.error(`Error checking if content exists in ${table}:`, error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error(`Error in contentExists for ${table}:`, error)
    return false
  }
}

/**
 * Migrate static content to the database if it doesn't exist
 */
export async function migrateContentIfNeeded<T extends Record<string, any>>(
  table: keyof Database,
  identifier: Record<string, any>,
  content: T,
): Promise<boolean> {
  try {
    const exists = await contentExists(table, identifier)

    if (exists) {
      console.log(`Content already exists in ${table} with identifier:`, identifier)
      return true
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from(table).insert([content])

    if (error) {
      console.error(`Error migrating content to ${table}:`, error)
      return false
    }

    console.log(`Successfully migrated content to ${table}:`, data)
    return true
  } catch (error) {
    console.error(`Error in migrateContentIfNeeded for ${table}:`, error)
    return false
  }
}

/**
 * Update existing content in the database
 */
export async function updateContent<T extends Record<string, any>>(
  table: keyof Database,
  identifier: Record<string, any>,
  content: Partial<T>,
): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Build query based on identifier
    let query = supabase.from(table).update(content)

    // Add filters for each identifier key
    Object.entries(identifier).forEach(([key, value]) => {
      query = query.eq(key, value)
    })

    const { data, error } = await query

    if (error) {
      console.error(`Error updating content in ${table}:`, error)
      return false
    }

    console.log(`Successfully updated content in ${table}:`, data)
    return true
  } catch (error) {
    console.error(`Error in updateContent for ${table}:`, error)
    return false
  }
}

/**
 * Delete content from the database
 */
export async function deleteContent(table: keyof Database, identifier: Record<string, any>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Build query based on identifier
    let query = supabase.from(table).delete()

    // Add filters for each identifier key
    Object.entries(identifier).forEach(([key, value]) => {
      query = query.eq(key, value)
    })

    const { error } = await query

    if (error) {
      console.error(`Error deleting content from ${table}:`, error)
      return false
    }

    console.log(`Successfully deleted content from ${table} with identifier:`, identifier)
    return true
  } catch (error) {
    console.error(`Error in deleteContent for ${table}:`, error)
    return false
  }
}

