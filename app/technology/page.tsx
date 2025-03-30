import Image from "next/image"
import { Database, Shield, Zap, Layers, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TechnologyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Our Technology</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The technical foundation that powers our vending management platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Architecture</h2>
                <p className="text-muted-foreground md:text-lg">
                  Our platform is built on a modern, scalable architecture designed for reliability and performance.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Open Standards</p>
                    <p className="text-sm text-muted-foreground">
                      We use industry-standard protocols and formats to ensure compatibility and future-proofing.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Hardware Agnostic</p>
                    <p className="text-sm text-muted-foreground">
                      Our software works with vending machines and kiosks from all major manufacturers through
                      standardized interfaces.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Cloud-Native Design</p>
                    <p className="text-sm text-muted-foreground">
                      Built for the cloud with containerization, microservices, and auto-scaling capabilities.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="System architecture diagram"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Security features illustration"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Security</h2>
                <p className="text-muted-foreground md:text-lg">
                  We prioritize the security of your data and transactions with industry-leading practices.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">End-to-End Encryption</p>
                    <p className="text-sm text-muted-foreground">
                      All data is encrypted in transit and at rest using industry-standard encryption protocols.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Privacy by Design</p>
                    <p className="text-sm text-muted-foreground">
                      Our platform is built with privacy considerations at every level, ensuring compliance with
                      regulations like GDPR and CCPA.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Regular Security Audits</p>
                    <p className="text-sm text-muted-foreground">
                      We conduct regular penetration testing and security audits to identify and address potential
                      vulnerabilities.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Third-Party Integrations</h2>
                <p className="text-muted-foreground md:text-lg">
                  Our platform connects seamlessly with the tools and services you already use.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Payment Processors</p>
                    <p className="text-sm text-muted-foreground">
                      Integrate with all major payment processors for credit card, mobile, and contactless payments.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Accounting Software</p>
                    <p className="text-sm text-muted-foreground">
                      Sync sales and inventory data with popular accounting platforms like QuickBooks and Xero.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">CRM Systems</p>
                    <p className="text-sm text-muted-foreground">
                      Connect customer data with your CRM for a unified view of customer interactions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Integration partners"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payments Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Payment processing illustration"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Payments</h2>
                <p className="text-muted-foreground md:text-lg">
                  Our platform supports a wide range of payment options to maximize sales opportunities.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Cashless Payments</p>
                    <p className="text-sm text-muted-foreground">
                      Accept credit cards, mobile payments, and contactless transactions with integrated payment
                      terminals.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Digital Wallets</p>
                    <p className="text-sm text-muted-foreground">
                      Support for Apple Pay, Google Pay, and other popular digital wallet solutions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Loyalty Programs</p>
                    <p className="text-sm text-muted-foreground">
                      Integrate with loyalty programs and offer promotions to drive repeat business.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Inventory Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Database className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Live Inventory</h2>
                <p className="text-muted-foreground md:text-lg">
                  Real-time inventory tracking and management across your entire machine fleet.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Real-Time Monitoring</p>
                    <p className="text-sm text-muted-foreground">
                      Track inventory levels across all machines in real-time with automated alerts for low stock.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Predictive Stocking</p>
                    <p className="text-sm text-muted-foreground">
                      AI-powered predictions help optimize restocking schedules based on historical sales data.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Expiration Tracking</p>
                    <p className="text-sm text-muted-foreground">
                      Monitor product freshness and receive alerts for items approaching expiration dates.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Live inventory dashboard"
                className="rounded-lg object-cover"
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
                Ready to See Our Technology in Action?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Schedule a demo to see how our platform can transform your vending operations.
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
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

