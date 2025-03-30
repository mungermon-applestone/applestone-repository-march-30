import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

export default async function MachinesPage() {
  const supabase = createServerSupabaseClient()

  const { data: machines, error } = await supabase.from("machines").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching machines:", error)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Machines</h1>
        <Button asChild>
          <Link href="/admin/machines/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      {machines && machines.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine.id} className="border-t">
                  <td className="p-3">{machine.name}</td>
                  <td className="p-3">{machine.category}</td>
                  <td className="p-3">{machine.location}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        machine.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : machine.status === "Maintenance"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {machine.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/machines/${machine.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={`/admin/machines/delete?id=${machine.id}`} method="POST">
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
          <p className="text-muted-foreground mb-4">No machines found</p>
          <Button asChild>
            <Link href="/admin/machines/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Machine
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

