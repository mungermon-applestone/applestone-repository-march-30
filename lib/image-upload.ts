"use client"

import { createClientSupabaseClient } from "@/lib/supabase"

export type UploadResult = {
  path: string
  url: string
  error?: string
}

/**
 * Uploads an image to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket name (default: 'images')
 * @param folder Optional folder path within the bucket
 * @returns Object containing the path and public URL of the uploaded image
 */
export async function uploadImage(file: File, bucket = "images", folder = ""): Promise<UploadResult> {
  try {
    const supabase = createClientSupabaseClient()

    // Create a unique filename to avoid collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

    // Construct the file path
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload the file
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading image:", error)
      return { path: "", url: "", error: error.message }
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return {
      path: data.path,
      url: publicUrl,
    }
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return {
      path: "",
      url: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Deletes an image from Supabase Storage
 * @param path The path of the file to delete
 * @param bucket The storage bucket name (default: 'images')
 * @returns Success status
 */
export async function deleteImage(path: string, bucket = "images"): Promise<boolean> {
  try {
    const supabase = createClientSupabaseClient()

    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return false
  }
}

