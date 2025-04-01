"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DatabaseMigrator } from "@/components/database-migrator"
import { useRouter } from "next/navigation"

export default function DatabaseSetupPage() {
  const [step, setStep] = useState<"intro" | "migrate" | "complete">("intro")
  const router = useRouter()

  const handleComplete = () => {
    router.push("/admin/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        {step === "intro" && (
          <Card>
            <CardHeader>
              <CardTitle>Database Setup</CardTitle>
              <CardDescription>Set up your database for the AppleStone Solutions website</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This wizard will help you set up your database with the necessary tables and seed data. This is a
                one-time process that needs to be completed before you can use the content management system.
              </p>
              <p className="text-sm text-muted-foreground">
                Make sure you have configured your Supabase connection properly before proceeding.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep("migrate")} className="w-full">
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === "migrate" && <DatabaseMigrator onComplete={() => setStep("complete")} />}

        {step === "complete" && (
          <Card>
            <CardHeader>
              <CardTitle>Setup Complete</CardTitle>
              <CardDescription>Your database has been set up successfully</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your database has been initialized with the necessary tables and seed data. You can now use the content
                management system to manage your website content.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleComplete} className="w-full">
                Go to Dashboard
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

