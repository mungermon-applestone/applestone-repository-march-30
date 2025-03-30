import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const blogPosts = [
  {
    id: "new-payment-options",
    title: "New Payment Options Added",
    excerpt: "We've added support for Apple Pay, Google Pay, and other digital wallet solutions to our platform.",
    date: "March 15, 2023",
    author: "Sarah Johnson",
    category: "Product Updates",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "inventory-management-upgrade",
    title: "Major Upgrade to Inventory Management",
    excerpt: "Our latest update includes AI-powered inventory predictions and improved expiration tracking.",
    date: "February 28, 2023",
    author: "Michael Chen",
    category: "Product Updates",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "new-machine-integrations",
    title: "New Machine Integrations Available",
    excerpt: "We've added support for five new vending machine models from leading manufacturers.",
    date: "February 10, 2023",
    author: "David Rodriguez",
    category: "Integrations",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "case-study-metro-vending",
    title: "Case Study: Metro Vending Increases Revenue by 28%",
    excerpt: "Learn how Metro Vending used our platform to dramatically increase their revenue and reduce costs.",
    date: "January 22, 2023",
    author: "Emily Wilson",
    category: "Case Studies",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "security-enhancements",
    title: "Security Enhancements to Our Platform",
    excerpt: "We've implemented new security measures to keep your data and transactions safe.",
    date: "January 15, 2023",
    author: "James Lee",
    category: "Security",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "mobile-app-release",
    title: "New Mobile App Now Available",
    excerpt: "Our new mobile app allows you to manage your vending operations from anywhere.",
    date: "December 5, 2022",
    author: "Sarah Johnson",
    category: "Product Updates",
    image: "/placeholder.svg?height=300&width=600",
  },
]

export default function UpdatesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Product Updates</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Stay up to date with the latest features, improvements, and news about our vending management platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                width={600}
                height={300}
                alt={blogPosts[0].title}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{blogPosts[0].date}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm font-medium text-primary">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground md:text-lg">{blogPosts[0].excerpt}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div>
                  <p className="text-sm font-medium">{blogPosts[0].author}</p>
                </div>
              </div>
              <Link href={`/updates/${blogPosts[0].id}`} className="inline-flex items-center text-primary font-medium">
                Read more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post) => (
              <div key={post.id} className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-primary">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="rounded-full bg-muted h-8 w-8"></div>
                    <p className="text-xs font-medium">{post.author}</p>
                  </div>
                  <Link
                    href={`/updates/${post.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground md:text-lg">
                Get the latest updates, news, and special offers delivered directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

