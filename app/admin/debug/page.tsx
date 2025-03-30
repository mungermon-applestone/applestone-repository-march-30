"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DebugPage() {
  const [authStatus, setAuthStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/check")
        const data = await response.json()
        setAuthStatus(data)
      } catch (err) {
        setError("Failed to check authentication status")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>

      {isLoading ? (
        <p>Loading authentication status...</p>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-muted rounded-md">
            <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
            <pre className="bg-background p-4 rounded border overflow-auto">{JSON.stringify(authStatus, null, 2)}</pre>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <h2 className="text-xl font-semibold mb-2">Environment Check</h2>
            <p>Admin Username Set: {authStatus?.env?.hasUsername ? "✅" : "❌"}</p>
            <p>Admin Password Set: {authStatus?.env?.hasPassword ? "✅" : "❌"}</p>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a href="/admin">Back to Admin</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/admin/login">Go to Login</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

