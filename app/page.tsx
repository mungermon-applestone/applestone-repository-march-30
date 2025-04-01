import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { fetchDataWithFallback } from "@/lib/data-fetching"
import type { HeroSection, ProductType, BusinessGoal, Machine } from "@/types/database"
import { SectionHeader } from "@/components/section-header"
import { ProductCard } from "@/components/product-card"
import { CallToAction } from "@/components/call-to-action"
import { FeatureCheckList } from "@/components/feature-check-list"

// Dashboard features
const dashboardFeatures = [
  "Real-time sales and inventory data across all machines",
  "Customizable widgets and reports for your specific KPIs",
  "Anomaly detection to identify issues before they become problems",
  "Machine health monitoring with predictive maintenance alerts",
  "User role management with granular permission controls",
  "Mobile-responsive design for management on the go",
]

export default async function Home() {
  // Fetch hero section data
  const heroData = await fetchDataWithFallback<HeroSection>("hero_section", {
    single: true,
  })

  // Fetch product types
  const productTypes = await fetchDataWithFallback<ProductType[]>("product_types", {
    order: { column: "id", ascending: true },
    limit: 4,
  })

  // Fetch business goals
  const businessGoals = await fetchDataWithFallback<BusinessGoal[]>("business_goals", {
    order: { column: "id", ascending: true },
    limit: 4,
  })

  // Fetch machines
  const machines = await fetchDataWithFallback<Machine[]>("machines", {
    order: { column: "id", ascending: true },
    limit: 4,
  })

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{heroData.title}</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">{heroData.description}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href={heroData.button_link} className="flex items-center">
                    {heroData.button_text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {heroData.secondary_button_text && heroData.secondary_button_link && (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={heroData.secondary_button_link}>{heroData.secondary_button_text}</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src={heroData.image_url || "/placeholder.svg"}
                width={550}
                height={550}
                alt="Vending machine software dashboard"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Types Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Types of Products You Can Sell"
            description="Our vending software can sell many types of products and can be used by vending operators, enterprises, SMBs, and brands."
          />

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {productTypes.map((productType) => (
              <ProductCard
                key={productType.id}
                title={productType.title}
                description={productType.description}
                imageUrl={productType.image_url}
                learnMoreUrl={`/products/${productType.slug}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/products">View All Product Types</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Business Goals Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Achieve Your Business Goals"
            description="Our vending machine software helps you achieve your business goals with powerful features and insights."
          />

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {businessGoals.map((goal) => (
              <ProductCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                imageUrl={goal.image_url}
                learnMoreUrl={`/business-goals/${goal.slug}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/business-goals">View All Business Goals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Machines Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Our Vending Machines"
            description="Explore our range of vending machines designed for different products and environments."
          />

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {machines.map((machine) => (
              <ProductCard
                key={machine.id}
                title={machine.name}
                description={machine.description}
                imageUrl={machine.image_url}
                learnMoreUrl={`/machines/${machine.id}`}
                badge={
                  machine.status
                    ? {
                        text: machine.status,
                        variant:
                          machine.status === "Active"
                            ? "success"
                            : machine.status === "Maintenance"
                              ? "warning"
                              : "default",
                      }
                    : undefined
                }
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link href="/machines">View All Machines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Our Technology"
            description="Cutting-edge vending machine software built for reliability, security, and scalability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Cloud-Based Platform */}
            <div className="bg-background p-6 rounded-lg border">
              <div className="bg-muted h-[200px] mb-6 rounded-md flex items-center justify-center">
                <span className="text-3xl text-muted-foreground">+</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Cloud-Based Platform</h3>
              <p className="text-muted-foreground mb-4">Manage your vending machines from anywhere in the world.</p>
              <FeatureCheckList features={["Real-time monitoring", "Automatic updates", "Secure data storage"]} />
            </div>

            {/* IoT Connectivity */}
            <div className="bg-background p-6 rounded-lg border">
              <div className="bg-muted h-[200px] mb-6 rounded-md flex items-center justify-center">
                <span className="text-3xl text-muted-foreground">+</span>
              </div>
              <h3 className="text-xl font-bold mb-3">IoT Connectivity</h3>
              <p className="text-muted-foreground mb-4">Revolutionary technology for reliable machine communication.</p>
              <FeatureCheckList
                features={["Multiple connectivity options", "Low power operation", "Cellular backup"]}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link href="/technology">Learn More About Our Technology</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <SectionHeader
                title="Powerful Management Dashboard"
                description="Get a complete view of your entire vending operation in one intuitive interface."
                centered={false}
              />
              {/* Feature list with checkmarks */}
              <FeatureCheckList features={dashboardFeatures} />
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard-demo" className="flex items-center">
                    See Dashboard Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Software dashboard"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Transform Your Vending Operations?"
        description="Join hundreds of vending operators who have revolutionized their business with our software."
        primaryButtonText="Request Demo"
        primaryButtonUrl="/request-demo"
        secondaryButtonText="View Pricing"
        secondaryButtonUrl="/pricing"
        variant="primary"
      />
    </>
  )
}

