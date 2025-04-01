import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = createServerSupabaseClient()

    // Read seed SQL
    const seedPath = path.join(process.cwd(), "lib/database/seed.sql")
    const seedSql = fs.readFileSync(seedPath, "utf8")

    // Execute seed SQL
    const { error } = await supabase.rpc("exec_sql", { sql: seedSql })

    if (error) {
      console.error("Error executing seed SQL:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

