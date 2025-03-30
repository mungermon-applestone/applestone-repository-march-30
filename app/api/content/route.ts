import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const contentData = await request.json()

    // In a production app, you'd want to validate the data here

    // Write the updated content to the JSON file
    // Note: This won't work in production on Vercel - you'd need a database
    // This is just for demonstration purposes
    const filePath = path.join(process.cwd(), "data", "content.json")
    await fs.writeFile(filePath, JSON.stringify(contentData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving content:", error)
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}

