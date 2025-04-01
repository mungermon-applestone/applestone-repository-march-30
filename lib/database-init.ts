/**
 * Database Initialization Script
 *
 * This script initializes the database with the necessary tables and seed data
 * if they don't already exist.
 */

import { createServerSupabaseClient } from "@/lib/supabase"
import fs from "fs"
import path from "path"

/**
 * Initialize the database
 */
export async function initializeDatabase(): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Check if the database has been initialized
    const { data: settings, error: settingsError } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "db_initialized")
      .single()

    if (!settingsError && settings?.value === "true") {
      console.log("Database already initialized")
      return true
    }

    console.log("Initializing database...")

    // Read schema SQL
    const schemaPath = path.join(process.cwd(), "lib/database/schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    // Execute schema SQL
    const { error: schemaError } = await supabase.rpc("exec_sql", { sql: schemaSql })

    if (schemaError) {
      console.error("Error executing schema SQL:", schemaError)
      return false
    }

    // Read seed SQL
    const seedPath = path.join(process.cwd(), "lib/database/seed.sql")
    const seedSql = fs.readFileSync(seedPath, "utf8")

    // Execute seed SQL
    const { error: seedError } = await supabase.rpc("exec_sql", { sql: seedSql })

    if (seedError) {
      console.error("Error executing seed SQL:", seedError)
      return false
    }

    // Mark database as initialized
    const { error: markError } = await supabase.from("settings").upsert({
      key: "db_initialized",
      value: "true",
      description: "Flag indicating if the database has been initialized",
    })

    if (markError) {
      console.error("Error marking database as initialized:", markError)
      return false
    }

    console.log("Database initialized successfully")
    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
  }
}

