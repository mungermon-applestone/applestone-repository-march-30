import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CallToActionProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonUrl: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  variant?: "primary" | "secondary"
}

export function CallToAction({
  title,
  description,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  variant = "primary",
}: CallToActionProps) {
  const isPrimary = variant === "primary"

  return (
    <section className={`w-full py-12 md:py-24 ${isPrimary ? "bg-primary" : "bg-muted"}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl ${isPrimary ? "text-white" : ""}`}>
            {title}
          </h2>
          <p className={`max-w-[900px] ${isPrimary ? "text-white/90" : "text-muted-foreground"} text-lg`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button variant={isPrimary ? "secondary" : "default"} size="lg" asChild>
              <Link href={primaryButtonUrl}>{primaryButtonText}</Link>
            </Button>
            {secondaryButtonText && secondaryButtonUrl && (
              <Button
                variant="outline"
                size="lg"
                className={isPrimary ? "bg-transparent text-white border-white hover:bg-white/10" : ""}
                asChild
              >
                <Link href={secondaryButtonUrl}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

