import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function TechnologyPreview() {
  // Static content for the technology preview
  const techFeatures = [
    {
      title: "Cloud-Based Platform",
      description: "Access your vending machine data from anywhere in the world",
      image: "/placeholder.svg?height=300&width=400",
      features: ["Real-time monitoring", "Automatic updates", "Secure data storage"],
    },
    {
      title: "IoT Connectivity",
      description: "Advanced IoT technology for reliable machine communication",
      image: "/placeholder.svg?height=300&width=400",
      features: ["Multiple connectivity options", "Low-power operation", "Secure communication"],
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Technology</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Cutting-edge vending machine software built for reliability, security, and scalability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {techFeatures.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg border bg-background">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2 mb-4">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button size="lg" className="w-[400px] max-w-full">
            <Link href="/technology">Learn More About Our Technology</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

