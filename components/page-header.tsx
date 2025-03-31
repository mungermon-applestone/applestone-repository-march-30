import { fetchData } from "@/lib/supabase-client"
import type { PageHeader as PageHeaderType } from "@/types/database"
import { unstable_noStore as noStore } from "next/cache"

interface PageHeaderProps {
  pageKey: string
  defaultTitle?: string
  defaultDescription?: string
  className?: string
}

async function getPageHeader(pageKey: string): Promise<PageHeaderType | null> {
  // Disable caching for this component
  noStore()

  return await fetchData<PageHeaderType>("page_headers", {
    eq: { column: "page_key", value: pageKey },
    single: true,
  })
}

export async function PageHeader({
  pageKey,
  defaultTitle = "Page Title",
  defaultDescription = "Page description goes here",
  className = "",
}: PageHeaderProps) {
  const headerData = await getPageHeader(pageKey)

  const title = headerData?.title || defaultTitle
  const description = headerData?.description || defaultDescription

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-muted/50 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{title}</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

