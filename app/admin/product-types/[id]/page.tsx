import { createServerSupabaseClient } from "@/lib/supabase"
import ProductTypeForm from "../product-type-form"
import { notFound } from "next/navigation"

export default async function EditProductTypePage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: productType, error } = await supabase.from("product_types").select("*").eq("id", params.id).single()

  if (error || !productType) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product Type</h1>
      <ProductTypeForm initialData={productType} />
    </div>
  )
}

