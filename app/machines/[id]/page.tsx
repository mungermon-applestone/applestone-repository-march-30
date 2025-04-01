"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Define the type for our machine data
interface Machine {
  id: number
  name: string
  description: string
  image_url: string
  category: string
  type?: string
  features?: string[]
  specifications?: Record<string, string>
  gallery?: string[]
  examples?: Array<{
    image_url: string
    description: string
    location?: string
  }>
  manufacturer?: string
  status?: string
  location?: string
}

// Fallback machines for when the API fails
const fallbackMachines: Machine[] = [
  {
    id: 1,
    name: "Standard Vending Machine",
    description: "Traditional snack and beverage vending machine with multiple trays and digital display.",
    image_url: "/placeholder.svg?height=600&width=800",
    category: "vending-machine",
    type: "Ambient",
    features: ["Multiple Trays", "Digital Display", "Card Payment", "Remote Monitoring"],
    specifications: {
      dimensions: '72" H x 39" W x 36" D',
      weight: "800 lbs",
      power: "110-120V, 60Hz, 3.6 Amps",
      capacity: "Up to 45 selections",
      cost: "Contact for pricing",
    },
    manufacturer: "Various manufacturers supported",
    status: "Active",
    location: "Main Office",
  },
  {
    id: 2,
    name: "Refrigerated Beverage Machine",
    description: "Cold drink vending with energy-efficient cooling system and digital interface.",
    image_url: "/placeholder.svg?height=600&width=800",
    category: "vending-machine",
    type: "Refrigerated",
    features: ["Temperature Control", "Energy Efficient", "Multiple Sizes", "Digital Interface"],
    specifications: {
      dimensions: '72" H x 52" W x 36" D',
      weight: "900 lbs",
      power: "110-120V, 60Hz, 9.8 Amps",
      capacity: "Up to 10 selections, 45 items per selection",
      cost: "Contact for pricing",
    },
    manufacturer: "Various manufacturers supported",
    status: "Active",
    location: "Downtown Office",
  },
  {
    id: 3,
    name: "Frozen Food Vending",
    description: "Frozen food and ice cream vending solution with temperature monitoring.",
    image_url: "/placeholder.svg?height=600&width=800",
    category: "vending-machine",
    type: "Frozen",
    features: ["Deep Freeze", "Temperature Monitoring", "Energy Efficient", "Digital Display"],
    specifications: {
      dimensions: '72" H x 41" W x 36" D',
      weight: "950 lbs",
      power: "110-120V, 60Hz, 12 Amps",
      capacity: "Up to 8 selections, 30 items per selection",
      cost: "Contact for pricing",
    },
    manufacturer: "Various manufacturers supported",
    status: "Maintenance",
    location: "Shopping Mall",
  },
  {
    id: 4,
    name: "Standard Locker System",
    description: "Modular locker system for package delivery with digital access control.",
    image_url: "/placeholder.svg?height=600&width=800",
    category: "locker",
    type: "Ambient",
    features: ["Modular Design", "Digital Access", "Notification System", "Camera Security"],
    specifications: {
      dimensions: '72" H x 72" W x 20" D (modular)',
      weight: "Varies by configuration",
      power: "110-120V, 60Hz, 2 Amps",
      capacity: "Configurable from 6 to 30+ compartments",
      cost: "Contact for pricing",
    },
    manufacturer: "Various manufacturers supported",
    status: "Active",
    location: "Apartment Complex",
  },
  {
    id: 5,
    name: "Refrigerated Locker",
    description: "Temperature-controlled lockers for food delivery with insulated compartments.",
    image_url: "/placeholder.svg?height=600&width=800",
    category: "locker",
    type: "Refrigerated",
    features: ["Temperature Control", "Insulated Compartments", "Energy Efficient", "Digital Access"],
    specifications: {
      dimensions: '72" H x 72" W x 30" D (modular)',
      weight: "Varies by configuration",
      power: "110-120V, 60Hz, 8 Amps",
      capacity: "Configurable from 4 to 16 compartments",
      cost: "Contact for pricing",
    },
    manufacturer: "Various manufacturers supported",
    status: "Active",
    location: "Office Building",
  },
]

