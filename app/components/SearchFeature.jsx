"use client"

import {useState, useEffect, useRef} from "react"
import styles from "./styles/search.module.css"

const SearchFeature = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [expanded, setExpanded] = useState(false)
  const searchRef = useRef(null)
  const toggleRef = useRef(null)

  const toggleExpand = (e) => {
    e.preventDefault()
    setExpanded((prev) => !prev)
    if (!expanded) {
      setSearchTerm("")
      setTimeout(() => {
        toggleRef.current?.focus()
      }, 500)
    }
  }

  const handleInput = (e) => {
    e.stopPropagation()
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    console.log("Search Term:", searchTerm)

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchTerm])

  return (
    <form
      className={`position-relative ${styles.searchContainer} ${expanded ? styles.expanded : ""}`}
      ref={searchRef}>
      <div
        className={`${styles.searchButton} d-flex align-items-center justify-content-end bg-light border border-secondary rounded`}>
        <input
          className={`${styles.searchInput} form-control bg-transparent border-0 ${
            expanded ? styles.expanded : ""
          }`}
          ref={toggleRef}
          type="text"
          name="search"
          value={searchTerm}
          placeholder="Search ..."
          onChange={handleInput}
          disabled={!expanded}
        />
        <button
          type="button"
          onClick={toggleExpand}
          className="btn btn-link text-secondary p-0 me-2">
          <i className="fas fa-search" style={{flexShrink: 0}} />
        </button>
      </div>
    </form>
  )
}

export default SearchFeature
