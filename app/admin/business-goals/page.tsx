import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

export default async function BusinessGoalsPage() {
  const supabase = createServerSupabaseClient()

  const { data: businessGoals, error } = await supabase
    .from("business_goals")
    .select("*")
    .order("title", { ascending: true })

  if (error) {
    console.error("Error fetching business goals:", error)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Business Goals</h1>
        <Button asChild>
          <Link href="/admin/business-goals/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      {businessGoals && businessGoals.length > 0 ? (
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
              {businessGoals.map((goal) => (
                <tr key={goal.id} className="border-t">
                  <td className="p-3">{goal.title}</td>
                  <td className="p-3">{goal.slug}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/business-goals/${goal.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={`/admin/business-goals/delete?id=${goal.id}`} method="POST">
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
          <p className="text-muted-foreground mb-4">No business goals found</p>
          <Button asChild>
            <Link href="/admin/business-goals/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Business Goal
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

