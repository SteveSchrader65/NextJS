"use client"

import {useEffect} from "react"
import {useFirebaseData} from "../hooks/useFirebase"
import Image from "next/image"
import {useStates} from "../hooks/useStates"
import styles from "./rentals.module.css"

export default function Rentals() {
  const {
    data: properties,
    loading: propertiesLoading,
    error: propertiesError,
  } = useFirebaseData("propertyData")

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

  // useEffect(() => {
  //   const city = cities.find((city) => city.name === currentCity)

  //   if (city) {
  //     setCurrentCode(city.prefix)
  //     loadProperties(city.prefix)
  //       .then((loadedProperties) => {
  //         setProperties(loadedProperties)
  //       })
  //       .catch((error) => {
  //         console.error("Error loading properties:", error)
  //       })
  //   }
  // }, [])

  /*{styles.titleLine}*/
  /* ("bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-10") */
  // <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-10">
  //   Contact Page
  // </h2>


  return (
    <>
      <div className="container mt-5">
        <h2 className="mt-5">Properties</h2>
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

/*
import {useState, useEffect, useContext} from "react"
import {AppContext} from "../App"
import {cities} from "../data/cityData"
import {properties as propertyData} from "../data/propertyData"
import styled from "styled-components"

const StyledTitleLine = styled.h2`
  background-color: #333333;
  color: #fefefe;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0;
  padding-left: 4rem;

  span {
    color: #ffff00;
  }
`

const StyledCard = styled.div`
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
`

const Rentals = () => {
  const {currentCity} = useContext(AppContext)
  const [_, setCurrentCode] = useState("")
  const [properties, setProperties] = useState([])

  const loadProperties = (prefix) => {
    return new Promise((resolve) => {
      const filteredProperties = propertyData.filter((prop) => prop.img.startsWith(prefix))
      const loadedProperties = filteredProperties.map((prop) => ({
        src: `images/${prop.img}.jpg`,
        alt: `${prop.locality} property`,
        price: `${prop.price}`,
        beds: `${prop.beds}`,
        baths: `${prop.baths}`,
        garages: `${prop.garages}`,
        sqm: `${prop.sqm}`,
        locality: `${prop.locality}`,
        desc: `${prop.desc}`,
      }))

      resolve(loadedProperties)
    })
  }

  useEffect(() => {
    const city = cities.find((city) => city.name === currentCity)

    if (city) {
      setCurrentCode(city.prefix)
      loadProperties(city.prefix)
        .then((loadedProperties) => {
          setProperties(loadedProperties)
        })
        .catch((error) => {
          console.error("Error loading properties:", error)
        })
    }
  }, [])

  return (
    <>
      <StyledTitleLine>
        Rentals Page - Listings for: <span>{currentCity}</span>
      </StyledTitleLine>
      <div style={{margin: "0 5%"}}>
        {properties.length === 0 ? (
          <p style={{color: "#333333"}}>No properties loaded</p>
        ) : (
          properties.map((property, index) => (
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
          ))
        )}
      </div>
    </>
  )
}

export default Rentals
*/
