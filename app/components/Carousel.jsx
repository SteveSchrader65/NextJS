"use client"

import {useState, useEffect, useCallback} from "react"
import Image from "next/image"
import {useFirebaseData} from "../hooks/useFirebase"
import styles from "./styles/carousel.module.css"

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isReversed, setIsReversed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [slides, setSlides] = useState([])

  // Fetch city data from database
  const {data: cityData, loading: cityLoading} = useFirebaseData("cityData")

  useEffect(() => {
    if (cityData && !cityLoading) {

      // Select 5 random cities to display in Carousel component
      const shuffled = [...cityData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map((city) => ({
          img: `/images/${city.img}.jpg`,
          alt: `Image of ${city.name}`,
        }))

      setSlides(shuffled)
      setMounted(true)
    }
  }, [cityData, cityLoading])

  const moveSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => {
      if (isReversed) {
        if (prevSlide > 0) return prevSlide - 1
        else {
          setIsReversed(false)
          return 1
        }
      } else {
        if (prevSlide < slides.length - 1) return prevSlide + 1
        else {
          setIsReversed(true)
          return slides.length - 2
        }
      }
    })
  }, [isReversed, slides.length])

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(moveSlide, 2500)
      return () => clearInterval(interval)
    }
  }, [isPaused, moveSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsReversed(false)
  }

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsReversed(true)
  }

  const jumpToSlide = (index) => {
    setCurrentSlide(index)
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        previousSlide()
        break
      case "ArrowRight":
        e.preventDefault()
        nextSlide()
        break
      case "Enter":
      case " ":
        e.preventDefault()
        setIsPaused((prev) => !prev)
        break
    }
  }

  const ICONS = {
    LEFTCONTROL: "fa-solid fa-chevron-left",
    RIGHTCONTROL: "fa-solid fa-chevron-right",
  }

  const IconChar = ({icon}) => {
    return <i className={`${icon}`}></i>
  }

  if (!mounted || cityLoading) return null

  return slides.length > 0 ? (
    <div className="bg-dark w-100 position-relative py-4">
      <button
        className={`${styles.control} position-absolute top-50 border-0 bg-dark text-white-50`}
        style={{
          left: "6%",
          transform: "translateY(-50%)",
          fontSize: "2.5rem",
          cursor: "pointer",
          zIndex: "100",
          padding: "1%",
        }}
        onClick={previousSlide}
        onKeyDown={handleKeyDown}
        aria-label="Previous Slide">
        <IconChar icon={ICONS.LEFTCONTROL} />
      </button>
      <div className="container-fluid position-relative py-4" style={{maxWidth: "1000px"}}>
        <div className="position-relative overflow-hidden">
          <div
            className="d-flex"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}>
            {slides.map((slide, index) => (
              <div key={index} className="flex-grow-0 flex-shrink-0 w-100">
                <Image
                  className="w-100"
                  style={{height: "auto"}}
                  src={slide.img}
                  alt={slide.alt}
                  width={200}
                  height={150}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 1000px"
                  onError={(e) => {
                    console.log(`Error loading image: ${slide.img}`)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3" style={{gap: "15px"}}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`rounded-circle cursor-pointer border-0 ${
                index === currentSlide ? "bg-light" : "bg-secondary"
              }`}
              style={{
                width: "15px",
                height: "15px",
                transition: "background-color 0.3s",
              }}
              onClick={() => jumpToSlide(index)}
            />
          ))}
        </div>
      </div>
      <button
        className={`${styles.control} position-absolute top-50 border-0 bg-dark text-white-50`}
        style={{
          right: "6%",
          transform: "translateY(-50%)",
          fontSize: "2.5rem",
          cursor: "pointer",
          zIndex: "100",
          padding: "1%",
        }}
        onClick={nextSlide}
        onKeyDown={handleKeyDown}
        aria-label="Next Slide">
        <IconChar icon={ICONS.RIGHTCONTROL} />
      </button>
    </div>
  ) : null
}

export default Carousel
