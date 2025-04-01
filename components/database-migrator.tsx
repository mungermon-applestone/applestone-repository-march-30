"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Database, RefreshCw } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface DatabaseMigratorProps {
  onComplete?: () => void
}

export function DatabaseMigrator({ onComplete }: DatabaseMigratorProps) {
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)

  const runMigration = async () => {
    try {
      setStatus("running")
      setMessage("Starting database migration...")
      setProgress(10)

      // Step 1: Create schema
      setMessage("Creating database schema...")
      setProgress(20)
      const schemaRes = await fetch("/api/admin/database/schema", { method: "POST" })

      if (!schemaRes.ok) {
        throw new Error("Failed to create database schema")
      }

      setProgress(40)

      // Step 2: Seed data
      setMessage("Seeding database with initial data...")
      setProgress(60)
      const seedRes = await fetch("/api/admin/database/seed", { method: "POST" })

      if (!seedRes.ok) {
        throw new Error("Failed to seed database")
      }

      setProgress(80)

      // Step 3: Finalize migration
      setMessage("Finalizing migration...")
      setProgress(90)
      const finalizeRes = await fetch("/api/admin/database/finalize", { method: "POST" })

      if (!finalizeRes.ok) {
        throw new Error("Failed to finalize migration")
      }

      setProgress(100)
      setMessage("Database migration completed successfully!")
      setStatus("success")

      // Call onComplete callback if provided
      if (onComplete) {
        setTimeout(onComplete, 2000)
      }
    } catch (error: any) {
      console.error("Migration error:", error)
      setStatus("error")
      setMessage(`Migration failed: ${error.message}`)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Migration
        </CardTitle>
        <CardDescription>Migrate your content to the database</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "idle" && (
          <p className="text-sm text-muted-foreground mb-4">
            This will create the necessary database tables and seed them with your content. This process is safe and
            won't overwrite existing data.
          </p>
        )}

        {status === "running" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LoadingSpinner size="sm" />
              <span>{message}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {status === "idle" && (
          <Button onClick={runMigration} className="w-full">
            Start Migration
          </Button>
        )}

        {status === "running" && (
          <Button disabled className="w-full">
            <LoadingSpinner size="sm" className="mr-2" />
            Migrating...
          </Button>
        )}

        {status === "success" && (
          <Button variant="outline" className="w-full" onClick={onComplete}>
            Continue
          </Button>
        )}

        {status === "error" && (
          <Button variant="outline" className="w-full" onClick={() => setStatus("idle")}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

