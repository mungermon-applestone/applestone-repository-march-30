import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"
import { formatDate } from "@/lib/content-utils"

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

// Default updates in case the database is empty
const defaultUpdates: Update[] = [
  {
    id: 1,
    title: "New Mobile App Release",
    excerpt:
      "We're excited to announce the release of our new mobile app for iOS and Android, making it easier than ever to manage your vending operations on the go.",
    date: "2023-03-15",
    category: "Product Update",
    slug: "new-mobile-app-release",
  },
  {
    id: 2,
    title: "Introducing AI-Powered Inventory Prediction",
    excerpt:
      "Our new AI-powered inventory prediction feature helps you optimize stock levels and reduce waste by predicting demand patterns.",
    date: "2023-02-22",
    category: "Feature Release",
    slug: "ai-powered-inventory-prediction",
  },
  {
    id: 3,
    title: "Partnership with PayQuick for Faster Payment Processing",
    excerpt:
      "We've partnered with PayQuick to offer faster, more reliable payment processing with lower transaction fees.",
    date: "2023-01-30",
    category: "Partnership",
    slug: "payquick-partnership",
  },
  {
    id: 4,
    title: "AppleStone Solutions Raises $12M in Series A Funding",
    excerpt:
      "We're thrilled to announce our $12M Series A funding round led by Venture Partners, which will help us accelerate product development and expand our team.",
    date: "2023-01-15",
    category: "Company News",
    slug: "series-a-funding",
  },
  {
    id: 5,
    title: "New Integration with QuickBooks for Seamless Accounting",
    excerpt:
      "Our new QuickBooks integration allows for automatic syncing of sales data, expenses, and inventory for streamlined accounting.",
    date: "2022-12-10",
    category: "Integration",
    slug: "quickbooks-integration",
  },
  {
    id: 6,
    title: "2022 Customer Success Stories",
    excerpt: "Read how our customers achieved remarkable results with our vending management platform in 2022.",
    date: "2022-12-01",
    category: "Case Study",
    slug: "2022-customer-success-stories",
  },
]

// Fetch updates from Supabase
async function getUpdates(): Promise<Update[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("updates").select("*").order("date", { ascending: false })

    if (error || !data || data.length === 0) {
      console.log("No updates found, using default")
      return defaultUpdates
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
    return defaultUpdates
  }
}

export default async function UpdatesPage() {
  const updates = await getUpdates()

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Updates & News</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay up to date with the latest product updates, company news, and industry insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Updates List */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8">
            {updates.map((update) => (
              <div key={update.id} className="group relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{update.category}</span>
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

