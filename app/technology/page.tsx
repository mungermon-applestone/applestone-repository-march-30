import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TechnologyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Our Technology</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Cutting-edge vending machine software built for reliability, security, and scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Platform Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Cloud-Based Platform</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our cloud-based platform provides real-time access to your vending machine data from anywhere in the
                  world.
                </p>
              </div>
              <ul className="grid gap-4">
                {[
                  "99.9% uptime guarantee with redundant infrastructure",
                  "Automatic updates and feature rollouts",
                  "Secure data storage with encryption at rest and in transit",
                  "Scalable architecture that grows with your business",
                  "API-first design for easy integration with other systems",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Cloud platform architecture"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* IoT Connectivity Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="IoT connectivity diagram"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">IoT Connectivity</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our machines use advanced IoT technology to stay connected and provide real-time data and control.
                </p>
              </div>
              <ul className="grid gap-4">
                {[
                  "Cellular, Wi-Fi, and Ethernet connectivity options",
                  "Low-power operation for extended battery life",
                  "Automatic failover between connection types",
                  "Remote firmware updates and configuration",
                  "Secure communication with end-to-end encryption",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Enterprise-Grade Security</h2>
                <p className="text-muted-foreground md:text-xl">
                  We take security seriously with multiple layers of protection for your data and operations.
                </p>
              </div>
              <ul className="grid gap-4">
                {[
                  "SOC 2 Type II certified infrastructure",
                  "Role-based access control with multi-factor authentication",
                  "Encryption of all data at rest and in transit",
                  "Regular security audits and penetration testing",
                  "Compliance with PCI DSS for payment processing",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      ✓
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Security infrastructure"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to See Our Technology in Action?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Schedule a demo to see how our technology can transform your vending operations.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/request-demo">Request Demo</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/technology/documentation">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

