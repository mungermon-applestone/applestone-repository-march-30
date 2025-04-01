"use client"

export default function ErrorDisplay(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <h2 className="text-xl font-bold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">We encountered an error while loading this content.</p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          Go to homepage
        </button>
      </div>
    </div>
  )
}

