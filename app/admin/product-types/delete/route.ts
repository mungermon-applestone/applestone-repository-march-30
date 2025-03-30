import { type NextRequest, NextResponse } from "next/server"
import { deleteProductType } from "../actions"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const idParam = url.searchParams.get("id")

    if (!idParam) {
      return NextResponse.json({ error: "Product type ID is required" }, { status: 400 })
    }

    const id = Number.parseInt(idParam, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product type ID" }, { status: 400 })
    }

    await deleteProductType(id)

    // Revalidate paths
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin/product-types")

    // Redirect back to the product types page
    return NextResponse.redirect(new URL("/admin/product-types", request.url))
  } catch (error) {
    console.error("Error deleting product type:", error)
    return NextResponse.json({ error: "Failed to delete product type" }, { status: 500 })
  }
}

