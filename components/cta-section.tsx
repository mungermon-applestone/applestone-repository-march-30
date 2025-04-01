import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  title: string
  description: string
  children: ReactNode
  className?: string
  background?: "default" | "muted" | "primary" | "dark"
}

/**
 * A component that renders a call-to-action section with a title, description, and buttons
 */
export function CTASection({ title, description, children, className, background = "primary" }: CTASectionProps) {
  const backgroundStyles = {
    default: "bg-background",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    dark: "bg-slate-900 text-slate-50",
  }

  return (
    <section className={cn("py-12 md:py-16", backgroundStyles[background], className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">{children}</div>
        </div>
      </div>
    </section>
  )
}

