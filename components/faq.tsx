"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export interface FAQItem {
  question: string
  answer: string
  id: string
}

interface FAQProps {
  items: FAQItem[]
  className?: string
  defaultOpen?: string[]
}

export function FAQ({ items, className = "", defaultOpen = [] }: FAQProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  return (
    <div className={cn("w-full", className)}>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none">{item.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

