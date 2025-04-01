"use client"

import { createBrowserClient } from "@/lib/supabase-client"
import type { StorageFile } from "@/types/database"

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
    const supabase = createBrowserClient()

    // Create a unique filename to avoid collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

    // Construct the file path
    const filePath = folder ? `${folder}/${fileName}` : fileName

    console.log("Uploading file:", filePath)

    // Upload the file with public access
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true, // Use upsert to overwrite if file exists
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
 * Lists all files in a bucket/folder
 * @param bucket The storage bucket name (default: 'images')
 * @param folder Optional folder path within the bucket
 * @returns Array of file objects with URLs
 */
export async function listFiles(bucket = "images", folder = ""): Promise<StorageFile[]> {
  try {
    const supabase = createBrowserClient()

    const { data, error } = await supabase.storage.from(bucket).list(folder, {
      sortBy: { column: "name", order: "asc" },
    })

    if (error) {
      console.error("Error listing files:", error)
      return []
    }

    // Add URLs to the files
    const filesWithUrls = await Promise.all(
      data.map(async (file) => {
        const path = folder ? `${folder}/${file.name}` : file.name
        const { data } = supabase.storage.from(bucket).getPublicUrl(path)

        return {
          ...file,
          url: data.publicUrl,
          path,
        } as StorageFile
      }),
    )

    return filesWithUrls
  } catch (error) {
    console.error("Error in listFiles:", error)
    return []
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
    const supabase = createBrowserClient()

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

/**
 * Creates a folder in Supabase Storage
 * @param folderName Name of the folder to create
 * @param parentFolder Optional parent folder path
 * @param bucket The storage bucket name (default: 'images')
 * @returns Success status
 */
export async function createFolder(folderName: string, parentFolder = "", bucket = "images"): Promise<boolean> {
  try {
    const supabase = createBrowserClient()

    const folderPath = parentFolder ? `${parentFolder}/${folderName}/.placeholder` : `${folderName}/.placeholder`

    // Create an empty file to represent the folder
    const { error } = await supabase.storage.from(bucket).upload(folderPath, new Blob([""]), {
      upsert: false,
    })

    if (error) {
      console.error("Error creating folder:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in createFolder:", error)
    return false
  }
}

