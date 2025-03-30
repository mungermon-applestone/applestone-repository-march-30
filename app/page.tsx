import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { ProductTypesPreview } from "@/components/product-types-preview"
import { BusinessGoalsPreview } from "@/components/business-goals-preview"
import { MachinesPreview } from "@/components/machines-preview"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Product Types Preview */}
      <ProductTypesPreview />

      {/* Business Goals Preview */}
      <BusinessGoalsPreview />

      {/* Machines Preview */}
      <MachinesPreview />

      {/* Dashboard Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Management Dashboard
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Get a complete view of your entire vending operation in one intuitive interface.
                </p>
              </div>
              <ul className="grid gap-4">
                {[
                  "Real-time sales and inventory data across all machines",
                  "Customizable widgets and reports for your specific KPIs",
                  "Anomaly detection to identify issues before they become problems",
                  "Machine health monitoring with predictive maintenance alerts",
                  "User role management with granular permission controls",
                  "Mobile-responsive design for management on the go",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button size="lg">
                  See Dashboard Demo <ArrowRight className="ml-2 h-4 w-4" />
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Vending Operations?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join hundreds of vending operators who have revolutionized their business with our software.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary">
                Request Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

