"use client"

import { useState, useEffect, useCallback } from "react"

interface UseFetchDataOptions<T> {
  url: string
  fallbackData?: T
  initialData?: T
  dependencies?: any[]
}

export function useFetchData<T>({ url, fallbackData, initialData, dependencies = [] }: UseFetchDataOptions<T>) {
  const [data, setData] = useState<T>(initialData || (fallbackData as T))
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText || "Failed to fetch data"}`)
      }

      const result = await response.json()

      // Check if result is valid (not null or undefined)
      if (result !== null && result !== undefined) {
        setData(result)
      } else if (fallbackData) {
        // Use fallback data if result is null or undefined
        setData(fallbackData as T)
      }
    } catch (err) {
      console.error(`Error fetching data from ${url}:`, err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")

      // Use fallback data on error if provided
      if (fallbackData) {
        setData(fallbackData as T)
      }
    } finally {
      setIsLoading(false)
    }
  }, [url, ...dependencies])

  const retry = useCallback(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, retry }
}

