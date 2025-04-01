"use client"

export default function GlobalError() {
  return (
    <html>
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: 0,
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            maxWidth: "500px",
            border: "1px solid #eaeaea",
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#333" }}>Something went wrong</h2>
          <p style={{ marginBottom: "1.5rem", color: "#666" }}>
            We encountered an error while loading the application.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

