/**
 * Data Fetching Utilities
 *
 * This file contains utilities for fetching data from the database
 * with caching and fallback mechanisms.
 */

import { createServerSupabaseClient } from "@/lib/supabase"
import { contentMappingPlan } from "@/lib/content-mapping-plan"

// Cache times in seconds
export const CACHE_TIMES = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 1 day
}

// Cache storage
const cache: Record<string, { data: any; timestamp: number }> = {}

interface FetchOptions {
  order?: { column: string; ascending: boolean }
  limit?: number
  single?: boolean
  revalidate?: number
  filters?: Record<string, any>
  slug?: string
}

/**
 * Fetch data from Supabase with caching
 */
export async function fetchCachedData<T>(table: string, options: FetchOptions = {}): Promise<T | null> {
  const cacheKey = `${table}:${JSON.stringify(options)}`
  const now = Date.now()
  const revalidateTime = options.revalidate || CACHE_TIMES.MEDIUM

  // Check cache first
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < revalidateTime * 1000) {
    return cache[cacheKey].data as T
  }

  try {
    const supabase = createServerSupabaseClient()

    // Start building the query
    let query = supabase.from(table).select("*")

    // Apply filters if provided
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    // Apply slug filter if provided
    if (options.slug) {
      query = query.eq("slug", options.slug)
    }

    // Apply ordering if provided
    if (options.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending })
    }

    // Apply limit if provided
    if (options.limit) {
      query = query.limit(options.limit)
    }

    // Execute the query
    const { data, error } = options.single ? await query.single() : await query

    if (error) {
      console.error(`Error fetching data from ${table}:`, error)
      return null
    }

    // Update cache
    cache[cacheKey] = { data, timestamp: now }

    return data as T
  } catch (error) {
    console.error(`Error in fetchCachedData for ${table}:`, error)
    return null
  }
}

/**
 * Get fallback data for a table
 */
