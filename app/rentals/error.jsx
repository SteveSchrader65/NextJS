"use client"

export default function Error() {
  return (
    <div className="container m-5">
      <div className="alert alert-danger">
        <p>Properties Error: {errorMessage}</p>
      </div>
    </div>
  )
}
