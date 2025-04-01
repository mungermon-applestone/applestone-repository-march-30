/**
 * Content Mapping Plan
 *
 * This file defines the mapping between database tables and content types.
 * It serves as a reference for data fetching and content management.
 */

export interface ContentMappingPlan {
  [tableName: string]: {
    description: string
    fields: {
      [fieldName: string]: {
        type: string
        description: string
        required: boolean
      }
    }
    relationships?: {
      [relationName: string]: {
        table: string
        type: "one-to-one" | "one-to-many" | "many-to-many"
        description: string
      }
    }
  }
}

export const contentMappingPlan: ContentMappingPlan = {
  hero_section: {
    description: "Hero section content for the home page",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      title: { type: "string", description: "Main heading", required: true },
      description: { type: "string", description: "Subheading or description", required: true },
      image_url: { type: "string", description: "URL to the hero image", required: true },
      button_text: { type: "string", description: "Primary CTA button text", required: true },
      button_link: { type: "string", description: "Primary CTA button link", required: true },
      secondary_button_text: { type: "string", description: "Secondary CTA button text", required: false },
      secondary_button_link: { type: "string", description: "Secondary CTA button link", required: false },
    },
  },

  product_types: {
    description: "Types of products that can be sold through vending machines",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      slug: { type: "string", description: "URL-friendly identifier", required: true },
      title: { type: "string", description: "Product type name", required: true },
      description: { type: "string", description: "Short description", required: true },
      long_description: { type: "string", description: "Detailed description", required: false },
      image_url: { type: "string", description: "URL to the product type image", required: true },
      features: { type: "array", description: "List of features", required: true },
      benefits: { type: "array", description: "List of benefits", required: false },
    },
  },

  business_goals: {
    description: "Business goals that can be achieved with vending solutions",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      slug: { type: "string", description: "URL-friendly identifier", required: true },
      title: { type: "string", description: "Goal name", required: true },
      description: { type: "string", description: "Short description", required: true },
      image_url: { type: "string", description: "URL to the goal image", required: true },
      benefits: { type: "array", description: "List of benefits", required: true },
    },
  },

  machines: {
    description: "Vending machines and equipment",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      name: { type: "string", description: "Machine name", required: true },
      description: { type: "string", description: "Short description", required: true },
      image_url: { type: "string", description: "URL to the machine image", required: true },
      category: { type: "string", description: "Machine category", required: true },
      status: { type: "string", description: "Current status", required: true },
      features: { type: "array", description: "List of features", required: true },
      location: { type: "string", description: "Current location", required: false },
    },
  },

  testimonials: {
    description: "Customer testimonials",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      name: { type: "string", description: "Customer name", required: true },
      position: { type: "string", description: "Customer position", required: true },
      company: { type: "string", description: "Customer company", required: true },
      quote: { type: "string", description: "Testimonial quote", required: true },
      image_url: { type: "string", description: "URL to the customer image", required: false },
      rating: { type: "number", description: "Rating out of 5", required: false },
    },
  },

  faq_items: {
    description: "Frequently asked questions",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      question: { type: "string", description: "Question text", required: true },
      answer: { type: "string", description: "Answer text", required: true },
      category: { type: "string", description: "FAQ category", required: false },
      order: { type: "number", description: "Display order", required: false },
    },
  },

  blog_posts: {
    description: "Blog posts",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      slug: { type: "string", description: "URL-friendly identifier", required: true },
      title: { type: "string", description: "Post title", required: true },
      excerpt: { type: "string", description: "Short excerpt", required: true },
      content: { type: "string", description: "Full post content", required: true },
      image_url: { type: "string", description: "URL to the featured image", required: false },
      author_id: { type: "number", description: "Author ID", required: true },
      published_at: { type: "string", description: "Publication date", required: true },
      tags: { type: "array", description: "Post tags", required: false },
    },
    relationships: {
      author: {
        table: "authors",
        type: "one-to-one",
        description: "Post author",
      },
    },
  },

  authors: {
    description: "Blog post authors",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      name: { type: "string", description: "Author name", required: true },
      bio: { type: "string", description: "Author bio", required: false },
      image_url: { type: "string", description: "URL to the author image", required: false },
      role: { type: "string", description: "Author role", required: false },
    },
  },

  features: {
    description: "Product features",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      name: { type: "string", description: "Feature name", required: true },
      description: { type: "string", description: "Feature description", required: true },
      icon: { type: "string", description: "Feature icon", required: false },
      category: { type: "string", description: "Feature category", required: false },
    },
  },

  partners: {
    description: "Integration partners",
    fields: {
      id: { type: "number", description: "Unique identifier", required: true },
      name: { type: "string", description: "Partner name", required: true },
      description: { type: "string", description: "Partner description", required: true },
      logo_url: { type: "string", description: "URL to the partner logo", required: true },
      website_url: { type: "string", description: "Partner website URL", required: false },
      partnership_level: { type: "string", description: "Partnership level", required: false },
    },
  },
}

