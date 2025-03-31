"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/image-uploader"
import { Loader2, CheckCircle, XCircle, Pencil } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PageHeader {
  id?: number
  page_key: string
  title: string
  description: string
  image_url?: string
}

export default function PageHeadersPage() {
  const [pageHeaders, setPageHeaders] = useState<PageHeader[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentHeader, setCurrentHeader] = useState<PageHeader | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchPageHeaders()
  }, [])

  async function fetchPageHeaders() {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from("page_headers").select("*").order("page_key", { ascending: true })

      if (error) {
        throw error
      }

      setPageHeaders(data || [])
    } catch (error) {
      console.error("Error fetching page headers:", error)
      setErrorMessage("Failed to load page headers")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (header: PageHeader) => {
    setCurrentHeader({ ...header })
    setIsEditing(true)
    setErrorMessage("")
    setSuccessMessage("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentHeader(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentHeader) return

    const { name, value } = e.target
    setCurrentHeader({ ...currentHeader, [name]: value })
  }

  const handleImageUploaded = (result: { url: string }) => {
    if (!currentHeader) return

    setCurrentHeader({
      ...currentHeader,
      image_url: result.url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentHeader) return

    setIsSaving(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const { error } = await supabase
        .from("page_headers")
        .update({
          title: currentHeader.title,
          description: currentHeader.description,
          image_url: currentHeader.image_url,
        })
        .eq("id", currentHeader.id)

      if (error) {
        throw error
      }

      setSuccessMessage("Page header updated successfully!")
      fetchPageHeaders()

      // Close the form after successful save
      setTimeout(() => {
        setIsEditing(false)
        setCurrentHeader(null)
        setSuccessMessage("")
      }, 2000)
    } catch (error: any) {
      console.error("Error saving page header:", error)
      setErrorMessage(error.message || "An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  const getPageUrl = (pageKey: string) => {
    // Convert page key to URL
    if (pageKey === "products") return "/products"
    if (pageKey === "business-goals") return "/business-goals"
    if (pageKey === "machines") return "/machines"
    if (pageKey === "technology") return "/technology"
    if (pageKey === "about") return "/about"
    if (pageKey === "updates") return "/updates"
    return "/"
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Page Headers</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Back to Dashboard
        </Button>
      </div>

      {successMessage && (
        <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isEditing && currentHeader ? (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Edit Page Header: {currentHeader.page_key}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={currentHeader.title} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentHeader.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div>
              <Label>Header Image (Optional)</Label>
              <ImageUploader
                defaultImageUrl={currentHeader.image_url}
                onImageUploaded={handleImageUploaded}
                folder="page-headers"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6">
        {pageHeaders.map((header) => (
          <Card key={header.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{header.page_key}</span>
                <Button variant="outline" size="sm" asChild>
                  <a href={getPageUrl(header.page_key)} target="_blank" rel="noopener noreferrer">
                    View Page
                  </a>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Title:</span>
                  <p className="text-lg">{header.title}</p>
                </div>
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-sm text-muted-foreground">{header.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={() => handleEdit(header)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

