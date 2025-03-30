import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

export default async function ProductTypesPage() {
  const supabase = createServerSupabaseClient()

  const { data: productTypes, error } = await supabase
    .from("product_types")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("Error fetching product types:", error)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Types</h1>
        <Button asChild>
          <Link href="/admin/product-types/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      {productTypes && productTypes.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productTypes.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-3">{product.title}</td>
                  <td className="p-3">{product.slug}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/product-types/${product.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={`/admin/product-types/delete?id=${product.id}`} method="POST">
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-12 border rounded-md bg-muted/20">
          <p className="text-muted-foreground mb-4">No product types found</p>
          <Button asChild>
            <Link href="/admin/product-types/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Product Type
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

