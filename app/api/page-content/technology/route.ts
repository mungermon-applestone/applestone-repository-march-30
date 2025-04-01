import { NextResponse } from "next/server"

// Static fallback data
const technologyPageContent = {
  title: "Our Technology",
  description: "Cutting-edge vending machine software built for reliability, security, and scalability.",
  sections: [
    {
      title: "Cloud-Based Management",
      description:
        "Our cloud-based management system allows you to monitor and manage your vending machines from anywhere in the world.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        {
          icon: "activity",
          title: "Real-time Monitoring",
          description: "Track sales, inventory, and machine status in real-time",
        },
        {
          icon: "settings",
          title: "Remote Management",
          description: "Update prices, products, and settings remotely",
        },
        {
          icon: "bell",
          title: "Automated Alerts",
          description: "Receive notifications for low inventory, maintenance needs, or unusual activity",
        },
      ],
    },
    {
      title: "IoT Connectivity",
      description: "Our machines use advanced IoT technology to stay connected and provide real-time data and control.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        {
          icon: "wifi",
          title: "Multiple connectivity options",
          description: "Cellular, Wi-Fi, and Ethernet",
        },
        {
          icon: "battery",
          title: "Low-power operation",
          description: "Extended battery life",
        },
        {
          icon: "shield",
          title: "Secure communication",
          description: "End-to-end encryption",
        },
      ],
    },
    {
      title: "Enterprise-Grade Security",
      description: "We take security seriously with multiple layers of protection for your data and operations.",
      image: "/placeholder.svg?height=400&width=600",
      features: [
        {
          icon: "check-circle",
          title: "SOC 2 Type II certified",
          description: "Enterprise-grade security",
        },
        {
          icon: "users",
          title: "Role-based access control",
          description: "With multi-factor authentication",
        },
        {
          icon: "shield-check",
          title: "Regular security audits",
          description: "Penetration testing and compliance checks",
        },
      ],
    },
  ],
}

export async function GET() {
  // Simply return the static data
  return NextResponse.json(technologyPageContent)
}

