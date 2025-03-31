"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { uploadImage, type UploadResult } from "@/lib/image-upload"
import { Loader2, Upload, X } from "lucide-react"

interface ImageUploaderProps {
  onImageUploaded: (result: UploadResult) => void
  defaultImageUrl?: string
  bucket?: string
  folder?: string
  className?: string
}

export function ImageUploader({
  onImageUploaded,
  defaultImageUrl,
  bucket = "images",
  folder = "",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      // Create a preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload to Supabase
      const result = await uploadImage(file, bucket, folder)

      if (result.error) {
        setError(result.error)
      } else {
        onImageUploaded(result)
      }
    } catch (err) {
      setError("Failed to upload image")
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const clearImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {previewUrl ? (
        <div className="relative">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            width={300}
            height={200}
            className="rounded-md object-cover"
            style={{ maxHeight: "200px", width: "auto" }}
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center w-full max-w-xs">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />

      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>{previewUrl ? "Change Image" : "Upload Image"}</>
        )}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

