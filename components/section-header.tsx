interface SectionHeaderProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, description, centered = true, className = "" }: SectionHeaderProps) {
  return (
    <div className={`space-y-2 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p
          className={`${centered ? "max-w-[900px] mx-auto" : ""} text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

