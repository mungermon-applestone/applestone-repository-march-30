"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About AppleStone Solutions</h1>
      <p className="text-xl mb-8">We're revolutionizing the vending industry with innovative software solutions.</p>

      {/* Our Story Section */}
      <div className="mb-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
              <p className="text-gray-600 md:text-xl">
                Founded in 2018, AppleStone Solutions was born from a simple observation: vending machine operators were
                struggling with fragmented, outdated software that couldn't keep up with modern retail demands. Our
                founders, with backgrounds in both retail technology and vending operations, set out to create a unified
                platform that could work with any machine from any manufacturer, giving operators complete control and
                visibility over their entire fleet. Today, we serve hundreds of vending operators across North America,
                helping them increase revenue, reduce costs, and deliver better experiences to their customers.
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

      {/* Our Values Section */}
      <div className="mb-12 bg-gray-100 p-8 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The principles that guide everything we do.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          ].map((value, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg border">
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Leadership Team</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Meet the people driving our mission forward.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Co-Founder",
              bio: "Former VP of Technology at RetailTech with 15+ years of experience in retail software.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Michael Chen",
              role: "CTO & Co-Founder",
              bio: "Previously led engineering at VendCorp, with expertise in IoT and cloud architecture.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "David Rodriguez",
              role: "COO",
              bio: "20+ years of operations experience in the vending industry, former owner of a regional vending company.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Lisa Patel",
              role: "VP of Product",
              bio: "Product leader with experience at multiple successful SaaS companies in the retail space.",
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
              <p className="text-sm text-blue-600 mb-2">{person.role}</p>
              <p className="text-sm text-gray-600">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-xl mb-6">
          We're always looking for talented people to help us build the future of vending technology.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary">
            <Link href="/careers">View Open Positions</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

