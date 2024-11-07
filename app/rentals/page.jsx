"use client"

import {useFirebaseData} from "../hooks/useFirebase"
import {useStates} from "../hooks/useStates"
import Image from "next/image"
import Loading from "../rentals/loading"
import Error from "../rentals/error"

export default function Rentals() {
  const {states} = useStates()
  const {
    data: properties,
    loading: propertiesLoading,
    error: propertiesError,
  } = useFirebaseData("propertyData")

  if (propertiesLoading) {
    Loading()
  }

  if (propertiesError) {
    const errorMessage = propertiesError?.message || "Database error occurred"
    Error(errorMessage)
  }

  if (!properties) {
    return <div className="container mt-5">No city data available</div>
  }

  const cityPrefix = states.cityPrefix.toLowerCase()

  return (
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-5">
        Rentals Page - Listings for: <span style={{color: "#ffff00"}}>{states.city}</span>
      </h2>
      <div style={{margin: "0 5%"}}>
        {properties
          .filter((property) => property.img.toLowerCase().startsWith(cityPrefix))
          .map((property, index) => (
            <div className="container-fluid w-80 border border-dark p-3 d-flex mb-4" key={index}>
              <Image
                src={`/images/${property.img}.jpg`}
                alt={property.locality}
                width={2100}
                height={100}
                className="border border-danger me-3"
                style={{height: "auto"}}
              />
              <div>
                <h5 className="fw-bold fs-4">{property.locality}</h5>
                <p className="fw-bold fs-5">Price: {property.price}</p>
                <p className="fs-6">
                  <strong>Beds</strong>&ensp;-&ensp;{property.beds}&emsp;<strong>Baths</strong>
                  &ensp;-&ensp;{property.baths}&emsp;<strong>Garages</strong>&ensp;-&ensp;
                  {property.garages}
                </p>
                <p className="fs-6" style={{textAlign: "justify"}}>
                  {property.desc}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
