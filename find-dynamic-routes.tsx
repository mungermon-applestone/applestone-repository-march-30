"use client"

import { useEffect, useState } from "react"

export default function FindDynamicRoutes() {
  const [routes, setRoutes] = useState<string[]>([])

  useEffect(() => {
    // This is just for demonstration - in a real scenario we'd use Node.js fs module
    const dynamicRoutes = [
      // Blog routes
      "app/blog/[slug]/page.tsx",
      "app/api/blog/[slug]/route.ts",
      "app/admin/blog/[slug]/page.tsx",

      // Product routes
      "app/products/[id]/page.tsx",
      "app/api/products/[id]/route.ts",
      "app/admin/products/[id]/page.tsx",

      // Product type routes
      "app/product-types/[slug]/page.tsx",
      "app/api/product-types/[slug]/route.ts",
      "app/admin/product-types/[slug]/page.tsx",

      // Check for any conflicting routes that might still exist
      "app/blog/[id]/page.tsx",
      "app/blog/[postId]/page.tsx",
      "app/api/blog/[id]/route.ts",
      "app/api/blog/[postId]/route.ts",
      "app/admin/blog/[id]/page.tsx",
      "app/admin/blog/[postId]/page.tsx",

      "app/products/[slug]/page.tsx",
      "app/api/products/[slug]/route.ts",
      "app/admin/products/[slug]/page.tsx",

      "app/product-types/[id]/page.tsx",
      "app/api/product-types/[id]/route.ts",
      "app/admin/product-types/[id]/page.tsx",
    ]

    setRoutes(dynamicRoutes)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dynamic Routes Analysis</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Blog Routes</h2>
          <ul className="list-disc pl-6 space-y-1">
            {routes
              .filter((r) => r.includes("/blog/"))
              .map((route) => (
                <li key={route} className={route.includes("[slug]") ? "text-green-600" : "text-red-600"}>
                  {route}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Product Routes</h2>
          <ul className="list-disc pl-6 space-y-1">
            {routes
              .filter((r) => r.includes("/products/"))
              .map((route) => (
                <li key={route} className={route.includes("[id]") ? "text-green-600" : "text-red-600"}>
                  {route}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Product Type Routes</h2>
          <ul className="list-disc pl-6 space-y-1">
            {routes
              .filter((r) => r.includes("/product-types/"))
              .map((route) => (
                <li key={route} className={route.includes("[slug]") ? "text-green-600" : "text-red-600"}>
                  {route}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

