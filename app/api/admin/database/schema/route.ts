import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = createServerSupabaseClient()

    // Read schema SQL
    const schemaPath = path.join(process.cwd(), "lib/database/schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    // Execute schema SQL
    const { error } = await supabase.rpc("exec_sql", { sql: schemaSql })

    if (error) {
      console.error("Error executing schema SQL:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error creating database schema:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

