"use client"

export default function Error() {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        margin: "2rem auto",
        maxWidth: "500px",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#333" }}>Something went wrong</h2>
      <p style={{ marginBottom: "1.5rem", color: "#666" }}>We encountered an error while loading this page.</p>
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
  )
}

