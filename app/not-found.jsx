"use client"

import {useEffect} from "react"
import {useStates} from "./hooks/useStates"

export default function NotFound() {
  const {_, updateStates} = useStates()

  useEffect(() => {
    updateStates("homeAnimated", true)
  }, [])

  return (
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-5">
        <span style={{color:"#ff0000"}}>404: </span>Uh-oh !! This appears to be a property managed by
        one of our competitors
      </h2>
      <div>
        <img src="images/404house.jpg" className="d-block w-75 mx-auto border border-danger border-2" alt="Competitor's Listing" />
      </div>
    </>
  )
}
