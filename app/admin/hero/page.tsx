import { createServerSupabaseClient } from "@/lib/supabase"
import HeroForm from "./hero-form"

export default async function HeroAdminPage() {
  const supabase = createServerSupabaseClient()

  // Fetch existing hero data
  const { data: heroData, error } = await supabase
    .from("hero_section")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching hero data:", error)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Hero Section</h1>
      <HeroForm initialData={heroData || undefined} />
    </div>
  )
}

