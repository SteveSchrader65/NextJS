"use client"

import {useFirebaseData} from "../hooks/useFirebase"
import {useStates} from "../hooks/useStates"
import Image from "next/image"

export default function Rentals() {
  const {states} = useStates()
  const {
    data: properties,
    loading: propertiesLoading,
    error: propertiesError,
  } = useFirebaseData("propertyData")

  // Create loading and error pages using these ...
  if (propertiesLoading) {
    return <div className="container mt-5">Loading properties from database ...</div>
  }

  if (propertiesError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {propertiesError && <p>Properties Error: {propertiesError.message}</p>}
        </div>
      </div>
    )
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
              <div className="card">
                <Image
                  src={`/images/${property.img}.jpg`}
                  alt={property.locality}
                  width={400}
                  height={300}
                  className="card-img-left"
                />
                <div className="card-body">
                  <h5 className="card-title">{property.locality}</h5>
                  <p className="card-text">Price: {property.price}</p>
                  <p className="card-text">
                    Beds-{property.beds}&emsp;Baths-{property.baths}&emsp;Garages-
                    {property.garages}
                  </p>
                  <p className="card-text">{property.desc}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
