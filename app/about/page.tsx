import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHeader
        pageKey="about"
        defaultTitle="About AppleStone Solutions"
        defaultDescription="We're revolutionizing the vending industry with innovative software solutions."
      />

      {/* Our Story Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                <p className="text-muted-foreground md:text-xl">
                  Founded in 2018, AppleStone Solutions was born from a simple observation: vending machine operators
                  were struggling with fragmented, outdated software that couldn't keep up with modern retail demands.
                </p>
                <p className="text-muted-foreground md:text-xl mt-4">
                  Our founders, with backgrounds in both retail technology and vending operations, set out to create a
                  unified platform that could work with any machine from any manufacturer, giving operators complete
                  control and visibility over their entire fleet.
                </p>
                <p className="text-muted-foreground md:text-xl mt-4">
                  Today, we serve hundreds of vending operators across North America, helping them increase revenue,
                  reduce costs, and deliver better experiences to their customers.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="AppleStone Solutions team"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The principles that guide everything we do.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Customer Success",
                description:
                  "We're only successful when our customers are successful. We measure our performance by the results we deliver for them.",
              },
              {
                title: "Innovation",
                description:
                  "We're constantly pushing the boundaries of what's possible in vending technology, always looking for better ways to solve problems.",
              },
              {
                title: "Reliability",
                description:
                  "Our customers depend on our platform to run their businesses. We take that responsibility seriously with a commitment to uptime and performance.",
              },
              {
                title: "Transparency",
                description: "We believe in open, honest communication with our customers, partners, and each other.",
              },
              {
                title: "Inclusivity",
                description:
                  "We're building technology for everyone, and we believe diverse perspectives make our solutions better.",
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to reducing the environmental impact of vending operations through efficient routing and energy management.",
              },
            ].map((value, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg border">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Leadership Team</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet the people driving our mission forward.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                title: "CEO & Co-Founder",
                bio: "Former VP of Technology at RetailTech with 15+ years of experience in retail software.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Chen",
                title: "CTO & Co-Founder",
                bio: "Previously led engineering at VendCorp, with expertise in IoT and cloud architecture.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Rodriguez",
                title: "COO",
                bio: "20+ years of operations experience in the vending industry, former owner of a regional vending company.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Lisa Patel",
                title: "VP of Product",
                bio: "Product leader with experience at multiple successful SaaS companies in the retail space.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "James Wilson",
                title: "VP of Sales",
                bio: "Brings 12+ years of enterprise sales experience in B2B software and hardware solutions.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Emma Garcia",
                title: "VP of Customer Success",
                bio: "Dedicated to ensuring our customers get maximum value from our platform.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((person, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{person.name}</h3>
                <p className="text-sm text-primary mb-2">{person.title}</p>
                <p className="text-sm text-muted-foreground">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're always looking for talented people to help us build the future of vending technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/careers">View Open Positions</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

