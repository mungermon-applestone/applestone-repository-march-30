import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"
import { formatDate } from "@/lib/content-utils"
import { PageHeader } from "@/components/page-header"
import { unstable_noStore as noStore } from "next/cache"

// Define the type for our updates data
interface Update {
  id: number
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  slug: string
  image_url?: string
}

// Fetch updates from Supabase
async function getUpdates(): Promise<Update[]> {
  // Disable caching
  noStore()

  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("updates").select("*").order("date", { ascending: false })

    if (error || !data || data.length === 0) {
      console.log("No updates found")
      return []
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: item.date,
      category: item.category,
      slug: item.slug || `update-${item.id}`,
      image_url: item.image_url,
    }))
  } catch (error) {
    console.error("Error fetching updates:", error)
    return []
  }
}

export default async function UpdatesPage() {
  const updates = await getUpdates()

  return (
    <>
      {/* Hero Section */}
      <PageHeader
        pageKey="updates"
        defaultTitle="Updates & News"
        defaultDescription="Stay up to date with the latest product updates, company news, and industry insights."
      />

      {/* Updates List */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {updates.length > 0 ? (
            <div className="grid gap-8">
              {updates.map((update) => (
                <div key={update.id} className="group relative overflow-hidden rounded-lg border bg-background p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {update.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDate(update.date)}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{update.title}</h3>
                    <p className="text-muted-foreground">{update.excerpt}</p>
                    <div className="pt-4">
                      <Link
                        href={`/updates/${update.slug}`}
                        className="inline-flex items-center text-sm font-medium text-primary"
                      >
                        Read more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <p className="text-muted-foreground">No updates found. Check back later for news and updates.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Subscribe to Our Newsletter</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the latest updates delivered directly to your inbox.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

