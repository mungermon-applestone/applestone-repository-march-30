"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, Trash2, Copy, Check } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/lib/image-upload"

interface StorageItem {
  id: string
  name: string
  created_at: string
  updated_at: string
  last_accessed_at: string
  metadata: any
  url: string
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<StorageItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentFolder, setCurrentFolder] = useState("")
  const [newFolderName, setNewFolderName] = useState("")

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchFiles()
  }, [currentFolder])

  async function fetchFiles() {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.storage.from("images").list(currentFolder, {
        sortBy: { column: "name", order: "asc" },
      })

      if (error) {
        throw error
      }

      if (data) {
        // Get public URLs for all files
        const filesWithUrls = await Promise.all(
          data.map(async (item) => {
            const path = currentFolder ? `${currentFolder}/${item.name}` : item.name
            const { data } = supabase.storage.from("images").getPublicUrl(path)

            return {
              ...item,
              url: data.publicUrl,
            }
          }),
        )

        setFiles(filesWithUrls)
      }
    } catch (error) {
      console.error("Error fetching files:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const result = await uploadImage(selectedFile, "images", currentFolder)

      if (result.error) {
        throw new Error(result.error)
      }

      // Refresh the file list
      fetchFiles()
      setSelectedFile(null)

      // Reset the file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (fileName: string) => {
    if (!confirm("Are you sure you want to delete this file?")) {
      return
    }

    try {
      const path = currentFolder ? `${currentFolder}/${fileName}` : fileName

      const { error } = await supabase.storage.from("images").remove([path])

      if (error) {
        throw error
      }

      // Refresh the file list
      fetchFiles()
    } catch (error) {
      console.error("Error deleting file:", error)
      alert("Failed to delete file")
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedUrl(url)
        setTimeout(() => setCopiedUrl(null), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err)
      })
  }

  const navigateToFolder = (folderName: string) => {
    setCurrentFolder(folderName)
  }

  const navigateUp = () => {
    if (!currentFolder) return

    const parts = currentFolder.split("/")
    parts.pop()
    setCurrentFolder(parts.join("/"))
  }

  const createFolder = async () => {
    if (!newFolderName) return

    try {
      const folderPath = currentFolder
        ? `${currentFolder}/${newFolderName}/.placeholder`
        : `${newFolderName}/.placeholder`

      // Create an empty file to represent the folder
      const { error } = await supabase.storage.from("images").upload(folderPath, new Blob([""]))

      if (error) {
        throw error
      }

      setNewFolderName("")
      fetchFiles()
    } catch (error) {
      console.error("Error creating folder:", error)
      alert("Failed to create folder")
    }
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Media Library</h1>
      </div>

      <div className="mb-8 p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Upload New File</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input id="file-upload" type="file" onChange={handleFileChange} className="mb-4" />
            {selectedFile && (
              <p className="text-sm text-muted-foreground mb-4">
                Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
            )}
          </div>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading} className="whitespace-nowrap">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>
        </div>

        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {currentFolder && (
              <Button variant="outline" onClick={navigateUp}>
                Up One Level
              </Button>
            )}

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-40"
              />
              <Button onClick={createFolder} disabled={!newFolderName}>
                Create Folder
              </Button>
            </div>
          </div>
        </div>

        {currentFolder && <p className="text-sm text-muted-foreground mb-4">Current folder: {currentFolder}</p>}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredFiles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <div key={file.id} className="border rounded-lg overflow-hidden bg-card">
              {file.metadata?.mimetype?.startsWith("image/") ? (
                <div className="aspect-square relative">
                  <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                </div>
              ) : file.metadata?.mimetype === null ? (
                // This is a folder
                <div
                  className="aspect-square flex items-center justify-center bg-muted cursor-pointer"
                  onClick={() => navigateToFolder(currentFolder ? `${currentFolder}/${file.name}` : file.name)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-sm font-medium">{file.name}</p>
                  </div>
                </div>
              ) : (
                // This is a non-image file
                <div className="aspect-square flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-sm font-medium">{file.name}</p>
                  </div>
                </div>
              )}

              <div className="p-3">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>

                <div className="flex justify-between mt-2">
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(file.url)} title="Copy URL">
                    {copiedUrl === file.url ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.name)}
                    title="Delete file"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/30">
          <p className="text-muted-foreground">
            {searchTerm ? "No files match your search" : "No files found in this folder"}
          </p>
        </div>
      )}
    </div>
  )
}

