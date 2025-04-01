/**
 * Type definitions for API responses
 */

// Page header response
export interface PageHeaderResponse {
  title: string
  description: string
}

// Product type response
export interface ProductTypeResponse {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  features?: string[]
}

// Business goal response
export interface BusinessGoalResponse {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
  benefits?: string[]
}

// Machine response
export interface MachineResponse {
  id: number
  name: string
  description: string
  image_url: string
  category: string
  status: string
  features: string[]
  location?: string
}

// Update response
export interface UpdateResponse {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  published_at: string
  image_url?: string
  tags?: string[]
}

// Technology page content response
export interface TechnologySectionFeature {
  title: string
  description: string
  icon?: string
}

export interface TechnologySection {
  title: string
  description: string
  image: string
  features?: TechnologySectionFeature[]
}

export interface TechnologyPageContentResponse {
  title: string
  description: string
  sections: TechnologySection[]
}

// About page content response
export interface AboutTeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface AboutValue {
  title: string
  description: string
  icon?: string
}

export interface AboutStory {
  text: string
  image: string
}

export interface AboutPageContentResponse {
  title: string
  description: string
  story: AboutStory
  values: AboutValue[]
  team: AboutTeamMember[]
}

// API error response
export interface ApiErrorResponse {
  error: string
  status?: number
}

