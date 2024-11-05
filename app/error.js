"use client"

export default function Error({error, reset}) {
  return (
    <div className="container mt-5">
      <h2>Sumink went Rong!</h2>
      <h3>{error}</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
