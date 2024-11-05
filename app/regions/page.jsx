"use client"

import {useFirebaseData} from "../hooks/useFirebase"
import {useStates} from "../hooks/useStates"
import useScrollPacer from "../hooks/useScrollPacer"
import Image from "next/image"

export default function Regions() {
  const [states, setStates] = useStates()
  const {data: cities, loading: citiesLoading, error: citiesError} = useFirebaseData("cityData")
  const triggerScroll = useScrollPacer(1000)

  if (citiesLoading) {
    return <div className="container mt-5">Loading cities from database ...</div>
  }

  if (citiesError) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {citiesError && <p>Cities Error: {citiesError.message}</p>}
        </div>
      </div>
    )
  }

  const handleCityClick = (cityName) => {
    setStates("city", cityName)
    setIsRentalsAnimationApplied(true)
    triggerScroll()
  }

  return (
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-10">
        Regions Page - Selected City: <span style={{color: "#ffff00"}}>{states.city}</span>
      </h2>
      <div className="container mt-5">
        <h2>Cities</h2>
        <div className="row">
          {cities &&
            cities.map((city) => (
              <div key={city.id} className="col-md-4 mb-4">
                <div className="card">
                  <Image
                    src={`/images/${city.img}.jpg`}
                    alt={city.alt}
                    width={400}
                    height={300}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{city.name}</h5>
                    <p className="card-text">{city.desc}</p>
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
import {useContext, useState} from "react"
import useScrollPacer from "../hooks/useScrollPacer"
import {AppContext} from "./App"
import {cities} from "../data/cityData"
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

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
`

const MapImage = styled.img`
  width: 100%;
  height: auto;
`

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(75, 1fr);
  grid-template-rows: repeat(60, 1fr);
  pointer-events: none;
`

const CityInfoPanel = styled.div`
  position: absolute;
  display: none;
  top: ${(props) => props.x};
  left: ${(props) => props.y};
  background-color: rgba(255, 255, 0, 0.6);
  border: 1px solid black;
  padding: 10px;
  z-index: 1000;
  color: black;
  font-size: 14px;
  width: 10rem;
`

const CityArea = styled.div`
  position: relative;
  grid-column: ${(props) => props.x} / span ${(props) => props.width};
  grid-row: ${(props) => props.y} / span ${2};
  background-color: rgba(255, 0, 0, 0.3);
  transition: background-color 0.3s;
  border: 2px solid red;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: black;
  font-weight: bold;

  &:hover {
    ${CityInfoPanel} {
      display: block;
      cursor: pointer;
    }

    background-color: transparent;
    color: transparent;
    border: none;
  }
`

const CityImage = styled.img`
  width: 100%;
  height: auto;
`

const Regions = () => {
  const {currentCity} = useContext(AppContext)
  const triggerScroll = useScrollPacer(1000)

  const handleCityClick = (cityName) => {
    setCurrentCity(cityName)
    setIsRentalsAnimationApplied(true)
    triggerScroll()
  }

  return (
  <!== PASTE SNIPPET ONLY INTO ABOVE ==>
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-10">
        Regions Page - Selected City: <span style={{color: "#ffff00"}}>{states.city}</span>
      </h2>
      <div style={{margin: "0 5%"}}>
        <MapContainer>
          <MapImage src="images/worldMap.jpg" alt="Map" />
          <Grid>
            {cities.length === 0 ? (
              <p style={{color: "#333333"}}>No cities loaded</p>
            ) : (
              cities.map((city, index) => (
                <CityArea
                  key={index}
                  x={city.x}
                  y={city.y}
                  width={city.width}
                  height={city.height}
                  onClick={() => handleCityClick(city.name)}>
                  {city.name}
                  <CityInfoPanel>
                    <CityImage src={`images/${city.img}.jpg`} alt={city.alt} />
                    {city.desc}
                  </CityInfoPanel>
                </CityArea>
              ))
            )}
          </Grid>
        </MapContainer>
      </div>
    </>
  )
}

export default Regions
*/