export default function MachineDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [machine, setMachine] = useState<Machine | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  useEffect(() => {
    if (!id) return

    async function fetchMachineDetail() {
      try {
        // First, try to find the machine in our fallback data
        const numericId = Number(id)
        const fallbackMachine = fallbackMachines.find((m) => m.id === numericId)

        // If we found a matching fallback machine, use it immediately
        if (fallbackMachine) {
          setMachine(fallbackMachine)
        }

        // Simple fetch with a timeout to prevent hanging
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(`/api/machines/${id}`, {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Machine not found")
          }
          throw new Error(`Failed to fetch machine: ${response.status}`)
        }

        const data = await response.json()

        if (data) {
          setMachine(data)
        } else if (!fallbackMachine) {
          throw new Error("Machine not found")
        }
      } catch (err) {
        console.error("Error fetching machine:", err)

        // If we already set a fallback machine, just show a warning
        if (machine) {
          setError("Using fallback data due to connection issues.")
        } else {
          // Otherwise show the full error
          setError(err instanceof Error ? err.message : "Failed to load machine")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchMachineDetail()
  }, [id])

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center" style={{ minHeight: "60vh" }}>
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!machine) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Machine Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "The machine you're looking for doesn't exist."}</p>
          <Button onClick={() => router.push("/machines")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Machines
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          {error && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start">
            <div className="w-full md:w-1/2">
              <Link
                href="/machines"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Machines
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{machine.name}</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-primary/10">
                  {machine.category === "vending-machine" ? "Vending Machine" : "Locker"}
                </Badge>
                {machine.type && (
                  <Badge variant="outline" className="bg-primary/10">
                    {machine.type}
                  </Badge>
                )}
                {machine.status && (
                  <Badge
                    variant="outline"
                    className={`${
                      machine.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : machine.status === "Maintenance"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {machine.status}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground md:text-xl mb-6">{machine.description}</p>

              {machine.features && machine.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                  <ul className="space-y-2">
                    {machine.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={machine.image_url || "/placeholder.svg?height=600&width=800"}
                  alt={machine.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Specifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{machine.specifications?.dimensions || "Contact for details"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{machine.specifications?.weight || "Contact for details"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Power Supply</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{machine.specifications?.power || "Contact for details"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{machine.type || "Ambient"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manufacturer</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{machine.manufacturer || "Various manufacturers supported"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{machine.specifications?.cost || "Contact for pricing"}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Examples Section (if available) */}
      {machine.examples && machine.examples.length > 0 && (
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Deployed Examples</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {machine.examples.map((example, index) => (
                <div key={index} className="border rounded-lg overflow-hidden bg-card">
                  <div className="aspect-video relative">
                    <Image
                      src={example.image_url || "/placeholder.svg?height=300&width=400"}
                      alt={`${machine.name} example`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                    {example.location && <p className="text-sm font-medium mt-2">Location: {example.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section (if available) */}
      {machine.gallery && machine.gallery.length > 0 && (
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Additional Views</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {machine.gallery.map((imageUrl, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl || "/placeholder.svg?height=300&width=300"}
                    alt={`${machine.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Interested in this {machine.category === "vending-machine" ? "Machine" : "Locker"}?
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and our team will get back to you with more information.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your company name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder={`I'm interested in the ${machine.name} and would like more information.`}
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={formStatus === "submitting" || formStatus === "success"}
              >
                {formStatus === "submitting" ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Sending...
                  </>
                ) : formStatus === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Inquiry Sent
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>

              {formStatus === "success" && (
                <p className="text-center text-green-600 text-sm mt-2">
                  Thank you for your inquiry! Our team will contact you shortly.
                </p>
              )}

              {formStatus === "error" && (
                <p className="text-center text-red-600 text-sm mt-2">
                  There was an error sending your inquiry. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

