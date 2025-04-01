/**
 * TypeScript definitions for Supabase database schema
 */

export interface HeroSection {
  id: number
  title: string
  description: string
  image_url: string
  button_text: string
  button_link: string
  created_at?: string
  updated_at?: string
}

export interface PageHeader {
  id: number
  page_key: string
  title: string
  description: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

export interface BusinessGoal {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  benefits?: string[]
  created_at?: string
  updated_at?: string
}

export interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features?: string[]
  created_at?: string
  updated_at?: string
}

export interface Machine {
  id: number
  name: string
  description: string
  image_url: string
  category?: string
  features?: string[]
  specifications?: Record<string, string>
  status?: string
  location?: string
  created_at?: string
  updated_at?: string
}

export interface Update {
  id: number
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  slug: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

export interface PageContent {
  id: number
  page_name: string
  content: Record<string, any>
  created_at?: string
  updated_at?: string
}

export interface StorageFile {
  name: string
  id: string
  metadata?: {
    size: number
    mimetype?: string
    cacheControl?: string
    lastModified?: string
  }
  created_at?: string
  updated_at?: string
  path?: string
  url?: string
}

/**
 * Database schema type
 */
export interface Database {
  hero_section: HeroSection
  page_headers: PageHeader
  business_goals: BusinessGoal
  product_types: ProductType
  machines: Machine
  updates: Update
  page_content: PageContent
}

