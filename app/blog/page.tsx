import Link from "next/link"

async function getPosts() {
  // Simulate fetching posts from a database or API
  return [
    { id: 1, title: "First Post", content: "This is the first post.", slug: "first-post" },
    { id: 2, title: "Second Post", content: "This is the second post.", slug: "second-post" },
  ]
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

