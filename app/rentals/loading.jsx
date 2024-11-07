"use client"

export default function Loading() {
  return (
    <div className="loading-container m-5" role="status" aria-live="polite">
      <div className="alert alert-primary">
        <p> Loading properties from database ...</p>
      </div>
    </div>
  )
}