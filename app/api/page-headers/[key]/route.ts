import { NextResponse } from "next/server"

// Default page headers for common pages
const defaultPageHeaders: Record<string, { title: string; description: string; image_url?: string }> = {
  products: {
    title: "Product Types",
    description: "Explore the different types of products you can sell through our vending machine software.",
  },
  "business-goals": {
    title: "Achieve Your Business Goals",
    description:
      "Our vending machine software helps you achieve your business goals with powerful features and insights.",
  },
  machines: {
    title: "Machine Form Factors",
    description: "Explore our range of vending machines and lockers designed for different products and environments.",
  },
  technology: {
    title: "Our Technology",
    description: "Cutting-edge vending machine software built for reliability, security, and scalability.",
  },
  about: {
    title: "About AppleStone Solutions",
    description: "We're revolutionizing the vending industry with innovative software solutions.",
  },
  updates: {
    title: "Updates & News",
    description: "Stay up to date with the latest product updates, company news, and industry insights.",
  },
}

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const pageKey = params.key

  try {
    // For now, just return the default headers since we're having issues with Supabase
    // When the database is properly set up, we can uncomment and fix the code below
    /*
    const supabase = createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('page_headers')
      .select('title, description, image_url')
      .eq('page_key', pageKey)
      .single()
    
    if (error) {
      // If the error is not just "no rows returned", log it
      if (error.code !== 'PGRST116') {
        console.error(`Error fetching page header for ${pageKey}:`, error)
      }
      
      // Return default header if available, or generic one if not
      const defaultHeader = defaultPageHeaders[pageKey] || {
        title: "Page Title",
        description: "Page description"
      }
      
      return NextResponse.json(defaultHeader)
    }
    
    return NextResponse.json(data)
    */

    // Return default header if available, or generic one if not
    const defaultHeader = defaultPageHeaders[pageKey] || {
      title: "Page Title",
      description: "Page description",
    }

    return NextResponse.json(defaultHeader)
  } catch (error) {
    console.error(`Error in page header API for ${pageKey}:`, error)

    // Return default header if available, or generic one if not
    const defaultHeader = defaultPageHeaders[pageKey] || {
      title: "Page Title",
      description: "Page description",
    }

    return NextResponse.json(defaultHeader)
  }
}

