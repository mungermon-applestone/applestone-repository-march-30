import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"

// This would normally come from a CMS or database
const blogPosts = {
  "new-payment-options": {
    title: "New Payment Options Added",
    excerpt: "We've added support for Apple Pay, Google Pay, and other digital wallet solutions to our platform.",
    date: "March 15, 2023",
    author: "Sarah Johnson",
    category: "Product Updates",
    image: "/placeholder.svg?height=400&width=800",
    content: `
      <p>We're excited to announce that we've expanded our payment options to include Apple Pay, Google Pay, and other popular digital wallet solutions. This update makes it even easier for your customers to make purchases at your vending machines.</p>
      
      <h2>New Payment Options</h2>
      
      <p>The following payment methods are now supported:</p>
      
      <ul>
        <li>Apple Pay</li>
        <li>Google Pay</li>
        <li>Samsung Pay</li>
        <li>PayPal</li>
        <li>Venmo</li>
      </ul>
      
      <p>These new options complement our existing support for credit cards, debit cards, and contactless payments, giving your customers the flexibility to pay however they prefer.</p>
      
      <h2>Benefits for Operators</h2>
      
      <p>Adding these payment options can provide several benefits:</p>
      
      <ul>
        <li>Increased sales by catering to customer preferences</li>
        <li>Faster transaction times</li>
        <li>Reduced friction in the purchasing process</li>
        <li>Appeal to younger, tech-savvy consumers</li>
      </ul>
      
      <h2>Implementation</h2>
      
      <p>The new payment options are available immediately for all customers on our Enterprise and Premium plans. Standard plan customers can add these options for a small additional fee.</p>
      
      <p>To enable these new payment methods, simply log into your dashboard and navigate to Settings > Payment Methods. From there, you can toggle on the options you want to support.</p>
      
      <p>Our team is available to help with any questions or issues you might encounter during setup. Contact support at support@applestonesolutions.com for assistance.</p>
      
      <h2>What's Next</h2>
      
      <p>We're continuously working to expand our payment options and improve the purchasing experience. In the coming months, we'll be adding support for cryptocurrency payments and exploring other innovative payment solutions.</p>
      
      <p>Stay tuned for more updates!</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { postId: string } }) {
  const { postId } = params
  const post = blogPosts[postId as keyof typeof blogPosts] || {
    title: "Blog Post",
    excerpt: "This is a blog post.",
    date: "January 1, 2023",
    author: "Author Name",
    category: "Category",
    image: "/placeholder.svg?height=400&width=800",
    content: "<p>This blog post content is not available.</p>",
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Link href="/updates" className="inline-flex items-center text-primary mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Updates
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{post.category}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
              <p className="text-muted-foreground md:text-xl">{post.excerpt}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl prose prose-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-background h-16 w-16"></div>
              <div>
                <h3 className="text-lg font-bold">{post.author}</h3>
                <p className="text-muted-foreground">Product Manager at AppleStone Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Related post"
                    width={600}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">Major Upgrade to Inventory Management</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Our latest update includes AI-powered inventory predictions and improved expiration tracking.
                  </p>
                  <Link
                    href="/updates/inventory-management-upgrade"
                    className="mt-2 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read more
                  </Link>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Related post"
                    width={600}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">New Machine Integrations Available</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We've added support for five new vending machine models from leading manufacturers.
                  </p>
                  <Link
                    href="/updates/new-machine-integrations"
                    className="mt-2 inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

