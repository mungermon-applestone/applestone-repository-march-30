"use client"

import type React from "react"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

export default function ImageUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClientSupabaseClient()

  // Fetch existing images when component mounts
  useState(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase.storage.from("images").list()

        if (error) {
          console.error("Error fetching images:", error)
          return
        }

        if (data) {
          const imageUrls = data
            .filter((item) => !item.id.includes("/")) // Filter out folders
            .map((item) => {
              return supabase.storage.from("images").getPublicUrl(item.name).data.publicUrl
            })

          setUploadedImages(imageUrls)
        }
      } catch (error) {
        console.error("Error in fetchImages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setUploadSuccess(null)
      setErrorMessage("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file to upload")
      return
    }

    setUploading(true)
    setUploadSuccess(null)
    setErrorMessage("")

    try {
      // Create a unique file name to avoid collisions
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

      const { error } = await supabase.storage.from("images").upload(fileName, file)

      if (error) {
        throw error
      }

      // Get the public URL for the uploaded image
      const { data } = supabase.storage.from("images").getPublicUrl(fileName)

      setUploadedImageUrl(data.publicUrl)
      setUploadedImages((prev) => [...prev, data.publicUrl])
      setUploadSuccess(true)
    } catch (error: any) {
      console.error("Error uploading image:", error)
      setErrorMessage(error.message || "An error occurred during upload")
      setUploadSuccess(false)
    } finally {
      setUploading(false)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Image URL copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err)
      })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Image Upload</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Select Image</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
            </div>

            {file && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>
              </div>
            )}

            <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Image"
              )}
            </Button>

            {uploadSuccess === true && (
              <div className="flex items-center text-green-600 mt-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Upload successful!</span>
              </div>
            )}

            {uploadSuccess === false && (
              <div className="flex items-center text-red-600 mt-2">
                <XCircle className="h-4 w-4 mr-2" />
                <span>{errorMessage || "Upload failed"}</span>
              </div>
            )}

            {uploadedImageUrl && (
              <div className="mt-4 p-4 border rounded-lg">
                <p className="text-sm font-medium mb-2">Uploaded Image URL:</p>
                <div className="flex items-center gap-2">
                  <Input value={uploadedImageUrl} readOnly className="text-xs" />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(uploadedImageUrl)}>
                    Copy
                  </Button>
                </div>
                <div className="mt-4">
                  <Image
                    src={uploadedImageUrl || "/placeholder.svg"}
                    alt="Uploaded image preview"
                    width={300}
                    height={200}
                    className="rounded-md object-contain h-[200px] w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : uploadedImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {uploadedImages.map((url, index) => (
                <div key={index} className="border rounded-md p-2">
                  <div className="relative aspect-video mb-2">
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => copyToClipboard(url)}>
                    Copy URL
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No images uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

