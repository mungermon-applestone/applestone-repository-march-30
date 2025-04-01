"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  homeLabel?: string
  className?: string
  separator?: React.ReactNode
  transformLabel?: (segment: string) => string
}

export function Breadcrumbs({
  homeLabel = "Home",
  className = "",
  separator = <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />,
  transformLabel = (segment) => segment.replace(/-/g, " "),
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // Skip rendering breadcrumbs on home page
  if (pathname === "/") return null

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      label: transformLabel(segment),
      href: `/${segments.slice(0, segments.indexOf(segment) + 1).join("/")}`,
    }))

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4 mr-1" />
            <span>{homeLabel}</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1

          return (
            <li key={segment.href} className="flex items-center">
              {separator}
              {isLast ? (
                <span className="font-medium" aria-current="page">
                  {segment.label}
                </span>
              ) : (
                <Link href={segment.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {segment.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

