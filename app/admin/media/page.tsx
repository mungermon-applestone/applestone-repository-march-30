"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { listFiles, uploadImage, deleteImage, createFolder } from "@/lib/image-upload"
import {
  Loader2,
  Upload,
  Trash2,
  Copy,
  Check,
  FolderPlus,
  ArrowUp,
  FolderOpen,
  AlertCircle,
  Search,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentFolder, setCurrentFolder] = useState("")
  const [newFolderName, setNewFolderName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    setError(null)

    try {
      const filesData = await listFiles("images", currentFolder)
      setFiles(filesData)
    } catch (error) {
      console.error("Error fetching files:", error)
      setError("Failed to load files. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadImage(selectedFile, "images", currentFolder)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.error) {
        throw new Error(result.error)
      }

      // Refresh the file list
      fetchFiles()
      setSelectedFile(null)

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      setError(error instanceof Error ? error.message : "Failed to upload file")
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

      const success = await deleteImage(path)

      if (!success) {
        throw new Error("Failed to delete file")
      }

      // Refresh the file list
      fetchFiles()
    } catch (error) {
      console.error("Error deleting file:", error)
      setError("Failed to delete file")
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
    const newPath = currentFolder ? `${currentFolder}/${folderName}` : folderName
    setCurrentFolder(newPath)
  }

  const navigateToBreadcrumb = (path: string) => {
    setCurrentFolder(path)
  }

  const navigateUp = () => {
    if (!currentFolder) return

    const parts = currentFolder.split("/")
    parts.pop()
    setCurrentFolder(parts.join("/"))
  }

  const handleCreateFolder = async () => {
    if (!newFolderName) {
      setError("Please enter a folder name")
      return
    }

    setError(null)

    try {
      const success = await createFolder(newFolderName, currentFolder)

      if (!success) {
        throw new Error("Failed to create folder")
      }

      setNewFolderName("")
      fetchFiles()
    } catch (error) {
      console.error("Error creating folder:", error)
      setError("Failed to create folder")
    }
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Separate folders and files
  const folders = filteredFiles.filter((file) => file.name.endsWith("/.placeholder") || !file.metadata?.mimetype)
  const images = filteredFiles.filter(
    (file) => file.metadata?.mimetype?.startsWith("image/") && !file.name.endsWith("/.placeholder"),
  )
  const otherFiles = filteredFiles.filter(
    (file) =>
      file.metadata?.mimetype && !file.metadata.mimetype.startsWith("image/") && !file.name.endsWith("/.placeholder"),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Media Library</h1>
      </div>

      <Tabs defaultValue="browse">
        <TabsList className="mb-6">
          <TabsTrigger value="browse">Browse Files</TabsTrigger>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex gap-2">
              {currentFolder && (
                <Button variant="outline" onClick={navigateUp}>
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Up
                </Button>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="folder-name" className="text-sm font-medium">
                        Folder Name
                      </label>
                      <Input
                        id="folder-name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Enter folder name"
                      />
                    </div>
                    <Button onClick={handleCreateFolder} className="w-full">
                      Create Folder
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-sm bg-muted/30 p-2 rounded">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && <span className="mx-1">/</span>}
                <button onClick={() => navigateToBreadcrumb(crumb.path)} className="hover:underline text-primary">
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                <div key={`image-${index}`} className="border rounded-lg overflow-hidden bg-card">
                  <div className="aspect-square relative">
                    <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                  </div>
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

              {/* Other files */}
              {otherFiles.map((file, index) => (
                <div key={`other-${index}`} className="border rounded-lg overflow-hidden bg-card">
                  <div className="aspect-square flex items-center justify-center bg-muted">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📄</div>
                      <p className="text-sm font-medium">{file.name}</p>
                    </div>
                  </div>
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

              {folders.length === 0 && images.length === 0 && otherFiles.length === 0 && (
                <div className="col-span-full text-center py-12 border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">
                    {searchTerm ? "No files match your search" : "No files found in this folder"}
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-4">Upload New File</h2>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Folder</label>
                <div className="p-2 bg-muted/30 rounded text-sm">{currentFolder || "Root"}</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select File</label>
                <Input ref={fileInputRef} type="file" onChange={handleFileChange} className="mb-4" />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </p>
                )}
              </div>

              <Button onClick={handleUpload} disabled={!selectedFile || isUploading} className="w-full">
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
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

