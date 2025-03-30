import contentData from "@/data/content.json"

// Type definitions for our content
export type HeroSection = typeof contentData.heroSection
export type ProductType = (typeof contentData.productTypes)[0]
export type BusinessGoal = (typeof contentData.businessGoals)[0]
export type Machine = (typeof contentData.machines)[0]
export type Testimonial = (typeof contentData.testimonials)[0]
export type BlogPost = (typeof contentData.blogPosts)[0]

// Helper functions to access data
export function getHeroSection(): HeroSection {
  return contentData.heroSection
}

export function getProductTypes(): ProductType[] {
  return contentData.productTypes
}

export function getProductType(id: string): ProductType | undefined {
  return contentData.productTypes.find((product) => product.id === id)
}

export function getBusinessGoals(): BusinessGoal[] {
  return contentData.businessGoals
}

export function getBusinessGoal(id: string): BusinessGoal | undefined {
  return contentData.businessGoals.find((goal) => goal.id === id)
}

export function getMachines(): Machine[] {
  return contentData.machines
}

export function getMachine(id: string): Machine | undefined {
  return contentData.machines.find((machine) => machine.id === id)
}

export function getTestimonials(): Testimonial[] {
  return contentData.testimonials
}

export function getBlogPosts(): BlogPost[] {
  return contentData.blogPosts
}

export function getBlogPost(id: string): BlogPost | undefined {
  return contentData.blogPosts.find((post) => post.id === id)
}

