import { redirect } from "next/navigation"

export default function NewBlogPostPage() {
  redirect("/admin/blog/new")
  return null
}

