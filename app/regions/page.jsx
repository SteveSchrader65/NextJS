"use client"

// CHECKLIST:
// Re-activate de-structuring error for dev tools and JS before/after screenshots
// Fix bug with scrolling speed on Regions page
// Fix bug with hover effect on Carousel navigation buttons
// Stylize scroll-bars
import {useFirebaseData} from "../hooks/useFirebase"
import useScrollPacer from "../hooks/useScrollPacer"
import {useStates} from "../hooks/useStates"
import Image from "next/image"
import Loading from "../regions/loading"
import Error from "../regions/error"
import styles from "./regions.module.css"

export default function Regions() {
  const {states, updateStates} = useStates()
  const {data: cities, loading: citiesLoading, error: citiesError} = useFirebaseData("cityData")
  const triggerScroll = useScrollPacer(1000)

  if (citiesLoading) {
    Loading()
  }

  if (citiesError) {
    const errorMessage = citiesError?.message || "Database error occurred"
    Error(errorMessage)
  }

  if (!cities) {
    return <div className="container mt-5">No city data available</div>
  }

  const handleCityClick = (city) => {
    updateStates("city", city.name)
    updateStates("cityPrefix", city.prefix)
    updateStates("rentalsAnimated", true)
    triggerScroll()
  }

  return (
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-5">
        Regions Page - Selected City: <span style={{color: "#ffff00"}}>{states.city}</span>
      </h2>
      <div style={{margin: "0 5%"}}>
        <div className="position-relative w-100 m-0">
          <Image
            className="w-100 h-auto"
            src="/images/worldMap.jpg"
            width={1920}
            height={1000}
            priority
            sizes="100vw"
            alt="Map"
          />
          <div
            className={`${styles.mapGrid} position-absolute top-0 start-0 end-0 bottom-0 pe-none`}>
            {cities.length === 0 ? (
              <p style={{color: "#333333"}}>No cities loaded</p>
            ) : (
              cities.map((city, index) => (
                <div
                  className={`${styles.cityArea} position-relative pe-auto d-flex justify-content-center align-items-center fs-sm text-black fw-bold`}
                  style={{
                    gridColumn: `${city.x} / span ${city.width}`,
                    gridRow: `${city.y} / span 2`,
                  }}
                  key={index}
                  x={city.x}
                  y={city.y}
                  width={city.width}
                  height={city.height}
                  onClick={() => handleCityClick(city)}>
                  {city.name}
                  <div
                    className={`${styles.cityInfoPanel} position-absolute d-none text-black`}
                    style={{top: `${city.x}`, left: `${city.y}`}}>
                    <Image
                      className="w-100 h-auto"
                      src={`/images/${city.img}.jpg`}
                      width={300}
                      height={200}
                      sizes="(max-width: 768px) 100vw, 300px"
                      alt={city.alt}
                    />
                    {city.desc}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
