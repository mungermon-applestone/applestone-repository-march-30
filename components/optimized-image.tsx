"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { Loader2 } from "lucide-react"

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "loading"> {
  fallbackSrc?: string
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // If src is undefined or null, use fallback
  const imageSrc = src || fallbackSrc

  // If src is a string that contains placeholder.svg, extract height and width
  let finalSrc = imageSrc
  if (typeof imageSrc === "string" && imageSrc.includes("placeholder.svg") && !imageSrc.includes("?")) {
    // Extract height and width from props if available
    const height = props.height || 300
    const width = props.width || 400
    finalSrc = `${imageSrc}?height=${height}&width=${width}&text=${encodeURIComponent(alt || "Image")}`
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      <Image
        src={error ? fallbackSrc : finalSrc}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}

