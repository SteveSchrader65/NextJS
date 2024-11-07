"use client"

export default function Error(error) {
  return (
    <div className="container m-5">
      <div className="alert alert-danger">
        <p>Properties Error: {error.message}</p>
      </div>
    </div>
  )
}
