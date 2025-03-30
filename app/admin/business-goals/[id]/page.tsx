import { createServerSupabaseClient } from "@/lib/supabase"
import BusinessGoalForm from "../business-goal-form"
import { notFound } from "next/navigation"

export default async function EditBusinessGoalPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: businessGoal, error } = await supabase.from("business_goals").select("*").eq("id", params.id).single()

  if (error || !businessGoal) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Business Goal</h1>
      <BusinessGoalForm initialData={businessGoal} />
    </div>
  )
}

