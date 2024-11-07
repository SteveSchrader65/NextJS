"use client"

export default function Error(errorMessage) {
  return (
    <div className="container m-5">
      <div className="alert alert-danger">
        <h2>We have a problem ...</h2>
        <p>Cities Error: {errorMessage}</p>
      </div>
    </div>
  )
}