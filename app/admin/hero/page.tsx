"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/image-uploader"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function HeroAdmin() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [buttonLink, setButtonLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("hero_section")
          .select("*")
          .order("id", { ascending: true })
          .limit(1)
          .single()

        if (error) {
          console.error("Error fetching hero data:", error)
          return
        }

        if (data) {
          setTitle(data.title || "")
          setDescription(data.description || "")
          setButtonText(data.button_text || "")
          setButtonLink(data.button_link || "")
          setImageUrl(data.image_url || "")
        }
      } catch (error) {
        console.error("Error in fetchHeroData:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ text: "", type: "" })

    try {
      const supabase = createClientSupabaseClient()

      // Check if hero data exists
      const { data: existingData } = await supabase.from("hero_section").select("id").limit(1)

      const heroData = {
        title,
        description,
        button_text: buttonText,
        button_link: buttonLink,
        image_url: imageUrl,
      }

      let result

      if (existingData && existingData.length > 0) {
        // Update existing record
        result = await supabase.from("hero_section").update(heroData).eq("id", existingData[0].id)
      } else {
        // Insert new record
        result = await supabase.from("hero_section").insert([heroData])
      }

      if (result.error) {
        throw result.error
      }

      setMessage({ text: "Hero section updated successfully!", type: "success" })
      router.refresh()
    } catch (error) {
      console.error("Error saving hero data:", error)
      setMessage({
        text: "Failed to update hero section. Please try again.",
        type: "error",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Hero Section</h1>

        {message.text && (
          <div
            className={`p-4 mb-6 rounded-md ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="buttonText" className="block text-sm font-medium mb-1">
                Button Text
              </label>
              <input
                id="buttonText"
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="buttonLink" className="block text-sm font-medium mb-1">
                Button Link
              </label>
              <input
                id="buttonLink"
                type="text"
                value={buttonLink}
                onChange={(e) => setButtonLink(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hero Image</label>
            <ImageUploader
              onImageUploaded={(result) => setImageUrl(result.url)}
              defaultImageUrl={imageUrl}
              folder="hero"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

