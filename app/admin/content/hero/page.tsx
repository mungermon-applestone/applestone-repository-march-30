"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

interface HeroData {
  id?: number
  title: string
  description: string
  image_url: string
  button_text: string
  button_link: string
}

const defaultHero: HeroData = {
  title: "Vend Anything You Sell",
  description:
    "Our cloud-based platform integrates with vending machines from all major manufacturers, giving you complete control of your fleet.",
  image_url: "/placeholder.svg?height=550&width=550",
  button_text: "See It In Action",
  button_link: "#",
}

export default function HeroContentPage() {
  const [heroData, setHeroData] = useState<HeroData>(defaultHero)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const { data, error } = await supabase
          .from("hero_section")
          .select("*")
          .order("id", { ascending: true })
          .limit(1)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching hero data:", error)
          return
        }

        if (data) {
          setHeroData(data)
        }
      } catch (error) {
        console.error("Error in fetchHeroData:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveStatus(null)
    setErrorMessage("")

    try {
      let result

      if (heroData.id) {
        // Update existing record
        result = await supabase
          .from("hero_section")
          .update({
            title: heroData.title,
            description: heroData.description,
            image_url: heroData.image_url,
            button_text: heroData.button_text,
            button_link: heroData.button_link,
          })
          .eq("id", heroData.id)
      } else {
        // Insert new record
        result = await supabase.from("hero_section").insert([
          {
            title: heroData.title,
            description: heroData.description,
            image_url: heroData.image_url,
            button_text: heroData.button_text,
            button_link: heroData.button_link,
          },
        ])
      }

      if (result.error) {
        throw result.error
      }

      setSaveStatus(true)

      // Refresh the page to get the latest data
      router.refresh()
    } catch (error: any) {
      console.error("Error saving hero data:", error)
      setErrorMessage(error.message || "An error occurred while saving")
      setSaveStatus(false)
    } finally {
      setSaving(false)
    }
  }

  const handleImageSelect = () => {
    // Open a new window to the image upload page
    window.open("/admin/images", "_blank")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Hero Section</h1>
        <Button variant="outline" onClick={() => router.push("/admin/content")}>
          Back to Content
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={heroData.title} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={heroData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="image_url"
              name="image_url"
              value={heroData.image_url}
              onChange={handleChange}
              required
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={handleImageSelect}>
              Select Image
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Use the image manager to upload and copy image URLs</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="button_text">Button Text</Label>
          <Input id="button_text" name="button_text" value={heroData.button_text} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="button_link">Button Link</Label>
          <Input id="button_link" name="button_link" value={heroData.button_link} onChange={handleChange} required />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            {saveStatus === true && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Saved successfully!</span>
              </div>
            )}

            {saveStatus === false && (
              <div className="flex items-center text-red-600">
                <XCircle className="h-4 w-4 mr-2" />
                <span>{errorMessage || "Save failed"}</span>
              </div>
            )}
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? (
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
  )
}