export function getFallbackData(table: string, slug?: string): any {
  // Check if we have a mapping plan for this table
  const plan = contentMappingPlan[table]

  if (!plan) {
    console.warn(`No content mapping plan found for table: ${table}`)
    return null
  }

  // Return appropriate fallback data based on the table
  switch (table) {
    case "hero_section":
      return {
        id: 0,
        title: "Vend Anything You Sell",
        description:
          "Our cloud-based platform integrates with vending machines from all major manufacturers, giving you complete control of your fleet.",
        image_url: "/placeholder.svg?height=550&width=550",
        button_text: "See It In Action",
        button_link: "#features",
        secondary_button_text: "Integration Partners",
        secondary_button_link: "#partners",
      }

    case "product_types": {
      const productTypes = [
        {
          id: 1,
          slug: "grocery",
          title: "Grocery",
          description: "Sell grocery items through automated retail with inventory management and freshness tracking.",
          image_url: "/placeholder.svg?height=300&width=400",
          features: ["Freshness Tracking", "Inventory Management", "Temperature Control"],
          long_description:
            "Our Grocery vending solutions enable retailers to sell fresh and packaged grocery items through automated retail channels. With advanced inventory management and freshness tracking, you can ensure your customers always receive quality products. Temperature control features maintain optimal conditions for perishable items.",
        },
        {
          id: 2,
          slug: "vape",
          title: "Vape",
          description: "Age verification and compliance features for vape product sales through automated retail.",
          image_url: "/placeholder.svg?height=300&width=400",
          features: ["Age Verification", "Compliance Tracking", "Inventory Management"],
          long_description:
            "Our Vape vending solutions include robust age verification systems to ensure regulatory compliance. The platform tracks all sales for compliance reporting and manages inventory efficiently to prevent stockouts of popular products.",
        },
        {
          id: 3,
          slug: "cannabis",
          title: "Cannabis",
          description: "Secure, compliant cannabis sales with age verification and inventory tracking.",
          image_url: "/placeholder.svg?height=300&width=400",
          features: ["Age Verification", "Compliance Tracking", "Secure Storage"],
          long_description:
            "Our Cannabis vending solutions provide secure, compliant automated retail for cannabis products. With comprehensive age verification, compliance tracking, and secure storage, you can confidently expand your cannabis retail operations.",
        },
        {
          id: 4,
          slug: "fresh-food",
          title: "Fresh Food",
          description: "Temperature monitoring and freshness tracking for perishable food items.",
          image_url: "/placeholder.svg?height=300&width=400",
          features: ["Temperature Control", "Freshness Tracking", "Inventory Management"],
          long_description:
            "Our Fresh Food vending solutions maintain optimal temperature conditions for perishable items. Real-time monitoring ensures food safety and quality, while smart inventory management reduces waste and ensures freshness.",
        },
      ]

      // If a slug is provided, return just that product
      if (slug) {
        const product = productTypes.find((p) => p.slug === slug)
        return product || null
      }

      return productTypes
    }

    case "business_goals":
      return [
        {
          id: 1,
          slug: "increase-revenue",
          title: "Increase Revenue",
          description: "Boost your vending machine revenue with smart pricing, promotions, and inventory optimization.",
          image_url: "/placeholder.svg?height=300&width=400",
          benefits: ["Smart Pricing", "Targeted Promotions", "Inventory Optimization"],
        },
        {
          id: 2,
          slug: "reduce-costs",
          title: "Reduce Costs",
          description: "Cut operational costs with route optimization, remote monitoring, and predictive maintenance.",
          image_url: "/placeholder.svg?height=300&width=400",
          benefits: ["Route Optimization", "Remote Monitoring", "Predictive Maintenance"],
        },
        {
          id: 3,
          slug: "improve-customer-experience",
          title: "Improve Customer Experience",
          description:
            "Enhance customer satisfaction with touchless payments, loyalty programs, and personalized offers.",
          image_url: "/placeholder.svg?height=300&width=400",
          benefits: ["Touchless Payments", "Loyalty Programs", "Personalized Offers"],
        },
        {
          id: 4,
          slug: "expand-operations",
          title: "Expand Operations",
          description: "Scale your vending business with data-driven insights and automated inventory management.",
          image_url: "/placeholder.svg?height=300&width=400",
          benefits: ["Data-Driven Insights", "Automated Inventory", "Scalable Infrastructure"],
        },
      ]

    case "machines":
      return [
        {
          id: 1,
          name: "Standard Vending Machine",
          description: "Traditional snack and beverage vending machine",
          image_url: "/placeholder.svg?height=300&width=400",
          category: "vending-machine",
          status: "Active",
          features: ["Multiple Trays", "Digital Display", "Card Payment"],
          location: "Main Office - Lobby",
        },
        {
          id: 2,
          name: "Refrigerated Beverage Machine",
          description: "Cold drink vending with energy-efficient cooling",
          image_url: "/placeholder.svg?height=300&width=400",
          category: "vending-machine",
          status: "Active",
          features: ["Temperature Control", "Energy Efficient", "Multiple Sizes"],
          location: "Downtown - Food Court",
        },
        {
          id: 3,
          name: "Frozen Food Vending",
          description: "Frozen food and ice cream vending solution",
          image_url: "/placeholder.svg?height=300&width=400",
          category: "vending-machine",
          status: "Maintenance",
          features: ["Deep Freeze", "Temperature Monitoring", "Energy Efficient"],
          location: "Hospital - 3rd Floor",
        },
        {
          id: 4,
          name: "Smart Locker System",
          description: "Modular locker system for package delivery",
          image_url: "/placeholder.svg?height=300&width=400",
          category: "locker",
          status: "Active",
          features: ["Modular Design", "Digital Access", "Notification System"],
          location: "Apartment Complex - Mail Room",
        },
      ]

    default:
      return null
  }
}

/**
 * Fetch data with fallback
 */
export async function fetchDataWithFallback<T>(table: string, options: FetchOptions = {}): Promise<T> {
  const data = await fetchCachedData<T>(table, options)

  if (data === null) {
    const fallback = getFallbackData(table, options.slug)
    return fallback as T
  }

  return data
}

/**
 * Fetch a single item by slug
 */
export async function fetchItemBySlug<T>(
  table: string,
  slug: string,
  options: Omit<FetchOptions, "slug"> = {},
): Promise<T | null> {
  try {
    const fullOptions = { ...options, slug }
    const data = await fetchCachedData<T>(table, fullOptions)

    if (data === null) {
      const fallback = getFallbackData(table, slug)
      return fallback as T
    }

    return data
  } catch (error) {
    console.error(`Error in fetchItemBySlug for ${table}/${slug}:`, error)
    return null
  }
}

