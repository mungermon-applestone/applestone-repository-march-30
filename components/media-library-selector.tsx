"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { listFiles } from "@/lib/image-upload"
import { Loader2, Search, FolderOpen } from "lucide-react"

interface MediaLibrarySelectorProps {
  onSelect: (url: string) => void
  bucket?: string
  initialFolder?: string
}

export function MediaLibrarySelector({ onSelect, bucket = "images", initialFolder = "" }: MediaLibrarySelectorProps) {
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentFolder, setCurrentFolder] = useState(initialFolder)
  const [searchTerm, setSearchTerm] = useState("")
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>([])

  useEffect(() => {
    fetchFiles()
  }, [currentFolder])

  useEffect(() => {
    // Update breadcrumbs when folder changes
    if (currentFolder === "") {
      setBreadcrumbs([{ name: "Root", path: "" }])
    } else {
      const parts = currentFolder.split("/")
      const crumbs = [{ name: "Root", path: "" }]

      let currentPath = ""
      parts.forEach((part) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part
        crumbs.push({ name: part, path: currentPath })
      })

      setBreadcrumbs(crumbs)
    }
  }, [currentFolder])

  async function fetchFiles() {
    setIsLoading(true)
    try {
      const filesData = await listFiles(bucket, currentFolder)
      setFiles(filesData)
    } catch (error) {
      console.error("Error fetching files:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const navigateToFolder = (folderName: string) => {
    const newPath = currentFolder ? `${currentFolder}/${folderName}` : folderName
    setCurrentFolder(newPath)
  }

  const navigateToBreadcrumb = (path: string) => {
    setCurrentFolder(path)
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Separate folders and files
  const folders = filteredFiles.filter((file) => file.name.endsWith("/.placeholder") || !file.metadata?.mimetype)
  const images = filteredFiles.filter(
    (file) => file.metadata?.mimetype?.startsWith("image/") && !file.name.endsWith("/.placeholder"),
  )

  return (
    <div className="space-y-4">
      {/* Search and breadcrumbs */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              {index > 0 && <span className="mx-1">/</span>}
              <button onClick={() => navigateToBreadcrumb(crumb.path)} className="hover:underline text-primary">
                {crumb.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Folders first */}
          {folders.map((folder, index) => {
            const folderName = folder.name.replace("/.placeholder", "")
            return (
              <div
                key={`folder-${index}`}
                className="border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50"
                onClick={() => navigateToFolder(folderName)}
              >
                <FolderOpen className="h-12 w-12 text-primary/60 mb-2" />
                <span className="text-sm font-medium truncate w-full text-center">{folderName}</span>
              </div>
            )
          })}

          {/* Images */}
          {images.map((file, index) => (
            <div
              key={`file-${index}`}
              className="border rounded-md overflow-hidden cursor-pointer hover:border-primary"
              onClick={() => onSelect(file.url)}
            >
              <div className="aspect-square relative">
                <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
              </div>
              <div className="p-2">
                <p className="text-xs truncate">{file.name}</p>
              </div>
            </div>
          ))}

          {folders.length === 0 && images.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No files found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

