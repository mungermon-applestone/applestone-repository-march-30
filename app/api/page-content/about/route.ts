import { NextResponse } from "next/server"

// Static fallback data
const aboutPageContent = {
  title: "About AppleStone Solutions",
  description: "We're revolutionizing the vending industry with innovative software solutions.",
  story: {
    text: "Founded in 2018, AppleStone Solutions was born from a simple observation: vending machine operators were struggling with fragmented, outdated software that couldn't keep up with modern retail demands. Our founders, with backgrounds in both retail technology and vending operations, set out to create a unified platform that could work with any machine from any manufacturer, giving operators complete control and visibility over their entire fleet. Today, we serve hundreds of vending operators across North America, helping them increase revenue, reduce costs, and deliver better experiences to their customers.",
    image: "/placeholder.svg?height=400&width=600",
  },
  values: [
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
  ],
  team: [
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
  ],
}

export async function GET() {
  // Simply return the static data
  return NextResponse.json(aboutPageContent)
}

