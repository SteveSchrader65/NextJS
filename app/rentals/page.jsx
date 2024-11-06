"use client"

import {useFirebaseData} from "../hooks/useFirebase"
import {useStates} from "../hooks/useStates"
import Image from "next/image"
import styles from "./rentals.module.css"

export default function Rentals() {
  const {states, _} = useStates()
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

  return (
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-5">
        Rentals Page - Listings for:
        <span style={{color: "#ffff00"}}>{states.city}</span>
      </h2>

      {/* const StyledCard = styled.div`
  width: 80%;
  border: 2px solid #000000;
  padding: 1%;
  display: flex;
  margin-bottom: 20px;
`

const StyledImage = styled.img`
  width: 60%;
  height: auto;
  border: 1px solid red;
  margin-right: 20px;
`

const StyledContent = styled.div`
  flex: 1;

  p:first-of-type {
    font-weight: bold;
    font-size: 1.4rem;
  }

  p:nth-of-type(4) {
    text-align: justify;
    text-justify: inter-word;
  }
` */}

      <div style={{margin: "0 5%"}}>
        {/* properties.map((property, index) => (
          <StyledCard key={index}>
            <StyledImage src={property.src} alt={property.alt} />
            <StyledContent>
              <p>Price: {property.price}</p>
              <p>
                {property.beds}&ensp;Beds&emsp;-&emsp;{property.baths}&ensp;Baths&emsp;-&emsp;
                {property.garages}&ensp;Garages
              </p>
              <p>
                <strong>Locality:</strong>&ensp;{property.locality}&emsp;{property.sqm}
              </p>
              <p>
                <strong>Description:</strong>&ensp;{property.desc}
              </p>
            </StyledContent>
          </StyledCard>
          )) */}

        <div className="row">
          {properties &&
            properties.map((property) => (
              <div key={property.id} className="col-md-4 mb-4">
                <div className="card">
                  <Image
                    src={`/images/${property.img}.jpg`}
                    alt={property.locality}
                    width={400}
                    height={300}
                    className="card-img-top"
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
      </div>
    </>
  )
}
