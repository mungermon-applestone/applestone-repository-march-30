export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      machines: {
        Row: {
          id: number
          name: string
          description: string
          image_url: string
          category?: string
          features?: string[]
          status?: string
          location?: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          name: string
          description: string
          image_url: string
          category?: string
          features?: string[]
          status?: string
          location?: string
        }
        Update: {
          name?: string
          description?: string
          image_url?: string
          category?: string
          features?: string[]
          status?: string
          location?: string
        }
      }
      product_types: {
        Row: {
          id: number
          slug: string
          title: string
          description: string
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          slug: string
          title: string
          description: string
          image_url: string
        }
        Update: {
          slug?: string
          title?: string
          description?: string
          image_url?: string
        }
      }
      page_content: {
        Row: {
          id: number
          page_name: string
          content: Json
          created_at?: string
          updated_at?: string
        }
        Insert: {
          page_name: string
          content: Json
        }
        Update: {
          page_name?: string
          content?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}

// Type for page content
export interface PageContent {
  title: string
  description: string
  [key: string]: any
}

// Type for technology page content
export interface TechnologyPageContent extends PageContent {
  sections: {
    title: string
    description: string
    image?: string
    features?: {
      title: string
      description: string
      icon?: string
    }[]
  }[]
}

// Type for about page content
export interface AboutPageContent extends PageContent {
  story: {
    text: string
    image?: string
  }
  values: {
    title: string
    description: string
    icon?: string
  }[]
  team: {
    name: string
    role: string
    bio: string
    image?: string
  }[]
}

// Type for machine data
export interface Machine {
  id: number
  name: string
  description: string
  image_url: string
  category?: string
  features?: string[]
  status?: string
  location?: string
}

// Type for product type data
export interface ProductType {
  id: number
  slug: string
  title: string
  description: string
  image_url: string
}

