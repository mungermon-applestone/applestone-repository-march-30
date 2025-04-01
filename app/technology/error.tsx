"use client"

export default function Error() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Error</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}

