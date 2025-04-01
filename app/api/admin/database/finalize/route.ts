import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = createServerSupabaseClient()

    // Mark database as initialized
    const { error } = await supabase.from("settings").upsert({
      key: "db_initialized",
      value: "true",
      description: "Flag indicating if the database has been initialized",
    })

    if (error) {
      console.error("Error marking database as initialized:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error finalizing database migration:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

