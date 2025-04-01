"use client"

import { useState } from "react"
import { AlertCircle, X, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface AlertMessageProps {
  type: "error" | "warning" | "info" | "success"
  message: string
  className?: string
  dismissible?: boolean
  onRetry?: () => void
}

export function AlertMessage({ type, message, className = "", dismissible = false, onRetry }: AlertMessageProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  // Simplify the error message if it's too technical
  const displayMessage = message.includes("Error:")
    ? "There was a problem loading the content. Please try again."
    : message

  return (
    <Alert
      variant={type === "error" ? "destructive" : "default"}
      className={`flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{displayMessage}</AlertDescription>
      </div>
      <div className="flex items-center gap-2">
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="h-8 px-2 py-1">
            <RefreshCw className="mr-1 h-3 w-3" />
            Retry
          </Button>
        )}
        {dismissible && (
          <Button variant="ghost" size="sm" onClick={() => setDismissed(true)} className="h-8 px-2 py-1">
            <X className="h-3 w-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </Alert>
  )
}

