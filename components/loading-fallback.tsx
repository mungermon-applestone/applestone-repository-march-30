import { Loader2 } from "lucide-react"

interface LoadingFallbackProps {
  message?: string
  minHeight?: string
}

/**
 * A component that displays a loading spinner with an optional message
 * @param message - The loading message to display
 * @param minHeight - The minimum height of the loading container
 */
export function LoadingFallback({ message = "Loading...", minHeight = "200px" }: LoadingFallbackProps) {
  return (
    <div
      className="flex flex-col items-center justify-center w-full text-muted-foreground"
      style={{ minHeight }}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin mb-2" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

