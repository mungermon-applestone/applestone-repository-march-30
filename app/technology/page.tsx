"use client"

import Link from "next/link"
import Image from "next/image"
import { Activity, Settings, Bell, Wifi, Battery, Shield, CheckCircle, Users, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

// Helper function to render the correct icon
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "activity":
      return <Activity className="h-5 w-5" />
    case "settings":
      return <Settings className="h-5 w-5" />
    case "bell":
      return <Bell className="h-5 w-5" />
    case "wifi":
      return <Wifi className="h-5 w-5" />
    case "battery":
      return <Battery className="h-5 w-5" />
    case "shield":
      return <Shield className="h-5 w-5" />
    case "check-circle":
      return <CheckCircle className="h-5 w-5" />
    case "users":
      return <Users className="h-5 w-5" />
    case "shield-check":
      return <ShieldCheck className="h-5 w-5" />
    default:
      return null
  }
}

export default function TechnologyPage() {
  const sections = [
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
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Our Technology</h1>
      <p className="text-xl mb-8">
        Cutting-edge vending machine software built for reliability, security, and scalability.
      </p>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <div key={index} className={`mb-12 ${index % 2 !== 0 ? "bg-gray-100 p-8 rounded-lg" : ""}`}>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            {index % 2 === 0 ? (
              <>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{section.title}</h2>
                    <p className="text-gray-600 md:text-xl">{section.description}</p>
                  </div>
                  {section.features && (
                    <div className="space-y-4">
                      {section.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600">
                            {renderIcon(feature.icon)}
                          </div>
                          <div>
                            <h3 className="font-medium">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  <Image
                    src={section.image || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={section.title}
                    className="rounded-lg object-cover shadow-xl"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <Image
                    src={section.image || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={section.title}
                    className="rounded-lg object-cover shadow-xl"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{section.title}</h2>
                    <p className="text-gray-600 md:text-xl">{section.description}</p>
                  </div>
                  {section.features && (
                    <div className="space-y-4">
                      {section.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600">
                            {renderIcon(feature.icon)}
                          </div>
                          <div>
                            <h3 className="font-medium">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* CTA Section */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to See Our Technology in Action?</h2>
        <p className="text-xl mb-6">Schedule a demo to see how our technology can transform your vending operations.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary">
            <Link href="/request-demo">Request Demo</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            <Link href="/technology/documentation">View Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

