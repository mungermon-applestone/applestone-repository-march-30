"use client"

import { useFetchData } from "@/hooks/use-fetch-data"

interface PageHeaderProps {
  pageKey: string
  defaultTitle?: string
  defaultDescription?: string
  className?: string
}

interface PageHeaderContent {
  title: string
  description: string
}

export function PageHeader({
  pageKey,
  defaultTitle = "Page Title",
  defaultDescription = "Page description goes here",
  className = "",
}: PageHeaderProps) {
  const { data } = useFetchData<PageHeaderContent>({
    url: `/api/page-headers/${pageKey}`,
    fallbackData: {
      title: defaultTitle,
      description: defaultDescription,
    },
    revalidateTime: 3600, // 1 hour
  })

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-muted/50 ${className}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{data.title}</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

