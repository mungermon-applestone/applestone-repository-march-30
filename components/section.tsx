import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionBackground = "default" | "muted" | "primary" | "dark"

interface SectionProps {
  children: ReactNode
  className?: string
  background?: SectionBackground
  id?: string
}

/**
 * A component that renders a section with consistent padding and optional background color
 */
export function Section({ children, className, background = "default", id }: SectionProps) {
  const backgroundStyles = {
    default: "bg-background",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    dark: "bg-slate-900 text-slate-50",
  }

  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", backgroundStyles[background], className)}>
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  )
}

