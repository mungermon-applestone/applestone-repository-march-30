import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"

// Define the type for our hero data
interface HeroData {
  title: string
  description: string
  image_url: string
  button_text: string
  button_link: string
}

// Default hero data in case the database is empty
const defaultHero: HeroData = {
  title: "Unified Software for Any Vending Machine",
  description:
    "Our cloud-based platform integrates with vending machines from all major manufacturers, giving you complete control of your entire fleet.",
  image_url: "/placeholder.svg?height=550&width=550",
  button_text: "See It In Action",
  button_link: "#",
}

// Fetch hero data from Supabase
async function getHeroData(): Promise<HeroData> {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from("hero_section")
      .select("*")
      .order("id", { ascending: true })
      .limit(1)
      .single()

    if (error || !data) {
      console.log("No hero data found, using default")
      return defaultHero
    }

    return {
      title: data.title,
      description: data.description,
      image_url: data.image_url || defaultHero.image_url,
      button_text: data.button_text || defaultHero.button_text,
      button_link: data.button_link || defaultHero.button_link,
    }
  } catch (error) {
    console.error("Error fetching hero data:", error)
    return defaultHero
  }
}

export async function HeroSection() {
  const heroData = await getHeroData()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{heroData.title}</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{heroData.description}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <a href={heroData.button_link}>
                  {heroData.button_text} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline">
                Integration Partners
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={heroData.image_url || "/placeholder.svg"}
              width={550}
              height={550}
              alt="Vending machine software dashboard"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

