import { createServerSupabaseClient } from "@/lib/supabase"
import MachineForm from "../machine-form"
import { notFound } from "next/navigation"

export default async function EditMachinePage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: machine, error } = await supabase.from("machines").select("*").eq("id", params.id).single()

  if (error || !machine) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Machine</h1>
      <MachineForm initialData={machine} />
    </div>
  )
}

