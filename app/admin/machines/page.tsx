"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/image-uploader"
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Machine {
  id?: number
  name: string
  description: string
  image_url: string
  category?: string
  features?: string[]
  specifications?: Record<string, string>
  status?: string
  location?: string
}

export default function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentMachine, setCurrentMachine] = useState<Machine | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [specKeys, setSpecKeys] = useState<string[]>([])
  const [specValues, setSpecValues] = useState<string[]>([])

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    fetchMachines()
  }, [])

  async function fetchMachines() {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.from("machines").select("*").order("id", { ascending: true })

      if (error) {
        throw error
      }

      setMachines(data || [])
    } catch (error) {
      console.error("Error fetching machines:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNew = () => {
    setCurrentMachine({
      name: "",
      description: "",
      image_url: "/placeholder.svg?height=300&width=400",
      category: "vending-machine",
      features: [],
      specifications: {},
      status: "Active",
      location: "",
    })
    setSpecKeys([])
    setSpecValues([])
    setIsEditing(true)
    setErrorMessage("")
  }

  const handleEdit = (machine: Machine) => {
    setCurrentMachine({ ...machine })

    // Extract specification keys and values
    const specs = machine.specifications || {}
    setSpecKeys(Object.keys(specs))
    setSpecValues(Object.values(specs).map((v) => v.toString()))

    setIsEditing(true)
    setErrorMessage("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentMachine(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentMachine) return

    const { name, value } = e.target
    setCurrentMachine({ ...currentMachine, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    if (!currentMachine) return
    setCurrentMachine({ ...currentMachine, [name]: value })
  }

  const handleFeatureChange = (index: number, value: string) => {
    if (!currentMachine || !currentMachine.features) return

    const updatedFeatures = [...currentMachine.features]
    updatedFeatures[index] = value

    setCurrentMachine({
      ...currentMachine,
      features: updatedFeatures,
    })
  }

  const handleAddFeature = () => {
    if (!currentMachine) return

    const features = currentMachine.features || []
    setCurrentMachine({
      ...currentMachine,
      features: [...features, ""],
    })
  }

  const handleRemoveFeature = (index: number) => {
    if (!currentMachine || !currentMachine.features) return

    const updatedFeatures = currentMachine.features.filter((_, i) => i !== index)
    setCurrentMachine({
      ...currentMachine,
      features: updatedFeatures,
    })
  }

  const handleSpecKeyChange = (index: number, value: string) => {
    const newSpecKeys = [...specKeys]
    newSpecKeys[index] = value
    setSpecKeys(newSpecKeys)
    updateSpecifications(newSpecKeys, specValues)
  }

  const handleSpecValueChange = (index: number, value: string) => {
    const newSpecValues = [...specValues]
    newSpecValues[index] = value
    setSpecValues(newSpecValues)
    updateSpecifications(specKeys, newSpecValues)
  }

  const updateSpecifications = (keys: string[], values: string[]) => {
    if (!currentMachine) return

    const specs: Record<string, string> = {}
    keys.forEach((key, index) => {
      if (key && values[index]) {
        specs[key] = values[index]
      }
    })

    setCurrentMachine({
      ...currentMachine,
      specifications: specs,
    })
  }

  const handleAddSpecification = () => {
    setSpecKeys([...specKeys, ""])
    setSpecValues([...specValues, ""])
  }

  const handleRemoveSpecification = (index: number) => {
    const newSpecKeys = specKeys.filter((_, i) => i !== index)
    const newSpecValues = specValues.filter((_, i) => i !== index)

    setSpecKeys(newSpecKeys)
    setSpecValues(newSpecValues)
    updateSpecifications(newSpecKeys, newSpecValues)
  }

  const handleImageUploaded = (url: string) => {
    if (!currentMachine) return

    setCurrentMachine({
      ...currentMachine,
      image_url: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMachine) return

    setIsSaving(true)
    setErrorMessage("")

    try {
      let result

      if (currentMachine.id) {
        // Update existing record
        result = await supabase
          .from("machines")
          .update({
            name: currentMachine.name,
            description: currentMachine.description,
            image_url: currentMachine.image_url,
            category: currentMachine.category,
            features: currentMachine.features || [],
            specifications: currentMachine.specifications || {},
            status: currentMachine.status,
            location: currentMachine.location,
          })
          .eq("id", currentMachine.id)
      } else {
        // Insert new record
        result = await supabase.from("machines").insert([
          {
            name: currentMachine.name,
            description: currentMachine.description,
            image_url: currentMachine.image_url,
            category: currentMachine.category,
            features: currentMachine.features || [],
            specifications: currentMachine.specifications || {},
            status: currentMachine.status,
            location: currentMachine.location,
          },
        ])
      }

      if (result.error) {
        throw result.error
      }

      // Refresh the data
      await fetchMachines()

      // Close the form
      setIsEditing(false)
      setCurrentMachine(null)
    } catch (error: any) {
      console.error("Error saving machine:", error)
      setErrorMessage(error.message || "An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this machine?")) {
      return
    }

    try {
      const { error } = await supabase.from("machines").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Refresh the data
      await fetchMachines()
    } catch (error) {
      console.error("Error deleting machine:", error)
      alert("Failed to delete machine")
    }
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
        <h1 className="text-3xl font-bold">Machines</h1>
        {!isEditing && (
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Machine
          </Button>
        )}
      </div>

      {isEditing && currentMachine && (
        <div className="mb-8 p-6 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {currentMachine.id ? `Edit: ${currentMachine.name}` : "Create New Machine"}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {errorMessage && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={currentMachine.name} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={currentMachine.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vending-machine">Vending Machine</SelectItem>
                    <SelectItem value="kiosk">Kiosk</SelectItem>
                    <SelectItem value="micro-market">Micro Market</SelectItem>
                    <SelectItem value="smart-fridge">Smart Fridge</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentMachine.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={currentMachine.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={currentMachine.location || ""}
                  onChange={handleChange}
                  placeholder="e.g., Main Office - 3rd Floor"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Image</Label>
                <ImageUploader
                  defaultImageUrl={currentMachine.image_url}
                  onImageUploaded={(result) => handleImageUploaded(result.url)}
                  folder="machines"
                />
              </div>

              <div>
                <Label>Features</Label>
                <div className="space-y-2 mt-2">
                  {currentMachine.features &&
                    currentMachine.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Feature ${index + 1}`}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveFeature(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                  <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Specifications</Label>
              <div className="space-y-2 mt-2">
                {specKeys.map((key, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={key}
                      onChange={(e) => handleSpecKeyChange(index, e.target.value)}
                      placeholder="Specification name"
                      className="flex-1"
                    />
                    <Input
                      value={specValues[index]}
                      onChange={(e) => handleSpecValueChange(index, e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSpecification(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button type="button" variant="outline" size="sm" onClick={handleAddSpecification}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Specification
                </Button>
              </div>
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
                ) : currentMachine.id ? (
                  "Update Machine"
                ) : (
                  "Create Machine"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {machines.length > 0 ? (
          machines.map((machine) => (
            <Card key={machine.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src={machine.image_url || "/placeholder.svg"} alt={machine.name} fill className="object-cover" />
              </div>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{machine.name}</CardTitle>
                <div
                  className={`px-2 py-1 text-xs rounded-full ${
                    machine.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : machine.status === "Maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {machine.status || "Unknown"}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{machine.description}</p>

                <div className="mt-4 space-y-3">
                  {machine.location && (
                    <div className="text-sm">
                      <span className="font-medium">Location:</span> {machine.location}
                    </div>
                  )}

                  {machine.category && (
                    <div className="text-sm">
                      <span className="font-medium">Category:</span> {machine.category}
                    </div>
                  )}

                  {machine.features && machine.features.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {machine.features.map((feature, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {machine.specifications && Object.keys(machine.specifications).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Specifications:</h4>
                      <div className="text-sm space-y-1">
                        {Object.entries(machine.specifications).map(([key, value], index) => (
                          <div key={index}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(machine)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => machine.id && handleDelete(machine.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">No machines found. Click "Add New Machine" to create one.</p>
          </div>
        )}
      </div>
    </div>
  )
}

