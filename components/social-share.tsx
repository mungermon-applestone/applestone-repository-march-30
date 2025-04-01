"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, LinkIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SocialShareProps {
  title: string
  url?: string
  className?: string
}

export function SocialShare({ title, url, className = "" }: SocialShareProps) {
  // Use the current URL if none is provided
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy failed",
          description: "Failed to copy the link. Please try again.",
          variant: "destructive",
        })
      },
    )
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium mr-2">Share:</span>
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            onClick={() => window.open(link.url, "_blank")}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span className="sr-only">Share on {link.name}</span>
          </Button>
        ))}
        <Button variant="outline" size="sm" onClick={copyToClipboard} aria-label="Copy link">
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
  )
}

